import React, { Component } from "react";
import { Redirect } from 'react-router';
import "./VerwerkOrderGebruiker.css";

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

var winkelwagen = [];
class VerwerkOrderGebruiker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winkelwagen: winkelwagen,
      straatHuisnr: false,
      postcode: false,
      email: false,
      order: [],
      orderLoaded: false,
      servererror: false,
      snackbarOpen: false,
      bericht: {}
    };
  }

  wachtrij = [];

  async verwerkOrder() {
    fetch(`api/Order/VerwerkOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        Naam: document.querySelector(".Naam").value,
        Achternaam: document.querySelector(".Achternaam").value,
        StraatHuisnr: document.querySelector(".StraatHuisnr").value,
        Postcode: document.querySelector(".Postcode").value,
        EmailAdres: document.querySelector(".EmailAdres").value
      })
    })
      .then(response => {
        if (response.status === 200) {
          this.wachtrij.push({
                message : "Order verwerkt! U wordt nu doorverwezen naar de betaalpagina.",
                key: new Date().getTime(),
            });
            
            if (this.state.snackbarOpen) {
                this.setState({ snackbarOpen: false });
            } else {
                this.wachtrijVerwerken();
          }

          response.json().then(order =>
            this.setState({
              order: order
            })
          );

          setTimeout( () => {
            this.setState({
                orderLoaded: true
            })
          }, 2500);

        } else if (response.status === 204) {
            this.wachtrij.push({
              message : "Order niet verwerkt! Order is nog leeg!",
              key: new Date().getTime(),
          });
          
          if (this.state.snackbarOpen) {
              this.setState({ snackbarOpen: false });
          } else {
              this.wachtrijVerwerken();
          }
        }

        else if (response.status === 500) {
          this.wachtrij.push({
            message : "Ongeldige actie, order is al verwerkt! U keert nu terug naar de homepagina",
            key: new Date().getTime(),
          });
        
          if (this.state.snackbarOpen) {
              this.setState({ snackbarOpen: false });
          } else {
              this.wachtrijVerwerken();
          }

          setTimeout( () => {
            this.setState({
              servererror: true
          })
          }, 3500);

        }

      })
      .catch(error => console.log(error));
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

    validateForm() {
        console.log('Method called')
        if(this.state.straatHuisnr && this.state.postcode && this.state.email)
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
        const { classes } = this.props;
        const { bericht } = this.state;
        console.log(this.state)
        let isValid = this.validateForm()

        if(this.state.servererror)
        {
          return <Redirect push to={"/"} />;
        }

        if(this.state.orderLoaded)
        {
          return <Redirect push to={"/Betaaloverzicht/" + this.state.order.orderId} />;
        }
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
                <h1>Verwerk Order</h1>
                <input type="text" className="Naam" placeholder="Naam"></input>
                <input type="text" className="Achternaam" placeholder="Achternaam"></input><br/>
                <input type="text" className="StraatHuisnr" placeholder="Straat en huisnummer" onChange={this.validateAddress.bind(this)}></input>
                <input type="text" className="Postcode" placeholder="Postcode" onChange={this.validatePostalcode.bind(this)}></input><br/>
                <input type="text" className="EmailAdres" placeholder="Email adres" onChange={this.validateEmail.bind(this)}></input><br/>
                <button className="GebruikUser" disabled={isValid} onClick={this.verwerkOrder.bind(this)}>Verwerk Order</button><br/>
            </div>
        );
    }
  }

export default withStyles(styles)(VerwerkOrderGebruiker);
