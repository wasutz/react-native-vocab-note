import axios from 'axios';
import AppConfig from '../configs/AppConfig';

export default AuthService = {
    login(email, password) {
        return axios({
            baseURL: AppConfig.BASE_URL,
            method: 'post',
            url: `/login`,
            data: {
                email,
                password
            }
        });
    },

    register(email, username, password) {
        return axios({
            baseURL: AppConfig.BASE_URL,
            method: 'post',
            url: `/register`,
            data: {
                email,
                username,
                password
            }
        });
    }
}
