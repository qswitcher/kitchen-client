import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  width: 33.33333333%;
  padding: 16px;
`;

const Card = styled.div`
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const CardDetails = styled.div`
  padding: 16px;
  background: #fff;
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
