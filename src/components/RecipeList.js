import React from 'react';
import RecipeCard from './RecipeCard';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useQueryParams } from '../hooks/url-hooks';
import Pager from './Pager';
import { AlertInfo, Loader } from './ui-toolkit';
import ResultsMetaBar from './ResultsMetaBar';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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
      resultCount
    }
  }
`;

const RecipeList = () => {
  const params = useQueryParams();
  const page = parseInt(params.page || '1', 10);
  const { q } = params;
  const { data, loading } = useQuery(GET_RECIPES, {
    variables: {
      input: {
        q: q || '',
        page,
        pageSize: 12,
      },
    },
  });
  if (loading || !data) {
    return <Loader />;
  }
  const {
    recipeSearch: { items, pageCount, resultCount },
  } = data;

  if (items.length === 0) {
    return (
      <AlertInfo>
        We couldn't find anything! Try searching for something else.
      </AlertInfo>
    );
  }
  return (
    <>
      {q && <ResultsMetaBar numResults={resultCount} q={q} />}
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
