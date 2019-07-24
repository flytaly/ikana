import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
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
    line-height: normal;
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
    const { t } = useTranslation();

    const defaultOnOff = [
        { title: t('settings.On'), id: 'on' },
        { title: t('settings.Off'), id: 'off' },
    ];

    return (
        <>
            <ContentHeader>{t('settings.pageHeader')}</ContentHeader>
            <SettingsBlock>
                <h2>{t('settings.optGroup_practice')}</h2>
                <Setting>
                    <span title={t('settings.opt_animations_title')}>
                        {t('settings.opt_animations')}
                    </span>
                    <OptionGroup
                        ariaLabel={t('settings.opt_animations')}
                        options={defaultOnOff}
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
                    <span title={t('settings.opt_checkInput_title')}>
                        {t('settings.opt_checkInput')}
                    </span>
                    <OptionGroup
                        ariaLabel={t('settings.opt_checkInput')}
                        options={defaultOnOff}
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
                    <span title={t('settings.opt_repeatMistakes_title')}>
                        {t('settings.opt_repeatMistakes')}
                    </span>
                    <OptionGroup
                        ariaLabel={t('settings.opt_repeatMistakes')}
                        options={defaultOnOff}
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
