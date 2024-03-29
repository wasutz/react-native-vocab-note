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
    },

    updateVocab(id, word, meaning) {
        return http.put('/vocabs', {
            id,
            word,
            meaning
        });
    },

    deleteVocab(id) {
        return http.delete(`/vocabs/${id}`);
    }
}
