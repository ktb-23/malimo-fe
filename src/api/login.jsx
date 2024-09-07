// src/api/login.jsx

import api from '../config/apiconfig';
import {USER_ID_KEY, NICKNAME_KEY, REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY} from '../constant/storageKey';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', { email, password });

    const { user_id, nickname, accessToken, refreshToken } = response.data;
    localStorage.setItem(USER_ID_KEY, user_id);
    localStorage.setItem(NICKNAME_KEY, nickname);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.response || error,
    };
  }
};

export default login;
