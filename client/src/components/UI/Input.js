import React from 'react';
import {
  Input,
  InputLabel,
  FormHelperText,
  FormControl,
  InputAdornment
} from "material-ui";
import {
  AccountCircle,
  Lock,
  InsertInvitation,
  MonetizationOn
} from "material-ui-icons";

import classes from "./UI.css";

const CustomInput = props => {
  let inputElement = null;
  let err = '';
  let error = false;

  if (props.invalid && props.shouldValidate && props.touched) {
    err = "Invalid Field Value";
    error = true;
  }
  switch (props.elementType) {
    case "input":
      let icon = null;  
      if ( props.elementConfig.type  === 'password' ) {
           icon = <Lock />;
      } 
      else if ( props.elementConfig.type === 'date' ) {
        icon = <InsertInvitation />;
      }
      else if ( props.elementConfig.type === 'number' ) {
        icon = <MonetizationOn />;
      }  
      else {
          icon = <AccountCircle />;
      }
      inputElement = <div className={classes.FormControl}>
          <FormControl error={error}>
            <InputLabel htmlFor={props.id}>{props.elementConfig.label}</InputLabel>
            <Input
              startAdornment={
                  <InputAdornment position="start">
                    {icon}
                  </InputAdornment> }
                error={error}  
                value={ props.value }
                onChange={ props.changed }
                { ...props.elementConfig } />
              <FormHelperText id={`${props.id}-error-text`}>
                {err}
              </FormHelperText>
          </FormControl>
        </div>;
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return <div>{inputElement}</div>;
};

export default CustomInput;