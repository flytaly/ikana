import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const types = {
    hiraganaToggleRow: 'hiraganaToggleRow',
};

export const initialState = {
    hiragana: {
        selectedRows: [],
    },
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.hiraganaToggleRow: {
            const { hiragana, hiragana: { selectedRows } } = state;
            return {
                ...state,
                hiragana: {
                    ...hiragana,
                    selectedRows: selectedRows.includes(payload)
                        ? selectedRows.filter(el => el !== payload)
                        : [...selectedRows, payload],
                },
            };
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
