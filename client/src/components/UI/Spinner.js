import React from 'react';
import Spin from "react-spinner-material";

import classes from './UI.css';

const Spinner = () => {
  return <div className={classes.SpinnerContainer}>
      <Spin size={70} spinnerColor={"#f704f3"} spinnerWidth={3} visible={true} />
    </div>;
};

export default Spinner;