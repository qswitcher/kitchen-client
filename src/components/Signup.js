import React, { useState } from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';

import { useHistory } from 'react-router-dom';
import { useInputs } from '../hooks/input-hooks';
import { useAppContext } from '../contexts/app-context';
import {
  Card,
  InputGroup,
  Submit,
  Button,
  AlertDanger,
  ButtonBar,
} from './ui-toolkit';
import { onError } from '../utils/errors';

const Heading = styled.h2`
  margin-bottom: 16px;
  text-align: center;
`;

const Message = styled.p`
  text-align: center;
`;

export default function Signup() {
  const { bind, values } = useInputs({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSignup(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: values.email,
        password: values.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      setErrorMessage(onError(e));
      setIsLoading(false);
    }
  }

  async function handleConfirm(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(values.email, values.confirmationCode);
      await Auth.signIn(values.email, values.password);

      userHasAuthenticated(true);
      history.push('/recipes');
    } catch (e) {
      setErrorMessage(onError(e));
      setIsLoading(false);
    }
  }

  const handleCancel = () => {
    history.push('/login');
  };

  function renderSignup() {
    return (
      <Card padding="32px 64px" maxWidth="448px" margin="auto">
        <form>
          <InputGroup>
            <label>Email</label>
            <input type="email" {...bind.email} />
          </InputGroup>
          <InputGroup>
            <label>Password</label>
            <input type="password" {...bind.password} />
          </InputGroup>
          <InputGroup>
            <label>Confirm password</label>
            <input type="password" {...bind.confirmPassword} />
          </InputGroup>
          <ButtonBar>
            <Submit onClick={handleSignup} loading={isLoading}>
              Sign Up
            </Submit>
            <Button onClick={handleCancel}>Log In</Button>
          </ButtonBar>
          {errorMessage && <AlertDanger>{errorMessage}</AlertDanger>}
        </form>
      </Card>
    );
  }

  function renderConfirmation() {
    return (
      <Card padding="32px 64px" maxWidth="448px" margin="auto">
        <form>
          <Heading>Email Confirmation</Heading>
          <Message>
            We have sent an email to <strong>{values.email}</strong>. Please
            enter the confirmation code contained in the email.
          </Message>
          <InputGroup>
            <input type="tel" {...bind.confirmationCode} />
          </InputGroup>
          <ButtonBar>
            <Submit onClick={handleConfirm} loading={isLoading}>
              Confirm
            </Submit>
          </ButtonBar>
          {errorMessage && <AlertDanger>{errorMessage}</AlertDanger>}
        </form>
      </Card>
    );
  }

  return newUser === null ? renderSignup() : renderConfirmation();
}
