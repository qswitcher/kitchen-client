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
`;

const GET_RECIPES = gql`
  query GetRecipes($page: Int!, $pageSize: Int!) {
    recipes(page: $page, pageSize: $pageSize) {
      items {
        slug
        title
        shortDescription
        thumbnail
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
      page,
      pageSize: 12,
    },
  });
  console.log(data);
  if (loading || !data) {
    return <div>Loading...</div>;
  }
  const {
    recipes: { items, pageCount },
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
