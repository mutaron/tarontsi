import React, { Fragment, Component } from "react";
import {
  Avatar,
  Typography,
} from "material-ui";
import {
  Face,
  SentimentSatisfied
} from "material-ui-icons";

import classes from "./MainLayout.css";
import Menu from "../UI/Menu";

class HeaderAvatar extends Component {

  render () {
    const options = {
      newUserOptions: {
        options1: {
          name: "Create Profile",
          url: "/profile",
        }
      },
      loggedinUserOptions: {
        options1: {
          name: "Edit Profile",
          url: "/profile",
        },
        options2: {
          name: "Change Password",
          url: "/change_password",
        }
      }
    }
    const { isAuth, user } = this.props;

    const avat = (
      <Fragment>
        <Avatar className={classes.Avatar}>
          {isAuth ? <SentimentSatisfied /> : <Face />}
        </Avatar>
        <Menu
          options = {isAuth ? options.loggedinUserOptions : options.newUserOptions}
        />
      </Fragment>
    );
    const form = user ? (
      <Fragment>
        <Typography variant="caption" color="inherit">
          Logged in as:
        </Typography>
        <Typography className={classes.TopTitleAvatar} variant="body1">
          {`${user.firstname}, ${user.lastname}`}
        </Typography>
        {avat}
      </Fragment>
    ) : (
      <Fragment>{avat}</Fragment>
    );
    return <div className={classes.AvatarContainer}>{form}</div>;
  }
};

export default HeaderAvatar;