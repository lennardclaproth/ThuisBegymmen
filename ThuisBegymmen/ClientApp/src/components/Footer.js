import React from 'react';
import './Footer.css';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom'
import './Login';
import './Klantenservice';
import './ServiceEnContact';
import './BezorgenEnAfhalen';
import './Retourneren';
import './GarantieEnReparatie';
import './Betaalwijze';
import './WerkenBijThuisBegymmen';
import './Privacybeleid';
import './Cookiebeleid';
import './Bestellen';


import {  Divider, } from 'semantic-ui-react';
import { Grid } from '@material-ui/core';





class Footer extends React.Component {


    render() {

        return (
            <div className="Layout-footer">




                <Grid centered style={{ margin: '25%', marginTop: 50  }}>
                    <tr>

                        <Divider></Divider>
                        

                        <tr>
                            <tr><h3>Service</h3>
                                <Divider></Divider>

                                <Grid centered style={{ margin: 20}}>


                                    <Link to={'/Login/'}>
                                        <table><button className="FcButtons">mijn ThuisBegymmen</button></table>
                                    </Link>

                                    <Link to={'/Klantenservice/'}>
                                        <table><button className="FcButtons"> Klantenservice </button></table>
                                    </Link>


                                    <Link to={'/ServiceEnContact/'}>
                                        <table><button className="FcButtons">Service en contact</button></table>
                                    </Link>

                                    <Link to={'/BezorgenEnAfhalen/'}>
                                        <table><button className="FcButtons">Bezorgen en afhalen</button></table>
                                    </Link>

                                    <Link to={'/Retourneren/'}>
                                        <table><button className="FcButtons">Retourneren</button></table>
                                    </Link>

                                    <Link to={'/GarantieEnReparatie/'}>
                                        <table><button className="FcButtons">Garantie en Reparatie</button></table>
                                    </Link>



                                </Grid> </tr>

                                


                            <td><tr><h3>Geldzaken</h3>
                                <Divider></Divider>

                                <Grid centered style={{ margin: 20 }}>
                                    <Link to={'/Betaalwijze/'}>
                                        <button className="FcButtons"> Betaalwijze </button></Link></Grid>

                            </tr></td>


                            <Divider></Divider>


                            <td><tr><h3>Meer ThuisBegymmen</h3>
                                
                                
                            <Divider></Divider>

                                <Grid centered style={{ margin: 50, marginTop: 0 }}>
                                    <Link to={'/WerkenbijThuisBegymmen/'}>
                                        <table><button className="FcButtons" onClick>Werken bij ThuisBegymmen</button></table>
                                    </Link>


                                    <Link to={'/Privacybeleid/'}>
                                        <table><button className="FcButtons">Privacybeleid</button></table>
                                    </Link>

                                    <Link to={'/Cookiebeleid/'}>
                                        <table><button className="FcButtons">Cookiebeleid</button></table>
                                    </Link></Grid>

                            </tr></td>


                            <Divider></Divider>

                            <td><tr><h3>Wil je ons volgen?</h3>
                                <Divider></Divider>

                                <Grid centered style={{ margin: 50}}>
                                    <table><SocialIcon url="http://facebook.com/" /></table>
                                    <table><SocialIcon url="https://www.instagram.com/" /></table>
                                    <table><SocialIcon url="https://www.youtube.com/" /></table>
                                    <table><SocialIcon url="http://twitter.com/" /></table>
                                    
                                    <table><h6 >© 2018/2019 ThuisBegymmen </h6></table>
                                    
                                    </Grid>
                                    

                            </tr></td>

                        </tr>

                    </tr>
                </Grid>

            </div>
        );
    }


}




export default Footer;