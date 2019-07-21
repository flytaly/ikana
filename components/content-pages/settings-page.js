import React from 'react';
import styled from 'styled-components';
import ContentHeader from './content-header';
import OptionGroup from '../styled/radio-option-group';
import { useDispatch, useGlobalState, types } from '../state';

const SettingsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    width: 35rem;
    max-width: 100%;
    h3 {
        font-size: 1.5rem;
        align-self: flex-start;
    }
`;

const Setting = styled.div`
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
    const { disableAnimations } = options;

    return (
        <>
            <ContentHeader>Settings</ContentHeader>
            <SettingsBlock>
                <h3>Practice options</h3>
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
            </SettingsBlock>
        </>);
};

export default Settings;
