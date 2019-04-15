import React, { Component } from 'react';
import './Footer'; 
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import { Card, Divider, Grid } from 'semantic-ui-react';


class Privacy extends Component{
    
    render(){
        return(
        <div>
            
            <Card><h2>Privacybeleid <i class="eye slash icon"></i></h2></Card>

            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Privacyverklaring ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <h5>Wanneer is onze privacyverklaring van toepassing?</h5>
                        <h5>Onze privacyverklaring is van toepassing op elke verwerking van persoonsgegevens van onze (potentiële) klanten en gebruikers van onze shop. 
                            Met persoonsgegevens bedoelen we informatie die direct of indirect te herleiden is naar een individu, zonder dat de naam van dat individu bekend hoeft te zijn. 
                            Denk aan klantnummer, adres, woonplaats, e-mailadres, telefoonnummer, cookie ID’s en financiële data.</h5>
                        <h5>Wie verwerkt je gegevens en wie beschermt ze?</h5>
                        <h5>Voor de verwerking van je gegevens is ThuisBegymmen verantwoordelijk. 
                            Dat wil zeggen dat ThuisBegymmen vaststelt hoe en welke gegevens van je worden verwerkt, voor welke doeleinden en hoe lang. 
                            Wij verwerken je gegevens niet zonder reden en alleen als we die nodig hebben voor een of meer specifieke doeleinden. 
                            We zullen je gegevens nooit aan derden verkopen.</h5>
                        <h5>Welke gegevens verwerken wij en waar gebruiken we ze voor?</h5>
                        <h5>Als je onze shop bezoekt verwerken we gegevens van je. 
                            Denk aan je IPadres, maar ook aan je klik- en koopgedrag, zodat we je persoonlijker en relevanter van dienst kunnen zijn. 
                            Met behulp van cookies kunnen we onder andere zien welke onderdelen van de website of app je hebt bekeken.</h5>
                                <h5>Het is mogelijk dat we de gegevens over je gebruik en bezoek van onze shop koppelen aan gegevens uit je Mijn ThuisBegymmen account.</h5>
                                <h5>Dit zijn de gegevens die we dan onder andere verwerken:</h5>
                                <h5>● IP-adres van je devices (bijvoorbeeld computer, tablet of mobiele telefoon) en cookie-ID’s</h5> 
                                <h5>● Bezochte webpagina’s, pagina’s van onze app en duur van bezoek of sessie</h5>
                                <h5>● Welke internetbrowser je gebruikt, bijvoorbeeld Safari of Google Chrome</h5>
                                <h5>● Klikgedrag en bekeken advertenties, denk aan zoekopdrachten, welke artikelen je hebt bekeken, op welke advertenties je hebt geklikt en wat je aanklikt tijdens het bestellen</h5>
                                <h5>● Transactiegegevens</h5>
                                <h5>● Voorkeuren of interesses</h5>
                        </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>



            <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Account aanmaken en beheren ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h4>Om een bestelling bij wehkamp te kunnen plaatsen moet je eerst een Mijn wehkamp account aanmaken op onze website of in onze app. 
                        Daarna kun je inloggen op je account en je account beheren. 
                        Voor het aanmaken van een Mijn wehkamp account en het gebruik van je account verwerken we noodzakelijke gegevens van jou.</h4>
                    <h4>Aanmaken van je account We verwerken je voornaam, voorletter(s), achternaam, geboortedatum, geslacht, e-mailadres, adres en wachtwoord.
                        Gebruik van je account Als je je account actief gebruikt, kunnen we naast je persoonlijke gegevens ook andere gegevens opslaan. Dit is afhankelijk van hoe je onze shop gebruikt. Denk aan:</h4>
                    <h5>● Besteldata</h5>
                    <h5>● Bestelnummers/ordernummers</h5>
                    <h5>● Details van je bestellingen, zoals aantal bestellingen, bedragen, (type) artikelen, artikelnummers, aantal, kleur en prijs</h5>
                    <h5>● Bezorgdata- en tijden</h5>
                    <h5>● Bezorgkosten</h5>
                    <h5>● Overzicht betalingen</h5>
                    <h5>● E-mailadres voor e-mailvoorkeur</h5>
                    <h5>● Je betaalvoorkeuren (wel of niet op krediet bestellen)</h5>
                    <h5>● Jouw bezorgvoorkeuren (mogen jouw bestellingen wel of niet bij de buren worden bezorgd)</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

           
           <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Artikelen kopen en laten bezorgen ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5> De artikelen die je in onze shop koopt kun je laten thuisbezorgen of ophalen bij een DHL-punt. 
                         Tijdens het bestellen verwerken we verschillende gegevens, zoals je gekozen betaalmethode en gegevens om je bestelling te volgen. 
                        Naar aanleiding van je aankopen kunnen we je aanbiedingen en informatie sturen via bijvoorbeeld e-mail.</h5>

                        <h5>Vanaf het moment dat je artikelen in onze shop bestelt en deze wilt laten thuisbezorgen verwerken we de volgende gegevens:</h5>
                        <h5>● Wat je bestelt (o.a. aantal, soort artikelen, BTW en bezorgkosten)</h5>
                        <h5>● Transactiegegevens (manier van betalen, je rekeningnummer en betaalgegevens)</h5>
                        <h5>● Bezorgwijze (thuisbezorgd of bezorgd bij een DHL-punt in de buurt o.b.v. een postcode die je intikt in onze kassa)</h5>
                        <h5>● Naam, adres, woonplaats, bezorgdatum en –tijd indien mogelijk</h5>
                        <h5>● Gegevens om je bestelling te volgen</h5>
                        <h5>● Eventuele kortingscodes die je hebt ingewisseld in de kassa</h5>
                        <h5>● Eventuele instructies die je ons geeft voor de bezorging</h5>
                        <h5>● Overige accountgegevens indien nodig</h5>
                        <h5>● Informatie over de acceptatie van je bestelling</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


                <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Vragen, klachten, reparaties en garanties ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                    <h5> Als je een vraag stelt of een klacht indient over een artikel, een verzoek indient voor reparatie, 
                een beroep doet op je garantie of om een andere reden contact opneemt met de klantenservice, 
                is het noodzakelijk om bepaalde gegevens te verwerken en te bewaren.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>



                        <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Marketing ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <h5>Als je een account hebt aangemaakt en een of meerdere artikelen hebt gekocht, kunnen we je daarna benaderen voor marketingdoeleinden. 
                            Wij doen dit via verschillende uitingen en kanalen. Daarnaast kunnen we gegevens van andere partijen combineren met gegevens die wij al van je hebben. 
                            Dit laatste doen we alleen met jouw toestemming.</h5>

                        <h5>Door je gedrag op basis van onze marketinguitingen te analyseren kunnen we onze aanbiedingen beter op je persoonlijke voorkeuren afstemmen. 
                            Hier komt profilering bij kijken: dit is elke vorm van geautomatiseerde gegevensverwerking waarbij we bepaalde persoonlijke aspecten van jou analyseren om onder andere je persoonlijke voorkeuren, interesses, gedrag, betrouwbaarheid en je economische situatie te voorspellen. 
                            We maken hiervoor onder andere gebruik van cookiegegevens en accountgegevens (en met jouw toestemming gegevens van andere partijen). Denk aan:</h5>
                        <h5>● ‘Laatst bekeken’ artikelen</h5>
                        <h5>● ‘Persoonlijke rijen’ met artikelen in onze e-mails</h5>
                        <h5>● Volgorde van artikelen op artikeloverzichtspagina’s</h5>
                        <h5>● Kortingscodes vanwege je verjaardag</h5>
                        <h5>● Reclamebanners met artikelen die je eerder hebt bekeken</h5>
                        <h5>We analyseren hoe effectief onze campagnes zijn op basis van je gedrag. 
                            Hiervoor kijken we naar jouw (re)actie. Klik je bijvoorbeeld door in e-mails of op banners om artikelen te bekijken of te kopen? 
                            En hoe goed werken onze reclamespotjes? We verwerken voor marketingdoeleinden verschillende gegevens. </h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>


                        <ExpansionPanel>
                <ExpansionPanelSummary>
                    <Typography><h3>Sociale media ></h3> </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <h5> Als je via sociale media communiceert met ThuisBegymmen, bijvoorbeeld als je commentaar plaatst, 
                    media uploadt, een bericht verzendt, een artikel van onze website deelt of op een like knop klikt, 
                    kunnen we gegevens zoals je (gebruikers)naam, woonplaats, e-mailadres en geslacht ontvangen.</h5>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>



        </div>
        );
    }
}


export default Privacy;