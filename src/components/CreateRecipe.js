import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { useHistory } from 'react-router-dom';
import RecipeForm from './RecipeForm';

const ADD_RECIPE = gql`
  mutation AddRecipe($recipe: RecipeInput!) {
    createRecipe(recipe: $recipe) {
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

const CreateRecipe = () => {
  const history = useHistory();
  const [createRecipe] = useMutation(ADD_RECIPE);
  const initialValues = {
    shortDescription: '',
    longDescription: '',
    ingredients: [],
    instructions: [],
    title: '',
  };

  const onCancel = () => {
    history.push('/');
  };

  const onSubmit = async (recipe) => {
    await createRecipe({ variables: { recipe } });
    history.push('/');
  };

  return (
    <RecipeForm
      title="Add Recipe"
      onSubmit={onSubmit}
      onCancel={onCancel}
      initialValues={initialValues}
    />
  );
};

export default CreateRecipe;
