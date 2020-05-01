import React from 'react';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import recipes from '../data/recipes.json';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const GET_RECIPES = gql`
  query GetRecipes($limit: Int!) {
    recipes(limit: $limit) {
      items {
        slug
        title
        shortDescription
        thumbnail
      }
      nextToken
    }
  }
`;

const RecipeList = () => {
  const { data, loading } = useQuery(GET_RECIPES, {
    variables: {
      limit: 6,
    },
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Flex>
      {data.recipes.items.map((r, index) => (
        <RecipeCard {...r} key={index} />
      ))}
    </Flex>
  );
};

export default RecipeList;
