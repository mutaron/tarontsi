import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Login from './components/Auth/Login/Login';
import Home from './components/Home/Home';
import ContactUs from "./components/Home/Contactus";
import AboutUs from "./components/Home/Aboutus";
import Layout from './hoc/Layout/Layout';

export default Rountes => (
  <Layout>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/contactus" exact component={ContactUs} />
      <Route path="/aboutus" exact component={AboutUs} />
      <Route path="/" component={Home} />
    </Switch>
  </Layout>
);