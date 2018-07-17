import React, { Component } from "react";
import * as actions from "../store/actions";
import { connect } from "react-redux";

export default function(ComposedClass, protectionLevel) {
  class AuthenticationCheck extends Component {
    
    constructor( props ) {
      super( props );      
      this.props.onCheckAuth( );
      this.state = {
        //selectedTab: localStorage.getItem( "selectedTab" )
      }
    }
    
    static getDerivedStateFromProps ( props ) {
      const { user } = props;
      //const role = user ? user.role : 0
      if ( user ) {
        if (protectionLevel === "-1" && props.isAuth) {
          return props.history.push("/") || null;
        }
        if ((protectionLevel === "1" || protectionLevel === "2") && !props.isAuth) {
          return props.history.push("/") || null;
        } else if (protectionLevel === "3" && user.role !== 3) {
          return props.history.push("/") || null;
        }
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
      user: state.auth.user     
    };
  }
  const mapDispatchToProps = dispatch => {
    return { onCheckAuth: () => dispatch(actions.authCheck()) };
  };
  return connect( mapStateToProps, mapDispatchToProps )(AuthenticationCheck);
}
