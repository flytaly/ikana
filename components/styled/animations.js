import { css } from 'styled-components';

export const SlideInLeft = css`
    @keyframes slideIn {
        100% {
            transform: translateX(0%);
        }
    }
    .slideIn {
        transform: translateX(80%);
        animation: slideIn 0.05s forwards ease-in;
    }
`;

export const SlideOutLeft = css`
    @keyframes slideOut {
        100% {
            transform: translateX(-80%);
        }
    }
    .slideOut {
        animation: slideOut 0.1s forwards ease-out;
    }
`;

export const ShakeOnError = css`
    @keyframes shake {
        0% {
            transform: translate3d(3rem, 0, 0);
        }
        20% {
            transform: translate3d(-3rem, 0, 0);
        }
        40% {
            transform: translate3d(1.5rem, 0, 0);
        }
        60% {
            transform: translate3d(-1.5rem, 0, 0);
        }
        80% {
            transform: translate3d(0.7rem);
        }
        100% {
            transform: translate3d(0);
        }
    }

    animation: shake 0.15s 1 linear;
`;
