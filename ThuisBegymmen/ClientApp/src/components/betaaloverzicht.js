import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import "./Login.css";

import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    popupStyle: {
        background: '#cede01',
        color: 'black',
        fontWeight: '500'
    },
  });

class Betaaloverzicht extends Component {
  constructor(props) {
    super(props);
    this.state = {
        order: [],
        betaling: [],
        betalingLoaded: false,
        iban: false,
        snackbarOpen: false,
        bericht: {}
    };
  }

  wachtrij = [];

  componentDidMount()
  {
    fetch(`api/Order/GetSingleOrder?orderId=${this.props.match.params.orderId}`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(order => this.setState(
                    {
                        order: order
                    }
                ))
            }
        })
        .catch(error => console.log(error))
        
      fetch(`api/Betaling/GetSingleBetaling?orderId=${this.props.match.params.orderId}`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(betaling => this.setState(
                    {
                        betaling: betaling
                    }
                ))
            }
        })
        .catch(error => console.log(error))
  }

  verwerkBetaling(status, data)
  {
        fetch(`api/Betaling/UpdateBetalingStatus`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                orderId: this.state.order.orderId,
                Iban: document.getElementById(1).value,
                status: status
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                this.wachtrij.push({
                    message : "Betaling verwerkt! U keert zo terug naar de home pagina.",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }

                response.json()
                .then(betaling => this.setState(
                    {
                        betaling: betaling,
                    }
                ))

                setTimeout( () => {
                    this.setState({
                        betalingLoaded: true
                    })
                }, 2500);

            }

            else if(response.status === 204)
            {
                this.wachtrij.push({
                    message : "Betaling niet verwerkt, neem a.u.b. contact op met de klantenservice!",
                    key: new Date().getTime(),
                });

                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }
            }
        })
        .catch(error => console.log(error))
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

    validateIban()
    {
        var regex = /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/i;
        this.state.iban = regex.test(document.getElementById("1").value)
        if(this.state.iban === false)
        {
                document.getElementById("1").style.borderColor = "red"
        }
        else
        {
                document.getElementById("1").style.borderColor = "#cede01"
        }
        this.forceUpdate()
    }

    validateForm() {
        console.log('Method called')
        if(this.state.iban)
        {
            console.log("True")
            return false
        }
        else
        {
            return true
        }
    }

  render() {
    const { classes } = this.props;
    const { bericht } = this.state;
    let component
    let isValid = this.validateForm()

    if(this.state.betalingLoaded)
    {
      return <Redirect push to={"/"}/>;
    }

    if(true)
    {

      component = 
        <div>          
          <h1>Uw Order</h1>
          <table className="winkelwagenList">
              <tbody>
                  <tr>
                      <td>
                          <h3>Order nummer</h3>
                      </td>
                      <td>
                          <h3>Order status</h3>
                      </td>
                      <td>
                          <h3>Order datum</h3>
                      </td>
                      <td>
                          <h3>Naam</h3>
                      </td>
                      <td>
                          <h3>Achternaam</h3>
                      </td>
                      <td>
                          <h3>Postcode</h3>
                      </td>
                      <td>
                          <h3>Straat en huisnummer</h3>
                      </td>
                      <td>
                          <h3>Totaal bedrag</h3>
                      </td>
                      <td>
                          <h3>Status betaling</h3>
                      </td>
                      
                  </tr>
                  <tr>
                      <td>{this.state.order.orderId}</td>
                      <td>{this.state.order.status}</td>
                      <td>{this.state.order.orderDatum}</td>
                      <td>{this.state.order.naam}</td>
                      <td>{this.state.order.achternaam}</td>
                      <td>{this.state.order.postcode}</td>
                      <td>{this.state.order.straatHuisnr}</td>
                      <td>{this.state.betaling.bedrag}</td>
                      <td>{this.state.betaling.status}</td>
                  </tr>
              </tbody>
          </table><br/>
          <input type="text" className="Gebruikersnaam" placeholder="Iban nummer" id="1" onChange={this.validateIban.bind(this)}></input><br/><br/>
          <h3>Betaal met een overschrijving</h3>
          <button className="Buttons" disabled={isValid} onClick={() => this.verwerkBetaling("Betaling verwerkt")}><h3>Betalen</h3></button>

        </div>
    }
    else
    {
    }

    return (
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
        {component}
      </div>
    );
  }
}
export default withStyles(styles)(Betaaloverzicht);
