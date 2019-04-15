import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Card, Divider, Grid } from 'semantic-ui-react';

import './Footer';


class ServiceEnContact extends Component{
    
    render(){
        return(
        <div>
            <Card><h2>Service en Contact<i class="phone icon"></i></h2></Card>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Telefonisch Contact ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Op werkdagen zijn we van 08.30-17.00 bereikbaar, 
                        op de volgende telefoonnummer: 070-3947968.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Email ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Voor vragen per mail kunt u mailen naar: thuisbegymmen@gmail.com</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
        );
    }
}


export default ServiceEnContact;