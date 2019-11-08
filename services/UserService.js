import http from '../utils/http';

export default UserService = {
    getUser() {
        return http.get('/user');
    }
}
