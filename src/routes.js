import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

// Pages //
import Register from "./pages/Register";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NavigationContext from "./components/Navbar";

import CreateCategory from "./pages/Create/Category";
import CreateCustomer from "./pages/Create/Customer";
import CreateMerchan from "./pages/Create/Merchan";
import CreateProvider from "./pages/Create/Provider";
import CreateRental from "./pages/Create/Rental";
import CreateSale from "./pages/Create/Sale";

import ReadCategories from "./pages/Read/Category";
import ReadCustomer from "./pages/Read/Customer";
import ReadMerchan from "./pages/Read/Merchan";
import ReadProvider from "./pages/Read/Provider";
import ReadRental from "./pages/Read/Rental";
import ReadSale from "./pages/Read/Sale";

import UpdateCategory from "./pages/Update/Category";
import UpdateCustomer from "./pages/Update/Customer";
import UpdateMerchan from "./pages/Update/Merchan";
import UpdateProvider from "./pages/Update/Provider";
import UpdateRental from "./pages/Update/Rental";
import UpdateSale from "./pages/Update/Sale";

function onAuthRequired({history}) {
  history.push('/#/login');
}

// Routes //
const Routes = () => (
  <BrowserRouter>
    <Security issuer="https://dev-675287.okta.com/oauth2/default"
              client_id="0oa1234pheVYoimPF357"
              redirect_uri={window.location.origin + '/implicit/callback'}
              onAuthRequired={onAuthRequired}>
      <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" render={() => <Login baseURL="https://dev-675287.okta.com"/>} />
          <Route path="/implicit/callback" component={ImplicitCallback} />
        <NavigationContext>
          <SecureRoute exact path="/" component={Dashboard} />
          <SecureRoute path="/new-category" component={CreateCategory} />
          <SecureRoute path="/new-customer" component={CreateCustomer} />
          <SecureRoute path="/new-merchan" component={CreateMerchan} />
          <SecureRoute path="/new-provider" component={CreateProvider} />
          <SecureRoute path="/new-rental" component={CreateRental} />
          <SecureRoute path="/new-sale" component={CreateSale} />
          <SecureRoute path="/categories" component={ReadCategories} />
          <SecureRoute path="/customers" component={ReadCustomer} />
          <SecureRoute path="/merchans" component={ReadMerchan} />
          <SecureRoute path="/providers" component={ReadProvider} />
          <SecureRoute path="/rentals" component={ReadRental} />
          <SecureRoute path="/sales" component={ReadSale} />
          <SecureRoute path="/edit-category/:id" component={UpdateCategory} />
          <SecureRoute path="/edit-customer/:id" component={UpdateCustomer} />
          <SecureRoute path="/edit-merchan/:id" component={UpdateMerchan} />
          <SecureRoute path="/edit-provider/:id" component={UpdateProvider} />
          <SecureRoute path="/edit-rental/:id" component={UpdateRental} />
          <SecureRoute path="/edit-sale/:id" component={UpdateSale} />
        </NavigationContext>
      </Switch>
    </Security>
  </BrowserRouter>
);

export default Routes;
