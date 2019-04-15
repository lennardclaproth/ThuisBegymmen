import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css'

class Login extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            session: 'empty',
            login: 'Log hier in.',
            loginError: ''
        };
    }

    login() 
    {
        this.setState({loginError: 'Loading'})

        fetch(`api/Account/login?_gebruikersnaam=${document.querySelector('.Gebruikersnaam').value}&_wachtwoord=${document.querySelector('.Wachtwoord').value}`)
        .then(response => {
            if (response.status === 200) {
                response.json().then(account => this.setState({
                    login: "Welkom: " + account.naam,
                    session: "Session: " + account.naam,
                })).then(this.refreshPage);
            }else if(response.status === 204) {
                this.setState({loginError: 'De gebruikersnaam die u heeft ingevuld is onjuist of nog niet aangemaakt.'})
            }
            else if(response.status === 206){
                this.setState({loginError: 'Het wachtwoord wat u heeft ingevuld is onjuist.'})
            }
        });
    }

    refreshPage()
    {
        window.location.reload();
    }

    render()
    {           

        if(this.state.loginError === 'Loading')
        {
            document.getElementById("loginError").style.color = "white"
        }
        else if(this.state.loginError === 'De gebruikersnaam die u heeft ingevuld is onjuist of nog niet aangemaakt.' || this.state.loginError === 'Het wachtwoord wat u heeft ingevuld is onjuist.')
        {
            document.getElementById("loginError").style.color = "red"
        }

        return(
            <div>
                <h1>Login</h1>
                <input type="text" className="Gebruikersnaam" placeholder="Gebruikersnaam"></input><br/>
                <input type="password" className="Wachtwoord" placeholder="Wachtwoord"></input><br/>
                <button className="LoginAccount" onClick={this.login.bind(this)}>Inloggen</button><br/>
                <Link to={"/AccountAanmaken"}>
                <button className="CreateAccount" onClick={this.init}>Maak een account aan</button><br/>
                </Link>
                <Link to={"/AccountReset"}>
                <button className="CreateAccount" onClick={this.init}>Reset Account</button>
                </Link>
                <h3 id="loginError">{this.state.loginError}</h3>
            </div>
        );
    }
}

export default Login;