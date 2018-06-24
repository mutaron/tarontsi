import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  AppBar,
  Tabs,
  Tab,
  Typography
} from "material-ui";
import { Home, PermPhoneMsg, SupervisorAccount } from "material-ui-icons";
import classes from "./MainLayout.css";

class Footer extends Component {
  state = { value: 0 };
  
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
    console.log( value===1 );
  };

  render() {
    const { value } = this.state;

    return <div>
        <AppBar position="static">
          <Tabs className={classes.TabItem} value={value} onChange={this.handleChange} scrollable scrollButtons="off">
            {/* <Tab value={0} icon={<Home />} label="Home" />
            <Tab value={1} icon={<SupervisorAccount />} label="About us" />
            <Tab value={2} icon={<PermPhoneMsg />} label="Contact us" /> */}
            <Tab icon={<Home />} label="Home" />
            <Tab icon={<SupervisorAccount />} label="About us" />
            <Tab icon={<PermPhoneMsg />} label="Contact us" />
          </Tabs>
        </AppBar>
      </div>;
  }
}
export default withRouter(Footer);