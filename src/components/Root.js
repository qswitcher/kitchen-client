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
import authLink from '../authLink';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function Root() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/create-recipe">
              <CreateRecipe />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route>
              <RecipeList />
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default Root;
