import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ( props ) => (
  <ul className={ classes.NavigationItems }>
    <NavigationItem link="/" exact>Home</NavigationItem>
    <NavigationItem link="/about" exact>About</NavigationItem>
    { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
    { !props.isAuthenticated
      ? <NavigationItem link="/auth">Login</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem> }
  </ul>
);

export default NavigationItems;