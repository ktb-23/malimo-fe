//src/api/delete.jsx

import api from '../config/apiconfig';

export const deleteAccount = async () => {
  try {
    const accessToken = localStorage.getItem('accesstoken');

    const response = await api.delete(`/api/v1/auth/delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    localStorage.clear();

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Account deletion error:', error);
    return {
      success: false,
      error: error.response || error,
    };
  }
};

export default deleteAccount;
