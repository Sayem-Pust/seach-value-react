import React from "react";
import {Route, Redirect} from 'react-router-dom'


function PrivateRoute({ children, isAuthenticated, ...rest }) {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
}



export default  PrivateRoute
