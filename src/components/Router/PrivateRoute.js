import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const CURRENT_USER = useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={(props) => (CURRENT_USER ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
}
