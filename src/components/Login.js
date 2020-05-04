import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useInput } from '../hooks/input-hooks';
import { useAppContext } from '../contexts/app-context';

import { Card, InputGroup, Submit } from './ui-toolkit';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const { value: email, bind: bindEmail } = useInput('');
  const { value: password, bind: bindPassword } = useInput('');
  const { userHasAuthenticated } = useAppContext();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/recipes');
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <Card padding="32px 64px">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <label for="email">Email</label>
          <input type="text" {...bindEmail} />
        </InputGroup>
        <InputGroup>
          <label for="password">Password</label>
          <input type="password" {...bindPassword} />
        </InputGroup>
        <Submit
          type="submit"
          value="Login"
          disabled={!validateForm() || loading}
        />
      </form>
    </Card>
  );
}
