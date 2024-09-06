import api from '../api';

export const validateNickname = (nickname) => {
  if (nickname.length < 2 || nickname.length > 20) {
    return '닉네임은 2자 이상 20자 이하여야 합니다.';
  }
  return '';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '유효한 이메일 주소를 입력해주세요.';
  }
  return '';
};

export const validatePassword = (password) => {
  if (password.length < 8) {
    return '비밀번호는 8자 이상이어야 합니다.';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.';
  }
  return '';
};

export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};

export const checkDuplicateNickname = async (nickname) => {
  try {
    const response = await api.checkNickname(nickname);
    return response.isDuplicate ? '이미 사용 중인 닉네임입니다.' : '';
  } catch (error) {
    console.error('닉네임 중복 체크 중 오류 발생:', error);
    return '닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.';
  }
};

export const validateLogin = async (email, password) => {
  try {
    const response = await api.login(email, password);
    return response.isValid ? '' : '아이디 또는 비밀번호가 올바르지 않습니다.';
  } catch (error) {
    console.error('로그인 검증 중 오류 발생:', error);
    return '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.';
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.register(userData);
    return response.success ? '' : '회원가입 중 오류가 발생했습니다.';
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.';
  }
};

export const checkDuplicateEmail = async (email) => {
  try {
    const response = await api.checkEmail(email);
    return response.isDuplicate ? '이미 사용 중인 이메일 주소입니다.' : '';
  } catch (error) {
    console.error('이메일 중복 체크 중 오류 발생:', error);
    return '이메일 중복 확인 중 오류가 발생했습니다. 다시 시도해 주세요.';
  }
};
