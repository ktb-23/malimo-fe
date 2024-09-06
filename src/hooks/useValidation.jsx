// src/hooks/useValidation.jsx

import { useState, useCallback } from 'react';
import {
  validateNickname,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateLoginCredentials,
  ERROR_MESSAGES,
} from '../config/validation';

export const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = useCallback((field, value, confirmValue) => {
    let error = '';
    switch (field) {
      case 'nickname':
        error = validateNickname(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validatePasswordConfirmation(value, confirmValue);
        break;
      case 'loginCredentials':
        error = validateLoginCredentials(value, confirmValue);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  }, []);

  const setLoginError = useCallback((errorType) => {
    setErrors((prev) => ({ ...prev, login: ERROR_MESSAGES[errorType] || ERROR_MESSAGES.LOGIN_ERROR }));
  }, []);

  const resetErrors = useCallback(() => {
    setErrors({});
  }, []);

  return { errors, validate, setLoginError, resetErrors };
};
