import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Divider} from 'semantic-ui-react';
import { Grid } from '@material-ui/core';
import FavorietCard from './FavorietCard';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import './Buttons.css'

class Favoriet extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            favorieten: [],
            images: [],
            loading: false
        };
    };

    componentDidMount()
    {this.getFavorieten();}
        
    getFavorieten(){
        this.setState({loading: true});
        fetch('api/Favorieten/getFavorieten')
        .then(response => {
            if(response.status === 200)
            {
                response.json()
                .then(favorieten => this.setState(
                    {
                        favorieten: favorieten,
                        loading: false
                    },
                ))
            }
            else if(response.status === 204)
            {
                
            }
        })
        .catch(error => console.log(error))
    };


    render()
    {
        console.log(this.state.favorieten)
        const favoritelist = this.state.favorieten.map((favoriet,i) => (
            <FavorietCard
              key={i}
              productId={favoriet.producten.productId}
              naam={favoriet.producten.productnaam}
              prijs={favoriet.producten.prijs}
              inventaris={favoriet.producten.inventaris}
              verzendtijd={favoriet.producten.verzendTijd}
            />
        ));

        return(
            <div>
                <br/>
                <h1>Favorietenlijst</h1> 
                <Link to ={'/AccountViewLoader'}>   <button className="FavButtons"><i className="user icon"/> Terug naar account</button></Link>
                <Link to ={'/Winkelwagen'}>   <button className="FavButtons"><i className="shopping cart icon"/> Naar winkelwagen</button></Link>
                <Divider/>
                
                {this.state.loading
                ?
                    <Segment placeholder size="massive">
                    <Dimmer active>
                    <Loader size="huge">Favorieten Laden...</Loader>
                    </Dimmer>
                    </Segment>
                :
                    <div>
                    {this.state.favorieten.length < 1
                    ?
                        <div>
                        <br/>
                        <h1>De favorietenlijst is nog leeg!</h1>
                        <br/>
                        </div>
                    :
                        <div>
                        <br/><br/><br/>
                        <Grid container justify="center">
                            {favoritelist}
                        </Grid>
                        <br/>
                        <Divider/>
                        <Link to ={'/AccountViewLoader'}>   <button className="FavButtons"><i className="user icon"/> Terug naar account</button></Link>
                        <Link to ={'/Winkelwagen'}>   <button className="FavButtons"><i className="shopping cart icon"/> Naar winkelwagen</button></Link>
                        </div>
                    }
                    </div>
                }
            </div>
        );
        
    }
}

export default Favoriet;