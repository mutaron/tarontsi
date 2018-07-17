import React from "react";
import {
  Grid,
  Paper
} from "material-ui";

import classes from "./Admin.css";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = (props) => {
      return <Grid className={ classes.container } container>
        <Grid item xs={ 2 }>
          <Paper style={{margin: '10px'} }>
            <AdminSideBar />
          </Paper>
        </Grid>
        <Grid item xs={ 10 }>
          <Paper style={{width: '100%', margin: '10px'} }>
            {props.children}
          </Paper>
        </Grid>
      </Grid>;
}
export default AdminLayout;
