import React from 'react';
import styled from 'styled-components';

import { Card } from './ui-toolkit';

const Flex = styled.div`
  width: 33.33333333%;
  padding: 16px;
`;

const CardDetails = styled.div`
  padding: 16px;
  min-height: 192px;
`;

const RecipeCard = ({ title, shortDescription, thumbnail }) => {
  return (
    <Flex>
      <Card>
        <div>
          <img src={thumbnail} />
        </div>
        <CardDetails>
          <h4>{title}</h4>
          <p>{shortDescription}</p>
        </CardDetails>
      </Card>
    </Flex>
  );
};

export default RecipeCard;
