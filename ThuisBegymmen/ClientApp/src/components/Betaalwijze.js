import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import './Footer';
import { Card, Divider, Grid } from 'semantic-ui-react';

//useless comment


class Betaalwijze extends Component{
    
    render(){
        return(
        <div>
            <Card><h3>Betaalmogelijkheden bij ThuisBegymmen <i class="paypal icon"></i></h3></Card>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>PayPal ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Bij ThuisBegymmen kun je altijd met PayPal betalen: 
                        deze betaalmogelijkheid vind je in de kassa en op Mijn ThuisBegymmen. </h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Cadeaubon ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Bij ThuisBegymmen is het mogelijk om met vvv-bonnen te betalen en deze kunnen gedeeltelijk besteedt worden.
                        De vvv-bonnen zijn onbeperkt geldig. Voor meer informatie kunt u contact opnemen met de klantenservice.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
        );
    }
}


export default Betaalwijze;