import React, { Component } from "react";
import * as actions from "../store/actions";
import { connect } from "react-redux";

export default function(ComposedClass, protectionLevel) {
  class AuthenticationCheck extends Component {
    
    constructor( props ) {
      super( props );      
      this.props.onCheckAuth( this.props.selectedTab );
      this.state = {
        selectedTab:localStorage.getItem( "selectedTab" )
      }
    }
    
    static getDerivedStateFromProps ( props ) {
      if ( protectionLevel === '-1' &&  props.isAuth ) {
        return props.history.push("/") || null;        
      }
      return null;
    }

    render() {
      return <ComposedClass {...this.props} user={this.props.user} />;
    }
  }

  function mapStateToProps ( state ) {
    return {
      isAuth: state.auth.isAuth,
      user: state.auth.user,
      selectedTab: state.auth.selectedTab      
    };
  }
  const mapDispatchToProps = dispatch => {
    return { onCheckAuth: tabindex => dispatch(actions.authCheck(tabindex)) };
  };
  return connect( mapStateToProps, mapDispatchToProps )(AuthenticationCheck);
}
