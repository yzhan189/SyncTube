export const CAPITAL_LETTERS = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'
export const CHANNELS = ['NEWS', 'LIFE', 'FOOD', 'NATURE', 'SPORTS', 'NETWORK', 'WILD',  'HD',  'XD', 'TV', 'CHANNEL', 'DRAMA', 'MOVIE', 'CINEMA', 'EDUCATION']

export function generate_random_int (size) {
    return Math.floor(Math.random() * size);
}

export function generate_room_code () {
    return CAPITAL_LETTERS.charAt(generate_random_int(CAPITAL_LETTERS.length))
        + CAPITAL_LETTERS.charAt(generate_random_int(CAPITAL_LETTERS.length))
        + CAPITAL_LETTERS.charAt(generate_random_int(CAPITAL_LETTERS.length))
        + ' '
        + CHANNELS[generate_random_int(CHANNELS.length)];
}


