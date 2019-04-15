import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import "./Buttons.css"

class ProducManagementPage extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            account: []
        };

        fetch(`api/Product/GetAllProducts`)
        .then(response =>{
            if(response.status === 200)
            {
                response.json()
                .then(products => this.setState(
                    {
                        products: products
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
                <div style={{color:'white'}}>
                    <Link to={'/ProductToevoegenPage'} exact>
                    <button className="MijnThuisBegymmen"><i className="archive icon"/> Product Toevoegen</button>
                    </Link>
                    <table>
                        <tbody>
                            <tr>
                                <td><h3>ProductId</h3></td>
                                <td><h3>Product naam</h3></td>
                                <td><h3>Product categorie</h3></td>
                                <td><h3>Inventaris</h3></td>
                                <td><h3>Update</h3></td>
                            </tr>
                            {this.state.products.map((product, index) => (
                                <tr>
                                    <td>{product.productId}</td>
                                    <td>{product.productnaam}</td>
                                    <td>{product.discriminator}</td>
                                    <td>{product.inventaris}</td>
                                    <td><Link to={"/ProductUpdatePage/" + product.productId}><button className="Buttons" id={index}><h3>Update</h3></button></Link></td>
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
                    <button className="Buttons">Keer terug</button>  
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

export default ProducManagementPage;