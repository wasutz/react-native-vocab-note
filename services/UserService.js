import axios from 'axios';
import AppConfig from '../configs/AppConfig';

export default UserService = {
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
    }
}
