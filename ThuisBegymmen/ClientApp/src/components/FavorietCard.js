import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Segment, Divider } from 'semantic-ui-react';
import Slider from 'react-slick';

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

class FavorietCard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            ...props,
            images: [],
            hoeveelheid: 1,
            snackbarOpen: false,
            bericht: {}
        }
    };

    wachtrij = [];

    imageHandler(){
        fetch(`api/Image/getImages?productId=${this.props.productId}`)
        .then(response => {
            response.json()
        .then(responseJson => {
            this.setState({ images : JSON.parse(JSON.stringify(responseJson))})
        })
        .catch(error => console.error(error));
        })
    }

    componentWillMount() {
        this.imageHandler()
    }

    toevoegenProduct()
    {
        fetch(`api/Winkelwagen/addProductToWinkelwagen`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                Hoeveelheid: 1,
                ProductId: this.props.productId
            })
        })
        .then(response => {
            if(response.status === 200)
            {
                this.wachtrij.push({
                    message : "Toegevoegd aan uw winkelwagen!",
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
                    message : "Hoeveelheid aangepast!",
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
    refreshPage(){window.location.reload();}
    
    verwijderFavoriet(){   
        fetch(`api/Favorieten/verwijderFavoriet`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                ProductId: this.props.productId
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
                    this.wachtrij.push({
                        message : "Favoriet verwijderen mislukt!",
                        key: new Date().getTime(),
                    });
                    
                    if (this.state.snackbarOpen) {
                        this.setState({ snackbarOpen: false });
                    } else {
                        this.wachtrijVerwerken();
                    }
                }
            })
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

    render() {
        const { classes } = this.props;
        const { bericht } = this.state;
        const imagelist = this.state.images.map((image,i) => (
            <div key={i}>
            <img
            src={image}
            alt=""
            height="100%" width="100%"
            />
            </div>
        ))

        var settings = { // handige comments voor de slider
            dots: true, // shows dots under the pics to indicate which one you're at
            speed: 500, // lower value is faster swap speed!
            fade: true, // enable for fade effect, disable for slider effect
            autoplay: false, // disable for manual swapping
            autoplaySpeed: 2000, // set value to 10 for disco effect
          };

        // console.log(this.props)

        return (
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
                <Card centered style = {{margin: 25, marginTop: 0}}>
                    <Link to={'/product/' + this.state.productId}>
                        <Card.Content style = {{margin: 5}}>
                        <div className = 'Grid_header'>{this.state.naam}</div>
                        <Divider/>

                            <Slider {...settings} >
                                {imagelist}
                            </Slider>
                        
                        </Card.Content>
                        </Link>
                <Divider/>

                    <Grid columns={3} relaxed>
                        <Grid.Column>
                        <Segment basic><h6><i className=" euro sign icon"/>{this.state.prijs}</h6></Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment basic><h6><i className="warehouse icon"/>{this.state.inventaris} </h6></Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment basic><h6><i className="truck icon"/>{this.state.verzendtijd}</h6></Segment>
                        </Grid.Column>
                    </Grid>

                <Divider/>
        
                <Grid columns={2} relaxed>
                        <Grid.Column>
                        <Segment basic>
                            <button className="WinkelwagenButton" onClick={this.toevoegenProduct.bind(this)}>
                            <i className="shopping cart icon"/></button></Segment>
                        </Grid.Column>
                        <Grid.Column>
                        <Segment basic><button className="WinkelwagenButton" onClick={this.verwijderFavoriet.bind(this)}>
                            <i className="trash alternate icon"/></button></Segment>
                        </Grid.Column>
                </Grid>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(FavorietCard);

//<button className="verwijderFavoriet" onClick={() => this.verwijderFavoriet(favoriet.productId)}><h3>-</h3></button>