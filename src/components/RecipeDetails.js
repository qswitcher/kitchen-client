import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import {
  faEyeDropper,
  faSortNumericDown,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import { Card as BaseCard, SubTitle, Title, Col2, Row } from './ui-toolkit';
import Checkbox from './Checkbox';
import { imageUrl } from '../utils/aws';

const GET_RECIPE = gql`
  query GetRecipe($slug: String!) {
    recipe(slug: $slug) {
      title
      longDescription
      instructions
      ingredients
      thumbnail
      photo
    }
  }
`;

const Card = styled(BaseCard)`
  max-width: 848px;
  margin: auto;
`;

const CardDetails = styled.div`
  padding: 32px;
`;

const Text = styled.p``;

const Separator = styled.hr`
  border: 0;
  border-top: 1px solid #eee;
  margin: 32px 0;
`;

const List = styled.ul`
  padding: 0;
`;

const NakedLi = styled.li`
  list-style-type: none;
`;

const RecipeDetails = () => {
  const [checked, setChecked] = useState({ ingredients: [], instructions: [] });
  const params = useParams();
  const { data, loading } = useQuery(GET_RECIPE, {
    variables: { slug: params.slug },
  });

  const toggle = (key, index) => {
    checked[key][index] = !checked[key][index];
    // unpack to force re-render
    setChecked({ ...checked });
  };

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const {
    recipe: {
      title,
      photo,
      thumbnail,
      longDescription,
      instructions,
      ingredients,
    },
  } = data;

  return (
    <Card>
      <img src={photo ? imageUrl(photo) : thumbnail} />
      <CardDetails>
        <Title>{title}</Title>
        <Text>{longDescription}</Text>
        <Separator />
        <Row>
          <Col2>
            <SubTitle>
              <FontAwesomeIcon icon={faEyeDropper} color="#6ba72b" />
              <span>Ingredients</span>
            </SubTitle>
            <List>
              {ingredients.map((ingredient, index) => (
                <NakedLi key={index}>
                  <Checkbox
                    checked={!!checked.ingredients[index]}
                    onCheck={() => toggle('ingredients', index)}
                    label={ingredient}
                  />
                </NakedLi>
              ))}
            </List>
          </Col2>
          <Col2>
            <SubTitle>
              <FontAwesomeIcon icon={faSortNumericDown} color="#6ba72b" />
              <span>Steps</span>
            </SubTitle>
            <List>
              {instructions.map((instruction, index) => (
                <NakedLi key={index}>
                  <Checkbox
                    align="top"
                    checked={!!checked.instructions[index]}
                    onCheck={() => toggle('instructions', index)}
                    label={instruction}
                  />
                </NakedLi>
              ))}
            </List>
          </Col2>
        </Row>
      </CardDetails>
    </Card>
  );
};

export default RecipeDetails;
