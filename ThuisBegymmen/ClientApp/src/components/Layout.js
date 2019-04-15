import React, { Component } from 'react';
import { Route } from 'react-router';
import Sidebar from './Sidebar';
import Home from './Home';
import Winkelwagen from './Winkelwagen';
import Login from './Login'
import ProductList from './ProductList';
import AccountAanmaken from './AccountAanmaken';
import Menu from './Menu';
import ProductDetails from './ProductDetails';
import VerwerkOrderGebruiker from './VerwerkOrderGebruiker';
import Klantenservice from './Klantenservice';
import ServiceEnContact from './ServiceEnContact';
import BezorgenEnAfhalen from './BezorgenEnAfhalen';
import Retourneren from './Retourneren';
import GarantieEnReparatie from './GarantieEnReparatie';
import Betaalwijze from './Betaalwijze';
import WerkenBijThuisBegymmen from './WerkenBijThuisBegymmen';
import Privacybeleid from './Privacybeleid';
import Cookiebeleid from './Cookiebeleid';
import Bestellen from './Bestellen';
import Category from './Category';
import Searchbar from './Searchbar';
import './Layout.css';
import Header from './img/Banner.png';
import Betaaloverzicht from "./betaaloverzicht";
import AccountViewLoader from './AccountViewLoader';
import VerwerkOrderAccount from './VerwerkOrderAccount';
import OrderManagement from './OrderManagement';
import OrderManagementDetail from './OrderManagementDetail';
import AankoopGeschiedenis  from './AankoopGeschiedenis';
import Footer from './Footer';
import Favorieten from './Favoriet';
import Statistieken from './Statistieken';
import SearchPage from './SearchPage';
import AccountManagementPage  from './AccountManagementPage';
import RechtenManagement  from './RechtenManagement';
import ProductManagementPage  from './ProductManagementPage';
import ProductUpdatePage  from './ProductUpdatePage';
import AccountReset  from './AccountReset';
import ProductToevoegenPage  from './ProductToevoegenPage';



export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <div className="Layout">
        <header className="Layout-header">
          <img src={Header} className="Layout-logo" alt="logo" />
        </header>

        <div className="Layout-content">
        <Menu/>
        <Searchbar/>
          <Route exact path="/" component={Home} />
          <Route path="/Winkelwagen" component={Winkelwagen} />
          <Route path="/VerwerkOrderGebruiker" component={VerwerkOrderGebruiker} />
          <Route path="/Login" component={Login} />
          <Route path="/product/:productid" component={ProductDetails} />
          <Route path="/AccountAanmaken" component={AccountAanmaken} />
          <Route path="/ProductList" component={ProductList} />
          <Route path="/Klantenservice" component={Klantenservice} />
          <Route path="/ServiceEnContact" component={ServiceEnContact} />
          <Route path="/BezorgenEnAfhalen" component={BezorgenEnAfhalen} />
          <Route path="/Retourneren" component={Retourneren} />
          <Route path="/GarantieEnReparatie" component={GarantieEnReparatie} />
          <Route path="/Betaalwijze" component={Betaalwijze} />
          <Route path="/WerkenBijThuisBegymmen" component={WerkenBijThuisBegymmen} />
          <Route path="/Privacybeleid" component={Privacybeleid} />
          <Route path="/Cookiebeleid" component={Cookiebeleid} />
          <Route path="/Bestellen" component={Bestellen} />
          <Route path="/AccountViewLoader" component={AccountViewLoader} />
          <Route path="/VerwerkOrderAccount" component={VerwerkOrderAccount} />
          <Route path="/OrderManagement" component={OrderManagement} />
          <Route path="/OrderManagementDetail/:orderId" component={OrderManagementDetail} />
          <Route path="/Betaaloverzicht/:orderId" component={Betaaloverzicht} />
          <Route path="/Category/:categoryid" component={Category} />
          <Route path="/Favorieten" component={Favorieten}/>
          <Route path="/Statistieken" component={Statistieken}/>
          <Route path="/AankoopGeschiedenis" component={AankoopGeschiedenis} />
          <Route path="/AccountManagementPage" component={AccountManagementPage} />
          <Route path="/RechtenManagement/:id" component={RechtenManagement} />
          <Route path="/ProductManagementPage" component={ProductManagementPage} />
          <Route path="/ProductUpdatePage/:id" component={ProductUpdatePage} />
          <Route path="/SearchPage/" component={SearchPage} />
          <Route path="/AccountReset/" component={AccountReset} />
          <Route path="/ProductToevoegenPage/" component={ProductToevoegenPage}/>
        </div>

        <aside className="Layout-sidebar"><Sidebar /></aside>
        <Footer></Footer>
      </div>
    );
  }
}
