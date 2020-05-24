import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import {
  faEyeDropper,
  faSortNumericDown,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

import { useAppContext } from '../contexts/app-context';
import {
  Card as BaseCard,
  SubTitle,
  Title,
  Col2,
  Row,
  Link,
  Loader,
} from './ui-toolkit';
import Checkbox from './Checkbox';
import { imageUrl, remove } from '../utils/aws';

const GET_RECIPE = gql`
  query GetRecipe($slug: String!) {
    recipe(slug: $slug) {
      id
      title
      longDescription
      instructions
      ingredients
      thumbnail
      photo
    }
  }
`;

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
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

// TODO add tooltips
const IconWrapper = styled.span`
  margin-left: 32px;
  transition: all 0.2s ease-in-out;
  font-size: 22px;
  &:hover {
    color: #6ba72b;
    cursor: pointer;
  }
`;

const Img = styled.img`
  max-height: 477px;
  width: 100%;
  object-fit: cover;
`;

const ToolBar = styled.div``;

const Header = styled.div`
  width: 100%;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
`;

const RecipeDetails = () => {
  const history = useHistory();
  const { isAuthenticated } = useAppContext();
  const [checked, setChecked] = useState({ ingredients: [], instructions: [] });
  const { slug } = useParams();
  const { data, loading } = useQuery(GET_RECIPE, {
    variables: { slug },
  });
  const { id } = (data && data.recipe) || {};
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    variables: { id },
  });

  const toggle = (key, index) => {
    checked[key][index] = !checked[key][index];
    // unpack to force re-render
    setChecked({ ...checked });
  };

  if (loading || !data) {
    return <Loader />;
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await deleteRecipe();
      if (photo) await remove(photo);
      history.push('/recipes');
    }
  };

  const renderSectionTitle = (section, index) => {
    const parts = section.split('#', 2);
    return (
      <SubTitle fontSize="18px" key={index}>
        <strong>{parts[1].trim()}</strong>
      </SubTitle>
    );
  };

  return (
    <Card>
      <Img src={photo ? imageUrl(photo) : thumbnail} />
      <CardDetails>
        <Header>
          <Title>{title}</Title>
          {isAuthenticated && (
            <ToolBar>
              <IconWrapper>
                <Link to={`/edit/${slug}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </IconWrapper>
              <IconWrapper onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </IconWrapper>
            </ToolBar>
          )}
        </Header>
        <Text>{longDescription}</Text>
        <Separator />
        <Row>
          <Col2>
            <SubTitle>
              <FontAwesomeIcon icon={faEyeDropper} color="#6ba72b" />
              <span>Ingredients</span>
            </SubTitle>
            <List>
              {ingredients.map((ingredient, index) => {
                return ingredient.indexOf('#') === 0 ? (
                  renderSectionTitle(ingredient)
                ) : (
                  <NakedLi key={index}>
                    <Checkbox
                      checked={!!checked.ingredients[index]}
                      onCheck={() => toggle('ingredients', index)}
                      label={ingredient}
                    />
                  </NakedLi>
                );
              })}
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
