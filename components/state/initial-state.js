import MODES from '../practice/modes';

const initialState = {
    practiceMode: MODES.KANA_TO_ROMAJI,
    options: {
        disableBgAnimation: false,
        disableAnimations: false,
        disableAutoInputCheck: false,
        repeatWrongChars: false,
    },
    hiragana: {
        selectedRows: {
            monographs: [0], // Select first hiragana row as a default value
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
        totalSelected: 5, // 5 chars in hiragana first row
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
