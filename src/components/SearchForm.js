import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useInputs } from '../hooks/input-hooks';
import { useQueryParams } from '../hooks/url-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Input = styled.input`
  padding-left: 32px;
  border: 1px solid #eee;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 4px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 10px;
  top: 2px;
`;

const Form = styled.form`
  position: relative;
`;

export default function SearchForm() {
  const history = useHistory();
  const params = useQueryParams();
  const { bind, values, reset } = useInputs({
    q: params.q || '',
  });

  // reset search form if we navigate away
  useEffect(() => {
    reset();
  }, [params.q]);

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      history.push({
        pathname: '/recipes',
        search: `?q=${values.q}`,
      });
    }
  };

  return (
    <Form>
      <IconWrapper>
        <FontAwesomeIcon icon={faSearch} />
      </IconWrapper>
      <Input
        onKeyPress={onKeyPress}
        type="text"
        {...bind.q}
        placeholder="Search..."
      />
    </Form>
  );
}
