import React from 'react';
import styled from 'styled-components';
import { Card, Link } from './ui-toolkit';

const Flex = styled.div`
  width: 33.33333333%;
  padding: 16px;
`;

const CardDetails = styled.div`
  line-height: 1.5;
  padding: 16px;
  min-height: 150px;
`;

const RecipeCard = ({ title, shortDescription, thumbnail }) => {
  const slug = title.toLowerCase().replace(/\s+/g, '-');
  return (
    <Flex>
      <Link to={`/recipe/${slug}`}>
        <Card>
          <div>
            <img src={thumbnail} />
          </div>
          <CardDetails>
            <h4>{title}</h4>
            <p>{shortDescription}</p>
          </CardDetails>
        </Card>
      </Link>
    </Flex>
  );
};

export default RecipeCard;
