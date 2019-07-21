/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

export const useCallbackOnKey = (keyCode, callback) => {
    useEffect(() => {
        const listener = ({ code }) => {
            if (code === keyCode) {
                callback();
            }
        };
        document.addEventListener('keypress', listener);
        return () => {
            document.removeEventListener('keypress', listener);
        };
    }, [callback, keyCode]);
};
