import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Card, Divider, Grid } from 'semantic-ui-react';

import './Footer';


class Bestellen extends Component{
    
    render(){
        return(
        <div>
            <Card style ={{margin: 20}}><h2>Bestellen<i class="shopping cart icon"></i></h2>
            </Card>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bestelling plaatsen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Gevonden wat je zocht? Mooi zo! In een paar klikken haal je je artikel(en) in huis:
                        
                        <h5>stap 1: winkelmand
                        Plaats je artikel(en) in je winkelmand.</h5>

                        <h5>stap 2: gegevens
                        Vul je persoonlijke gegevens in (als je al ingelogd bent sla je deze stap over). 
                        Check bij de volgende stap even of je adres klopt.</h5>

                        <h5>stap 3: bezorgen
                        Kies wat jou het beste uitkomt: bezorgen of ophalen. 
                        Bij bezorgen kies je een bezorgmoment en adres. 
                        Haal je het pakket op bij DHL? Dan kies je een DHL-punt en afleverdag. 
                        Achteraf je bezorgafspraak wijzigen? Dit regel je via onze website.</h5>


                        <h5>stap 4: betalen
                        Kies een betaalwijze: PayPal 
                        Betaal je met PayPal? Vergeet dan niet na je betaling op ‘Betaling afronden’ te klikken. 
                        Hierna kun je de bevestiging van je bestelling bekijken.</h5>
                        
                    </h5>


                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bestelling volgen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Weten waar jouw bestelling op dit moment is? Ga naar Bestellingen > 'details bestelling' en 'volgen'. 
                        Daar kun je de status van de bezorging bekijken. 
                        Zo weet je wanneer je pakket ons magazijn heeft verlaten en naar jou onderweg is of al bezorgd is.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bestelling annuleren ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>De verkeerde kleur gekozen, of gewoon spontaan van gedachten veranderd? Herkenbaar!.
                    via Bestellingen op onze site. Ga naar 'details bestelling'. Hier zie je de knop 'annuleer artikel' staan. 
                    Vink het artikel aan dat je wilt annuleren. Zie je de optie niet? 
                    Dan is je artikel waarschijnlijk al onderweg. Geef je pakket bij bezorging gewoon weer mee aan de bezorger.
                    </h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

                        <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bestelling niet gelukt ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Heb je betaald met PayPal? Dan kan het een half uur duren voordat je bestelling geplaatst is. 
                        Dit kan bijvoorbeeld voorkomen als je na je betaling meteen je browser sluit en niet meer terugkeert naar onze shop.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bestelling niet ontvangen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Heb je jouw bestelling niet op de afgesproken bezorgdag ontvangen? 
                        Check of je de bestelling wel onder Bestellingen ziet staan.Bestelling niet zichtbaar
                        Heb je wel een orderbevestiging op je mail ontvangen? 
                        Wacht minimaal een uur en maximaal een dag af. Daarna moet de bestelling zeker zichtbaar zijn.
                        Heb je geen orderbevestiging op je mail gekregen? Dan hebben we je bestelling helaas niet goed ontvangen. 
                        Plaats je bestelling opnieuw. Wel al betaald? We storten je geld binnen twee werkdagen terug.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

                        <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Bezorgkosten ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Bij een bestelling vanaf 300.- is de bezorging gratis. Onder de 20.- betaal je 2.95 bezorgkosten. 
                        Retourneren is altijd gratis, ook als je het artikel thuis laat ophalen. Wel zo fijn.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

                        <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Veilig winkelen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5>Thuiswinkel Waarborg
                    Bij ThuisBegymmen winkel je veilig en betrouwbaar. 
                    De ThuisWinkel Waarborg garandeert dit. 
                    Voor het verzenden van gevoelige informatie (zoals je betaalgegevens), gebruiken we een beveiligde internetverbinding.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
        );
    }
}


export default Bestellen;