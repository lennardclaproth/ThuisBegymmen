import React, { Component } from 'react';
import './Footer';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';



import { Card, Divider, Grid } from 'semantic-ui-react';






class Retourneren extends Component{
   
    
    

    render(){
        return(
        <div>
           

            <Card><h3>Retourneren  <i class="exchange alternate icon"></i></h3></Card>


            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h4>Retourneren ></h4> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5> U kunt binnen 14 dagen na factuurdatum de gekochte spullen omruilen of retourneren.
                        De gekochte spullen kunt binnen volgens de retour procedures terugsturen.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>









        </div>
        );
    }
}


export default Retourneren;