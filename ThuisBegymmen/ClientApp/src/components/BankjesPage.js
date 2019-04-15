import React, { Component } from 'react';
import {Divider} from 'semantic-ui-react'
import './Login.css'

class BankjesPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    MaakProduct() 
    {
        fetch(`api/Product/MaakBankjes`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Productnaam: document.getElementById(47).value,
                Productbeschrijving: document.getElementById(48).value,
                Breedte: document.getElementById(49).value,
                Hoogte: document.getElementById(50).value,
                Lengte: document.getElementById(51).value,
                Materiaal: document.getElementById(52).value,
                Merk: document.getElementById(53).value,
                Kleur: document.getElementById(54).value,
                Subcategorie: document.getElementById(55).value,
                Prijs: document.getElementById(56).value,
                Inventaris: document.getElementById(57).value,
                VerzendTijd: document.getElementById(58).value,
                BankjeIsVerstelbaar: this.checkboxCheckBV(),
                BankjeHeeftBarCatchers: this.checkboxCheckBHBC(),
                BankjeHeeftHalterHouders: this.checkboxCheckBHHH()
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

    checkboxCheckBV()
    {
        if(document.getElementById(59).value === "on")
        {
            return true
        }
        else
        {
            return false
        }
    }

    checkboxCheckBHBC()
    {
        if(document.getElementById(60).value === "on")
        {
            return true
        }
        else
        {
            return false
        }
    }
    checkboxCheckBHHH()
    {
        if(document.getElementById(61).value === "on")
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
                <input type="text" className="inputText" placeholder="Productnaam" id="47"></input><br />
                <input type="text" className="inputText" placeholder="Product beschrijving" id="48"></input><br />
                <input type="number" className="inputText" placeholder="Breedte" id="49"></input><br />
                <input type="number" className="inputText" placeholder="Hoogte" id="50"></input><br />
                <input type="number" className="inputText" placeholder="Lengte" id="51"></input><br />
                <input type="text" className="inputText" placeholder="Materiaal" id="52"></input><br />
                <input type="text" className="inputText" placeholder="Merk" id="53"></input><br />
                <input type="text" className="inputText" placeholder="Kleur" id="54"></input><br />
                <input type="text" className="inputText" placeholder="Subcategorie" id="55"></input><br />
                <input type="number" className="inputText" placeholder="Prijs" id="56"></input><br />
                <input type="number" className="inputText" placeholder="Inventaris" id="57"></input><br />
                <input type="number" className="inputText" placeholder="Verzendtijd" id="58"></input><br />
                <h3>Is verstelbaar</h3><input type="checkbox" className="inputText" id="59"></input><br />
                <h3>Heeft halterstang vangers</h3><input type="checkbox" className="inputText" id="60"></input><br />
                <h3>Heeft halter houders</h3><input type="checkbox" className="inputText" id="61"></input><br />
                <button className="inputButton" onClick={this.MaakProduct.bind(this)} disabled={this.state.isValid}>Opslaan</button><br/>
            </div>
        );
    }
}

export default BankjesPage;