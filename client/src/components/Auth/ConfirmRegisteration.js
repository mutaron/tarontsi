import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardContent } from "material-ui";

import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner";
import classes from "./Auth.css";

class ConfirmRegisteration extends Component {
  constructor(props) {
    super( props );
    this.props.match.params.id;
    this.props.onConfirmRegisteration(this.props.match.params.id);
  };

  render() {
    let form = "";
    const { user } = this.props;
      
    console.log(user)
    if (user && user.active)
      form = <p className={classes.error}>You profile has been activated</p>;
    else form = <p className={classes.error}>Invalid token</p>;

    if (this.props.loading) {
      form = <Spinner />;
    };

    if (this.props.error) {
      form = <p className={classes.error}>{this.props.error}</p>;
    }

    return (
      <div>
        <Card className={classes.Card}>
          <CardContent>{form}</CardContent>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuth: state.auth.isAuth,
    user: state.auth.user,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onConfirmRegisteration: id => dispatch(actions.authConfirmRegisteration(id))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )(ConfirmRegisteration);