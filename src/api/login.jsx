// src/api/login.jsx

import api from '../config/apiconfig';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', { email, password });

    const { user_id, nickname, accesstoken, refreshtoken } = response.data;
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('accesstoken', accesstoken);
    localStorage.setItem('refreshtoken', refreshtoken);

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
