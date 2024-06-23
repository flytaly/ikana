import kanaToRomaji from '../../data/kana-to-romaji';
import { randomInt } from '../../utils/random-int';

export const initialState = {
    answer: '',
    charsCount: 0,
    charsLeft: 0,
    charsQueue: [],
    isMistake: false,
    isPracticeActive: false,
    prevChar: null,
    wrongChars: new Set([]),
    wrongCount: 0,
};

export const initReducer = (initState) => ({
    ...initialState,
    wrongChars: new Set([]),
    ...initState,
});

export const actions = {
    NEXT_CHAR: 'NEXT_CHAR',
    MISTAKE: 'MISTAKE',
    CHAR_BEGINNING: 'CHAR_BEGINNING',
    INIT: 'INIT',
    SHOW_ANSWER: 'SHOW_ANSWER',
};

const mixUpInQueue = (queue, item) => {
    if (queue.length <= 1) return queue;
    const randomIdx = randomInt(2, 20);
    queue.splice(randomIdx, 0, item);
    return queue;
};

export function reducer(state, action) {
    const { payload } = action;
    switch (action.type) {
        case actions.NEXT_CHAR: {
            const nextQueue = state.charsQueue.slice(1);
            return {
                ...state,
                isMistake: false,
                charsCount: state.charsCount + 1,
                answer: '',
                prevChar: state.charsQueue[0],
                charsQueue: nextQueue,
                isPracticeActive: !!nextQueue.length,
            };
        }

        case actions.MISTAKE: {
            const { charsQueue, wrongChars } = state;
            const currentChar = charsQueue[0];
            if (!currentChar) return state;
            const updatedQueue =
                payload && payload.repeatWrongChars && (!wrongChars.has(currentChar) || !state.isMistake)
                    ? mixUpInQueue(charsQueue, currentChar)
                    : charsQueue;
            const answer = payload && payload.showAnswer && kanaToRomaji[currentChar] && kanaToRomaji[currentChar][0];
            return {
                ...state,
                answer,
                isMistake: true,
                wrongChars: wrongChars.add(currentChar),
                wrongCount: wrongChars.size,
                isPracticeActive: true,
                charsQueue: updatedQueue,
            };
        }

        case actions.CHAR_BEGINNING: {
            return {
                ...state,
                isPracticeActive: true,
            };
        }

        case actions.INIT: {
            return initReducer(action.payload);
        }

        default:
            throw new Error();
    }
}
