// src/api/refresh.jsx

import api from '../config/apiconfig';

export const refreshAccessToken = async () => {
  try {
    const userId = localStorage.getItem('user_id');
    const refreshToken = localStorage.getItem('refreshtoken');

    const response = await api.post(
      '/api/auth/refresh',
      {
        user_id: parseInt(userId),
        refreshToken: refreshToken,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { accesstoken } = response.data;

    // 새로운 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accesstoken', accesstoken);

    return {
      success: true,
      data: { accesstoken },
    };
  } catch (error) {
    console.error('Token refresh error:', error);

    // 리프레시 토큰이 만료되었거나 유효하지 않은 경우
    if (error.response && (error.response.status === 400 || error.response.status === 401)) {
      // 로컬 스토리지의 모든 인증 관련 데이터를 삭제
      localStorage.removeItem('user_id');
      localStorage.removeItem('nickname');
      localStorage.removeItem('accesstoken');
      localStorage.removeItem('refreshtoken');
    }

    return {
      success: false,
      error: error.response ? error.response.data : 'Network Error',
    };
  }
};

export default refreshAccessToken;
