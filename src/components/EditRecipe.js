import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useHistory, useParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';

const GET_RECIPE = gql`
  query GetRecipe($slug: String!) {
    recipe(slug: $slug) {
      id
      slug
      title
      shortDescription
      longDescription
      instructions
      ingredients
      photo
      originalUrl
    }
  }
`;

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipe: RecipeUpdateInput!) {
    updateRecipe(recipe: $recipe) {
      id
      slug
      title
      shortDescription
      longDescription
      ingredients
      instructions
      photo
      originalUrl
    }
  }
`;

const UpdateRecipe = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { data, loading } = useQuery(GET_RECIPE, {
    variables: { slug },
  });
  const [updateRecipe] = useMutation(UPDATE_RECIPE);
  const initialValues = !loading && data && data.recipe;

  const onCancel = () => {
    history.push(`/recipe/${slug}`);
  };

  const onSubmit = async (recipe) => {
    // add in the slug and id since it's not part of the form
    const { id } = initialValues;
    await updateRecipe({ variables: { recipe: { ...recipe, slug, id } } });
    history.push(`/recipe/${slug}`);
  };

  return (
    !loading &&
    data && (
      <RecipeForm
        title="Edit Recipe"
        onSubmit={onSubmit}
        onCancel={onCancel}
        initialValues={initialValues}
      />
    )
  );
};

export default UpdateRecipe;
