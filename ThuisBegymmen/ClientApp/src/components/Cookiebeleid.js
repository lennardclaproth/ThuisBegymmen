import React, { Component } from 'react';
import './Footer';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import { Card, Divider, Grid } from 'semantic-ui-react';


class Cookiebeleid extends Component{
    render(){
        return(
        <div>

            <Card><h2>Cookiebeleid <i class="save outline icon"></i></h2></Card>

            
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Cookieverklaring ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5> Dit is de cookieverklaring van ThuisBegymmen (Kamer van Koophandel-nummer 1234567).
                        Deze verklaring gaat over het plaatsen en uitlezen van cookies en vergelijkbare technieken zoals webbeacons, 
                        tracking pixels, fingerprint devices, mechanismen voor onze app en Javascripts (hierna gezamenlijk: cookies).</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3> Cookiebeleid ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>          
                        <h3>Wat zijn cookies, waarom zijn ze nodig?</h3>

                        <h5>Cookies zijn onder andere nodig om onze shop goed te laten werken en gebruiksvriendelijker te maken voor jou. 
                            Het werkt zo: je computer, smartphone of tablet slaat bestandjes op wanneer je onze website en/of app gebruikt. 
                            Een voordeel hiervan is dat we je kunnen herkennen en ervoor kunnen zorgen dat je niet steeds opnieuw je gegevens hoeft in te vullen. 
                            Wil je geen cookies? Je kunt altijd je instellingen aanpassen of zelf cookies verwijderen. 
                            Als je cookies uitschakelt kun je bepaalde functies van onze site niet meer gebruiken en werkt de website mogelijk minder goed.</h5>
                                
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography> <h3>Wel of geen toestemming geven ></h3>     </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <h5> Voor het plaatsen en uitlezen van bepaalde cookies hoeven we je toestemming niet te vragen. 
                    Dit geldt voor cookies die nodig zijn voor de communicatie via internet, cookies die alleen gebruikt worden om onze diensten te kunnen leveren of analytische cookies die geen of minimaal invloed hebben op je privacy. 
                    Voor overige cookies vragen wij je toestemming voordat we deze plaatsen en uitlezen. Dit doen we via de cookiebanner in onze shop. Daarin staat dat je cookies accepteert door verder te klikken in onze shop. 
                    Wil je dit niet? Dan kun je ervoor kiezen om naar een andere website of app te gaan met vergelijkbare inhoud. Voor het taggen van specifieke content van onze shop gebruiken we Google Tag Manager. 
                    Dit helpt ons om vast te stellen welke cookies we mogen plaatsen en welke content we mogen bewaren. Want zoals we hierboven al uitlegden, moeten we voor sommige cookies wel je toestemming vragen en voor sommige cookies niet. 
                    Bij het gebruik van Google Tag Manager houden wij ons aan de richtlijnen van Autoriteit Consument en Markt</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

 


        </div>
        );
    }
}

export default Cookiebeleid;