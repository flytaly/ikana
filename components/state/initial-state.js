const initialState = {
    hiragana: {
        selectedRows: {
            monographs: [],
            diacritics: [],
            digraphs: [],
            digraphsDiacritics: [],
        },
        selectedNumber: {
            monographs: 0,
            diacritics: 0,
            digraphs: 0,
            digraphsDiacritics: 0,
        },
        totalSelected: 0,
    },
    katakana: {
        selectedRows: {
            monographs: [],
            diacritics: [],
            digraphs: [],
            digraphsDiacritics: [],
        },
        selectedNumber: {
            monographs: 0,
            diacritics: 0,
            digraphs: 0,
            digraphsDiacritics: 0,
        },
        totalSelected: 0,
    },
};

export default initialState;
