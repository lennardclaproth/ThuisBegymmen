import React, { Component } from 'react';
import {Divider} from 'semantic-ui-react'
import './Login.css'

class KleinFitnessPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    MaakProduct() 
    {
        fetch(`api/Product/MaakKleinFitness`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Productnaam: document.getElementById(62).value,
                Productbeschrijving: document.getElementById(63).value,
                Breedte: document.getElementById(64).value,
                Hoogte: document.getElementById(65).value,
                Lengte: document.getElementById(66).value,
                Materiaal: document.getElementById(67).value,
                Merk: document.getElementById(68).value,
                Kleur: document.getElementById(69).value,
                Subcategorie: document.getElementById(70).value,
                Prijs: document.getElementById(71).value,
                Inventaris: document.getElementById(72).value,
                VerzendTijd: document.getElementById(73).value,
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
                <input type="text" className="inputText" placeholder="Productnaam" id="62"></input><br />
                <input type="text" className="inputText" placeholder="Product beschrijving" id="63"></input><br />
                <input type="number" className="inputText" placeholder="Breedte" id="64"></input><br />
                <input type="number" className="inputText" placeholder="Hoogte" id="65"></input><br />
                <input type="number" className="inputText" placeholder="Lengte" id="66"></input><br />
                <input type="text" className="inputText" placeholder="Materiaal" id="67"></input><br />
                <input type="text" className="inputText" placeholder="Merk" id="68"></input><br />
                <input type="text" className="inputText" placeholder="Kleur" id="69"></input><br />
                <input type="text" className="inputText" placeholder="Subcategorie" id="70"></input><br />
                <input type="number" className="inputText" placeholder="Prijs" id="71"></input><br />
                <input type="number" className="inputText" placeholder="Inventaris" id="72"></input><br />
                <input type="number" className="inputText" placeholder="Verzendtijd" id="73"></input><br />
                <button className="inputButton" onClick={this.MaakProduct.bind(this)} disabled={this.state.isValid}>Opslaan</button><br/>
            </div>
        );
    }
}

export default KleinFitnessPage;