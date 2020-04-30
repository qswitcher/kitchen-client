import React from 'react';
import Layout from './Layout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RecipeList from './RecipeList';
import CreateRecipe from './CreateRecipe';

function Root() {
  return (
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
  );
}

export default Root;
