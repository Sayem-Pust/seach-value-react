import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from "./components/Header";
import Alert from "./components/Alert";
import Home from './pages/Home'
import Search from './pages/Search';
import Login from './pages/Login';
import Task from './pages/Task';
import {authCheckState} from './redux/auth/actions'
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";


function App(props) {
  useEffect(() => {
    props.onTryAutoSignup();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Header {...props} />
      <Alert />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute exact path="/search" {...props}>
          <Search />
        </PrivateRoute>
        <PrivateRoute exact path="/task" {...props}>
          <Task />
        </PrivateRoute>
        <Route path="/login">
            <Login />
          </Route>
        
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
