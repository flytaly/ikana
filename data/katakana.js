/* eslint-disable object-property-newline */
export const kanaTypes = {
    monographs: 'monographs',
    diacritics: 'diacritics',
    digraphs: 'digraphs',
    digraphsDiacritics: 'digraphsDiacritics',
};

export const monographsRows = [
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト'],
    ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
    ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ'],
    ['ヤ', '', 'ユ', '', 'ヨ'],
    ['ラ', 'リ', 'ル', 'レ', 'ロ'],
    ['ワ', '', '', '', 'ヲ'],
    ['ン'],
];

export const diacriticsRows = [
    ['ガ', 'ギ', 'グ', 'ゲ', 'ゴ'],
    ['ザ', 'ジ', 'ズ', 'ゼ', 'ゾ'],
    ['ダ', 'ヂ', 'ヅ', 'デ', 'ド'],
    ['バ', 'ビ', 'ブ', 'ベ', 'ボ'],
    ['パ', 'ピ', 'プ', 'ペ', 'ポ'],
];

export const digraphsRow = [
    ['キャ', 'キュ', 'キョ'],
    ['シャ', 'シュ', 'ショ'],
    ['チャ', 'チュ', 'チョ'],
    ['ニャ', 'ニュ', 'ニョ'],
    ['ヒャ', 'ヒュ', 'ヒョ'],
    ['ミャ', 'ミュ', 'ミョ'],
    ['リャ', 'リュ', 'リョ'],
];

export const digraphsDiacriticsRows = [
    ['ギャ', 'ギュ', 'ギョ'],
    ['ジャ', 'ジュ', 'ジョ'],
    ['ヂャ', 'ヂュ', 'ヂョ'],
    ['ビャ', 'ビュ', 'ビョ'],
    ['ピャ', 'ピュ', 'ピョ'],
];


export const katakanaRows = {
    monographs: monographsRows,
    diacritics: diacriticsRows,
    digraphs: digraphsRow,
    digraphsDiacritics: digraphsDiacriticsRows,
};

export const katakanaToRomaji = {
    ア: ['a'], イ: ['i'], ウ: ['u'], エ: ['e'], オ: ['o'],
    カ: ['ka'], キ: ['ki'], ク: ['ku'], ケ: ['ke'], コ: ['ko'],
    サ: ['sa'], シ: ['shi', 'si'], ス: ['su'], セ: ['se'], ソ: ['so'],
    タ: ['ta'], チ: ['chi', 'ti'], ツ: ['tsu'], テ: ['te'], ト: ['to'],
    ナ: ['na'], ニ: ['ni'], ヌ: ['nu'], ネ: ['ne'], ノ: ['no'],
    ハ: ['ha'], ヒ: ['hi'], フ: ['fu'], ヘ: ['he'], ホ: ['ho'],
    マ: ['ma'], ミ: ['mi'], ム: ['mu'], メ: ['me'], モ: ['mo'],
    ヤ: ['ya'], ユ: ['yu'], ヨ: ['yo'],
    ラ: ['ra'], リ: ['ri'], ル: ['ru'], レ: ['re'], ロ: ['ro'],
    ワ: ['wa'], ヲ: ['wo'],
    ン: ['n'],

    ガ: ['ga'], ギ: ['gi'], グ: ['gu'], ゲ: ['ge'], ゴ: ['go'],
    ザ: ['za'], ジ: ['ji'], ズ: ['zu'], ゼ: ['ze'], ゾ: ['zo'],
    ダ: ['da'], ヂ: ['ji'], ヅ: ['zu'], デ: ['de'], ド: ['do'],
    バ: ['ba'], ビ: ['bi'], ブ: ['bu'], ベ: ['be'], ボ: ['bo'],
    パ: ['pa'], ピ: ['pi'], プ: ['pu'], ペ: ['pe'], ポ: ['po'],

    キャ: ['kya'], キュ: ['kyu'], キョ: ['kyo'],
    シャ: ['sha'], シュ: ['shu'], ショ: ['sho'],
    チャ: ['cha'], チュ: ['chu'], チョ: ['cho'],
    ニャ: ['nya'], ニュ: ['nyu'], ニョ: ['nyo'],
    ヒャ: ['hya'], ヒュ: ['hyu'], ヒョ: ['hyo'],
    ミャ: ['mya'], ミュ: ['myu'], ミョ: ['myo'],
    リャ: ['rya'], リュ: ['ryu'], リョ: ['ryo'],

    ギャ: ['gya'], ギュ: ['gyu'], ギョ: ['gyo'],
    ジャ: ['ja'], ジュ: ['ju'], ジョ: ['jo'],
    ヂャ: ['ja'], ヂュ: ['ju'], ヂョ: ['jo'],
    ビャ: ['bya'], ビュ: ['byu'], ビョ: ['byo'],
    ピャ: ['pya'], ピュ: ['pyu'], ピョ: ['pyo'],
};


export const katakanaTotal = Object.keys(katakanaToRomaji).length;
