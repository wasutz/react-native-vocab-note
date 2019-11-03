import { observable, action, computed } from 'mobx'
import { AsyncStorage } from 'react-native';
import UserService from '../services/UserService';
import AppConfig from '../configs/AppConfig';

class UserStore {
    @observable isAuthenticating = false;

    @action
    async login(email, password) {
        this.isAuthenticating = true;
        try {
            const response = await UserService.login(email, password);
            await AsyncStorage.setItem(AppConfig.ACCESS_TOKEN_KEY, response.data.token);

            this.isAuthenticating = false;
        } catch (ex) {
            this.isAuthenticating = false;
            throw ex;
        }
    }

    @action
    logout() {
        return AsyncStorage.removeItem(AppConfig.ACCESS_TOKEN_KEY);
    }
}

const store = new UserStore();

export default store;
