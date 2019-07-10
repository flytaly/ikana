import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import localforage from 'localforage';
import { hiraganaRows } from '../../data/hiragana';
import range from '../../utils/range';

export const types = {
    hiraganaToggleRow: 'hiraganaToggleRow',
    hiraganaToggleAll: 'hiraganaToggleAll',
    updateState: 'updateState',
};

export const initialState = {
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
};

const saveState = state => localforage.setItem('state', state).catch(e => console.error(e));

export const reducer = (state, action) => {
    const { type, payload } = action;

    const countSelected = (dataRows, selectedRows) => selectedRows
        .reduce((acc, curr) => acc + dataRows[curr].filter(k => k).length, 0);
    switch (type) {
        case types.updateState:
            return { ...state, ...payload };

        case types.hiraganaToggleRow: {
            const { hiragana, hiragana: { selectedRows, selectedNumber } } = state;
            const { rowIdx, kanaType } = payload;
            const kanaRows = selectedRows[kanaType];
            const updatedRows = kanaRows.includes(rowIdx)
                ? kanaRows.filter(el => el !== rowIdx)
                : [...kanaRows, rowIdx];
            const newSelectedNumber = { ...selectedNumber, [kanaType]: countSelected(hiraganaRows[kanaType], updatedRows) };
            const newState = {
                ...state,
                hiragana: {
                    ...hiragana,
                    selectedRows: { ...selectedRows, [kanaType]: updatedRows },
                    selectedNumber: newSelectedNumber,
                    totalSelected: Object.values(newSelectedNumber).reduce((a, c) => a + c),
                },
            };
            saveState(newState);
            return newState;
        }
        case types.hiraganaToggleAll: {
            const { hiragana, hiragana: { selectedRows, selectedNumber } } = state;
            const { kanaType } = payload;
            const kanaRows = selectedRows[kanaType];
            const kanaAllRows = hiraganaRows[kanaType];
            const kanaNewSelectedRows = [];
            if (kanaRows.length < kanaAllRows.length) {
                kanaNewSelectedRows.push(...range(kanaAllRows.length));
            }
            const newSelectedNumber = { ...selectedNumber, [kanaType]: countSelected(kanaAllRows, kanaNewSelectedRows) };
            const newState = {
                ...state,
                hiragana: {
                    ...hiragana,
                    selectedRows: { ...selectedRows, [kanaType]: kanaNewSelectedRows },
                    selectedNumber: newSelectedNumber,
                    totalSelected: Object.values(newSelectedNumber).reduce((a, c) => a + c),
                },
            };
            saveState(newState);
            return newState;
        }
        default: return state;
    }
};

export const stateCtx = createContext(initialState);
const dispatchCtx = createContext(() => null);

export const useDispatch = () => useContext(dispatchCtx);

export const useGlobalState = (property = null) => {
    const state = useContext(stateCtx);
    return property ? state[property] : state;
};

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadState = async () => {
            try {
                const prevState = await localforage.getItem('state');
                if (prevState) {
                    dispatch({ type: types.updateState, payload: prevState });
                }
            } catch (e) {
                console.error('Couldn\'t load state\n', e);
            }
        };

        loadState();
    }, []);
    return (
        <dispatchCtx.Provider value={dispatch}>
            <stateCtx.Provider value={state}>
                {children}
            </stateCtx.Provider>
        </dispatchCtx.Provider>
    );
};

StateProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
