import React from 'react'
import "./Searchbar.css"
import { Grid } from '@material-ui/core';
import ProductCard from './ProductCard';
import SearchPage from './SearchPage';
import Home from './Home';
import { Link } from 'react-router-dom'


class Searchbar extends React.Component
{   
    constructor(props){
        super(props);
        this.state = {
            // searchresult: [],
            // searshed: false,
            search_value: []
        }
        
    }
      
    // //request database
    // searchHandler(){ 
    // //? zoek in dit doc alle elementen met "search" en neem daarvan de waarde die erin staan
        
    //     fetch(`api/Searchbar/GetProduct?productNaam=${document.querySelector('.Searchbar').value}`)
    //         .then(response => {
    //             if(response.status === 200){
    //                 //dmv de json de product opvragen
    //                 response.json().then(product => this.setState({
    //                     //product result terug krijgen
    //                     searchresult: product,
    //                     searched: true
    //                 }));
    //                 //error handeling
    //             }else if(response.status === 204){
    //             }
    //         });
    //         console.log(this.state.searchresult)
    // }

    updateSearchValue(event) {
        this.setState({search_value: event.target.value});
      }
    
    refreshPage()
    {
        setTimeout( () => {
        window.location.reload();
        }, 1); // milliseconden
        
    }

    render()
    //gezochte product weergeven mbv Productdetails en met this.state.searchresult gekoppeld.
    {   

        return(
            //bind this = alles gebruiken wat er in de state staat
            <div>
                <div className="SearchbarDiv">
                <input type='text'
                onChange={this.updateSearchValue.bind(this)}
                value={this.setState(this.search_value)}
                className="Searchbar"></input>
                <Link to={{pathname: '/SearchPage/', state: { passed_search_value: this.state.search_value}}}>
                    <button className="SearchButton" onClick={this.refreshPage.bind(this)}> Zoek </button></Link>
                </div>
                <br/><br/>
            </div>
        );

        
    }
}

export default Searchbar;