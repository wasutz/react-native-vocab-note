import axios from 'axios';
import AppConfig from '../configs/AppConfig';
import UserStore from '../stores/UserStore';

const http = axios.create({
  baseURL: AppConfig.BASE_URL,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  config => {
    if (UserStore.accessToken) {
        config.headers.Authorization = `Bearer ${UserStore.accessToken}`;
    }

    return config;
  },
  error =>  {
    return Promise.reject(error);
  }
);

export default http;