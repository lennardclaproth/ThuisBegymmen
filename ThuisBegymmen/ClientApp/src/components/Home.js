import React, { Component } from 'react';
import ProductList from './ProductList';
import Searchbar from './Searchbar';
import Footer from './Footer';

class Home extends Component
{
    render()
    {
        return(
            <div>
                <br/>
                <h1>Home</h1>
                <ProductList></ProductList>
                
            </div>
        );
    }
}

export default Home;