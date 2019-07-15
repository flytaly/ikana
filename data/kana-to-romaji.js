import { hiraganaToRomaji } from './hiragana';
import { katakanaToRomaji } from './katakana';

export const getKanaType = (kana) => {
    if (hiraganaToRomaji[kana]) return 'hiragana';
    if (katakanaToRomaji[kana]) return 'katakana';
    return null;
};

export { hiraganaToRomaji, katakanaToRomaji };

export default {
    ...hiraganaToRomaji,
    ...katakanaToRomaji,
};
