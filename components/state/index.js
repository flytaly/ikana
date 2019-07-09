import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import localforage from 'localforage';

export const types = {
    hiraganaToggleRow: 'hiraganaToggleRow',
    updateState: 'updateState',
};

export const initialState = {
    hiragana: {
        selectedRows: [],
    },
};

const saveState = state => localforage.setItem('state', state).catch(e => console.error(e));

export const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.updateState:
            return { ...state, ...payload };
        case types.hiraganaToggleRow: {
            const { hiragana, hiragana: { selectedRows } } = state;
            const newState = {
                ...state,
                hiragana: {
                    ...hiragana,
                    selectedRows: selectedRows.includes(payload)
                        ? selectedRows.filter(el => el !== payload)
                        : [...selectedRows, payload],
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
