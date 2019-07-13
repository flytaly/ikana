/* eslint-disable import/prefer-default-export */
import localforage from 'localforage';

export const saveState = state => localforage.setItem('state', state).catch(e => console.error(e));

/**
 * @returns Promise
 */
export const getState = () => localforage.getItem('state');
