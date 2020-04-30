import React from 'react';
import ApolloClient from 'apollo-boost';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Layout from './Layout';
import RecipeList from './RecipeList';
import CreateRecipe from './CreateRecipe';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
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
