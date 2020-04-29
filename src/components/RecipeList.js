import React from 'react';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';

import recipes from '../data/recipes.json';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 16px 0;
`;

const RecipeList = () => {
  return (
    <Flex>
      {recipes.map((r, index) => (
        <RecipeCard {...r} key={index} />
      ))}
    </Flex>
  );
};

export default RecipeList;
