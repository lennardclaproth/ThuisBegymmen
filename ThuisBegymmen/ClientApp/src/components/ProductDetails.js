import React, { Component } from 'react';
import { Card, Container, Grid, Segment, Rail, Divider } from 'semantic-ui-react';

import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './ProductDetails.css';
import Textbox from './Textbox';
import ProductImage from './ProductImage';

const styles = theme => ({
    popupStyle: {
        background: '#cede01',
        color: 'black',
        fontWeight: '500',
        snackbarOpen: false,
        bericht: {}
    },
  });

class ProductDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            snackbarOpen: false,
            bericht: {}
        }
    };

    wachtrij = [];

    toevoegenProduct()
    {
        fetch(`api/Winkelwagen/addProductToWinkelwagen`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Hoeveelheid: document.querySelector('.hoeveelheid').value,
                ProductId: this.props.match.params.productid
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                this.wachtrij.push({
                    message : "Het product is toegevoegd aan de winkelwagen!",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }

                response.json()
                .then(winkelwagen => this.setState(
                    {
                        winkelwagen: winkelwagen,
                    }
                ))
            }
            else if(response.status === 204)
            {
                this.wachtrij.push({
                    message : "De hoeveelheid is aangepast!",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }
            }
        })
        .catch(error => console.log(error))
        
    };

    toevoegenFavoriet()
    {
        fetch(`api/Favorieten/verwerkFavoriet`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                ProductId: this.props.match.params.productid
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                this.wachtrij.push({
                    message : "Het product is toegevoegd aan de favorietenlijst!",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }
                response.json().then(favorieten => this.setState({favorieten: favorieten}))
            }
            else if(response.status === 204)
            {
                this.wachtrij.push({
                    message : "U moet ingelogd zijn om favorieten toe te voegen!",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }
            }
            else if (response.status === 500)
            {
                this.wachtrij.push({
                    message : "Dit product staat al op de favorietenlijst!",
                    key: new Date().getTime(),
                });
                
                if (this.state.snackbarOpen) {
                    this.setState({ snackbarOpen: false });
                } else {
                    this.wachtrijVerwerken();
                }
            }
        })
        .catch(error => console.log(error))
    };


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
        console.log(this.props.match.params.productid)
        console.log(this.props)
        const { classes } = this.props;
        const { bericht } = this.state;

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
                <Divider></Divider>
                <h1>Product Details</h1>
                <Grid left columns={2} style = {{margin: '3%', height: '50%', width: '75%'}}>
                    <Grid.Column style = {{margin: '3%', backgroundColor: 'hidden'}}>
                            <Container>
                            <Card style = {{height: '90%'}}>
                            <Card.Content>
                                <ProductImage
                                    productId = {this.props.match.params.productid}>
                                </ProductImage>
                                <Divider/>
                                <Grid columns={2} relaxed>
                                <Grid.Column>
                                <Segment basic>
                                    <input type='number' className="hoeveelheid" defaultValue="1" min="1"></input>
                                    <button className="WinkelwagenButton" onClick={this.toevoegenProduct.bind(this)}>
                                    <i className="shopping cart icon"/></button></Segment>
                                </Grid.Column>
                                <Grid.Column>
                                <Segment basic><button className="Button" onClick={this.toevoegenFavoriet.bind(this)}>
                                    <i className="heart icon"/></button></Segment>
                                </Grid.Column>
                                </Grid>
                            </Card.Content>
                            </Card>
                            </Container>
                            <Rail position='right' style={{width: '200%'}}>
                                    <Textbox  productid = {this.props.match.params.productid}/>                         
                            </Rail>
                </Grid.Column>
                </Grid>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>

        );
    }
}

export default withStyles(styles)(ProductDetails);