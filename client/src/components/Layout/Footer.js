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
import * as actions from "../../store/actions/index";


import classes from "./MainLayout.css";

class Footer extends Component {

  handleChange = ( event, value ) => {
    this.props.onTabChange({ value });
    if ( value === 1 ) {
        this.props.history.push("/aboutus");      
    }
    else if ( value === 2 ) {
      this.props.history.push("/contactus");      
    }
    else if ( value === 3 ) {
      this.props.history.push("/admin/home");      
    }  
    else {
      this.props.history.push("/");            
    }
  };

  render() {
    let admin = false;
//console.log(this.props.selectedTab.value);
    if ( this.props.user ) {
      admin  = this.props.user.role === 3;
    };
    const tabAdmin = admin ? <Tab icon={<Kitchen />} label="Admin" /> : null
    return <div>
        <AppBar position="static" className={classes.FooterContainer}>
          <Tabs className={classes.TabItem} value={this.props.selectedTab} onChange={this.handleChange} scrollable scrollButtons="off">
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
  //console.log(state)
  return {
    user: state.auth.user,
    selectedTab: state.auth.selectedTab
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTabChange: tabIndex => dispatch(actions.authTabChange(tabIndex))
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Footer));