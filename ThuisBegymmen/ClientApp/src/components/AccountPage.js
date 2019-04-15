import React, { Component } from 'react';
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import './Login.css'
import AccountAanpassen from './AccountAanpassen';
import {Link} from 'react-router-dom';


class AccountPage extends Component
{
    //Random Comment
    constructor(props) {
        super(props);
        this.state = {
            account: []
        };
    }

    componentWillMount() {
        this.getAccount();
      }

    getAccount(){
        fetch(`api/Account/GetAccount`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(account => this.setState(
                    {
                        account: account
                    }
                ))
            }
        })
        .catch(error => console.log(error))
    }

    logOut()
    {
        fetch(`api/Account/LogOut`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: this.state.account.id
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.refreshPage()
                }
                else if(response.status === 204)
                {
                    alert("Uitloggen mislukt")
                }
            })
    }

    refreshPage()
    {
        window.location.reload();
    }

    render()
    {   console.log(this.state.account)
        return(
            <div>
                <br/><h1>Hallo, {this.state.account.naam}!</h1> <br/>

            <ExpansionPanel style={{backgroundColor: "transparent"}}>    <ExpansionPanelSummary>
            <button className="MijnThuisBegymmen"><i className="user icon"/> Gegevens veranderen</button>
                </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <AccountAanpassen/>              
                    </ExpansionPanelDetails>
            </ExpansionPanel>

           
            <Link to = {'/AankoopGeschiedenis'}>
            <br/>   <button className="MijnThuisBegymmen"><i className="archive icon"/> Aankoop geschiedenis</button></Link>
            <br/>   <Link to ={'/Favorieten'}>   <button className="MijnThuisBegymmen"><i className="heart icon"/> Favorieten bekijken</button></Link>

            <br/><br/><br/><br/>  
                <button className="MijnThuisBegymmen" onClick={this.logOut.bind(this)}><i className="sign out icon"/> Uitloggen</button><br/>  
                </div>
        ) 
    }
}

export default AccountPage;