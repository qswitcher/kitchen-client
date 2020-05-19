import React from 'react';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useQueryParams } from '../hooks/url-hooks';
import Pager from './Pager';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    margin: -16px -16px 0 -16px;
  }
`;

const GET_RECIPES = gql`
  query GetRecipes($input: SearchInput!) {
    recipeSearch(input: $input) {
      items {
        id
        slug
        title
        shortDescription
        thumbnail
        photo
      }
      page
      pageCount
      pageSize
    }
  }
`;

const RecipeList = () => {
  const params = useQueryParams();
  const page = parseInt(params.page || '1', 10);
  const { data, loading } = useQuery(GET_RECIPES, {
    variables: {
      input: {
        q: '',
        page,
        pageSize: 12,
      },
    },
  });
  if (loading || !data) {
    return <div>Loading...</div>;
  }
  const {
    recipeSearch: { items, pageCount },
  } = data;
  return (
    <>
      <Flex>
        {items.map((r, index) => (
          <RecipeCard {...r} key={index} />
        ))}
      </Flex>
      <Pager page={page} pageCount={pageCount} />
    </>
  );
};

export default RecipeList;
