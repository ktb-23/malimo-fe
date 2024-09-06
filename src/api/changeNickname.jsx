// src/api/ChangeNickname.jsx

import api from '../config/apiconfig';

export const changeNickname = async (newNickname) => {
  try {
    const accessToken = localStorage.getItem('accesstoken');

    const response = await api.put(
      '/api/v1/auth/nickname',
      { nickname: newNickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    console.error('닉네임 변경 오류:', error);
    return {
      success: false,
      error: error.response ? error.response.data : '네트워크 오류',
    };
  }
};

export default changeNickname;
