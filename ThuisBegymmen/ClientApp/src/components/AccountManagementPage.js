import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './ProductDetails.css';
import './Buttons.css';

class AccountManagementPage extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            isAdmin: false
        };

        fetch(`api/Account/GetAccount`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(account => this.setState(
                    {
                        isAdmin: account.isAdmin
                    }
                ))
            }
        })
        .catch(error => console.log(error))
        
        fetch(`api/Account/GetAllAccounts`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(accounts => this.setState(
                    {
                        accounts: accounts
                    }
                ))
            }
        })
        .catch(error => console.log(error))
    }

    render()
    {
        let component

        if(this.state.isAdmin)
        {
            component =
                <div style={{color:'white'}}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h3>Gebruikersnaam</h3>
                                </td>
                                <td>
                                    <h3>Naam</h3>
                                </td>
                                <td>
                                    <h3>Tussenvoegsel</h3>
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
                                    <h3>Admin</h3>
                                </td>
                            </tr>
                            {this.state.accounts.map((account, index) => (
                            <tr>
                                <td>{account.gebruikersnaam}</td>
                                <td>{account.naam}</td>
                                <td>{account.tussenvoegsel}</td>
                                <td>{account.achternaam}</td>
                                <td>{account.postcode}</td>
                                <td>{account.straatHuisnr}</td>
                                <td>{account.isAdmin.toString()}</td>
                                <td><Link to={'/RechtenManagement/' + account.id}><button className="Buttons" id={index}><h3>Rechten aanpassen</h3></button></Link></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
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
                {component}
            </div>
        );
    }
}

export default AccountManagementPage;