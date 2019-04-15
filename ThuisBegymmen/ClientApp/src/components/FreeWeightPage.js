import './Login.css'
import React, { Component } from 'react';
import {Divider} from 'semantic-ui-react'


class FreeWeightPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    MaakProduct() 
    {
        fetch(`api/Product/MaakFreeWeight`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Productnaam: document.getElementById(1).value,
                Productbeschrijving: document.getElementById(2).value,
                Breedte: document.getElementById(3).value,
                Hoogte: document.getElementById(4).value,
                Lengte: document.getElementById(5).value,
                Materiaal: document.getElementById(6).value,
                Merk: document.getElementById(7).value,
                Kleur: document.getElementById(8).value,
                Subcategorie: document.getElementById(9).value,
                Prijs: document.getElementById(10).value,
                Inventaris: document.getElementById(11).value,
                VerzendTijd: document.getElementById(12).value,
                FreeWeightBelastbaarGewicht: document.getElementById(13).value,
                FreeweightGewicht: document.getElementById(14).value
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                }
                else if(response.status === 204)
                {
                }
                
            })
    }

    render()
    {   
        return(
            <div> 
                <h3>Product gegevens</h3>
                <input type="text" className="inputText" placeholder="Productnaam" id="1"></input><br />
                <input type="text" className="inputText" placeholder="Product beschrijving" id="2"></input><br />
                <input type="number" className="inputText" placeholder="Breedte" id="3"></input><br />
                <input type="number" className="inputText" placeholder="Hoogte" id="4"></input><br />
                <input type="number" className="inputText" placeholder="Lengte" id="5"></input><br />
                <input type="text" className="inputText" placeholder="Materiaal" id="6"></input><br />
                <input type="text" className="inputText" placeholder="Merk" id="7"></input><br />
                <input type="text" className="inputText" placeholder="Kleur" id="8"></input><br />
                <input type="text" className="inputText" placeholder="Subcategorie" id="9"></input><br />
                <input type="number" className="inputText" placeholder="Prijs" id="10"></input><br />
                <input type="number" className="inputText" placeholder="Inventaris" id="11"></input><br />
                <input type="number" className="inputText" placeholder="Verzendtijd" id="12"></input><br />
                <input type="number" className="inputText" placeholder="Belastbaar gewicht" id="13"></input><br />
                <input type="number" className="inputText" placeholder="Totaal gewicht" id="14"></input><br />
                <button className="inputButton" onClick={this.MaakProduct.bind(this)} disabled={this.state.isValid}>Opslaan</button><br/>
            </div>
        );
    }
}

export default FreeWeightPage;