/* eslint-disable object-property-newline */
export const kanaTypes = {
    monographs: 'monographs',
    diacritics: 'diacritics',
    digraphs: 'digraphs',
    digraphsDiacritics: 'digraphsDiacritics',
};

export const monographsRows = [
    ['あ', 'い', 'う', 'え', 'お'],
    ['か', 'き', 'く', 'け', 'こ'],
    ['さ', 'し', 'す', 'せ', 'そ'],
    ['た', 'ち', 'つ', 'て', 'と'],
    ['な', 'に', 'ぬ', 'ね', 'の'],
    ['は', 'ひ', 'ふ', 'へ', 'ほ'],
    ['ま', 'み', 'む', 'め', 'も'],
    ['や', '', 'ゆ', '', 'よ'],
    ['ら', 'り', 'る', 'れ', 'ろ'],
    ['わ', '', '', '', 'を'],
    ['ん'],
];

export const diacriticsRows = [
    ['が', 'ぎ', 'ぐ', 'げ', 'ご'],
    ['ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
    ['だ', 'ぢ', 'づ', 'で', 'ど'],
    ['ば', 'び', 'ぶ', 'べ', 'ぼ'],
    ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
];

export const hiraganaRows = {
    monographs: monographsRows,
    diacritics: diacriticsRows,
    digraphs: [],
    digraphsDiacritics: [],
};

export const hiraganaToRomaji = {
    あ: ['a'], い: ['i'], う: ['u'], え: ['e'], お: ['o'],
    か: ['ka'], き: ['ki'], く: ['ku'], け: ['ke'], こ: ['ko'],
    さ: ['sa'], し: ['shi', 'si'], す: ['su'], せ: ['se'], そ: ['so'],
    た: ['ta'], ち: ['chi', 'ti'], つ: ['tsu'], て: ['te'], と: ['to'],
    な: ['na'], に: ['ni'], ぬ: ['nu'], ね: ['ne'], の: ['no'],
    は: ['ha'], ひ: ['hi'], ふ: ['fu'], へ: ['he'], ほ: ['ho'],
    ま: ['ma'], み: ['mi'], む: ['mu'], め: ['me'], も: ['mo'],
    や: ['ya'], ゆ: ['yu'], よ: ['yo'],
    ら: ['ra'], り: ['ri'], る: ['ru'], れ: ['re'], ろ: ['ro'],
    わ: ['wa'], を: ['wo'],
    ん: ['n'],

    が: ['ga'], ぎ: ['gi'], ぐ: ['gu'], げ: ['ge'], ご: ['go'],
    ざ: ['za'], じ: ['ji'], ず: ['zu'], ぜ: ['ze'], ぞ: ['zo'],
    だ: ['da'], ぢ: ['ji'], づ: ['zu'], で: ['de'], ど: ['do'],
    ば: ['ba'], び: ['bi'], ぶ: ['bu'], べ: ['be'], ぼ: ['bo'],
    ぱ: ['pa'], ぴ: ['pi'], ぷ: ['pu'], ぺ: ['pe'], ぽ: ['po'],
};

export const hiraganaTotal = Object.keys(hiraganaToRomaji).length;
