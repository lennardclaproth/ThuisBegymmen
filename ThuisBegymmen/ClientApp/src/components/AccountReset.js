import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css'

class AccountReset extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            session: 'empty',
            login: 'Log hier in.',
            loginError: ''
        };
    }

    resetAccount() 
    {
        this.setState({loginError: 'Loading'})

        fetch(`api/Account/ResetPassword?EmailAdres=${document.getElementById(1).value}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                this.setState({loginError: 'Uw wachtwoord is gereset, er is een mail verstuurd met de gegevens van het account'})
            }
            else
            {
                this.setState({loginError: 'Dit email adres is niet gekoppeld aan een account.'})
            }
        })
    }

    refreshPage()
    {
        window.location.reload();
    }

    render()
    {           

        if(this.state.loginError === 'Loading' || this.state.loginError === 'Het account is gereset.')
        {
            document.getElementById("loginError").style.color = "white"
        }
        else if(this.state.loginError === 'Dit email adres bestaat niet.')
        {
            document.getElementById("loginError").style.color = "red"
        }

        return(
            <div>
                <h1>Account Resetten</h1>
                <input type="text" className="EmailAdres" placeholder="Email adres" id="1"></input><br/>
                <button className="CreateAccount" onClick={this.resetAccount.bind(this)}>Reset Account</button><br/>
                <h3 id="loginError">{this.state.loginError}</h3>
            </div>
        );
    }
}

export default AccountReset;