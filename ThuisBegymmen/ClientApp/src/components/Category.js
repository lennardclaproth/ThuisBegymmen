import React from 'react';
import { Grid } from '@material-ui/core';
import { Loader, Dimmer, Segment } from 'semantic-ui-react'
import ProductCard from './ProductCard';
import './Submenu.css';



class Category extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        products : [],
        loading: false,
        loading_sub: false,
        discriminator: this.props.location.state.discriminator,
        subcategory: '',
        current_page: 1,
        products_per_page: 20,
    };
  }

  componentDidMount() {
    this.getCategoryProducts();}

  getCategoryProducts() {
    this.setState({loading: true});
    fetch(`api/Product/getCategory?discriminator=${this.state.discriminator}`) 
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({ loading: false, products : responseJson })
        })
        .catch((error) => {
            console.error(error);
        })
  }
  

  refreshPage()
  { window.location.reload();}

  updateSubCategory(event) {
    this.setState({loading_sub: true});
    this.setState({current_page: 1});
    this.setState({subcategory: event.target.firstChild.data});
    this.removeLoading();
  }

  removeLoading(){
    setTimeout( () => {
      this.setState({loading_sub: false})
    }, 10); // 10 = 10 milliseconden
  }
  

  removeSubCategory(){
    this.setState({loading_sub: true});
    this.setState({current_page: 1});
    this.setState({subcategory: ''});
    this.removeLoading();
  }

  updatePage(event) {
    this.setState({loading_sub: true});
    this.setState({current_page: Number(event.target.id)});
    this.removeLoading();
  }

  render()
  {
    let subCatProducts = this.state.products.filter(
      (product) => {
        if (this.state.subcategory === '')
        {
          return product;
        }
        else if (this.state.subcategory === this.state.subcategory)
        {
          return product.subcategorie === this.state.subcategory;
        }
        else
        {
          return null;
        }
      }
    );

    const { current_page, products_per_page } = this.state;
    const indexOfLastProduct = current_page * products_per_page;
    const indexOfFirstProduct = indexOfLastProduct - products_per_page;
    const currentProducts = subCatProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(subCatProducts.length / products_per_page); i++) {
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

    // console.log(this.state.products.filter(product => product.subcategorie))
    
    const productlist_from_category = currentProducts.map((product,i) => (
      <ProductCard
        key={i}
        productId={product.productId}
        naam={product.productnaam}
        prijs={product.prijs}
        inventaris={product.inventaris}
        verzendtijd={product.verzendTijd}
      />
    ));

    const buttons = this.state.products.map((product) => (
        product.subcategorie
    ));
    const uniquebuttons = [...new Set(buttons, 'subcategorie')];
    
    const trueuniquebuttons = uniquebuttons.map((subcatbutton,i) => (
      <button
        key={i}
        className="Subcategory"
        onClick={this.updateSubCategory.bind(this)}
      >
        {subcatbutton}
      </button>
    ))
    
    return (
        <div>
            {this.state.loading
            ?
                <div>
                    <br/> 
                    <Segment placeholder size="massive">
                    <Dimmer active>
                    <Loader size="huge">Loading Products...</Loader>
                    </Dimmer>
                    </Segment>
                </div>
            :
                <div>
                    <div>
                        <br/>
                            <h1> Producten uit de categorie: {this.state.discriminator} </h1>
                        <br/>
                            <div className="Submenu">
                            <button className="Subcategory" onClick={this.removeSubCategory.bind(this)}>
                                Alles uit deze categorie
                            </button>
                            {trueuniquebuttons}
                            </div>
                        <br/>
                    </div>
                    <div>
                        {this.state.loading_sub
                        ?
                            <div>
                                <br/> 
                                <Segment placeholder size="massive">
                                <Dimmer active>
                                <Loader size="huge">Loading Products...</Loader>
                                </Dimmer>
                                </Segment>
                            </div>
                        :
                            <div>
                                <div>
                                    {subCatProducts.length > 20
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
                                </div>
                                <div>
                                <Grid container justify="center">
                                {productlist_from_category}
                                </Grid>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
  }
}

export default Category;