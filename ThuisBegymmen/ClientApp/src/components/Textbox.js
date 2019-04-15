import React, { Component } from 'react';
import './ProductDetails.css';
import { Container, Divider, Grid, Segment } from 'semantic-ui-react';

class Textbox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            productId: {...props},
            products: []
        };
    };

    componentDidMount() {
        this.getItems();
      }
    
      getItems() {
        // console.log(this.state)
        fetch(`api/product/getSingleProduct?id=${this.props.productid}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ products : responseJson })
            })
            .catch((error) => {
                console.error(error);
            })
      }
    

    render() {
        console.log(this.state.products)
        return (
            <div>
            <Container textAlign='center'> 
            <div className = 'textbox'>
                {/* <h1>{this.props.productid}</h1> */}
                <h2>Product: {this.state.products.productnaam}</h2>
                <Divider/>
                <Container textAlign='left'> 
                <h4>{this.state.products.productbeschrijving}</h4>
                <Divider/>
                    <Grid columns={3} relaxed>
                        <Grid.Column>
                        <Segment basic><h6><i className=" euro sign icon"/>Prijs: {this.state.products.prijs} euro</h6></Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment basic><h6><i className="warehouse icon"/>Aantal in voorraad: {this.state.products.inventaris} </h6></Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment basic><h6><i className="truck icon"/>Levertijd: {this.state.products.verzendTijd} dagen</h6></Segment>
                        </Grid.Column>
                    </Grid>
                    <Divider/>
                    <div style={{color: 'white', fontSize: 20}}>
                    <Container textAlign='left'>

                    {this.state.products.discriminator === "FreeWeight"
                    ?
                    <div>
                    Gewicht: {this.state.products.freeweightGewicht} kg <br/>
                    Kleur: {this.state.products.kleur} <br/>
                    Materiaal: {this.state.products.materiaal} <br/>
                    Lengte: {this.state.products.lengte} cm <br/>
                    Breedte: {this.state.products.breedte} cm <br/>
                    Hoogte: {this.state.products.hoogte} cm <br/>
                    </div>
                    :
                    <div></div>
                    }

                    {this.state.products.discriminator === "FixedWeight"
                    ?
                    <div>
                    Maakt gebruik van halterschijven: {this.state.products.gebruiktHalterSchijven === true ? 'Ja' : 'Nee'} <br/>
                    Maximaal belastbaar gewicht: {this.state.products.fixedWeightBelastbaarGewicht} kg <br/>
                    Gewicht: {this.state.products.fixedWeightGewicht} kg <br/>
                    Kleur: {this.state.products.kleur} <br/>
                    Materiaal: {this.state.products.materiaal} <br/>
                    Lengte: {this.state.products.lengte} cm <br/>
                    Breedte: {this.state.products.breedte} cm <br/>
                    Hoogte: {this.state.products.hoogte} cm <br/>
                    </div>
                    :
                    <div></div>
                    }

                    {this.state.products.discriminator === "Bankje"
                    ?
                    <div>
                    Heeft halterhouders: {this.state.products.bankjeHeefHalterHouders === true ? 'Ja' : 'Nee'} <br/>
                    Heeft barcatchers: {this.state.products.bankjeHeeftBarCatchers === true ? 'Ja' : 'Nee'} <br/>
                    Bankje is verstelbaar: {this.state.products.bankjeIsVerstelbaar === true ? 'Ja' : 'Nee'} <br/>
                    Kleur: {this.state.products.kleur} <br/>
                    Materiaal: {this.state.products.materiaal} <br/>
                    Lengte: {this.state.products.lengte} cm <br/>
                    Breedte: {this.state.products.breedte} cm <br/>
                    Hoogte: {this.state.products.hoogte} cm <br/>
                    </div>
                    :
                    <div></div>
                    }

                    {this.state.products.discriminator === "Cardio"
                    ?
                    <div>
                    Weerstand Type: {this.state.products.cardioWeerstandType} <br/>
                    Type lagers: {this.state.products.typeLagers} <br/>
                    Aantal PK in de motor: {this.state.products.motorPk} <br/>
                    Kleur: {this.state.products.kleur} <br/>
                    Materiaal: {this.state.products.materiaal} <br/>
                    Lengte: {this.state.products.lengte} cm <br/>
                    Breedte: {this.state.products.breedte} cm <br/>
                    Hoogte: {this.state.products.hoogte} cm <br/>
                    </div>
                    :
                    <div></div>
                    }

                    {this.state.products.discriminator === "KleinFitness"
                    ?
                    <div>
                    Kleur: {this.state.products.kleur} <br/>
                    Materiaal: {this.state.products.materiaal} <br/>
                    Lengte: {this.state.products.lengte} cm <br/>
                    Breedte: {this.state.products.breedte} cm <br/>
                    Hoogte: {this.state.products.hoogte} cm <br/>
                    </div>
                    :
                    <div></div>
                    }

                    {this.state.products.discriminator === "Accessoires" && this.state.products.subcategorie != "Eiwitten"
                    ?
                    <div>
                    Kleur: {this.state.products.kleur} <br/>
                    Materiaal: {this.state.products.materiaal} <br/>
                    Lengte: {this.state.products.lengte} cm <br/>
                    Breedte: {this.state.products.breedte} cm <br/>
                    Hoogte: {this.state.products.hoogte} cm <br/>
                    </div>
                    :
                    <div></div>
                    }

                    </Container>
                    </div>
                </Container>
                </div>
                </Container>
                </div>
        );
    }
}

 export default Textbox;
