import MODES from '../practice/modes';

const initialState = {
    practiceMode: MODES.KANA_TO_ROMAJI,
    options: {
        disableAnimations: false,
        disableAutoInputCheck: false,
        repeatWrongChars: false,
    },
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
