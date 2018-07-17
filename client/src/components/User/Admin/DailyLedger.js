import React, { Component, Fragment } from 'react';
import { AddCircle, RemoveCircle } from "material-ui-icons";
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  FormHelperText
} from "material-ui";
import moment from 'moment';
import { connect } from "react-redux";

import AdminLayout from "./AdminLayout";
import classes from "./Admin.css";
import CustomInput from "../../UI/Input";
import * as actions from "../../../store/actions/index";
import Spinner from "../../UI/Spinner";
import { updateObject, checkValidity } from "../../../shared/utility";

class DailyLedger extends Component {
  state = {
    controls: {
      Date: {
        elementType: "input",
        elementConfig: {
          type: "date",
          label: "Date",
          placeholder: ""
        },
        value: moment(Date.now()).format("YYYY-MM-DD"),
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      Amount: {
        elementType: "input",
        elementConfig: {
          type: "number",
          label: "Amount",
          placeholder: "Amount"
        },
        value: "",
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      Description: {
        elementType: "input",
        elementConfig: {
          type: "input",
          label: "Description",
          placeholder: "Description"
        },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      }
    },
    debit: {
      paycheck: "Paycheck",
      food: "Food",
      drugs: "Drugs",
      other: "Other"
    },
    credit: {
      milk: "Milk",
      pig: "Meat Pig",
      cow: "Meat Cow"
    },
    action: true,
    category: "pig",
    subcategory: "pig"
  };

  submitHandler = e => {
    e.preventDefault();
    const ledger = {
      debit_credit: this.state.action ? "+" : "-",
      entry_date: this.state.controls.Date.value,
      amount: this.state.controls.Amount.value,
      created_by: this.props.user._id,
      updated_by: this.props.user._id,
      description: this.state.controls.Description.value,
      category: this.state.category,
      subcategory: this.state.subcategory
    };
    this.props.onAddLedger(this.props.user._id, ledger);
  };

  categoryChangeHandler = e => {
    this.setState({ category: e.target.value });
  };
  subcategoryChangeHandler = e => {
    this.setState({ subcategory: e.target.value });
  };

  inputChangedHandler = (event, controlName) => {
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

  plusMinusButtonClickHandler = () => {
    this.setState( { action: !this.state.action } );
  };

  render() {
    const { action } = this.state;
    const formElementsArray = [];

    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElementsArray.map(formElement => (
      <CustomInput
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
    //const date = moment( Date.now()).format ("YYYY-MM-DD" );
    let icon = <AddCircle />;
    if (!action) {
      icon = <RemoveCircle />;
    }
    let d_c = null;
    if ( this.state.action ) {
      d_c = { ...this.state.credit };
    }
    else {
      d_c = { ...this.state.debit };     
    }
    let dcArray = [];

    for (let key in d_c) {
      dcArray.push(<MenuItem key={key} value={key}>{d_c[key]}</MenuItem>);
      
    }

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.error}>{this.props.error}</p>;
    } else {
      errorMessage = (
        <p className={classes.success}>Data was entered successfully</p>
      );
    }
    form = (
      <Fragment>
        <div className={classes.MainContainer}>
          <Button
            className={classes.AddButton}
            color="secondary"
            onClick={this.plusMinusButtonClickHandler}
          >
            {icon}
          </Button>

          {form}
          <div className={classes.FormControl}>
            <FormControl className={classes.control}>
              <InputLabel htmlFor="catigory">Category</InputLabel>
              <Select
                value={this.state.category}
                onChange={this.categoryChangeHandler}
                input={<Input name="catigory" id="catigory" />}
              >
                <MenuItem value={"pig"}>Pig</MenuItem>
                <MenuItem value={"cow"}>Cow</MenuItem>
              </Select>
              <FormHelperText>Select category</FormHelperText>
            </FormControl>
          </div>
          <div className={classes.FormControl}>
            <FormControl className={classes.control}>
              <InputLabel htmlFor="sub-category">Sub Category</InputLabel>
              <Select
                value={this.state.subcategory}
                onChange={this.subcategoryChangeHandler}
                input={<Input name="sub-category" id="sub-category" />}
              >
                {dcArray}
              </Select>
              <FormHelperText>Select sub-category</FormHelperText>
            </FormControl>
          </div>
        </div>
        <br />
        <br />
        <Button
          onClick={this.submitHandler}
          type="submit"
          color="primary"
          variant="raised"
        >
          Add
        </Button>
      </Fragment>
    );
    return (
      <AdminLayout>
        <form onSubmit={this.submitHandler}>
          <Card className={classes.Card}>
            <CardContent>
              <Typography
                variant="display1"
                align="center"
                color="textSecondary"
              >
                Daily GL entry
              </Typography>
              {form}
              {errorMessage}
            </CardContent>
          </Card>
        </form>
      </AdminLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.admin.error
  };
};
const mapDispatchToProps = dispatch => {
  return { onAddLedger: (id, ledger) => dispatch(actions.adminAddLedger(id, ledger)) };
};

export default connect( mapStateToProps, mapDispatchToProps )( DailyLedger );