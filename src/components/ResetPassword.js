import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { useInputs } from '../hooks/input-hooks';
import { onError } from '../utils/errors';
import {
  Card,
  InputGroup,
  Submit,
  AlertDanger,
  ButtonBar,
  Link,
} from './ui-toolkit';

export default function ResetPassword() {
  const { bind, values } = useInputs({
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function validateCodeForm() {
    return values.email.length > 0;
  }

  function validateResetForm() {
    return (
      values.code.length > 0 &&
      values.password.length > 0 &&
      values.password === values.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(values.email);
      setCodeSent(true);
    } catch (error) {
      setErrorMessage(onError(error));
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(
        values.email,
        values.code,
        values.password
      );
      setConfirmed(true);
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <form onSubmit={handleSendCodeClick}>
        <InputGroup>
          <label>Email</label>
          <input type="email" {...bind.email} />
        </InputGroup>
        <ButtonBar>
          <Submit
            disabled={!validateCodeForm()}
            onClick={handleSendCodeClick}
            loading={isSendingCode}
          >
            Send Confirmation
          </Submit>
        </ButtonBar>
        {errorMessage && <AlertDanger>{errorMessage}</AlertDanger>}
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmClick}>
        <InputGroup>
          <label>Confirmation Code</label>
          <input type="tel" {...bind.code} />
          {/* <HelpBlock>
            Please check your email ({fields.email}) for the confirmation code.
          </HelpBlock> */}
        </InputGroup>
        <hr />
        <InputGroup>
          <label>New Password</label>
          <input type="password" {...bind.password} />
        </InputGroup>
        <InputGroup>
          <label>Confirm Password</label>
          <input type="password" {...bind.confirmPassword} />
        </InputGroup>
        <ButtonBar>
          <Submit
            disabled={!validateResetForm()}
            onClick={handleConfirmClick}
            loading={isConfirming}
          >
            Confirm
          </Submit>
        </ButtonBar>
        {errorMessage && <AlertDanger>{errorMessage}</AlertDanger>}
      </form>
    );
  }

  function renderSuccessMessage() {
    return (
      <div>
        <FontAwesomeIcon icon={faCheck} />
        <p>Your password has been reset.</p>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Card padding="32px 64px" maxWidth="448px" margin="auto">
      {!codeSent
        ? renderRequestCodeForm()
        : !confirmed
        ? renderConfirmationForm()
        : renderSuccessMessage()}
    </Card>
  );
}
