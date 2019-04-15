import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ProductDetails.css';
import { Card, Divider, Grid } from 'semantic-ui-react';

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

class OrderManagementDetail extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            orderDetail: [],
            order: [],
            account: [],
            loggedIn: false,
            snackbarOpen: false,
            bericht: {}
        };

        fetch(`api/Order/GetOrderDetail?orderId=${this.props.match.params.orderId}`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(orderDetail => this.setState(
                    {
                        orderDetail: orderDetail
                    }
                ))
            }
        })
        .catch(error => console.log(error))
        
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

        fetch(`api/Account/GetAccount`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(account => this.setState(
                    {
                        account: account,
                        loggedIn: true
                    }
                ))
            }
        })
        .catch(error => console.log(error))
    }
    
    wachtrij = [];

    wijzigStatus(status)
    {
        fetch(`api/Order/WijzigStatus`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                orderId: this.state.order.orderId,
                status: status
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Status is aangepast!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }

                    response.json().then(order => this.setState({
                        order: order
                    }))
                    
                    window.location.reload()
                }
                else if(response.status === 204)
                {
                    this.wachtrij.push({
                        message : "Status aanpassen mislukt!",
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

    verwijderOrder()
    {
        fetch(`api/Order/VerwijderOrder`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                orderId: this.state.order.orderId,
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Status is aangepast!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }

                    response.json().then(order => this.setState({
                        order: order
                    }))
                    
                    window.location.reload()
                }
                else if(response.status === 204)
                {
                    this.wachtrij.push({
                        message : "Status aanpassen mislukt!",
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


    render()
    {
        const { classes } = this.props;
        const { bericht } = this.state;
        let component

        if(this.state.loggedIn && this.state.account.isAdmin)
        {
            component =
                <div>
                    <Link to={'/OrderManagement'} exact>
                        <button className="FavButtons">Terug naar Order management</button><br/><br/>
                    </Link>
                    <table className="winkelwagenList">
                        <tbody>
                            <tr>
                                <td>
                                    <h3>Ordernummer</h3>
                                </td>
                                <td>
                                    <h3>Productnaam</h3>
                                </td>
                                <td>
                                    <h3>Hoeveelheid</h3>
                                </td>
                                <td>
                                    <h3>Inventaris</h3>
                                </td>
                                <td>
                                    <h3>Status</h3>
                                </td>
                            </tr>
                            {this.state.orderDetail.map((orderDetail, index) => (
                            <tr>
                                <td>{orderDetail.orderId}</td>
                                <td>{orderDetail.product.productnaam}</td>
                                <td>{orderDetail.hoeveelheid}</td>
                                <td>{orderDetail.product.inventaris}</td>
                                <td>{orderDetail.status}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table><br/><br/>
                    <button className="FavButtons" onClick={() => this.wijzigStatus("Verwerkt")}><h3>Goedkeuren</h3></button>
                    <button className="FavButtons" onClick={() => this.wijzigStatus("Afgewezen")}><h3>Afkeuren</h3></button>
                    <button className="FavButtons" onClick={() => this.wijzigStatus("Verzonden")}><h3>Verzonden</h3></button>
                    <button className="FavButtons" onClick={() => this.wijzigStatus("Afgerond")}><h3>Afgerond</h3></button>
                    <button className="verwijderOrder" onClick={this.verwijderOrder.bind(this)}><h3>Verwijder order</h3></button>
                    <h4 style={{color:'white'}}>Huidige status: {this.state.order.status}</h4><br/><br/>
                </div>
        }
        else if(this.state.loggedIn)
        {
            component =
            <div>
                <Divider></Divider>
                <Grid>
                <table className="winkelwagenList">
                    <tbody>
                        <tr>
                            <td>
                                <h3>Ordernummer</h3>
                            </td>
                            <td>
                                <h3>Productnaam</h3>
                            </td>
                            <td>
                                <h3>Hoeveelheid</h3>
                            </td>
                            <td>
                                <h3>Totaalprijs</h3>
                            </td>
                        </tr>
                        {this.state.orderDetail.map((orderDetail, index) => (
                        <tr>
                            <td>{orderDetail.orderId}</td>
                            <td>{orderDetail.product.productnaam}</td>
                            <td>{orderDetail.hoeveelheid}</td>
                            <td>{orderDetail.hoeveelheid * orderDetail.product.prijs}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </Grid>
                <Divider></Divider>
                <h6 style={{color:'white'}}>Huidige status: {this.state.order.status}</h6>
            </div>
        }
        else
        {
            component = 
            <div>
                <h1>U heeft geen toegang tot deze module</h1>
                <Link to={'/AccountViewLoader'}>
                    <button className="">Keer terug</button>  
                </Link>
            </div>
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
                {component}
            </div>
        );
    }
}

export default withStyles(styles)(OrderManagementDetail);