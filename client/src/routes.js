import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from "./components/Auth/Login";
import ConfirmRegisteration from "./components/Auth/ConfirmRegisteration";
import Home from './components/Home/Home';
import ContactUs from "./components/Home/Contactus";
import AboutUs from "./components/Home/Aboutus";
import Layout from './hoc/Layout/Layout';
import Profile from "./components/Auth/Profile";

export default Rountes => (
  <Layout>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/user/confirmregisteration/:id" exact component={ConfirmRegisteration} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/contactus" exact component={ContactUs} />
      <Route path="/aboutus" exact component={AboutUs} />
      <Route path="/" component={Home} />
    </Switch>
  </Layout>
);