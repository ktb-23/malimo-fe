// src/api/refresh.jsx

import api from '../config/apiconfig';
import {USER_ID_KEY, NICKNAME_KEY, REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY} from '../constant/storageKey';

//XXX: 오류 많음 사용시 한번 더 확인하고 사용 할 것
export const refreshAccessToken = async () => {
  try {
    const userId = localStorage.getItem(USER_ID_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

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
    localStorage.setItem(ACCESS_TOKEN_KEY, accesstoken);

    return {
      success: true,
      data: { accesstoken },
    };
  } catch (error) {
    console.error('Token refresh error:', error);

    // 리프레시 토큰이 만료되었거나 유효하지 않은 경우
    if (error.response && (error.response.status === 400 || error.response.status === 401)) {
      // 로컬 스토리지의 모든 인증 관련 데이터를 삭제
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(NICKNAME_KEY);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }

    return {
      success: false,
      error: error.response ? error.response.data : 'Network Error',
    };
  }
};

export default refreshAccessToken;
