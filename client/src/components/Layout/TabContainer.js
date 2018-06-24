import React from 'react';
import { Typography } from "material-ui";

const TabContainer = (props) => {
  return
  <div>
    <Typography style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  </div>;

};

export default TabContainer;