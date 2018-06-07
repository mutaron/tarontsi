import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';


class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/login"  />
        <Route path="/about" />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

export default App;
