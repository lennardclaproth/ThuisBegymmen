import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Winkelwagen.css';

import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    popupStyle: {
        background: 'orange',
        color: 'black',
        fontWeight: '500'
    },
  });

class Winkelwagen extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            winkelwagen: [],
            totaalprijs: "Uw winkelwagen is nog leeg!",
            snackbarOpen: false,
            bericht: {}
        };
    };

    wachtrij = [];

    componentDidMount()
    {
        fetch('api/Winkelwagen/getWinkelwagen')
        .then(response => {
            console.log(response.status)
            if(response.status === 200)
            {
                response.json()
                .then(winkelwagen => this.setState(
                    {
                        winkelwagen: winkelwagen
                    },
                ))
            }
            else if(response.status === 204)
            {
                this.wachtrij.push({
                    message : "Uw winkelwagen is nog leeg!",
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

        fetch('api/Winkelwagen/getTotaalPrijs')
        .then(response => {
            if(response.status === 200)
            {
                response.text()
                .then(prijs => this.setState(
                    {
                        totaalprijs: "\u20ac" + prijs
                    }
                ))
            }
            if(response.status === 204)
            {
            }
        })
        .catch(error => console.log(error))
    }

    updateTotaalPrijs()
    {
        fetch('api/Winkelwagen/getTotaalPrijs')
        .then(response => {
            if(response.status === 200)
            {
                response.text()
                .then(prijs => this.setState(
                    {
                        totaalprijs: "\u20ac" + prijs
                    }
                ))
            }
            else if(response.status === 204)
            {
                this.setState({totaalprijs: "Uw winkelwagen is nog leeg!"})
            }
        })
        .catch(error => console.log(error))
    }

    verwijderProduct(productId)
    {
        fetch(`api/Winkelwagen/verwijderProduct`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                ProductId: productId
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                response.json()
                .then(winkelwagen => this.setState(
                    {
                        winkelwagen: winkelwagen,
                        totaalprijs: this.updateTotaalPrijs()
                    }
                ))
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

  render() {
    const { classes } = this.props;
    const { bericht } = this.state;
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
        <h1>Winkelwagen</h1>
        <table className="winkelwagenList">
          <tbody>
            <tr>
              <td>
                <h3>Naam</h3>
              </td>
              <td>
                <h3>Hoeveelheid</h3>
              </td>
              <td>
                <h3>Prijs per product</h3>
              </td>
              <td>
                <h3>Prijs totaal</h3>
              </td>
              <td>
                <h3>Levertijd in dagen</h3>
              </td>
              <td>
                <h3>Verwijder</h3>
              </td>
            </tr>
            {this.state.winkelwagen.map((orderDetail, index) => (
              <tr key={index}>
                <td>
                  <h3 key={index}>{orderDetail.product.productnaam}</h3>
                </td>
                <td>
                  <h3 key={index}>{orderDetail.hoeveelheid}</h3>
                </td>
                <td>
                  <h3 key={index}>&euro;{orderDetail.product.prijs}</h3>
                </td>
                <td>
                  <h3 key={index}>
                    &euro;{orderDetail.hoeveelheid * orderDetail.product.prijs}
                  </h3>
                </td>
                <td>
                  <h3 key={index}>{orderDetail.product.verzendTijd}</h3>
                </td>
                <td>
                  <button className="VerwijderProduct" onClick={() => this.verwijderProduct(orderDetail.productId)}><h3>-</h3></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h1>Totaal prijs: {this.state.totaalprijs}</h1>

        <Link to={"/VerwerkOrderGebruiker"}>
          <button className="NietGeregistreerdeGebruiker">
            Doorgaan zonder te registreren
          </button>
          <br />
        </Link>

        <Link to={"/VerwerkOrderAccount"}>
          <button className="NietGeregistreerdeGebruiker">
            Doorgaan met uw account
          </button>
          <br />
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Winkelwagen);