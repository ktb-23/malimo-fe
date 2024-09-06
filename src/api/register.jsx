// src/api/register.jsx

import api from '../config/apiconfig';

export const register = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/register', userData);
    return {
      success: true,
      message: '회원가입에 성공했습니다.',
      data: response.data,
    };
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return {
      success: false,
      message: error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.',
    };
  }
};
