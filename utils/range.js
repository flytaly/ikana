/* eslint-disable no-param-reassign */

const range = (start, stop = null) => {
    if (stop === null) {
        stop = start;
        start = 0;
    }
    const result = [];
    for (let i = start; i < stop; i += 1) {
        result.push(i);
    }
    return result;
};

export default range;
