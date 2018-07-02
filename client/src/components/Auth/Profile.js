import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Card, CardContent, Typography, Button } from "material-ui";

import { updateObject, checkValidity } from "../../shared/utility";
import classes from "./Auth.css";
import Input from "../UI/Input";
import * as actions from "../../store/actions/index";
import Spinner from "../UI/Spinner";

class Profile extends Component {
  state = {
    controls: {
      Email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          label: "Email",
          placeholder: "Email address"
        },
        value: "",
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
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      ConfirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          label: "Confirm Password",
          placeholder: "6 or more charachters"
        },
        value: "",
        validation: {
          required: true,
          compaire: true
        },
        valid: false,
        touched: false
      },
      FirstName: {
        elementType: "input",
        elementConfig: {
          type: "input",
          label: "First name",
          placeholder: "First name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      LastName: {
        elementType: "input",
        elementConfig: {
          type: "input",
          label: "Last name",
          placeholder: "Last name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    }
  };
  submitHandler = e => {
    e.preventDefault();
    const user = {
      email: this.state.controls.Email.value,
      password: this.state.controls.Password.value,
      firstname: this.state.controls.FirstName.value,
      lastname: this.state.controls.LastName.value
    };
    this.props.onRegister( user );

    if (this.props.isAuth) {
      this.props.history.push("/");
    }
  };
  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid:
          controlName === "ConfirmPassword"
            ? checkValidity(
                this.state.controls["Password"].value,
                this.state.controls[controlName].validation,
                event.target.value
              )
            : checkValidity(
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
          Let's go!
        </Button>
        <br />
      </Fragment>
    );
    if ( this.props.user && !this.props.user.active )
    {
      form = <p className={classes.error}>You are already registered, you just need to activate your profile</p>;
    }  
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.error}>{this.props.error}</p>;
    }

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                variant="display1"
                align="center"
                color="textSecondary"
              >
                Sign up
              </Typography>
              {form}
              {errorMessage}
            </CardContent>
          </Card>
        </form>
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
    onRegister: (user) => dispatch(actions.authRegister(user))
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Profile );