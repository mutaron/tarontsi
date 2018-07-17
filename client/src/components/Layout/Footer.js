import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Tabs,
  Tab
} from "material-ui";
import {
  Home,
  PermPhoneMsg,
  SupervisorAccount,
  Kitchen
} from "material-ui-icons";
import { connect } from "react-redux";


import classes from "./MainLayout.css";

class Footer extends Component {
  state = {
    tabValue: localStorage.getItem( "selectedTab" )
  };

  tabChangeHandler = ( event, value ) => {

    if ( value === 1 ) {
        this.props.history.push("/aboutus");      
    }
    else if ( value === 2 ) {
      this.props.history.push("/contactus");      
    }
    else if ( value === 3 ) {
      this.props.history.push("/admin/home");      
    }  
    else if ( value === 0 ){
      this.props.history.push("/");            
    }

    localStorage.setItem("selectedTab", value);
    this.setState({ tabValue: Number(value) });
  };

  render() {
    let admin = false;
    let { tabValue } = this.state;
    
    if ( !tabValue ) tabValue = 0;
    
    if ( this.props.user ) {
      admin  = this.props.user.role === 3;
    };

    const tabAdmin = admin ? <Tab icon={<Kitchen />} label="Admin" /> : null
    return <div>
        <AppBar position="static" className={classes.FooterContainer}>
          <Tabs className={classes.TabItem} value={Number(tabValue)} onChange={this.tabChangeHandler} scrollable scrollButtons="off">
            <Tab icon={<Home />} label="Home" />
            <Tab icon={<SupervisorAccount />} label="About us" />
            <Tab icon={<PermPhoneMsg />} label="Contact us" />
            {tabAdmin}
          </Tabs>
        </AppBar>
      </div>;
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps) (withRouter(Footer));