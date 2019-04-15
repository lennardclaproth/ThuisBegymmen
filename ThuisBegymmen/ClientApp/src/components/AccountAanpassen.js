import React, { Component } from 'react';
import {Divider} from 'semantic-ui-react';

import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './Login.css'

const styles = theme => ({
    popupStyle: {
        background: '#cede01',
        color: 'black',
        fontWeight: '500'
    },
});

class AccountAanpassen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            straatHuisnr: true,
            postcode: true,
            email: true,
            wachtwoord: true,
            isValid: false,
            account:[],
            snackbarOpen: false,
            bericht: {}
        };
    }

    wachtrij = [];

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
        .catch(error => console.log(error))}

    refreshPage(){window.location.reload();}

    VeranderAccount() 
    {
        fetch(`api/Account/VeranderAccount`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Id: this.state.account.id,
                //Gebruikersnaam: document.querySelector('.Gebruikersnaam').value,
                Wachtwoord: document.querySelector('.Wachtwoord').value,
                Naam: document.querySelector('.Naam').value,
                Tussenvoegsel: document.querySelector('.Tussenvoegsel').value,
                Achternaam: document.querySelector('.Achternaam').value,
                StraatHuisnr: document.querySelector('.StraatHuisnr').value,
                Postcode: document.querySelector('.Postcode').value,
                EmailAdres: document.querySelector('.EmailAdres').value})
               //Telefoonnummer: document.querySelector('.Telefoonnummer').value,
            
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Accountgegevens zijn aangepast!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }
                    response.json().then(account => this.setState({account: account}))
                    this.forceUpdate()
                }
                else if(response.status === 204)
                {
                    this.wachtrij.push({
                        message : "Het is niet gelukt de gegevens te veranderen!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }
                }
            })
    }

    wachtrijVerwerken = () => {
        if (this.wachtrij.length > 0) {
            this.setState({
            bericht: this.wachtrij.shift(),
            snackbarOpen: true,
            });
        }
        };
    
    handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    this.setState({ snackbarOpen: false });
    };

    handleExited = () => {
    this.wachtrijVerwerken();
    };

    validateAddress() {
        if(document.querySelector(".StraatHuisnr").value !== "")
        {
            var regex = /^([1-9][e][\s])*([a-zA-Z]+(([\.][\s])|([\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\s]?[a-zA-Z]+))?$/i;
            this.state.straatHuisnr = regex.test(document.querySelector(".StraatHuisnr").value)
            if(this.state.straatHuisnr === false)
            {
                document.querySelector(".StraatHuisnr").style.borderColor = "red"
            }
            else
            {
                document.querySelector(".StraatHuisnr").style.borderColor = "#cede01"
            }
            this.validateForm()
            this.forceUpdate()
        }  
        else
        {
            this.state.straatHuisnr = true
            console.log("Empty")
            this.validateForm()
            this.forceUpdate()
        }
    }
    validatePostalcode() {
        if(document.querySelector(".Postcode").value !== "")
        {
            var regex = /^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i;
            console.log(regex.test(document.querySelector(".Postcode").value))
            this.state.postcode = regex.test(document.querySelector(".Postcode").value)
            if(this.state.postcode === false)
            {
                document.querySelector(".Postcode").style.borderColor = "red"
            }
            else
            {
                document.querySelector(".Postcode").style.borderColor = "#cede01"
            }
            this.validateForm()
            this.forceUpdate()
        }
        else
        {
            this.state.postcode = true
            console.log("Empty")
            this.validateForm()
            this.forceUpdate()
        }
    }
    validateEmail() {
        if(document.querySelector(".EmailAdres").value !== "")
        {
            var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            console.log(regex.test(document.querySelector(".EmailAdres").value))
            this.state.email = regex.test(document.querySelector(".EmailAdres").value)
            if(this.state.email === false)
            {
                document.querySelector(".EmailAdres").style.borderColor = "red"
            }
            else
            {
                document.querySelector(".EmailAdres").style.borderColor = "#cede01"
            }
            this.forceUpdate()
            this.validateForm()
        }
        else
        {
            this.state.emailAdres = true
            console.log("Empty")
            this.forceUpdate()
            this.validateForm()
            
        }
    }
    validateWachtwoord() {
        if(document.querySelector(".Wachtwoord").value !== "")
        {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            this.state.wachtwoord = regex.test(document.querySelector(".Wachtwoord").value)
            if(this.state.wachtwoord === false)
            {
                document.querySelector(".Wachtwoord").style.borderColor = "red"
            }
            else
            {
                document.querySelector(".Wachtwoord").style.borderColor = "#cede01"
            }
            this.forceUpdate()
            this.validateForm()
        }
        else
        {
            this.state.wachtwoord = true
            console.log("Empty")
            this.forceUpdate()
            this.validateForm()
            
        }
    }

    validateForm() {
        console.log("Invoked")
        if(document.querySelector(".StraatHuisnr").value === "" && document.querySelector(".Postcode").value === "" && document.querySelector(".EmailAdres").value === "" && document.querySelector(".Wachtwoord").value === "")
        {
            console.log("False")
            this.setState({isValid: true})
        }
        else if(this.state.straatHuisnr && this.state.postcode && this.state.email && this.state.wachtwoord)
        {
            console.log("True")
            this.setState({isValid: false})
        }
        else
        {   
            console.log("False")
            this.setState({isValid: true})
        }
    }


    render()
    {   
        const { classes } = this.props;
        const { bericht } = this.state;
        return(
            <div>
                <Snackbar
                    key={bericht.key}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={2500}
                    onClose={this.handleClose}
                    onExited={this.handleExited}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                        className: classes.popupStyle
                    }}
                    message={<span id="message-id" style={{fontSize: 15}}> {bericht.message} </span>}
                    action={[
                    <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={this.handleClose}
                    >
                    <CloseIcon />
                    </IconButton>
                    ]}
                />
                <h3>Klant gegevens</h3>
                <input type="text" className="Naam" placeholder={this.state.account.naam}></input>
                <input type="text" className="Tussenvoegsel" placeholder={this.state.account.tussenvoegsel}></input>
                <input type="text" className="Achternaam" placeholder={this.state.account.achternaam}></input><br/>
                <input type="text" className="StraatHuisnr" id="3" placeholder={this.state.account.straatHuisnr} onChange={this.validateAddress.bind(this)}></input>
                <input type="text" className="Postcode" placeholder={this.state.account.postcode} onChange={this.validatePostalcode.bind(this)}></input><br/>
                <input type="text" className="EmailAdres" placeholder={this.state.account.emailAdres} onChange={this.validateEmail.bind(this)}></input><br/>
                <input type="password" id="1" className="Wachtwoord" placeholder="Nieuw wachtwoord" onChange={this.validateWachtwoord.bind(this)}></input><br/>
                <button className="LoginAccount" onClick={this.VeranderAccount.bind(this)} disabled={this.state.isValid}>Opslaan</button><br/>
            </div>
        );
    }
}

export default withStyles(styles)(AccountAanpassen);

//Wat hier onder staat is voor Lennard
/* <h3>Account gegevens</h3>
                <input type="text" className="Gebruikersnaam" placeholder={this.state.account.gebruikersnaam}></input><br/>
                <input type="password" id="1" className="Wachtwoord" placeholder="Nieuw wachtwoord"></input><br/>
                <input type="password" id="2" className="Wachtwoord" placeholder="Herhaal nieuw wachtwoord"></input><br/>
                <Divider/> */
//<input type="text" className="Telefoonnummer" placeholder={this.state.account.telefoonnummer} ></input><br/>
//  <input type="text" className="StraatHuisnr" placeholder={this.state.account.straatHuisnr} onChange={this.validateAddress.bind(this)}></input>
// {/* <input type="text" className="Postcode" placeholder={this.state.account.postcode} onChange={this.validatePostalcode.bind(this)}></input><br/>
// <input type="text" className="EmailAdres" placeholder={this.state.account.emailAdres} onChange={this.validateEmail.bind(this)}></input><br/> */}