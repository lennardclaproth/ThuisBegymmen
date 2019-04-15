import React, { Component } from 'react';
import Login from './Login'
import AdminPage from './AdminPage'
import AccountPage from './AccountPage'
import {Link} from 'react-router-dom';
import './Login.css'

class AccountViewLoader extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            isAdmin: false
        };
        fetch('api/Account/getAccount')
            .then(response => {
                if(response.status === 200){
                    response.json().then(account => this.setState({
                        loggedIn: true,
                        isAdmin: account.isAdmin
                    }));
                }else if(response.status === 204){
                    this.setState({
                        loggedIn: false,
                        isAdmin: false
                    });
                }
            });
    }
    render()
    {   
        let component
        
        if(this.state.loggedIn === false)
        {
            component = <Login />
        }
        else if(this.state.isAdmin === true)
        { 
            component = <AdminPage />
        }
        else
        {
            component = <AccountPage />
        }

        return(
            <div>
                {component}
            </div>
        )
        
    }
}

export default AccountViewLoader;