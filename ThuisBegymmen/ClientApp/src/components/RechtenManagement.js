import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import './Buttons.css';

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

class OrderManagementDetail extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            loggedInAccount: [],
            account: [],
            accountVerwijderd: false,
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

        fetch(`api/Account/GetSingleAccount/?_accountId=${this.props.match.params.id}`)
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
        .catch(error => console.log(error))
    }

    wachtrij = [];

    updateAccount(id)
    {
        console.log("invoked")
        switch(id)
        {
            case 1:
                if(this.state.account.isAdmin)
                {
                    this.state.account.isAdmin = false
                }
                else
                {
                    this.state.account.isAdmin = true
                }
                break;
            // case 2:
            //     if(this.state.account.rechten)
            //     {
            //         this.state.account.rechten = false
            //     }
            //     else
            //     {
            //         this.state.account.rechten = true
            //     }
            //     break;
            // case 3:
            //     if(this.state.account.verwijderAccount)
            //     {
            //         this.state.account.verwijderAccount = false
            //     }
            //     else
            //     {
            //         this.state.account.verwijderAccount = true
            //     }
            //     break;
            // case 4:
            //     if(this.state.account.verwijderProduct)
            //     {
            //         this.state.account.verwijderProduct = false
            //     }
            //     else
            //     {
            //         this.state.account.verwijderProduct = true
            //     }
            //     break;
            // case 5:
            //     if(this.state.account.toevoegenProduct)
            //     {
            //         this.state.account.toevoegenProduct = false
            //     }
            //     else
            //     {
            //         this.state.account.toevoegenProduct = true
            //     }
            //     break;
            // case 6:
            //     if(this.state.account.verwijderCategorie)
            //     {
            //         this.state.account.verwijderCategorie = false
            //     }
            //     else
            //     {
            //         this.state.account.verwijderCategorie = true
            //     }
            //     break;
            // case 7:
            //     if(this.state.account.toevoegenCategorie)
            //     {
            //         this.state.account.toevoegenCategorie = false
            //     }
            //     else
            //     {
            //         this.state.account.toevoegenCategorie = true
            //     }
        }
    }

    wijzigAccount()
    {
        fetch(`api/Account/UpdateRechten`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Id: this.state.account.id,
                isAdmin: this.state.account.isAdmin,
                toevoegenCategorie: this.state.account.toevoegenCategorie,
                verwijderCategorie: this.state.account.verwijderCategorie,
                toevoegenProduct: this.state.account.toevoegenProduct,
                verwijderProduct: this.state.account.verwijderProduct,
                verwijderAccount: this.state.account.verwijderAccount,
                rechten: this.state.account.rechten
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Accountgegevens zijn gewijzigd!",
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
                        message : "Aanpassen gegevens is mislukt!",
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
    verwijderAccount()
    {
        fetch(`api/Account/VerwijderAccount`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Id: this.state.account.id,
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.wachtrij.push({
                        message : "Account verwijderd!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }

                    this.setState({accountVerwijderd: true})
                }
                else if(response.status === 204)
                {
                    this.wachtrij.push({
                        message : "Account verwijderen mislukt!",
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
        let component
        const { classes } = this.props;
        const { bericht } = this.state;

        if(this.state.accountVerwijderd)
        {
            return <Redirect push to={"/AccountManagementPage/"} />;
        }

        if(this.state.loggedInAccount.isAdmin)
        {
            component =
                <div>
                    <Link to ={'/AccountManagementPage'}>
                        <button className="MijnThuisBegymmen"><i className="user icon"/> Terug naar account management</button>
                    </Link>
                    <br/><br/>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{color: 'white'}}>
                                    Admin rechten
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.isAdmin} onClick={() => this.updateAccount(1)}></input>
                                </td>
                            </tr>
                            {/* <tr>
                                <td style={{color: 'white'}}>
                                    Rechten toevoegen/verwijderen
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.rechten} onClick={() => this.updateAccount(2)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td style={{color: 'white'}}>
                                    Accounts Verwijderen
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.verwijderAccount} onClick={() => this.updateAccount(3)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td style={{color: 'white'}}>
                                    Producten verwijderen
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.verwijderProduct} onClick={() => this.updateAccount(4)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td style={{color: 'white'}}>
                                    Producten/aanpassen toevoegen
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.toevoegenProduct} onClick={() => this.updateAccount(5)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td style={{color: 'white'}}>
                                    Categorien verwijderen
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.verwijderCategorie} onClick={() => this.updateAccount(6)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td style={{color: 'white'}}>
                                    Categorien toevoegen
                                </td>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.account.toevoegenCategorie} onClick={() => this.updateAccount(7)}></input>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                    <button className="FavButtons" onClick={this.wijzigAccount.bind(this)}><h3>Account aanpassen</h3></button>
                    <button className="FavButtons" onClick={this.verwijderAccount.bind(this)}><h3>Account Verwijderen</h3></button>
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