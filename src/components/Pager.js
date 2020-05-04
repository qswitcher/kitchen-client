import React from 'react';
import styled from 'styled-components';
import { Link } from './ui-toolkit';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageLink = styled(Link)`
  background-color: ${(props) => (props.active ? '#333333' : '#6ba72b')};
  color: #fff;
  border-radius: 2px;
  min-width: 32px;
  min-height: 32px;
  display: block;
  text-align: center;
  margin: 2px;

  &:hover {
    background-color: #333333;
  }
`;

const Pager = ({ page, pageCount }) => {
  const links = [];
  for (let i = 0; i < pageCount; i++) {
    links.push(
      <PageLink
        key={i}
        active={String(page === i + 1)}
        to={{ search: `?page=${i + 1}` }}
      >
        {i + 1}
      </PageLink>
    );
  }
  // TODO, if there's ever alot of recipes, we'll want to make this paginator not render every page
  return <Wrapper>{links}</Wrapper>;
};

export default Pager;
