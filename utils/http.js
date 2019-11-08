import axios from 'axios';
import AppConfig from '../configs/AppConfig';
import AuthStore from '../stores/AuthStore';

const http = axios.create({
  baseURL: AppConfig.BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  config => {
    if (AuthStore.accessToken) {
        config.headers.Authorization = `Bearer ${AuthStore.accessToken}`;
    }

    return config;
  },
  error =>  {
    return Promise.reject(error);
  }
);

export default http;