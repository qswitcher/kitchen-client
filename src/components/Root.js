import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Layout from './Layout';
import RecipeList from './RecipeList';
import CreateRecipe from './CreateRecipe';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import authLink from '../authLink';
import RecipeDetails from './RecipeDetails';
import EditRecipe from './EditRecipe';
import AuthenticatedRoute from './AuthenticatedRoute';
import config from '../config';
import { AppContextProvider } from '../contexts/app-context';

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? '/graphql'
      : `${config.apiGateway.URL}/graphql`,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Root() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AppContextProvider>
          <Layout>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/reset-password">
                <ResetPassword />
              </Route>
              <AuthenticatedRoute path="/edit/:slug">
                <EditRecipe />
              </AuthenticatedRoute>
              <AuthenticatedRoute path="/create-recipe">
                <CreateRecipe />
              </AuthenticatedRoute>
              <Route path="/recipe/:slug">
                <RecipeDetails />
              </Route>
              <Route>
                <RecipeList />
              </Route>
            </Switch>
          </Layout>
        </AppContextProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
