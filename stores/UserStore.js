import { observable, action, computed } from 'mobx'
import UserService from '../services/UserService';

class UserStore {
    @observable isGettingUser = false;
    @observable user = null;

    @action
    async getUser() {
        this.isGettingUser = true;
        try {
            const response = await UserService.getUser();
            this.user = response.data.user;
            this.isGettingUser = false;
        } catch (ex) {
            this.isGettingUser = false;
            throw ex;
        }
    }
}

const store = new UserStore();

export default store;
