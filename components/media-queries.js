/*
    * Media queries always use default font size which usually is 16px.
    * It means root element's font size changes could make them incorrect.
*/

export default {
    // Enough for link buttons stay on the left of the cards
    largeEnough: '(min-width: 32em)', // 32em ≈ 512px
};
