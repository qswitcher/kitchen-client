import React from 'react';
import styled from 'styled-components';
import qs from 'query-string';
import { Link } from './ui-toolkit';
import { useQueryParams } from '../hooks/url-hooks';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PageLink = styled(Link)`
  background-color: ${(props) =>
    props.active === 'true' ? '#333333' : '#6ba72b'};
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
  const params = useQueryParams();
  for (let i = 0; i < pageCount; i++) {
    links.push(
      <PageLink
        key={i}
        active={String(page === i + 1)}
        to={{ search: qs.stringify({ ...params, page: i + 1 }) }}
      >
        {i + 1}
      </PageLink>
    );
  }
  // TODO, if there's ever alot of recipes, we'll want to make this paginator not render every page
  return <Wrapper>{links}</Wrapper>;
};

export default Pager;
