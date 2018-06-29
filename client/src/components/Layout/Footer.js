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
    value: 0
  };

  handleChange = ( event, value ) => {
    this.setState( { value } );
    if ( value === 1 ) {
        this.props.history.push("/aboutus");      
    }
    else if ( value === 2 ) {
      this.props.history.push("/contactus");      
    }
    else {
      this.props.history.push("/");            
    }
  };

  render() {
    const { value } = this.state;
    let admin = false;

    if ( this.props.user ) {
      admin  = this.props.user.role === 3;
    };
    const tabAdmin = admin ? <Tab icon={<Kitchen />} label="Admin" /> : null
    return <div>
        <AppBar position="static" className={classes.FooterContainer}>
          <Tabs className={classes.TabItem} value={value} onChange={this.handleChange} scrollable scrollButtons="off">
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