import { observable, action } from 'mobx'
import VocabService from '../services/VocabService';

class VocabStore {
    @observable isLoadingVocabs = false;
    @observable vocabs = [];
    @observable total = 0;

    @action
    async getVocabs(page = 1, size = 1000) {
        this.isLoadingVocabs = true;

        try {
            const response = await VocabService.getVocabs(page, size);
            this.vocabs = response.data.data;
            this.total = response.data.total;
        } catch (ex) {
            throw ex;
        } finally {
            this.isLoadingVocabs = false;
        }
    }

    @action
    async addNewVocab(word, meaning) {
        this.isLoadingVocabs = true;
        try {
            const response = await VocabService.addNewVocab(word, meaning);
            this.vocabs = [...this.vocabs, response.data];
        } catch (ex) {
            throw ex;
        } finally {
            this.isLoadingVocabs = false;
        }
    }

    @action
    async updateVocab(id, word, meaning) {
        this.isLoadingVocabs = true;
        try {
            await VocabService.updateVocab(id, word, meaning);
            const vocab = this.vocabs.find(vocab => vocab.id === id);
            vocab.word = word;
            vocab.meaning = meaning;
        } catch (ex) {
            throw ex;
        } finally {
            this.isLoadingVocabs = false;
        }
    }

    @action
    async deleteVocab(willDeleteVocab) {
        this.isLoadingVocabs = true;
        try {
            await VocabService.deleteVocab(willDeleteVocab.id);
            this.vocabs = this.vocabs.filter(vocab => vocab.id !== willDeleteVocab.id);
        } catch (ex) {
            throw ex;
        } finally {
            this.isLoadingVocabs = false;
        }
    }
}

const store = new VocabStore();

export default store;
