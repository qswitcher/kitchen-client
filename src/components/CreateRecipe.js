import React from 'react';
import styled from 'styled-components';

import { Card } from './ui-toolkit';

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
  return (
    <Card padding="32px" margin="32px 0">
      <h1>Add Recipe</h1>
      <form>
        <Row>
          <Col>
            <InputGroup>
              <label>Title</label>
              <input />
            </InputGroup>
            <InputGroup>
              <label>Short Description</label>
              <textarea />
            </InputGroup>
            <InputGroup>
              <label>Description</label>
              <textarea />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <label>Ingredients</label>
              <textarea />
            </InputGroup>
            <InputGroup>
              <label>Instructions</label>
              <textarea />
            </InputGroup>
          </Col>
        </Row>
        <Submit type="submit" value="Save" />
      </form>
    </Card>
  );
};

export default CreateRecipe;
