import { css } from 'styled-components';

export const SlideInLeft = css`
    @keyframes slideIn {
        100% { transform: translateX(0%); }
    }
    .slideIn {
        transform: translateX(80%);
        animation: slideIn 0.06s forwards ease-in;
    }
`;

export const SlideOutLeft = css`
    @keyframes slideOut {
        100% { transform: translateX(-80%); }
    }
    .slideOut {
        animation: slideOut 0.1s forwards ease-out;
    }
`;
