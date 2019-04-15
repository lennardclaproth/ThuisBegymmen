import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles, withTheme } from '@material-ui/core/styles';
import ProductCard from './ProductCard';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        products : [],
        images: [],
        category: '',
        loading: false,
        loading_sub: false,
        search: '',
        search_lower_limit: '',
        search_upper_limit: '',
        real_lower_limit:'',
        real_upper_limit:'',
        current_page: 1,
        products_per_page: 20,
        prijs_filter: 0,
        validRange: true
    };
  }

  componentWillMount() {
    this.getProducts();
  }

  getProducts() {
    this.setState({loading: true});
    fetch('api/product')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ loading: false, products : responseJson })
        })
        .catch((error) => {
            console.error(error);
        })
  }

  updateLowerLimit(event) {
    this.setState({search_lower_limit: Number(event.target.value)});
    setTimeout( () => {
        this.checkValidRange()
    }, 1);
  }

  updateUpperLimit(event) {
    this.setState({search_upper_limit: Number(event.target.value)});
    setTimeout( () => {
        this.checkValidRange()
    }, 1);
  }

  checkValidRange()
  {
    if(this.state.search_lower_limit <= this.state.search_upper_limit)
    {
        this.setState({validRange: false})
    }
    else if (this.state.search_lower_limit > this.state.search_upper_limit)
    {
        this.setState({validRange: true})
    }
    else if ( isNaN(this.state.search_lower_limit) || isNaN(this.state.search_upper_limit))
    {
        this.setState({validRange: true})
    }
  }

  applyPriceRange()
  {
    this.setState({loading_sub: true});
    this.setState({real_lower_limit: this.state.search_lower_limit})
    this.setState({real_upper_limit: this.state.search_upper_limit})
    this.removeLoading();
  }

  updateCategory(event) {
    this.setState({category: event.target.value});
  }

  clearPriceFilter(){
    this.setState({loading_sub: true})
    this.setState({real_lower_limit: ''})
    this.setState({real_upper_limit: ''})
    this.setState({search_lower_limit: ''})
    this.setState({search_upper_limit: ''})
    this.setState({validRange: true})
    document.getElementById("lower-price-filter").reset();
    document.getElementById("upper-price-filter").reset();
    this.removeLoading();
  }

  togglePrijsFilter(){
    if (this.state.prijs_filter === 0)
    {
      this.setState({prijs_filter: 1})
    }
    else
    {
      this.setState({prijs_filter: 0})
    }
  }

  refreshPage()
  {window.location.reload();}

  removeLoading(){
    setTimeout( () => {
      this.setState({loading_sub: false})
    }, 50); // 10 = 10 milliseconden
  }

  updatePage(event) {
    this.setState({loading_sub: true});
    this.setState({current_page: Number(event.target.id)});
    this.removeLoading();
  }

  render() {
    let filteredProducts = this.state.products.filter(
      (product) => {
        if (this.state.real_lower_limit === '' && this.state.real_upper_limit === '')
        {
          return product.prijs > 0;
        }
        else
        {
          return product.prijs > (this.state.real_lower_limit) && product.prijs < (this.state.real_upper_limit);
        }
      }
    );

    const { classes } = this.props;
    const { current_page, products_per_page } = this.state;
    const indexOfLastProduct = current_page * products_per_page;
    const indexOfFirstProduct = indexOfLastProduct - products_per_page;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / products_per_page); i++) {
      pageNumbers.push(i);
    }
    
    const actualPageNumbers = pageNumbers.map(number => {
      return (
        <button
          key={number}
          id={number}
          className="PageButtons"
          onClick={this.updatePage.bind(this)}
          style={{fontSize: 15}}
        >
          {number}
        </button>
      )
    })
    
    const productlist = currentProducts.map((product,i) => (
      <ProductCard
        key={i}
        productId={product.productId}
        naam={product.productnaam}
        prijs={product.prijs}
        inventaris={product.inventaris}
        verzendtijd={product.verzendTijd}
      />
    ));

    const searchinput_lower_limit =
    <form id="lower-price-filter">
    <input
    type="text"
    value={this.setState(this.search_lower_limit)}
    onChange={this.updateLowerLimit.bind(this)}
    style={{color:'black'}}
    />
    </form>;

    const searchinput_upper_limit =
    <form id="upper-price-filter">
    <input
    type="text"
    value={this.setState(this.search_upper_limit)}
    onChange={this.updateUpperLimit.bind(this)}
    style={{color:'black'}}
    />
    </form>;
    

  return (
    <div>
        {this.state.loading
        ? 
            <Segment placeholder size="massive">
            <Dimmer active>
            <Loader size="huge">Loading Products...</Loader>
            </Dimmer>
            </Segment>
        :
            <div>
            <br/><br/>
            {this.state.prijs_filter === 0
            ?
                <div>
                    <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.togglePrijsFilter.bind(this)}
                    style={{fontSize: 15}}>
                    Prijs Filter Tonen
                    </Button>
                </div>
            :
                <div>
                    <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.togglePrijsFilter.bind(this)}
                    style={{fontSize: 15}}>
                    Prijs Filter Verbergen
                    </Button>
                </div>
            }
            {this.state.prijs_filter === 0
            ?
                <br/>
            :
                <div>
                    <div style={{color:'white', fontSize: 20}}>
                        Minimum prijs in &euro;
                        {searchinput_lower_limit}
                    </div>
                    <div style={{color:'white', fontSize: 20}}>
                        Maximum prijs in &euro;
                        {searchinput_upper_limit}
                    </div>
                    <div>
                        {this.state.real_lower_limit === '' && this.state.real_upper_limit === ''
                        ?
                            <div style={{color:'white', fontSize: 20}}>
                                Huidige prijs filter: &nbsp;
                                Niet geactiveerd
                            </div>
                        :
                            <div style={{color:'white', fontSize: 20}}>
                                Huidige prijs filter: &nbsp;
                                &euro;{this.state.real_lower_limit}
                                &nbsp; tot en met &nbsp;
                                &euro;{this.state.real_upper_limit}
                                <br/>
                                Aantal producten na prijs filter: &nbsp;
                                {filteredProducts.length}
                            </div>
                        }
                    </div>
                    <div>
                        <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.clearPriceFilter.bind(this)}
                        style={{fontSize: 15}}>
                        Prijs Filter Reset
                        </Button>
                        <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.applyPriceRange.bind(this)}
                        style={{fontSize: 15}}
                        disabled={this.state.validRange}>
                        Prijs Filter Toepassen
                        </Button>
                    </div>
                </div>
            }

            <br/>

            {filteredProducts.length > 20
            ?
                <div>
                    <div style={{color:'white', fontSize:18}}>
                    Huidige pagina: {this.state.current_page}
                    </div>
                    <ul>
                    {actualPageNumbers}
                    </ul>
                </div>
            :
                <div></div>
            }
                <div>
                {this.state.loading_sub
                ?
                    <Segment placeholder size="massive">
                    <Dimmer active>
                    <Loader size="huge">Loading Products...</Loader>
                    </Dimmer>
                    </Segment>
                :
                    <div>
                    <Grid container justify="center">
                        {productlist}
                    </Grid>
                    <br/>
                    </div>
                }
                </div>
            </div>
        }
    </div>
  );
  }
}


export default withStyles(styles)(ProductList);


