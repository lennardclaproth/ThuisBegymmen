import React, { Component } from 'react';
import { Card,Image, Reveal, Container, Segment, Rail, Divider,TableRow } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import './Buttons.css';


class AankoopGeschiedenis extends Component
{   

    


    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loggedIn: false,
            account: []
        };
        fetch('api/Account/getAccount')
            .then(response => {
                if(response.status === 200){
                    response.json().then(account => this.setState({
                        account: account,
                        loggedIn: true
                    }));
                }else if(response.status === 204){
                    this.setState({
                        loggedIn: false
                    });
                }
            })
        fetch(`api/Order/GetOrdersFromAccount`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(orders => this.setState(
                    {
                        orders: orders
                    }
                ))
            }else if (response.status === 204){
                
            }
        })
        console.table(this.state)
        console.log(this.state.orders)

    }




    render()
    {
        let component

        if(this.state.loggedIn)
        {
            component =  
            <div>
                
                <Divider></Divider>
                
                <h1>Aankoop Geschiedenis</h1>

                <Divider></Divider>

                <table className="winkelwagenList">
                    <tbody>
                        <tr>
                            <td>
                                <h3>Ordernummer</h3>
                            </td>
                            <td>
                                <h3>Status</h3>
                            </td>
                            <td>
                                <h3>Orderdatum</h3>
                            </td>
                            <td>
                                <h3>AccountId</h3>
                            </td>
                            <td>
                                <h3>Achternaam</h3>
                            </td>
                            <td> <h3>Order detail</h3></td>

                           
                            
                            


                        </tr>
                        {this.state.orders.map((Orders) => (
                        <tr>
                            <td>{Orders.orderId}</td>
                            <td>{Orders.status}</td>
                            <td>{Orders.orderDatum}</td>
                            <td>{Orders.accountId}</td>
                            <td>{this.state.account.achternaam}</td>
                            <td><Link to = {'/OrderManagementDetail/' + Orders.orderId}><button className = "Buttons">Bekijk Details</button></Link></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        }
        else{
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

export default AankoopGeschiedenis;