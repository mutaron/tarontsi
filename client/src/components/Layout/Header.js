import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel
} from "material-ui";
import { connect } from "react-redux";
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import TarontsiLogo from '../../assets/images/logo.jpg';
import classes from './MainLayout.css';

class Header extends Component {
  state = {
    auth: false
  };

  handleChange = (event, checked) => {
    this.setState({
      auth: checked,
    } );
    console.log(this.props);
    this.state.auth ? this.props.history.push("/logout") : this.props.history.push("/login");
  };

  render() {
    const { auth } = this.state;
    return (
      <AppBar position="static">
        <Toolbar>
          <img
            className={classes.TopImage}
            src={TarontsiLogo}
            alt="Tarontsi Logo"
          />
          <Typography
            className={classes.TopTitle}
            variant="display1"
            color="inherit"
          >
            T A R O N T S I
          </Typography>
          <FormGroup className={auth ? classes.Logout : classes.Login}>
            <FormControlLabel
              control={<Switch checked={auth} onChange={this.handleChange} />}
               label={auth ? 'Logout' : 'Login'}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    );
    // return
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};
export default withRouter(connect(mapStateToProps)(Header));
