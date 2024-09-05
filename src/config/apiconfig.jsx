import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const ACCESS_TOKEN_KEY = 'accesstoken';
const REFRESH_TOKEN_KEY = 'refreshtoken';
const EMAIL_KEY = 'email';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
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

async function postRefreshToken() {
  const requestData = {
    email: getLocalStorageItem(EMAIL_KEY),
    refreshToken: getLocalStorageItem(REFRESH_TOKEN_KEY),
  };

  return api.post('/api/auth/refresh', requestData, {
    headers: {
      Authorization: `Bearer ${getLocalStorageItem(ACCESS_TOKEN_KEY)}`,
    },
  });
}

// Setup Axios interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 && !config._retry) {
      config._retry = true;
      try {
        const tokenResponse = await postRefreshToken();
        const newAccessToken = tokenResponse.data.accesstoken;

        // Save the new access token
        localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry the original request
        return api(config);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  },
);

export default api;
