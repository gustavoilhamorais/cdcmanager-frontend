import React, { Component, Fragment } from 'react';
import { withAuth } from '@okta/okta-react';

import Footer from './../Footer';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

class NavigationContext extends Component {
  state = { authenticated: null };

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async () => {
    this.props.auth.login('/');
  }

  logout = async() => {
    this.props.auth.logout('/');
  }
  render() {
    if (this.state.authenticated === null) return null;

    const navbar = this.state.authenticated ? (
      <Fragment>
        <div className="App">
          <div id="wrapper">
            <Sidebar />
              <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                  <Topbar />
                  <Fragment>
                    {this.props.children}
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
          <Footer />
      </Fragment>
    ) : (
      ()=>this.login()
    )
    return(
      <div>
        {navbar}
      </div>
    );
  }
}

export default withAuth(NavigationContext);