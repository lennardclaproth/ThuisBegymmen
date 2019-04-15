import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css'

class AdminPage extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            account: []
        };
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
        .catch(error => console.log(error))
    }

    logOut()
    {
        fetch(`api/Account/LogOut`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                id: this.state.account.id
            })
        })
        .then(response =>
            {
                if(response.status === 200)
                {
                    this.refreshPage()
                }
                else if(response.status === 204)
                {
                    alert("Uitloggen mislukt")
                }
            })
    }

    refreshPage()
    {
        window.location.reload();
    }

    render()
    {   
        return(
            <div>
            <h1>Hallo, {this.state.account.naam}!</h1> 
            <br/><br/>
            <Link to ={'/AccountManagementPage'}>
            <button className="MijnThuisBegymmen"><i className="user icon"/> Account management</button>
            </Link>
            <Link to ={'/ProductManagementPage'}>
            <button className="MijnThuisBegymmen"><i className="shopping basket icon"/> Product management</button>
            </Link>
            <Link to ={'/Statistieken/'}>
            <button className="MijnThuisBegymmen"><i className="chart line icon"/> Bekijk statistieken</button>
            </Link>
            <Link to={'/OrderManagement'} exact>
            <button className="MijnThuisBegymmen"><i className="archive icon"/> Order management</button>
            </Link>
            <br/><br/><br/>
                <button className="MijnThuisBegymmen" onClick={this.logOut.bind(this)}><i className="sign out icon"/> Uitloggen</button><br/>
            </div>
        )
        
    }
}

export default AdminPage;