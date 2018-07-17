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
import HeaderAvatar from './HeaderAvatar';
import * as actions from "../../store/actions";

class Header extends Component {

  switchChangeHandler = ( event, checked ) => {
    if ( this.props.isAuth )
    {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("user");
      localStorage.removeItem("selectedTab");
      this.props.onLogout();
    } 
    this.props.isAuth ? this.props.history.push("/") : this.props.history.push("/login");    
  };

  render () {
    const { isAuth, user } = this.props;
    return <AppBar position="static">
        <Toolbar>
          <img className={classes.TopImage} src={TarontsiLogo} alt="Tarontsi Logo" />
          <Typography className={classes.TopTitle} color="inherit">
            T A R O N T S I
          </Typography>
          <FormGroup className={isAuth ? classes.Logout : classes.Login}>
            <HeaderAvatar isAuth={isAuth} user={user} />
            <FormControlLabel control={<Switch checked={isAuth} onChange={this.switchChangeHandler} />} label={isAuth ? "Logout" : "Login"} />
          </FormGroup>
        </Toolbar>
      </AppBar>;
  }
}
const mapStateToProps = state => {  
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    isAuth: state.auth.isAuth
  };
};
const mapDispatchToProps = dispatch => {
  return { onLogout: () => dispatch(actions.authLogout()) };
};
export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )( withRouter( Header ) );
