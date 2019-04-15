import React, { Component } from 'react';
import './Footer';


import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Card, Divider, Grid } from 'semantic-ui-react';


class WerkenBijThuisBegymmen extends Component{
    
    render(){
        return(
        <div>

            <Card><h2>Werken bij ThuisBegymmen <i class="handshake icon"></i> </h2></Card>
            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Werken bij ThuisBegymmen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Voor meer info kunt u ons één e-mail sturen naar thuisbegymmen@gmail.com</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <h1></h1>
            <h2></h2>
        </div>
        );
    }
}


export default WerkenBijThuisBegymmen;