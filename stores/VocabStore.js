import { observable, action } from 'mobx'
import VocabService from '../services/VocabService';

class VocabStore {
    @observable isFetchingVocabs = false;
    @observable vocabs = [];
    @observable total = 0;

    @action
    async getVocabs(page = 1, size = 1000) {
        this.isFetchingVocabs = true;

        try {
            const response = await VocabService.getVocabs(page, size);
            this.vocabs = response.data.data;
            this.total = response.data.total;
        } catch (ex) {
            throw ex;
        } finally {
            this.isFetchingVocabs = false;
        }
    }
}

const store = new VocabStore();

export default store;
