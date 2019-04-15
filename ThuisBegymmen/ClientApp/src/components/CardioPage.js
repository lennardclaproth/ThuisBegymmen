import React, { Component } from 'react';
import {Divider} from 'semantic-ui-react'
import './Login.css'

class CardioPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    MaakProduct() 
    {
        fetch(`api/Product/MaakCardio`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Productnaam: document.getElementById(31).value,
                Productbeschrijving: document.getElementById(32).value,
                Breedte: document.getElementById(33).value,
                Hoogte: document.getElementById(34).value,
                Lengte: document.getElementById(35).value,
                Materiaal: document.getElementById(36).value,
                Merk: document.getElementById(37).value,
                Kleur: document.getElementById(38).value,
                Subcategorie: document.getElementById(39).value,
                Prijs: document.getElementById(40).value,
                Inventaris: document.getElementById(41).value,
                VerzendTijd: document.getElementById(42).value,
                CardioWeerstandType: document.getElementById(43).value,
                MotorPk: document.getElementById(46).value,
                TypeLagers: document.getElementById(47).value,
                OnderhoudsVrij: this.checkboxCheckOV(),
                HeeftScherm: this.checkboxCheckHS(),
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
    
    checkboxCheckOV()
    {
        if(document.getElementById(44).value === "on")
        {
            return true
        }
        else
        {
            return false
        }
    }

    checkboxCheckHS()
    {
        if(document.getElementById(45).value === "on")
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
                <input type="text" className="inputText" placeholder="Productnaam" id="31"></input><br />
                <input type="text" className="inputText" placeholder="Product beschrijving" id="32"></input><br />
                <input type="number" className="inputText" placeholder="Breedte" id="33"></input><br />
                <input type="number" className="inputText" placeholder="Hoogte" id="34"></input><br />
                <input type="number" className="inputText" placeholder="Lengte" id="35"></input><br />
                <input type="text" className="inputText" placeholder="Materiaal" id="36"></input><br />
                <input type="text" className="inputText" placeholder="Merk" id="37"></input><br />
                <input type="text" className="inputText" placeholder="Kleur" id="38"></input><br />
                <input type="text" className="inputText" placeholder="Subcategorie" id="39"></input><br />
                <input type="number" className="inputText" placeholder="Prijs" id="40"></input><br />
                <input type="number" className="inputText" placeholder="Inventaris" id="41"></input><br />
                <input type="number" className="inputText" placeholder="Verzendtijd" id="42"></input><br />
                <input type="number" className="inputText" placeholder="Weerstandstype" id="43"></input><br />
                <h3>Onderhouds vrij</h3><input type="checkbox" className="inputText" id="44"></input><br />
                <h3>Heeft een scherm</h3><input type="checkbox" className="inputText" id="45"></input><br />
                <input type="number" className="inputText" placeholder="Motor Pk" id="46"></input><br />
                <input type="text" className="inputText" placeholder="Type lagers" id="47"></input><br />
                <button className="inputButton" onClick={this.MaakProduct.bind(this)}>Opslaan</button><br/>
            </div>
        );
    }
}

export default CardioPage;