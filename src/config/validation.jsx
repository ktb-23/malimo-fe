// src/config/validation.jsx

export const ERROR_MESSAGES = {
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_LENGTH: '닉네임은 2자 이상 20자 이하여야 합니다.',
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_INVALID: '유효한 이메일 주소를 입력해주세요.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_SPECIAL_CHAR: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.',
  PASSWORD_CONFIRM_REQUIRED: '비밀번호 확인을 입력해주세요.',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  LOGIN_FAILED: '이메일 또는 비밀번호가 올바르지 않습니다.',
  LOGIN_ERROR: '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.',
};

export const validateNickname = (nickname) => {
  if (!nickname) {
    return ERROR_MESSAGES.NICKNAME_REQUIRED;
  }
  if (nickname.length < 2 || nickname.length > 20) {
    return ERROR_MESSAGES.NICKNAME_LENGTH;
  }
  return '';
};

export const validateEmail = (email) => {
  if (!email) {
    return ERROR_MESSAGES.EMAIL_REQUIRED;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return ERROR_MESSAGES.EMAIL_INVALID;
  }
  return '';
};

export const validatePassword = (password) => {
  if (!password) {
    return ERROR_MESSAGES.PASSWORD_REQUIRED;
  }
  if (password.length < 8) {
    return ERROR_MESSAGES.PASSWORD_LENGTH;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR;
  }
  return '';
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED;
  }
  if (password !== confirmPassword) {
    return ERROR_MESSAGES.PASSWORD_MISMATCH;
  }
  return '';
};

export const validateLoginCredentials = (email, password) => {
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError || passwordError) {
    return emailError || passwordError;
  }

  return '';
};
