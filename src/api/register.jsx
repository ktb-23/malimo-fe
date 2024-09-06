// src/api/register.js

import api from '../config/apiconfig';

export const register = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/register', userData);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = '회원가입 중 오류가 발생했습니다.';

    if (error.response) {
      if (error.response.status === 400) {
        errorMessage = '올바르지 않은 형식의 입력입니다.';
      } else if (error.response.status === 401) {
        errorMessage = '권한이 없는 사용자입니다.';
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};
