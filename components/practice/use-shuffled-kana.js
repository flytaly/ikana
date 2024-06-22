import shuffle from 'lodash.shuffle';
import { useEffect, useMemo, useState } from 'react';
import { hiraganaRows } from '../../data/hiragana';
import { katakanaRows } from '../../data/katakana';
import getSelectedKana from '../../utils/get-selected-kana';
import { useGlobalState } from '../state';

export default function useShuffledKana() {
    const [wasShuffled, setWasShuffled] = useState(false);
    const { hiragana, katakana } = useGlobalState();

    const hiraganaToLearn = useMemo(
        () => getSelectedKana(hiraganaRows, hiragana.selectedRows),
        [hiragana.selectedRows],
    );
    const katakanaToLearn = useMemo(
        () => getSelectedKana(katakanaRows, katakana.selectedRows),
        [katakana.selectedRows],
    );

    const [shuffled, setShuffled] = useState([]);

    const kana = [...hiraganaToLearn, ...katakanaToLearn];

    useEffect(() => {
        setShuffled(shuffle(kana));
        setWasShuffled(true);
    }, [hiraganaToLearn, katakanaToLearn]);

    return {
        shuffled,
        wasShuffled,
        reshuffle: () => setShuffled(shuffle(kana)),
    };
}
