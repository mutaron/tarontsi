import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from "./components/Auth/Login";
import ConfirmRegisteration from "./components/Auth/ConfirmRegisteration";
import Home from './components/Home/Home';
import ContactUs from "./components/Home/Contactus";
import AboutUs from "./components/Home/Aboutus";
import Layout from './hoc/Layout/Layout';
import Profile from "./components/Auth/Profile";
import authCheck from "./hoc/Auth";
import AdminHome from './components/User/Admin/AdminHome';
import DailyLedger from './components/User/Admin/DailyLedger'; 

export default Rountes => (
  <Layout>
    <Switch>
      <Route path="/login" exact component={authCheck(Login, "-1")} />
      <Route path="/user/confirmregisteration/:id" exact component={authCheck(ConfirmRegisteration, "0")} />
      <Route path="/profile" exact component={authCheck(Profile, "0")} />
      <Route path="/contactus" exact component={authCheck(ContactUs, "0")} />
      <Route path="/admin/ledger" exact component={authCheck(DailyLedger, "3")} />
      <Route path="/aboutus" exact component={authCheck(AboutUs, "0")} />
      <Route path="/admin/home" exact component={authCheck(AdminHome, "3")} />
      <Route path="/" component={authCheck(Home, "0")} />
    </Switch>
  </Layout>
);