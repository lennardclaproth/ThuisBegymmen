import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Buttons.css'

class OrderManagement extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            account: []
        };
        fetch(`api/Order/GetOrders`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(orders => this.setState(
                    {
                        orders: orders
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
                        account: account
                    }
                ))
            }
        })
        .catch(error => console.log(error))
    }

    render()
    {   
        let component
        if(this.state.account.isAdmin)
        {
           component =   
           <div>          
                <h1>Order management</h1>
                <table className="winkelwagenList">
                    <tbody>
                        <tr>
                            <td>
                                <h3>Order nummer</h3>
                            </td>
                            <td>
                                <h3>Status</h3>
                            </td>
                            <td>
                                <h3>Order datum</h3>
                            </td>
                            <td>
                                <h3>Bekijk order details</h3>
                            </td>
                        </tr>
                        {this.state.orders.map((order, index) => (
                        <tr>
                            <td>{order.orderId}</td>
                            <td>{order.status}</td>
                            <td>{order.orderDatum}</td>
                            <td><Link to={'/OrderManagementDetail/' + order.orderId}><button className="FavButtons" id={index}><h3>Bekijk details</h3></button></Link></td>
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
        )
    }
}

export default OrderManagement;