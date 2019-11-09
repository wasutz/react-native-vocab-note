import { observable, action, computed } from 'mobx'
import { AsyncStorage } from 'react-native';
import AuthService from '../services/AuthService';
import AppConfig from '../configs/AppConfig';
import _ from 'lodash';

class AuthStore {
    constructor() {
        this.isAuthenticating = true
        AsyncStorage.getItem(AppConfig.ACCESS_TOKEN_KEY).then(data => {
          this.accessToken = data
          this.isAuthenticating = false
        });
    }

    @observable isAuthenticating = false;
    @observable accessToken = null;
    @observable errorDescription = {};

    @computed get isAuthenticated() {
        return this.accessToken;
    }

    @action
    async login(email, password) {
        this.isAuthenticating = true;
        try {
            const response = await AuthService.login(email, password);
            const accessToken = response.data.token;
            await AsyncStorage.setItem(AppConfig.ACCESS_TOKEN_KEY, accessToken);

            this.accessToken = accessToken;
            this.isAuthenticating = false;
        } catch (ex) {
            this.isAuthenticating = false;
            throw ex;
        }
    }

    @action
    async register(email, username, password) {
        this.isAuthenticating = true;
        try {
            await AuthService.register(email, username, password);
            this.isAuthenticating = false;
        } catch (ex) {
            this.errorDescription = _.get(ex, 'response.data.description', {});
            this.isAuthenticating = false;
            throw ex;
        }
    }

    @action
    async logout() {
        this.isAuthenticating = true;
    
        await AsyncStorage.removeItem(AppConfig.ACCESS_TOKEN_KEY);
        this.accessToken = null;
        this.isAuthenticating = false;
    }

    @action.bound
    removeErrorDescriptionItem(key) {
        delete this.errorDescription[key];
    }
}

const store = new AuthStore();

export default store;
