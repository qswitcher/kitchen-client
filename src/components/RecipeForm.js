import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import {
  Card,
  InputGroup,
  Submit,
  Button,
  AlertDanger,
  Col,
  Row,
} from './ui-toolkit';
import { useInputs } from '../hooks/input-hooks';
import { ReactComponent as CameraIcon } from '../images/camera-icon.svg';
import { s3Upload, imageUrl } from '../utils/aws';
import { onError } from '../utils/errors';

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

const PhotoUploadWrapper = styled.label`
  cursor: pointer;
  display: block;
  margin-top: 16px;
  height: 100%;

  input[type='file'] {
    display: none;
  }
`;

const PlaceHolder = styled.div`
  border: 1px dashed #c2c2c2;
  border-radius: 4px;
  padding: 16px;
  text-align: center;

  svg {
    margin: auto;
    width: 192px;
    fill: #c2c2c2; // #f5f5f4 20% dark
  }
`;

const RecipeForm = ({
  title: pageTitle,
  onSubmit,
  onCancel,
  initialValues,
}) => {
  const {
    photo,
    title,
    shortDescription,
    longDescription,
    ingredients,
    instructions,
  } = initialValues;
  const file = useRef(null);
  const [image, setImage] = useState({
    preview: (photo && imageUrl(photo)) || '',
    raw: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { bind, reset, values } = useInputs({
    title,
    shortDescription,
    longDescription,
    ingredients,
    instructions,
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const validateValues = (values) =>
    Object.keys(values)
      .map((key) =>
        Array.isArray(values[key]) ? values[key].length > 0 : !!values[key]
      )
      .filter((v) => !v).length === 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!validateValues(values) || (!photo && !file.current)) {
      setErrorMessage('All fields are required');
      return;
    }

    setIsLoading(true);

    // if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert(
    //     `Please pick a file smaller than ${
    //       config.MAX_ATTACHMENT_SIZE / 1000000
    //     } MB.`
    //   );
    //   return;
    // }

    try {
      const newPhoto = file.current ? await s3Upload(file.current) : photo;

      await onSubmit({ ...values, photo: newPhoto });

      setIsLoading(false);
    } catch (e) {
      setErrorMessage(onError(e));
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      file.current = e.target.files[0];
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (validateValues(values) && image.preview) {
      setErrorMessage('');
    }
  }, [values, image]);

  return (
    <Card padding="32px" margin="32px 0">
      <h1>{pageTitle}</h1>
      <form>
        <Row>
          <Col w="600px">
            <PhotoUploadWrapper>
              {image.preview ? (
                <img src={image.preview} alt="dummy" />
              ) : (
                <PlaceHolder>
                  <CameraIcon />
                  <div>Click to upload photo</div>
                  <SubTitle>Minimum size 800 x 400</SubTitle>
                </PlaceHolder>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </PhotoUploadWrapper>
          </Col>
          <Col>
            <InputGroup>
              <label>Title</label>
              <input type="text" {...bind.title} />
            </InputGroup>
            <InputGroup>
              <label>Short Description</label>
              <textarea rows="3" {...bind.shortDescription} />
            </InputGroup>
            <InputGroup>
              <label>Description</label>
              <textarea rows="5" {...bind.longDescription} />
            </InputGroup>
            <InputGroup>
              <label>Ingredients</label>
              <textarea
                rows="10"
                placeholder="Place each ingredient on its own line"
                {...bind.ingredients}
              />
            </InputGroup>
            <InputGroup>
              <label>Instructions</label>
              <textarea
                rows="5"
                placeholder="Place each step on its own line"
                {...bind.instructions}
              />
            </InputGroup>
            <ButtonBar>
              <Submit onClick={handleSubmit} loading={isLoading}>
                Save
              </Submit>
              <Button onClick={handleCancel}>Cancel</Button>
            </ButtonBar>
            {errorMessage && <AlertDanger>{errorMessage}</AlertDanger>}
          </Col>
        </Row>
      </form>
    </Card>
  );
};

export default RecipeForm;
