import React, { Component } from 'react';
import Login from './Login'
import { Redirect } from 'react-router';
import './Login.css'
import { Divider } from 'semantic-ui-react';

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

class AccountViewLoader extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            account: [],
            order: [],
            orderLoaded: false,
            snackbarOpen: false,
            bericht: {}
        };

        fetch('api/Account/getAccount')
            .then(response => {
                if(response.status === 200){
                    response.json().then(account => this.setState({
                        loggedIn: true,
                        account: account
                    }));
                }else if(response.status === 204){
                    this.setState({
                        loggedIn: false,
                        isAdmin: false
                    });
                }
            });
    }

    wachtrij = [];

    verwerkOrder()
    {
        fetch(`api/Order/verwerkOrder`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Id: this.state.account.id
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                this.wachtrij.push({
                    message : "Order verwerkt! U wordt nu verwezen naar de betaalpagina.",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }

                response.json()
                .then(order => this.setState(
                    {
                        order: order
                    }
                ))

                setTimeout( () => {
                    this.setState({
                        orderLoaded: true
                    })
                }, 2500);
            }
            else if(response.status === 204)
            {
                this.wachtrij.push({
                    message : "Order is niet verwerkt, order is leeg!",
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

    render()
    {   
        const { classes } = this.props;
        const { bericht } = this.state;
        let component
        
        if(this.state.orderLoaded)
        {
          return <Redirect push to={"/Betaaloverzicht/" + this.state.order.orderId} />;
        }

        if(this.state.loggedIn === false)
        {
            component = <Login />
        }
        else
        {
            component = <div>
                            <Divider></Divider>
                            <h1>Uw Gegevens</h1>
                            <h3>{this.state.account.naam} {this.state.account.tussenvoegsel} {this.state.account.achternaam}</h3>
                            <h3>{this.state.account.straatHuisnr}, {this.state.account.postcode}</h3>
                            <h3>{this.state.account.emailAdres}</h3>
                            <button className="GebruikUser" onClick={this.verwerkOrder.bind(this)}>Verwerk Order</button><br/>
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
        )
        
    }
}

export default withStyles(styles)(AccountViewLoader);