import React, { Component } from 'react';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import './Login.css'
import FreeWeightPage from './FreeWeightPage';
import FixedWeightPage from './FixedWeightPage';
import CardioPage from './CardioPage';
import BankjesPage from './BankjesPage';
import KleinFitnessPage from './KleinFitnessPage';
import AccessoiresPage from './AccessoiresPage';

class ProductToevoegenPage extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            loggedInAccount: [],
            product: []
        };

        fetch(`api/Account/GetAccount`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(account => this.setState(
                    {
                        loggedInAccount: account
                    }
                ))
            }
        })
        .catch(error => console.log(error))
    }

    render()
    {
        return(
            <div>
                <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
                <button className="MijnThuisBegymmen"><i className="archive icon"/> Nieuw product: Free weight</button>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FreeWeightPage/>              
                        </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
                <button className="MijnThuisBegymmen"><i className="archive icon"/> Nieuw product: Fixed weight</button>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <FixedWeightPage/>              
                        </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
                <button className="MijnThuisBegymmen"><i className="archive icon"/> Nieuw product: Cardio</button>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <CardioPage/>              
                        </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
                <button className="MijnThuisBegymmen"><i className="archive icon"/> Nieuw product: Bankjes</button>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <BankjesPage/>              
                        </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
                <button className="MijnThuisBegymmen"><i className="archive icon"/> Nieuw product: Klein fitness</button>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <KleinFitnessPage/>              
                        </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
                <button className="MijnThuisBegymmen"><i className="archive icon"/> Nieuw product: Accessoires</button>
                    </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <AccessoiresPage/>              
                        </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default ProductToevoegenPage;