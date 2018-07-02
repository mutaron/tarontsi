import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Button
} from "material-ui";

import { updateObject, checkValidity } from '../../shared/utility';
import classes from './Auth.css';
import Input from '../UI/Input';
import * as actions from "../../store/actions/index";
import Spinner from '../UI/Spinner';

class Login extends Component {
  state = {
    controls: {
      Email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          label: "Email",
          placeholder: "Email address"
        },
        value: "mutaron@yahoo.com",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      Password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Password",
          placeholder: "6 or more charachters"
        },
        value: "123456",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };
  
  submitHandler = e => {
    e.preventDefault();
    this.props.onLogin(
      this.state.controls.Email.value,
      this.state.controls.Password.value
    );

    if (this.props.isAuth) {
      this.props.history.push("/");
    }
  };

  inputChangedHandler = ( event, controlName ) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        id={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    form = (
      <Fragment>
        {form}
        <br />
        <Button
          onClick={this.submitHandler}
          type="submit"
          color="primary"
          variant="raised"
        >
          Login
        </Button>
        <br />
      </Fragment>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.error}>{this.props.error}</p>;
    }

    return (
      <Fragment>
        <form onSubmit={this.submitHandler}>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                variant="display1"
                align="center"
                color="textSecondary"
              >
                Login
              </Typography>
              {form}
              <br />
              {errorMessage}
              <Typography
                variant="caption"
                align="center"
                color="textSecondary"
              >
                Not a member?
              </Typography>
              <Button>Sign up</Button>
            </CardContent>
          </Card>
        </form>
      </Fragment>
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
  return { onLogin: (email, password) => dispatch(actions.authLogin(email, password)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);