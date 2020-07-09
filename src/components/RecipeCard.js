import React from 'react';
import styled from 'styled-components';
import { Card, Link, SubTitle } from './ui-toolkit';
import { thumbnailUrl } from '../utils/aws';

const Flex = styled.div`
  width: 100%;
  margin: 16px;

  @media (min-width: 768px) {
    width: 50%;
    margin: 0;
    padding: 16px;
  }

  @media (min-width: 1200px) {
    width: 33.33333333%;
  }
`;

const CardDetails = styled.div`
  line-height: 1.5;
  padding: 16px;
  min-height: 150px;
`;

const Img = styled.img`
  object-fit: cover;
  height: 208px;
  width: 100%;
`;

const RecipeCard = ({ title, shortDescription, slug, thumbnail, photo }) => {
  return (
    <Flex>
      <Link to={`/recipe/${slug}`}>
        <Card>
          <div>
            <Img src={photo ? thumbnailUrl(photo) : thumbnail} />
          </div>
          <CardDetails>
            <SubTitle>{title}</SubTitle>
            <p>{shortDescription}</p>
          </CardDetails>
        </Card>
      </Link>
    </Flex>
  );
};

export default RecipeCard;
