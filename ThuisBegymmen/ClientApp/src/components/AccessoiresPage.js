import React, { Component } from 'react';
import {Divider} from 'semantic-ui-react'
import './Login.css'

class AccessoiresPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    MaakProduct() 
    {
        fetch(`api/Product/MaakAccessoires`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Productnaam: document.getElementById(74).value,
                Productbeschrijving: document.getElementById(75).value,
                Breedte: document.getElementById(76).value,
                Hoogte: document.getElementById(77).value,
                Lengte: document.getElementById(78).value,
                Materiaal: document.getElementById(79).value,
                Merk: document.getElementById(80).value,
                Kleur: document.getElementById(81).value,
                Subcategorie: document.getElementById(82).value,
                Prijs: document.getElementById(83).value,
                Inventaris: document.getElementById(84).value,
                VerzendTijd: document.getElementById(85).value,
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
                <input type="text" className="inputText" placeholder="Productnaam" id="74"></input><br />
                <input type="text" className="inputText" placeholder="Product beschrijving" id="75"></input><br />
                <input type="number" className="inputText" placeholder="Breedte" id="76"></input><br />
                <input type="number" className="inputText" placeholder="Hoogte" id="77"></input><br />
                <input type="number" className="inputText" placeholder="Lengte" id="78"></input><br />
                <input type="text" className="inputText" placeholder="Materiaal" id="79"></input><br />
                <input type="text" className="inputText" placeholder="Merk" id="80"></input><br />
                <input type="text" className="inputText" placeholder="Kleur" id="81"></input><br />
                <input type="text" className="inputText" placeholder="Subcategorie" id="82"></input><br />
                <input type="number" className="inputText" placeholder="Prijs" id="83"></input><br />
                <input type="number" className="inputText" placeholder="Inventaris" id="84"></input><br />
                <input type="number" className="inputText" placeholder="Verzendtijd" id="85"></input><br />
                <button className="inputButton" onClick={this.MaakProduct.bind(this)} disabled={this.state.isValid}>Opslaan</button><br/>
            </div>
        );
    }
}

export default AccessoiresPage;