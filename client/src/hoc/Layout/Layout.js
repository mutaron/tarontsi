import React, { Component } from 'react';
import classes from './Layout.css';
import Header from "../../components/Layout/Header";
import Footer from '../../components/Layout/Footer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  }

  sideDrawerToggleHandler = () => {
    this.setState( ( prevState ) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    } );
  }

  render() {
    return (
      <div>
        <Header/>
        <main className={ classes.Content }>
          { this.props.children }
        </main>
        <Footer/>
      </div>
    );
  }
}

export default Layout;