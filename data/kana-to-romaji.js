import { hiraganaToRomaji } from './hiragana';
import { katakanaToRomaji } from './katakana';

export default {
    ...hiraganaToRomaji,
    ...katakanaToRomaji,
};
