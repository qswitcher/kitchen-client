import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useHistory, useParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';

const GET_RECIPE = gql`
  query GetRecipe($slug: String!) {
    recipe(slug: $slug) {
      slug
      title
      shortDescription
      longDescription
      instructions
      ingredients
      photo
    }
  }
`;

const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($recipe: RecipeUpdateInput!) {
    updateRecipe(recipe: $recipe) {
      slug
      title
      shortDescription
      longDescription
      ingredients
      instructions
      photo
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
    // add in the slug since it's not part of the form
    await updateRecipe({ variables: { recipe: { ...recipe, slug } } });
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
