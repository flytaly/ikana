import React, { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import initialState from './initial-state';
import reducer, { types } from './reducer';
import { getState } from './offline-state';

export { types };

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
                const prevState = await getState();
                if (prevState) {
                    dispatch({ type: types.UPDATE_STATE, payload: prevState });
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
