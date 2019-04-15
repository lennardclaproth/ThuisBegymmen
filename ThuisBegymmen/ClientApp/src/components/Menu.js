import React from 'react'
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

import './Menu.css'
import Homeimg from './img/HomeIcon.png';
import Winkelwagenimg from './img/WinkelwagenIcon.png';
import Loginimg from './img/LoginIcon.png';


class Menu extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            winkelwagen:[]
        };
    };

    componentDidMount()
    {
        fetch('api/Winkelwagen/getWinkelwagen')
        .then(response => {
            if(response.status === 200)
            {
                response.json()
                .then(winkelwagen => this.setState(
                    {
                        winkelwagen: winkelwagen
                    },
                ))
            }
            else if(response.status === 204)
            {
            }
        })
        .catch(error => console.log(error))
    }


    render()
    {
        // WINKELWAGEN ITEM COUNTER LABEL:
        // const items_winkelwagen = this.state.winkelwagen.map((item) => (item.hoeveelheid));
        // console.log(items_winkelwagen)
        // function add(a,b){return a+b;}
        // var totaal_items_winkelwagen = items_winkelwagen.reduce(add,0);
        // console.log(totaal_items_winkelwagen)
        // if (totaal_items_winkelwagen == 0)
        // {
        //     var winkelwagen_label = []
        // }
        // else
        // {
        //     var winkelwagen_label =
        //     <Label color='red'>{totaal_items_winkelwagen}</Label>
        // }

        return(
            
        <div>
            <Link to={'/AccountViewLoader'}>
                <button className="buttons">
                  <img src={Loginimg} alt = "Login" width="25px" height="25px"/>
                  <p className="buttons_description"> Uw account </p>
                </button>  
            </Link>               
            <Link to={'/Winkelwagen'}>
                <button className="buttons" >
                  <img src={Winkelwagenimg} alt = "Winkelwagen" width="25px" height="25px"/>
                  <p className="buttons_description"> Winkelwagen </p>
                </button>
            </Link>

                    <Link to={'/'} exact="true">
                    <button className="buttons">
                    <img src={Homeimg} alt = "Home" width="25px" height="25px"/>
                    <p className="buttons_description"> Home </p>
                    </button>
                </Link>
            </div>
        );
    }
}

export default Menu;