import http from '../utils/http';

export default VocabService = {
    getVocabs(page = 1, size = 1000) {
        return http.get('/vocabs', {
            params: {
                page,
                size
            }
        });
    },

    addNewVocab(word, meaning) {
        return http.post('/vocabs', {
            word,
            meaning
        });
    }
}
