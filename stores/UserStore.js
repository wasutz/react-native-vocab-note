import { observable, action, computed } from 'mobx'
import { AsyncStorage } from 'react-native';
import UserService from '../services/UserService';
import AppConfig from '../configs/AppConfig';

class UserStore {
    constructor() {
        this.isAuthenticating = true
        AsyncStorage.getItem(AppConfig.ACCESS_TOKEN_KEY).then(data => {
          this.accessToken = data
          this.isAuthenticating = false
        });
    }

    @observable isAuthenticating = false;
    @observable accessToken = null;

    @computed get isAuthenticated() {
        return this.accessToken;
    }

    @action
    async login(email, password) {
        this.isAuthenticating = true;
        try {
            const response = await UserService.login(email, password);
            const accessToken = response.data.token;
            await AsyncStorage.setItem(AppConfig.ACCESS_TOKEN_KEY, accessToken);

            this.accessToken = accessToken.
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
