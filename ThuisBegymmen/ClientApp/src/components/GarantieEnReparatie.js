import React, { Component } from 'react';
import './Footer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Card, Divider, Grid } from 'semantic-ui-react';



class GarantieEnReparatie extends Component{
    render(){
        return(
        <div>
            
            <Card><h2>Garantie en Reparatie  <i class="recycle icon"></i></h2> </Card>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Garantievoorwaarden ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <Typography>
                    <h5>Op de gekochte fitnessapparatuur heeft u twee jaar garantie.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Reparatieduur ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Zodra je artikel bij de geautoriseerde reparateur is aangekomen, 
                        duurt het maximaal 15 werkdagen voordat we je gerepareerde artikel terugsturen.</h5>
                    <h5>Als niet alle onderdelen op voorraad zijn, de reparatie niet meer onder de garantie valt of we het artikel niet meer kunnen repareren, 
                        krijg je binnen 15 werkdagen bericht van ons over een passende oplossing.</h5>
 
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Klacht over je artikel melden ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Is je artikel niet in orde? Dit willen we natuurlijk goed voor je oplossen (via Mijn Thuisbegymmen).
                    Ook als je artikel kapot bezorgd is is of al binnen de zichttermijn van 14 dagen stuk is gegaan.
                    </h5>
                    <h5>En dan?
                        Nadat je een klacht hebt gemeld over je artikel ontvang je van ons een bevestiging. 
                        In deze e-mail vind je meer informatie over de oplossing van je klacht.</h5>
                    <h5>Wettelijke garantie
                        Op alle artikelen die je bij ons koopt, geldt de wettelijke garantie. 
                        Dit betekent dat een artikel bij bezorging in goede staat moet zijn en bij normaal gebruik goed moet functioneren. 
                        Als je artikel niet goed functioneert binnen de garantie en je klacht gegrond is, dan zoeken we zo snel mogelijk een passende oplossing. 
                        Denk aan een reparatie, een nieuw artikel of je geld terug.</h5>
 
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
        );
    }
}


export default GarantieEnReparatie;