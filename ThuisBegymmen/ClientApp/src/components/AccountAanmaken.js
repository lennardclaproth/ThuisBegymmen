import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
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

class AccountAanmaken extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            straatHuisnr: false,
            postcode: false,
            email: false,
            mobielNummer: true,
            gebruikersNaam: false,
            wachtwoordReg: false,
            wachtwoordHer: false,
            snackbarOpen: false,
            bericht: {}
        }
    };
    
    wachtrij = [];

    MaakAccount() 
    {
        fetch(`api/Account/MaakAccount`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Gebruikersnaam: document.querySelector('.Gebruikersnaam').value,
                Wachtwoord: document.querySelector('.Wachtwoord').value,
                Naam: document.querySelector('.Naam').value,
                Tussenvoegsel: document.querySelector('.Tussenvoegsel').value,
                Achternaam: document.querySelector('.Achternaam').value,
                StraatHuisnr: document.querySelector('.StraatHuisnr').value,
                Postcode: document.querySelector('.Postcode').value,
                EmailAdres: document.querySelector('.EmailAdres').value,
                Telefoonnummer: document.querySelector('.Telefoonnummer').value,
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                // this.wachtrij.push({
                //     message : "Gelukt!",
                //     key: new Date().getTime(),
                // });
                // if (this.state.snackbarOpen) {
                //     this.setState({ snackbarOpen: false });
                // } else {
                //     this.wachtrijVerwerken();
                // }
                // return <Redirect push to={"/ProductManagementPage/"} />
            }
            else if(response.status === 204)
            {
                this.wachtrij.push({
                    message : "Aanmaken account mislukt!",
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
    

    validateAddress() {
        var regex = /^([1-9][e][\s])*([a-zA-Z]+(([\.][\s])|([\s]))?)+[1-9][0-9]*(([-][1-9][0-9]*)|([\s]?[a-zA-Z]+))?$/i;
        console.log(regex.test(document.querySelector(".StraatHuisnr").value))
        this.state.straatHuisnr = regex.test(document.querySelector(".StraatHuisnr").value)
        if(this.state.straatHuisnr === false)
        {
            document.querySelector(".StraatHuisnr").style.borderColor = "red"
        }
        else
        {
            document.querySelector(".StraatHuisnr").style.borderColor = "#cede01"
        }
        this.forceUpdate()
    }
    validatePostalcode() {
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
        this.forceUpdate()
    }
    validateEmail() {
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
    }
    validateNummer(){
        if(document.querySelector(".Telefoonnummer").value !== "")
        {
            var regex = /^(((\\+31|0|0031)6){1}[1-9]{1}[0-9]{7})$/i;
            this.state.mobielNummer = regex.test(document.querySelector(".Telefoonnummer").value)
            if(this.state.mobielNummer === false)
            {
                document.querySelector(".Telefoonnummer").style.borderColor = "red"
            }
            else
            {
                document.querySelector(".Telefoonnummer").style.borderColor = "#cede01"
            }
            this.forceUpdate()
        }  
        else
        {
            this.state.mobielNummer = true
            console.log("Empty")
            document.querySelector(".Telefoonnummer").style.borderColor = "#cede01"
            this.forceUpdate()
        }
    }
    validateGebruikersnaam()
    {
        if(document.querySelector(".Gebruikersnaam").value !== "")
        {
            this.state.gebruikersNaam = true
            this.forceUpdate()
        }  
        else
        {
            this.state.gebruikersNaam = false
            this.forceUpdate()
        }
    }
    validateWachtwoord()
    {
        if(document.getElementById("1").value !== "")
        {
            var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            this.state.wachtwoordReg = regex.test(document.getElementById("1").value)
            if(this.state.wachtwoordReg === false)
            {
                document.getElementById("1").style.borderColor = "red"
                document.querySelector(".WachtwoordText").style.color = "red"
            }
            else
            {
                document.getElementById("1").style.borderColor = "#cede01"
                document.querySelector(".WachtwoordText").style.color = "#cede01"

                if(document.getElementById("2").value === document.getElementById("1").value)
                {
                    document.getElementById("2").style.borderColor = "#cede01"
                    this.state.wachtwoordHer = true
                }
                else
                {
                    document.getElementById("2").style.borderColor = "red"
                    this.state.wachtwoordHer = false
                }
            }
        }  
        else
        {
            this.state.gebruikersNaam = false
            this.forceUpdate()
        }
        this.forceUpdate()
    }

    validateForm() {
        console.log('Method called')
        if(this.state.straatHuisnr && this.state.postcode && this.state.email && this.state.mobielNummer && (this.state.wachtwoordHer && this.state.wachtwoordReg) && this.state.gebruikersNaam)
        {
            console.log("True")
            return false
        }
        else
        {
            return true
        }
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


    render()
    {   
        let isValid = this.validateForm()
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

                <h1>Account aanmaken</h1>
                <input type="text" className="Gebruikersnaam" placeholder="Gebruikersnaam" onChange={this.validateGebruikersnaam.bind(this)}></input><br/>
                <input type="password" id="1" className="Wachtwoord" placeholder="Wachtwoord" onChange={this.validateWachtwoord.bind(this)}></input><br/>
                <input type="password" id="2" className="Wachtwoord" placeholder="Herhaal wachtwoord" onChange={this.validateWachtwoord.bind(this)}></input><br/>
                <h4 className="WachtwoordText">Minimaal 1 cijfer, minimaal 1 hoofdletter en minimaal 8 characters</h4>
                <input type="text" className="Naam" placeholder="Naam"></input>
                <input type="text" className="Tussenvoegsel" placeholder="Tussenvoegsel"></input>
                <input type="text" className="Achternaam" placeholder="Achternaam"></input><br/>
                <input type="text" className="StraatHuisnr" placeholder="Straat en huisnummer" onChange={this.validateAddress.bind(this)}></input>
                <input type="text" className="Postcode" placeholder="Postcode" onChange={this.validatePostalcode.bind(this)}></input><br/>
                <input type="text" className="EmailAdres" placeholder="E-mail adres" onChange={this.validateEmail.bind(this)}></input><br/>
                <input type="text" className="Telefoonnummer" placeholder="Mobiel nummer"onChange={this.validateNummer.bind(this)} ></input><br/>
                <Link to={'/AccountViewLoader'}>
                    <button className="LoginAccount" disabled={isValid} onClick={this.MaakAccount}>Account aanmaken</button>
                </Link>
                <br/>
            </div>
        );
    }
}

export default withStyles(styles)(AccountAanmaken);