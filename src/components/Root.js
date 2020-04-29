import React from 'react';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import RecipeList from './RecipeList';

function Root() {
  return (
    <BrowserRouter>
      <Layout>
        <RecipeList />
      </Layout>
    </BrowserRouter>
  );
}

export default Root;
