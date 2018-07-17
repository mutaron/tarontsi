import React, {Fragment} from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "material-ui";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import { AccountBalanceWallet } from "material-ui-icons";
import { NavLink } from "react-router-dom";

import classes from "./Admin.css";

const AdminSideBar = ( props ) => {
  const items = {
    Ledger: {
      GeneralLedger: {
        text: 'Daily Ledger',
        link: '/admin/ledger'
      },
      LedgerReport: {
        text: 'Ledger Report',
        link: '/admin/ledger_report'
      }
    },
    Pig: {
      PigMothers: {
        text: 'Pig Mothers',
        link: '/admin/pig_mothers'
      },
      Piggletts: {
        text: 'Piggletts',
        link: '/admin/piggletts'
      }
    }
  }
  let form = [];
  
  for ( let key in items ) {
    let menuItemDetail = [];
    const menuArray = [];
    
    menuArray.push( {
      id: key,
      menuitem: items[ key ]
    } );

    menuArray.map( ma => {
      menuItemDetail = [];
      for ( let k in ma.menuitem ) {
        menuItemDetail.push(<ExpansionPanelDetails key={k} className={classes.NavigationItem}>
            <NavLink to={ma.menuitem[k].link} exact={true}>
              {ma.menuitem[k].text}
            </NavLink>
          </ExpansionPanelDetails>);
      }
      return menuItemDetail;
    } );
    
    form.push(<ExpansionPanel expanded={true} key={key}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <AccountBalanceWallet />
          <Typography className={classes.MenuText}>{key}</Typography>
        </ExpansionPanelSummary>
        {menuItemDetail}
      </ExpansionPanel>);

  };

  return <Fragment>
      {form}
    </Fragment>;
};

export default AdminSideBar;