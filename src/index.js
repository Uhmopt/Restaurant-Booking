import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
// import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import OrderReservation from "views/OrderReservationManagement/OrderReservationManagement.js";
import ServicePage from "views/ServicePage/ServicePage.js";
import Components from "views/Components/Components.js";
import ClickCollect from "views/ClickCollect/ClickCollect.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import UserAccount from "views/UserAccount/UserAccount.js";
import SearchTable from "views/SearchTable/SearchTable.js";
import UserLoginPage from "views/LoginPage/UserLoginPage.js";
import SuppilerLoginPage from "views/LoginPage/SuppilerLoginPage.js";
import UserSignUp from "views/SignUpPage/UserSignUp.js";
import SupplierSignUp from "views/SignUpPage/SupplierSignUp.js";
import ForgotPassword from "views/LoginPage/ForgotPassword.js";
import EstablishmentManagement from "views/EstablishmentManagement/EstablishmentManagement.js";
import EstablishmentSubmit from "views/EstablishmentManagement/EstablishmentSubmit.js";
import EstablishmentHistory from "views/EstablishmentHistory/EstablishmentHistory.js";
import EstablishmentDetail from "views/EstablishmentDetail/EstablishmentDetail.js";
import MenuManagement from "views/MenuManagement/MenuManagement.js";
import MenuList from "views/MenuManagement/MenuList.js";
import Authentication from "views/Authentication/Authentication.js";
import PasswordConfirm from "views/Authentication/PasswordConfirm.js";
// import Authentication from "views/ResetPassword/Authentication.js";
import History from "views/History/History.js";

import MainPage from "views/MainPage/MainPage.js";
import store from './views/store';

var hist = createBrowserHistory();

  ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/landing-page" component={LandingPage} />
        <Route path="/account-confirm" component={Authentication} />
        <Route path="/password-confirm" component={PasswordConfirm} />
        <Route path="/service-page" component={ServicePage} />
        <Route path="/click-collect" component={ClickCollect} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/search-table" component={SearchTable} />
        <Route path="/user-login" component={UserLoginPage} />
        <Route path="/user-account" component={UserAccount} />
        <Route path="/suppiler-login" component={SuppilerLoginPage} />
        <Route path="/user-signup" component={UserSignUp} />
        <Route path="/suppiler-signup" component={SupplierSignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/main-page" component={MainPage} />
        <Route path="/order-reservation-manage" component={OrderReservation} />
        <Route path="/history" component={History} />

        <Route path="/establishment-detail" component={EstablishmentDetail} />
        <Route path="/establishment-management" component={EstablishmentManagement} />
        <Route path="/establishment-submit" component={EstablishmentSubmit} />
        <Route path="/establishment-history" component={EstablishmentHistory} />
        <Route path="/menu-management" component={MenuManagement} />
        <Route path="/menu-list" component={MenuList} />
        <Route path="/components" component={Components} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
