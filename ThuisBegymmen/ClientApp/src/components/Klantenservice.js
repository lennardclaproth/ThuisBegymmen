import React, { Component } from 'react';
import './Footer';
import { Card, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';



class Klantenservice extends Component{
    render(){
        return(
        <div>
        <Divider></Divider>
        <h1>Klantenservice</h1>
        <Grid columns={3}>
            <tr>
            <td>
            <Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Contact</h3><i class="phone icon"></i>
            <Divider></Divider>
            <Link to = {'/ServiceEnContact/'}> 
            <table><button className="ServiceEnContact">Email</button></table>
            <table><button className="ServiceEnContact">Telefoon</button></table></Link>
            </Card.Content>
            </Card></td>
           </tr>
            <tr>
            <cell><td><Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Zelf doen</h3><i class="address book icon"></i>
            <Divider></Divider>
            <Link to = {'/Login'}>
            <table><button className="MijnThuisBegymmen">Mijn ThuisBegymmen</button></table>
            <table><button className="MijnThuisBegymmen">Gegevens wijzigen?</button></table>
            <table><button className="MijnThuisBegymmen">Een klachtmelden?</button></table></Link>
            </Card.Content>
            </Card></td></cell>
            </tr>

            <tr>
            <cell><td><Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Bestellen</h3><i class="shopping cart icon"></i>
            <Divider></Divider>
            <Link to = {'/Bestellen'}>
            <table><button className = "Bestellen">Bestelling plaatsen</button></table>
            <table><button className = "Bestellen">Bestelling volgen</button></table>
            <table><button className = "Bestellen">Bestelling annuleren</button></table>
            <table><button className = "Bestellen">Bestelling niet gelukt</button></table>
            <table><button className = "Bestellen">Bestelling niet ontvangen</button></table>
            <table><button className = "Bestellen">Bezorgkosten</button></table>
            <table><button className = "Bestellen">Veilig winkelen</button></table></Link>
            </Card.Content>
            </Card></td></cell>
            </tr>

            <tr>
            <Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Retourneren</h3><i class="exchange alternate icon"></i>
            <Divider></Divider>
            <Link to ={'/Retourneren/'}>
            <table><button className="Retourneren">Retourvoorwaarden</button></table>
            <table><button className="Retourneren">Artikel(en) ruilen</button></table>
            <table><button className="Retourneren">Terugstorting bij retour</button></table></Link>
            </Card.Content>
            </Card>
            </tr>

            <tr>
            <Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Reparatie en Garantie</h3><i class="recycle icon"></i>
            <Divider></Divider>
            <Link to ={'/GarantieEnReparatie/'}>
            <table><button className="GarantieEnReparatie">Garantievorwaarden</button></table>
            <table><button className="GarantieEnReparatie">Reparatieduur</button></table></Link>
            
            <Link to ={'/Login/'}>
            <table><button className="GarantieEnReparatie">Klacht over je artikel melden</button></table></Link>
            </Card.Content>
            </Card>
            </tr>


            <tr>
            <Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Service bij bezorging</h3><i class="shipping fast icon"></i>
            <Divider></Divider>
            <Link to = {'/BezorgenEnAfhalen/'}>
            <table><button className="BezorgenEnAfhalen">Bezorging grote artikelen</button></table></Link>
            </Card.Content>
            </Card>
            </tr>

            <tr>
            <Card style ={{margin: 15}}>
            <Card.Content style = {{margin: 15}}>
            <h3>Betalen</h3><i class="paypal icon"></i>
            <Divider></Divider>
            <Link to={'/Betaalwijze/'}>
            <table><button className="Betaalwijze">Betaalwijze</button></table>
            <table><button className="Betaalwijze">Betaling niet verwerkt</button></table>
            <table><button className="Betaalwijze">Kortingscodes</button></table>            
            <table><button className="Betaalwijze">Cadeaubon</button></table></Link>

            </Card.Content>
            </Card>
            </tr>
    </Grid>
    </div>
        );
    }
}


export default Klantenservice;