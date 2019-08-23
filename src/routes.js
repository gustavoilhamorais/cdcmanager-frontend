import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

// Pages //
import Register from "./Pages/Register";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import NavigationContext from "./Components/Navbar";

import CreateCategory from "./Pages/Create/Category";
import CreateCustomer from "./Pages/Create/Customer";
import CreateMerchan from "./Pages/Create/Merchan";
import CreateProvider from "./Pages/Create/Provider";
import CreateRental from "./Pages/Create/Rental";
import CreateSale from "./Pages/Create/Sale";

import ReadCategories from "./Pages/Read/Category";
import ReadCustomer from "./Pages/Read/Customer";
import ReadMerchan from "./Pages/Read/Merchan";
import ReadProvider from "./Pages/Read/Provider";
import ReadRental from "./Pages/Read/Rental";
import ReadSale from "./Pages/Read/Sale";

import UpdateCategory from "./Pages/Update/Category";
import UpdateCustomer from "./Pages/Update/Customer";
import UpdateMerchan from "./Pages/Update/Merchan";
import UpdateProvider from "./Pages/Update/Provider";
import UpdateRental from "./Pages/Update/Rental";
import UpdateSale from "./Pages/Update/Sale";

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
