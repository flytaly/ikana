/* eslint-disable consistent-return */
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

export const useTimer = (runEverySecond, started) => {
    useEffect(() => {
        if (!started) return;
        let seconds = 0;
        const id = setInterval(() => {
            seconds += 1;
            runEverySecond(seconds);
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }, [runEverySecond, started]);
};
