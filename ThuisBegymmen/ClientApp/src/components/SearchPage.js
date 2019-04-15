import React, { Component } from 'react';
import { Card, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { Loader, Dimmer, Segment } from 'semantic-ui-react';

import ProductCard from './ProductCard';

class SearchPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...props,
            searchresult: [],
            loading: false,
            current_page: 1,
            products_per_page: 20
        }
    }

    componentWillMount()
    {
        this.searchHandler()
    }

    //request database
    searchHandler(){ 
        //? zoek in dit doc alle elementen met "search" en neem daarvan de waarde die erin staan
            this.setState({loading: true})
            fetch(`api/Searchbar/GetProduct?productNaam=${this.state.history.location.state.passed_search_value}`)
                .then(response => {
                    if(response.status === 200){
                        //dmv de json de product opvragen
                        response.json().then(product => this.setState({
                            //product result terug krijgen
                            searchresult: product,
                            loading: false
                        }));
                        //error handeling
                    }else if(response.status === 204){
                    }
                });
    }

    removeLoading(){
        setTimeout( () => {
          this.setState({loading: false})
        }, 10); // 10 = 10 milliseconden
    }

    updatePage(event) {
        this.setState({loading: true});
        this.setState({current_page: Number(event.target.id)});
        this.removeLoading();
    }

    render()
    {
        const { current_page, products_per_page } = this.state;
        const indexOfLastProduct = current_page * products_per_page;
        const indexOfFirstProduct = indexOfLastProduct - products_per_page;
        const currentProducts = this.state.searchresult.slice(indexOfFirstProduct, indexOfLastProduct);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.searchresult.length / products_per_page); i++) {
        pageNumbers.push(i);
        }

        let productresult = currentProducts.map((searchresult,i) => (
            <ProductCard
              key={i}
              productId={searchresult.productId}
              naam={searchresult.productnaam}
              prijs={searchresult.prijs}
              inventaris={searchresult.inventaris}
              verzendtijd={searchresult.verzendTijd}
            />
            ));
        
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

        return(
            <div>
                {this.state.loading
                    ? 
                        <Segment placeholder size="massive">
                        <Dimmer active>
                        <Loader size="huge">Searching Products...</Loader>
                        </Dimmer>
                        </Segment>
                    :
                        <div>
                            {this.state.searchresult.length === 0
                            ?
                                <div>
                                <h1>Zoekopdracht heeft geen resultaten opgeleverd!</h1>
                                <br/>
                                <br/>
                                </div>
                            :
                                <div className="result">
                                    <br/>
                                    <h1>Gevonden producten: {this.state.searchresult.length}</h1>
                                    <br/>

                                    {this.state.searchresult.length > 20
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

                                    <Grid container justify="center">
                                        {productresult}
                                    </Grid>
                                </div>
                            }
                        </div>
                }
            </div>
        );
    }
}


export default SearchPage;