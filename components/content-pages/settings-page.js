import React from 'react';
import styled from 'styled-components';
import ContentHeader from './content-header';
import OptionGroup from '../styled/radio-option-group';
import { useDispatch, useGlobalState, types } from '../state';

const SettingsBlock = styled.section`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: 35rem;
    max-width: 100%;
    h2 {
        font-size: 1.5rem;
        align-self: flex-start;
    }
`;

const Setting = styled.article`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    b {
        margin-right: 2rem;
    }
`;

const Settings = () => {
    const options = useGlobalState('options');
    const dispatch = useDispatch();
    const { disableAnimations, disableAutoInputCheck, repeatWrongChars } = options;

    return (
        <>
            <ContentHeader>Settings</ContentHeader>
            <SettingsBlock>
                <h2>Practice options</h2>
                <Setting>
                    <span title="Enable animations in practice modes?">Animations</span>
                    <OptionGroup
                        ariaLabel="animations"
                        options={[{ title: 'On', id: 'on' }, { title: 'Off', id: 'off' }]}
                        current={disableAnimations ? 'off' : 'on'}
                        changeHandler={({ target }) => dispatch({
                            type: types.UPDATE_OPTIONS,
                            payload: {
                                ...options,
                                disableAnimations: target.value === 'off' || false,
                            },
                        })}
                    />
                </Setting>
                <Setting>
                    <span title="Automatically check input and don't wait for Enter or submit button to be pressed">Check input in real time</span>
                    <OptionGroup
                        ariaLabel="input auto checking"
                        options={[{ title: 'On', id: 'on' }, { title: 'Off', id: 'off' }]}
                        current={disableAutoInputCheck ? 'off' : 'on'}
                        changeHandler={({ target }) => dispatch({
                            type: types.UPDATE_OPTIONS,
                            payload: {
                                ...options,
                                disableAutoInputCheck: target.value === 'off' || false,
                            },
                        })}
                    />
                </Setting>
                <Setting>
                    <span title="Show mistaken syllables again">Repeat mistaken syllables</span>
                    <OptionGroup
                        ariaLabel="repeat mistaken syllables"
                        options={[{ title: 'On', id: 'on' }, { title: 'Off', id: 'off' }]}
                        current={repeatWrongChars ? 'on' : 'off'}
                        changeHandler={({ target }) => dispatch({
                            type: types.UPDATE_OPTIONS,
                            payload: {
                                ...options,
                                repeatWrongChars: target.value === 'on' || false,
                            },
                        })}
                    />
                </Setting>
            </SettingsBlock>
        </>);
};

export default Settings;
