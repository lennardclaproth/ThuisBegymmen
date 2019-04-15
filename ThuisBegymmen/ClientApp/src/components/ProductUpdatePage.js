import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import "./Buttons.css"
import "./Login.css"

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

class ProductUpdatePage extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            loggedInAccount: [],
            product: [],
            snackbarOpen: false,
            bericht: {}
        };

        fetch(`api/Account/GetAccount`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(account => this.setState(
                    {
                        loggedInAccount: account
                    }
                ))
            }
        })
        .catch(error => console.log(error))

        fetch(`api/Product/getSingleProduct/?id=${this.props.match.params.id}`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(product => this.setState(
                    {
                        product: product
                    }
                ))
            }
        })
        .catch(error => console.log(error))
    }

    wachtrij = [];

    updateProduct()
    {
        fetch(`api/Product/UpdateProduct`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                ProductId: this.state.product.productId,
                Productnaam: document.querySelector(".Naam").value,
                Inventaris: document.querySelector(".Inventaris").value,
                Prijs: document.querySelector(".Prijs").value
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Product is geupdated!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }
                }
                else if(response.status === 204)
                {
                    this.wachtrij.push({
                        message : "Product updaten mislukt!",
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

    verwijderProduct()
    {
        fetch(`api/Product/VerwijderProduct?_id=${this.state.product.productId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Id: this.state.product.productId,
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Product is Verwijderd!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }
                }
                else if(response.status === 204)
                {
                    this.wachtrij.push({
                        message : "Product verwijderen mislukt!",
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

        if(this.state.productVerwijderd)
        {
            return <Redirect push to={"/ProductManagementPage/"} />;
        }

        if(this.state.loggedInAccount.isAdmin)
        {
            component =
                <div>
                    <Link to ={'/ProductManagementPage'}>
                        <button className="MijnThuisBegymmen"><i className="shopping basket icon"/> Terug naar product management</button>
                    </Link>
                    <br/><br/>
                    <table>
                        <tbody>
                            <tr>
                                <td><h3>Product naam</h3></td>
                                <td><h3>Product prijs</h3></td>
                                <td><h3>Inventaris</h3></td>
                            </tr>
                            <tr>
                                <td><input type="text" className="Naam" placeholder={this.state.product.productnaam}></input></td>
                                <td><input type='number' className="Prijs" placeholder={this.state.product.prijs} min="1"></input></td>
                                <td><input type="number" className="Inventaris" placeholder={this.state.product.inventaris}></input></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="FavButtons" onClick={this.updateProduct.bind(this)}><h3>Update product</h3></button>
                    <button className="FavButtons" onClick={this.verwijderProduct.bind(this)}><h3>Verwijder product</h3></button>
                </div>
        }
        else
        {
            component = 
            <div>
                <h1>U heeft geen toegang tot deze module</h1>
                <Link to={'/AccountViewLoader'}>
                    <button className="FavButtons">Keer terug</button>  
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

export default withStyles(styles)(ProductUpdatePage);