import React from 'react';
import {
  Input,
  InputLabel,
  Typography,
  FormHelperText,
  FormControl,
  Button,
  InputAdornment
} from "material-ui";
import { AccountCircle, Lock } from "material-ui-icons";

const CustomInput = props => {
  let inputElement = null;
  //let err = false;

  if (props.invalid && props.shouldValidate && props.touched) {
    //props.elementConfig.push("error");
  }
  switch (props.elementType) {
    case "input":
      let icon = null;  
      if ( props.id  === 'Password' ) {
           icon = <Lock />;
         } 
         else
        {
          icon = <AccountCircle />;
        }

      inputElement = 
            <FormControl>
              <InputLabel htmlFor={props.id}>{props.id}</InputLabel>
              <Input
                startAdornment= {
                  <InputAdornment position="start">
                    {icon}
                  </InputAdornment>
                } 
                value={props.value}
                onChange={props.changed}
                {...props.elementConfig}
              />
              <FormHelperText id={`${props.id}-error-text`} />
            </FormControl>
      
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