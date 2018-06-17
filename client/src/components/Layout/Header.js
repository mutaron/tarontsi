import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel
} from "material-ui";
import React, { Component } from 'react';

class componentName extends Component {
  render() {
    return <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Tarontsi
          </Typography>
          <FormGroup color="inherit">
            <FormControlLabel control={<Switch checked={true} aria-label="LoginSwitch" />} label={"Login"} />
          </FormGroup>
        </Toolbar>
      </AppBar>;
  }
}

export default componentName;
