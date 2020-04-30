import React from 'react';
import styled from 'styled-components';

import { Card } from './ui-toolkit';
import { useInput } from '../hooks/input-hooks';

const InputGroup = styled.div`
  margin: 16px 0;
  width: 100%;

  input,
  textarea {
    color: #676767;
    width: 100%;
    background-color: #f5f5f5;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
  }

  & > * {
    display: block;
  }
`;

const Col = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  & > div + div {
    margin-left: 32px;
  }
`;

const Submit = styled.input`
  background-color: #6ba72b;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-top: 16px;
  min-width: 160px;
`;

const CreateRecipe = () => {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput('');
  const {
    value: shortDescription,
    bind: bindShortDescription,
    reset: resetShortDescription,
  } = useInput('');
  const {
    value: description,
    bind: bindDescription,
    reset: resetDescription,
  } = useInput('');
  const {
    value: ingredients,
    bind: bindIngredients,
    reset: resetIngredients,
  } = useInput('');
  const {
    value: instructions,
    bind: bindInstructions,
    reset: resetInstructions,
  } = useInput('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log({
      title,
      shortDescription,
      description,
      ingredients,
      instructions,
    });
    resetTitle();
    resetShortDescription();
    resetDescription();
    resetIngredients();
    resetInstructions();
  };

  return (
    <Card padding="32px" margin="32px 0">
      <h1>Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <InputGroup>
              <label>Title</label>
              <input type="text" {...bindTitle} />
            </InputGroup>
            <InputGroup>
              <label>Short Description</label>
              <textarea {...bindShortDescription} />
            </InputGroup>
            <InputGroup>
              <label>Description</label>
              <textarea {...bindDescription} />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <label>Ingredients</label>
              <textarea {...bindIngredients} />
            </InputGroup>
            <InputGroup>
              <label>Instructions</label>
              <textarea {...bindInstructions} />
            </InputGroup>
          </Col>
        </Row>
        <Submit type="submit" value="Save" />
      </form>
    </Card>
  );
};

export default CreateRecipe;