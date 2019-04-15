import React, { Component } from 'react';
import './Footer';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Card, Divider, Grid } from 'semantic-ui-react';




class BezorgenEnAfhalen extends Component{
    
    render(){
        return(
        <div>

            <Card><h3>Bezorgen en Afhalen <i class="shipping fast icon"></i></h3></Card>

             <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Levertijd en bezorgtijden  ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Bestel je voor 23:59 en is het artikel direct leverbaar? 
                Dan heb je het morgen al in huis. In de ochtend, middag of in de avond: net wat het u uitkomt.
                Bestellingen vanaf 300,- bezorgen wij gratis.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bezorgadres kiezen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Als je een bestelling plaats, zie je inde kaasa vaak automatisch je huisadres als je bezorgadres staan. Klik hiervoor op "wijzigen"achter het bezorgadres. Als u het adres verandert, vragen wij u om uw bestellig te betalen met IDEAL.</h5>
                    <h5>Liever zelf ophalen bij een DHL-ophaalpunt? In de kassa vindt u eenboudig een DHL Parcelshop in de buurt met handige openingstjden. 
                    Of u kiest een DHL Parcelstation, waar u altijd terecht kunt. Verder hoef u niet thuis te wachten als u daar geen zin in of geen tijd voor heeft.
                    U ontvangt een sms of e-mail zodra u pakket klaarligt.</h5> 
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>



             <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bezorgafspraak wijzigen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Bezorging door een leverancier:
                        Wilt u een bezorgadres voor overige grote artikelen (zoals fitnessapparaten) wijzigen? Neem dan contact met onze leverancier.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Pakket volgen ></h3></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Wilt u weten waar u pakket is> Klik op bij Bestellingen op de "status bekijken". 
                        U vindt de laatste status van uw pakket(bijvoorbeeld: onderweg).
                        Ook krijgt u de optie om uw pakket te volgen via track en trace.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel> 


            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Waarom bezorgen soms iets langer duurt ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h4>Soms is er een storing. 
                        Zie hieronder de volgende redenen:</h4>
                        <h5>● We kunnen geen bestellingen klaarzetten als we te maken krijgen met een technische storing in ons magazijn.Bezorgen op de volgende dag is niet meer haalbaar.</h5>
                        <h5>● Nieuwe klant:Wanneer je voor het eerst iets bestelt bij ThuisBegymmen kan het iets langer duren voordat wij uw bestellig bezorgen,omdat we eerst u gegevens controleren. </h5>
                        <h5>● Bezorging door leverancier: Grote fitnessapparatuur wordt door onze leverancier geleverd.</h5>
                        <h5>● Als de hoogte van uw limiet niet voldoende is, kunnen we u om een vooruitbetaling vragen. Daardoor kan de bezorging iets langer duren. </h5>                 
                    
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel> 
 



                        <ExpansionPanel>
                <ExpansionPanelSummary expandMoreIcon={<ExpandMoreIcon />}>
                    <Typography><h3>Bezorgen rond de feestdagen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>De feestdagen kunnen van invloed zijn op de te kiezen bezorgdagen en tijdvakken in de kassa. 
                        Ook kan het door enorme drukte voorkomen dat we later bezorgen.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel> 



            

            
        </div>
        );
    }
}


export default BezorgenEnAfhalen;