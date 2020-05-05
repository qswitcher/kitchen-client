import React from 'react';
import styled from 'styled-components';

import { Card, InputGroup, Submit, Button } from './ui-toolkit';
import { useInput } from '../hooks/input-hooks';
import { ReactComponent as CameraIcon } from '../images/camera-icon.svg';
import { useHistory } from 'react-router-dom';

const Col = styled.div`
  width: ${(props) => props.width || '100%'};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  & > * + * {
    margin-left: 32px;
  }
`;

const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  & > * + * {
    margin-left: 16px;
  }
`;

const SubTitle = styled.div`
  font-size: 0.75em;
`;

const PhotoUploadWrapper = styled.div`
  margin-top: 16px;
  padding: 16px;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  border: 1px dashed #c2c2c2;

  svg {
    margin: auto;
    width: 192px;
    fill: #c2c2c2; // #f5f5f4 20% dark
  }
`;

const CreateRecipe = () => {
  const history = useHistory();
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

  const handleCancel = () => {
    resetTitle();
    resetShortDescription();
    resetDescription();
    resetIngredients();
    resetInstructions();
    history.goBack();
  };

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
          <Col width="600px">
            <PhotoUploadWrapper>
              <CameraIcon />
              <div>Click to upload photo</div>
              <SubTitle>Minimum size 800 x 400</SubTitle>
            </PhotoUploadWrapper>
          </Col>
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
            <InputGroup>
              <label>Ingredients</label>
              <textarea
                placeholder="Place each ingredient on its own line"
                {...bindIngredients}
              />
            </InputGroup>
            <InputGroup>
              <label>Instructions</label>
              <textarea
                placeholder="Place each step on its own line"
                {...bindInstructions}
              />
            </InputGroup>
            <ButtonBar>
              <Submit type="submit" value="Save" />
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonBar>
          </Col>
        </Row>
      </form>
    </Card>
  );
};

export default CreateRecipe;
