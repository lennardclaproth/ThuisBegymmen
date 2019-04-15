import React, { Component } from 'react';
import {BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Text} from 'recharts';
import "./Buttons.css"
import Login from './Login';

export default class Statistieken extends Component
{
    constructor(){
        super();
        this.state = {
            data: [],
            volgorde: null,
            ordersByMonth: null
        };
    }

    getStatisticsData()
    {
        fetch(`api/Statistieken/getOrders?ascending_or_descending=${this.state.volgorde}`)
        .then(response => {
            if(response.status === 200)
            {
                response.json()
                .then(data => this.setState(
                    {
                        data: data
                    },
                ))
            }
        })
        .catch(error => console.log(error))
    };
    
    getStatisticsByMonth()
    {
        fetch('api/Statistieken/getOrdersByMonth')
        .then(response => {
            if(response.status === 200)
            {
                response.json()
                .then(ordersByMonth => this.setState(
                    {
                        ordersByMonth: ordersByMonth
                    },
                ))
            }
        })
        .catch(error => console.log(error))
    };

    volgordeAscending()
    {
        this.setState({volgorde: 'ascending'})
        if(this.state.volgorde = 'ascending')
        {
            this.getStatisticsData()
        }
    }

    volgordeDescending()
    {
        this.setState({volgorde: 'descending'})
        if(this.state.volgorde = 'descending')
        {
            this.getStatisticsData()
        }
    }

    testTekst()
    {
        return "test";
    }

    
    render()
    {
        console.log(this.state.data)
        console.log(this.state.volgorde)
        console.log(this.state.ordersByMonth)

        // // Van alle productId groepen de hoeveelheid eruit filteren
        // const producten_hoeveelheid_per_productId = 
        // this.state.data.map(products => (
        //     products.map(function(product) {
        //         return (
        //             product.hoeveelheid
        //         )
        //     })
        // ));
        // console.log(producten_hoeveelheid_per_productId)


        // // Optellen hoeveelheid producten per productId
        // function add(a,b){return a+b;}
        // const opgetelde_producten_per_productId = 
        // producten_hoeveelheid_per_productId.map(products => (
        //     products.reduce(add,0)
        // ))
        // console.log(opgetelde_producten_per_productId)


        // // Een array van een array van productIds outputten per productId categoriegroep
        // const producten_ids_per_productid = this.state.data.map(products => (
        //     products.map(function(product) {
        //         return (
        //             product.productId
        //         )
        //     })
        // ))
        
        
        // // Array maken met unieke productId waarden
        // const unique_product_ids = producten_ids_per_productid.map(productids => (
        //     productids.reduce(function(productid) {
        //         return (
        //             productid
        //         )
        //     }
        // )))
        // console.log(unique_product_ids)

        
        // const grafiekdata = 
        // unique_product_ids.map(id => (
        //     {productid: id}
        // ))

        // const grafiekdata2 =
        // opgetelde_producten_per_productId.map(hoeveelheid => (
        //     {hoeveelheid: hoeveelheid}
        // ))


        // console.log(grafiekdata)
        // console.log(grafiekdata2)

        // var chart_data = {
        //     labels: [unique_product_ids[0]],
        //     datasets: [{
        //         label: 'product_amount',
        //         data: [opgetelde_producten_per_productId[0]]
        //     }]
        // }


        return (
            <div>
                <br/>
                    <div style={{float: 'left'}}>
                    <button className="Buttons" onClick={this.volgordeAscending.bind(this)}>
                    Sorteer Producten slechtst verkocht
                    </button>
                    <button className="Buttons" onClick={this.volgordeDescending.bind(this)}>
                    Sorteer Producten best verkocht
                    </button>
                    <BarChart width={600} height={300} data={this.state.data}
                                margin={{top: 10, right: 30, left: 80, bottom: 20}}>
                    <CartesianGrid strokeDasharray="2 2"/>
                    <XAxis stroke="#5a5a5a" dataKey="product.productnaam">
                        <Label value="Producten" offset={0} position="bottom" fill='#ffffff'/>
                    </XAxis>
                    <YAxis stroke="#ffffff">
                        <Label value="Hoeveelheid" offset={-10} position="left" fill="#ffffff"/>
                    </YAxis>
                    <Tooltip/>
                    <Bar dataKey="hoeveelheid" fill="#cede01" />
                    </BarChart>
                    </div>
                
                    <div style={{overflow: 'auto'}}>
                    <button className="FavButtons" onClick={this.getStatisticsByMonth.bind(this)}>
                    Laat het aantal orders per maand zien
                    </button>       
                    <LineChart width={600} height={300} data={this.state.ordersByMonth} margin={{top: 10, right: 30, left: 80, bottom: 20}}>
                    <XAxis stroke="#ffffff" dataKey="month">
                        <Label value={"Months"} offset={0} position="bottom" fill='#ffffff'/>
                    </XAxis>
                    <YAxis stroke="#ffffff" label={{ value: 'Amount of Orders', angle: -90, position: 'insideLeft', fill: '#ffffff' }}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="aantalOrders" stroke="#cede01" />
                    </LineChart>
                    </div>
            </div>
        )
    }
}