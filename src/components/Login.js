import React, { useState } from 'react';
import { useInput } from '../hooks/input-hooks';
import { useAppContext } from '../contexts/app-context';

import {
  Button,
  Card,
  InputGroup,
  Submit,
  ButtonBar,
  EmbedLink,
} from './ui-toolkit';
import { useHistory, useLocation } from 'react-router-dom';

export default function Login() {
  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { login } = useAppContext();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      let { from } = location.state || { from: { pathname: '/' } };
      await login(email, password);
      history.replace(from);
    } catch (e) {
      alert(e.message);
    }
  }

  const handleCancel = () => {
    history.push('/signup');
  };

  return (
    <Card padding="32px 64px" maxWidth="448px" margin="auto">
      <form>
        <InputGroup>
          <label htmlFor="email">Email</label>
          <input type="text" {...bindEmail} />
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">Password</label>
          <input type="password" {...bindPassword} />
        </InputGroup>
        <EmbedLink to="/reset-password">Forgot password?</EmbedLink>
        <ButtonBar>
          <Submit
            disabled={!validateForm()}
            onClick={handleSubmit}
            loading={loading}
          >
            Login
          </Submit>
          <Button onClick={handleCancel}>Sign up</Button>
        </ButtonBar>
      </form>
    </Card>
  );
}
