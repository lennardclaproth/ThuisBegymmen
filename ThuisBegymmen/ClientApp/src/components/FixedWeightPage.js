import React, { Component } from 'react';
import {Divider, Checkbox} from 'semantic-ui-react'
import './Login.css'

class FixedWeightPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    MaakProduct() 
    {
        fetch(`api/Product/MaakFixedWeight`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Productnaam: document.getElementById(15).value,
                Productbeschrijving: document.getElementById(16).value,
                Breedte: document.getElementById(17).value,
                Hoogte: document.getElementById(18).value,
                Lengte: document.getElementById(19).value,
                Materiaal: document.getElementById(20).value,
                Merk: document.getElementById(21).value,
                Kleur: document.getElementById(22).value,
                Subcategorie: document.getElementById(23).value,
                Prijs: document.getElementById(24).value,
                Inventaris: document.getElementById(25).value,
                VerzendTijd: document.getElementById(26).value,
                FixedWeightBelastbaarGewicht: document.getElementById(27).value,
                FixedweightGewicht: document.getElementById(28).value,
                GebruiktHalterSchijven: this.checkboxCheck()        
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

    checkboxCheck()
    {
        if(document.getElementById(29).value === "on")
        {
            return true
        }
        else
        {
            return false
        }
    }

    render()
    {   
        return(
            <div> 
                <h3>Product gegevens</h3>
                <input type="text" className="inputText" placeholder="Productnaam" id="15"></input><br />
                <input type="text" className="inputText" placeholder="Product beschrijving" id="16"></input><br />
                <input type="number" className="inputText" placeholder="Breedte" id="17"></input><br />
                <input type="number" className="inputText" placeholder="Hoogte" id="18"></input><br />
                <input type="number" className="inputText" placeholder="Lengte" id="19"></input><br />
                <input type="text" className="inputText" placeholder="Materiaal" id="20"></input><br />
                <input type="text" className="inputText" placeholder="Merk" id="21"></input><br />
                <input type="text" className="inputText" placeholder="Kleur" id="22"></input><br />
                <input type="text" className="inputText" placeholder="Subcategorie" id="23"></input><br />
                <input type="number" className="inputText" placeholder="Prijs" id="24"></input><br />
                <input type="number" className="inputText" placeholder="Inventaris" id="25"></input><br />
                <input type="number" className="inputText" placeholder="Verzendtijd" id="26"></input><br />
                <input type="number" className="inputText" placeholder="Belastbaar gewicht" id="27"></input><br />
                <input type="number" className="inputText" placeholder="Totaal gewicht" id="28"></input><br />
                <h3>Gebruikt halter schijven</h3><input type="checkbox" className="inputText" placeholder="Gebruikt halter schijven" id="29"></input><br />
                <button className="inputButton" onClick={this.MaakProduct.bind(this)} disabled={this.state.isValid}>Opslaan</button><br/>
            </div>
        );
    }
}

export default FixedWeightPage;