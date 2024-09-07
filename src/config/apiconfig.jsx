import axios from 'axios';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY } from '../constant/storageKey';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token ? `Bearer ${token}` : '';
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getAuthorizationHeader(),
  },
});

const getLocalStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error('Error accessing localStorage', error);
    return null;
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

async function postRefreshToken() {
  const requestData = {
    user_id: getLocalStorageItem(USER_ID_KEY),
    refreshToken: getLocalStorageItem(REFRESH_TOKEN_KEY),
  };

  return api.post('/api/v1/auth/refresh', requestData, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem(ACCESS_TOKEN_KEY)}`,
    },
  });
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        postRefreshToken()
          .then(({ data }) => {
            const newAccessToken = data.accesstoken;
            localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

            // 헤더 업데이트 방식을 통일
            const newAuthHeader = `Bearer ${newAccessToken}`;
            api.defaults.headers['Authorization'] = newAuthHeader;
            originalRequest.headers['Authorization'] = newAuthHeader;

            processQueue(null, newAccessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
