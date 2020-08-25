(function abc() {
    /* Parsel ABC */
    let abc = {
        a: "esh",
        b: "ch",
        c: "eish",
        d: "shi",
        e: "ash",
        f: "asha",
        g: "ei",
        h: "shis",
        i: "osh",
        j: "xim",
        k: "ss",
        l: "suh",
        m: "xan",
        n: "sh",
        o: "ush",
        p: "cah",
        q: "xii",
        r: "in",
        s: "shs",
        t: "cass",
        u: "ish",
        v: "aus",
        w: "xi",
        x: "shh",
        y: "sss",
        z: "xiy",
        'á': 'esh',
        'é': 'ash',
        'í': 'osh',
        'ó': 'ush',
        'ú': 'ish'
    };

    let decoded = '';
    let repeat = true;
    let characters_after_repeat = 0;

    /* Try to encode the character if finds a coincidence in the abc */
    let encode_character = function (character = "") {
        character = character.toLowerCase();
        let abc_character = abc[character] ?? character;

        if (abc_character == undefined) {
            return character;
        }

        return abc_character;
    };

    /* Receives the original text, divides the text and processes the character */
    let to_encode = function (original_text = "") {
        let characters = original_text.split("");
        let character_encoded = "";

        characters.forEach((character) => {
            character_encoded += encode_character(character);
        });

        return character_encoded;
    };

    /* Returns abc */
    let get_abc = function () {
        return abc;
    };

    /* Receives a text and divides it in words */
    let to_decode = function (original_text = "") {
        let result_decode = '';
        let words = original_text.split(" ");

        words.forEach((word) => {
            repeat = true;
            characters_after_repeat = 0;
            result_decode = result_decode + process_encoded_word(word) + " ";
        });

        return result_decode.trim();
    };

    /* Receives a text and process the encoded word */
    let process_encoded_word = function (original_text = "", start_position = 0) {
        if (start_position == 0) {
            /* Restart variable decoded */
            decoded = '';
        }

        let piece = '';
        let result = {
            found: false,
            size: 1,
            result: original_text.substr(start_position, 1)
        };
        let max_length = get_max_length();
        let max_length_twice = max_length * 2;
        let min_length = get_min_length();

        // if (original_text.length >= max_length) {
        /* Look for a coincidence with the max length twiced, left half bigger than right */
        piece = original_text.substr(start_position, max_length_twice);
        result = try_to_decode_double_max_length(piece, min_length);
        // }

        /* If there is no coincidence, tries to look for a coincidence with the max_length */
        if (!result.found) {
            piece = original_text.substr(start_position, max_length);
            result = try_to_decode_complete(piece, max_length);
        }

        if (start_position > original_text.length) {
            return decoded;
        } else {
            if (characters_after_repeat > 0 && !repeat) {
                repeat = true;
            } else {
                characters_after_repeat++;
            }

            if (piece.length > min_length && !result.found && repeat && decoded.length > 0) {
                repeat = false;
                characters_after_repeat = 0;
                let length_decoded_word = decoded.length;
                let previous_length_decoded_word = length_decoded_word - 1;

                if (previous_length_decoded_word < 0) {
                    previous_length_decoded_word = 0;
                }

                start_position -= abc[decoded.substr(previous_length_decoded_word, length_decoded_word)].length;
                decoded = decoded.substr(0, previous_length_decoded_word);
            } else {
                characters_after_repeat = 0;
                decoded = decoded + result.result;
                start_position += result.size;
            }
            return process_encoded_word(original_text, start_position);
        }
    };

    let try_to_decode_complete = function (original_text = "", size = 4, finish = true) {
        let result = {
            result: original_text,
            size: size,
            found: false
        };

        let min_length = get_min_length();
        let piece = original_text.substr(0, size);
        let abc_keys = Object.keys(abc);

        let filtered = abc_keys.filter(letter => {
            return abc[letter] == piece.toLowerCase();
        })

        if (filtered.length == 0 && size > min_length && finish) {
            let new_size = size - 1;
            return try_to_decode_complete(original_text, new_size);
        } else {
            if (filtered.length == 0) {
                result.result = result.result.trim().substr(0, 1);
                result.size = 1;
            } else {
                result.result = filtered[0];
                result.found = true
            }
            return result;
        }
    };

    let try_to_decode_double_max_length = function (original_text = '', left_size = 2) {
        let right_size = original_text.length - left_size;
        if (right_size < 0) {
            right_size = 0;
        }
        let left_phrase = original_text.substr(0, left_size);
        let right_phrase = original_text.substr(left_size, right_size);
        let left_result = {};
        let right_result = {};
        let max_length = get_max_length();
        let min_length = get_min_length();

        left_result = try_to_decode_complete(left_phrase, left_size, false);
        right_result = try_to_decode_complete(right_phrase, right_size, false);

        if (left_result.size != left_size || right_result.size != right_size || (right_size == right_result.size && !right_result.found)) {
            if (original_text.length > min_length) {
                if (right_size > min_length || left_size < max_length) {
                    left_size = left_size + 1;
                } else {
                    left_size = min_length;
                    original_text = original_text.substr(0, (original_text.length - 1))
                }

                return try_to_decode_double_max_length(original_text, left_size)
            } else {
                return {
                    result: '',
                    size: 0,
                    found: false
                };
            }
        } else {
            return {
                result: left_result.result + right_result.result,
                size: left_result.size + right_result.size,
                found: true
            };
        }
    }

    let get_max_length = function () {
        let max_length = 0;
        let abc_keys = Object.keys(abc);

        abc_keys.forEach((value, index) => {
            if (index == 0) {
                max_length = abc[value].length;
            } else {
                if (abc[value].length > max_length) {
                    max_length = abc[value].length;
                }
            }
        });

        return max_length;
    };

    let get_min_length = function () {
        let min_length = 0;
        let abc_keys = Object.keys(abc);

        abc_keys.forEach((value, index) => {
            if (index == 0) {
                min_length = abc[value].length;
            } else {
                if (abc[value].length < min_length) {
                    min_length = abc[value].length;
                }
            }
        });

        return min_length;
    };

    if (!window.hasOwnProperty("decoder_encoder")) {
        window.decoder_encoder = {
            to_encode: to_encode,
            get_abc: get_abc,
            to_decode: to_decode
        };
    }
})();
