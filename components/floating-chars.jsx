import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import kanaToRomaji from '../data/kana-to-romaji';
import shuffle from 'lodash.shuffle';
import { useGlobalState } from './state/index';

const DURATION = 30;
const AMOUNT = 20;

const AnimationContainer = styled.div`
    --size: 10rem;
    --delay: 0;
    --duration: ${DURATION}s;
    --x-shift: 100%;
    --left: 50%;
    --color: gray;
    --rotation: 220deg;
    --animation-state: paused;

    position: fixed;
    user-select: none;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    opacity: 0.3;
`;

const FloatingChar = styled.div`
    position: absolute;
    font-size: var(--size);
    user-select: none;
    top: 100%;
    left: var(--left);
    color: var(--color);

    animation: floating var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
    animation-play-state: var(--animation-state);

    @keyframes floating {
        to {
            top: 0;
            transform: translate(var(--x-shift), calc(var(--size) * -1)) rotate(var(--rotation));
            opacity: 0.1;
        }
    }
`;

function generate() {
    let chars = shuffle(Object.keys(kanaToRomaji));
    const data = [];
    for (let i = 0; i < Math.min(AMOUNT, chars.length); i++) {
        data.push({
            char: chars[i],
            style: {
                '--left': `${Math.random() * 100}%`,
                '--delay': `-${Math.random() * DURATION}s`,
                '--size': `${Math.random() * 8 + 3}rem`,
                '--x-shift': `${(Math.random() - 0.5) * 800}%`,
                '--rotation': `${Math.random() * 300 + 60}deg`,
            },
        });
    }

    return data;
}

const FloatingChars = () => {
    const opts = useGlobalState('options');

    const [chars, setChars] = useState([]);
    const [isPaused, setIsPaused] = useState(true);

    if (isPaused !== opts.disableBgAnimation) {
        setIsPaused(opts.disableBgAnimation);
    }

    useEffect(() => {
        setChars(generate());
    }, []);

    return (
        <AnimationContainer style={{ '--animation-state': isPaused ? 'paused' : 'running' }}>
            {chars.map((char) => (
                <FloatingChar key={char.char} style={char.style}>
                    {char.char}
                </FloatingChar>
            ))}
        </AnimationContainer>
    );
};

export default FloatingChars;
