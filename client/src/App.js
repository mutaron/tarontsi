import React, { Component } from 'react';

class App extends Component {
  render () {
    let routes = (
      <Switch>
        <Route path="/login" component={ asyncAuth } />
        <Route path="/about" exact component={ BurgerBuilder } />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          { routes }
        </Layout>
      </div>
    );
  }
}

export default App;
