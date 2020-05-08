import React, { useState, useEffect } from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Auth } from 'aws-amplify';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { AppContext } from '../contexts/app-context';
import Layout from './Layout';
import RecipeList from './RecipeList';
import CreateRecipe from './CreateRecipe';
import Login from './Login';
import authLink from '../authLink';
import RecipeDetails from './RecipeDetails';
import EditRecipe from './EditRecipe';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: (object) => object.slug || null,
  }),
});

function Root() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating && (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AppContext.Provider
            value={{ isAuthenticated, userHasAuthenticated }}
          >
            <Layout>
              <Switch>
                {!isAuthenticated && (
                  <Route path="/login">
                    <Login />
                  </Route>
                )}
                {isAuthenticated && (
                  <Route path="/edit/:slug">
                    <EditRecipe />
                  </Route>
                )}
                {isAuthenticated && (
                  <Route path="/create-recipe">
                    <CreateRecipe />
                  </Route>
                )}
                <Route path="/recipe/:slug">
                  <RecipeDetails />
                </Route>
                <Route>
                  <RecipeList />
                </Route>
              </Switch>
            </Layout>
          </AppContext.Provider>
        </BrowserRouter>
      </ApolloProvider>
    )
  );
}

export default Root;
