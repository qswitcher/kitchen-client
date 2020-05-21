import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../contexts/app-context';

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated } = useAppContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
