import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 8px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default function ResultsMetaBar({ numResults, q }) {
  return (
    <Wrapper>
      <div>
        <strong>{numResults}</strong>
        {` recipe results for "${q}"`}
      </div>
      {/* <div>Sort by:</div> */}
    </Wrapper>
  );
}
