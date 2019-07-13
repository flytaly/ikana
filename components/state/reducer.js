import { hiraganaRows } from '../../data/hiragana';
import { katakanaRows } from '../../data/katakana';
import range from '../../utils/range';
import { saveState } from './offline-state';

export const types = {
    hiraganaToggleRow: 'hiraganaToggleRow',
    hiraganaToggleAll: 'hiraganaToggleAll',
    katakanaToggleRow: 'katakanaToggleRow',
    katakanaToggleAll: 'katakanaToggleAll',
    updateState: 'updateState',
};

const countSelected = (dataRows, selectedRows) => selectedRows
    .reduce((acc, curr) => acc + dataRows[curr].filter(k => k).length, 0);

const kanaToggleRow = ({ kanaRows, selectedRows, selectedNumber, rowIdx, kanaType }) => {
    const kanaSelectedRows = selectedRows[kanaType];

    const updatedRows = kanaSelectedRows.includes(rowIdx)
        ? kanaSelectedRows.filter(el => el !== rowIdx)
        : [...kanaSelectedRows, rowIdx];

    const newSelectedNumber = {
        ...selectedNumber,
        [kanaType]: countSelected(kanaRows, updatedRows),
    };
    const updatedFields = {
        selectedRows: { ...selectedRows, [kanaType]: updatedRows },
        selectedNumber: newSelectedNumber,
        totalSelected: Object.values(newSelectedNumber).reduce((a, c) => a + c),
    };
    return updatedFields;
};

const kanaToggleAll = ({ kanaRows, kanaType, selectedRows, selectedNumber }) => {
    const kanaSelectedRows = selectedRows[kanaType];
    const kanaNewSelectedRows = [];
    if (kanaSelectedRows.length < kanaRows.length) {
        kanaNewSelectedRows.push(...range(kanaRows.length));
    }
    const newSelectedNumber = {
        ...selectedNumber,
        [kanaType]: countSelected(kanaRows, kanaNewSelectedRows),
    };
    const updatedFields = {
        selectedRows: { ...selectedRows, [kanaType]: kanaNewSelectedRows },
        selectedNumber: newSelectedNumber,
        totalSelected: Object.values(newSelectedNumber).reduce((a, c) => a + c),
    };
    return updatedFields;
};


const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.updateState:
            return { ...state, ...payload };

        case types.hiraganaToggleRow: {
            const { hiragana, hiragana: { selectedRows, selectedNumber } } = state;
            const { rowIdx, kanaType } = payload;
            const newState = {
                ...state,
                hiragana: {
                    ...hiragana,
                    ...kanaToggleRow({
                        kanaRows: hiraganaRows[kanaType], selectedRows, selectedNumber, rowIdx, kanaType,
                    }),
                },
            };
            saveState(newState);
            return newState;
        }

        case types.hiraganaToggleAll: {
            const { hiragana, hiragana: { selectedRows, selectedNumber } } = state;
            const { kanaType } = payload;
            const newState = {
                ...state,
                hiragana: {
                    ...hiragana,
                    ...kanaToggleAll({ kanaRows: hiraganaRows[kanaType], kanaType, selectedRows, selectedNumber }),
                },
            };
            saveState(newState);
            return newState;
        }

        case types.katakanaToggleRow: {
            const { katakana, katakana: { selectedRows, selectedNumber } } = state;
            const { rowIdx, kanaType } = payload;

            const newState = {
                ...state,
                katakana: {
                    ...katakana,
                    ...kanaToggleRow({
                        kanaRows: katakanaRows[kanaType], selectedRows, selectedNumber, rowIdx, kanaType,
                    }),
                },
            };
            saveState(newState);
            return newState;
        }

        case types.katakanaToggleAll: {
            const { katakana, katakana: { selectedRows, selectedNumber } } = state;
            const { kanaType } = payload;
            const newState = {
                ...state,
                katakana: {
                    ...katakana,
                    ...kanaToggleAll({ kanaRows: hiraganaRows[kanaType], kanaType, selectedRows, selectedNumber }),
                },
            };
            saveState(newState);
            return newState;
        }

        default: return state;
    }
};

export default reducer;
