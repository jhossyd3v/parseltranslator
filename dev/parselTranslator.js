(function abecedario() {
    /* Definición de abecedario parsel */
    let abecedario = {
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

    let en_parsel = '';

    /* Recibe un caracter y busca la coincidencia del caracter en el abecedario */
    let traducir_caracter_a_parsel = function (caracter = "") {
        caracter = caracter.toLowerCase();
        let nuevo_caracter = abecedario[caracter] ?? caracter;

        if (nuevo_caracter == undefined) {
            return caracter;
        }

        return nuevo_caracter;
    };

    /* Recibe una palabra, la divide en caracteres y la procesa */
    let traducir_texto_a_parsel = function (texto = "") {
        let caracteres = texto.split("");
        let nueva_palabra = "";

        caracteres.forEach((caracter) => {
            nueva_palabra += traducir_caracter_a_parsel(caracter);
        });

        return nueva_palabra;
    };

    /* Retorna abecedario */
    let get_abecedario = function () {
        return abecedario;
    };

    /* Recibe un texto, lo divide en palabras */
    let traducir_parsel_a_humano = function (texto = "") {
        let palabras = texto.split(" ");
        let traduccion = '';

        palabras.forEach((palabra) => {
            traduccion = traduccion + analizar_palabra_parsel(palabra) + " ";
        });

        return traduccion.trim();
    };

    /* Recibe un texto y lo procesa para buscar coincidencias en el abecedario */
    let analizar_palabra_parsel = function (texto = "", inicio = 0) {
        if (inicio == 0) {
            /* Se reinicia la variable */
            en_parsel = '';
        }

        let porcion = '';
        let coincidencia = {};

        /* Se buscan coincidencias en textos de 8 caracteres, divididos en 2 porciones */
        porcion = texto.substr(inicio, 8);
        coincidencia = buscar_coincidencia_parsel_especial(porcion);

        /* Si no se encuentra ese tipo de coincidencia se realiza búsqueda normal */
        if (coincidencia.coincidencia == '') {
            porcion = texto.substr(inicio, 4);
            coincidencia = buscar_coincidencia_parsel(porcion);
        }

        if (inicio > texto.length) {
            return en_parsel;
        } else {
            en_parsel = en_parsel + coincidencia.coincidencia;
            inicio += coincidencia.size;
            return analizar_palabra_parsel(texto, inicio);
        }
    };

    let buscar_coincidencia_parsel = function (texto = "", size = 4, seguir_buscando = true) {
        let respuesta = {
            coincidencia: texto,
            size: size,
            encontrado: false
        };

        let porcion = texto.substr(0, size);

        let abecedario_keys = Object.keys(abecedario);
        let filtrado = abecedario_keys.filter(letra => {
            return abecedario[letra] == porcion.toLowerCase();
        })

        if (filtrado.length == 0 && size > 2 && seguir_buscando) {
            let new_size = size - 1;
            return buscar_coincidencia_parsel(texto, new_size);
        } else {
            if (filtrado.length == 0) {
                respuesta.coincidencia = respuesta.coincidencia.trim().substr(0, 1);
                respuesta.size = 1;
            } else {
                respuesta.coincidencia = filtrado[0];
                respuesta.encontrado = true
            }
            return respuesta;
        }
    };

    let buscar_coincidencia_parsel_especial = function (texto = '', first_size = 2) {
        /* Se divide el texto en 2 */
        let last_size = texto.length - first_size;
        if (last_size < 0) {
            last_size = 0;
        }
        let letra_inicial = texto.substr(0, first_size);
        let letra_final = texto.substr(first_size, last_size);
        let coincidencia_inicial = {};
        let coincidencia_final = {};

        /* Se buscan coincidencias para las 2 letras */
        coincidencia_inicial = buscar_coincidencia_parsel(letra_inicial, first_size, false);
        coincidencia_final = buscar_coincidencia_parsel(letra_final, last_size, false);

        /* Si ambas no coinciden en tamaño se realiza otra prueba o se envía el fallo al encontrar coincidencia */
        if (coincidencia_inicial.size != first_size || coincidencia_final.size != last_size || (last_size == coincidencia_final.size && !coincidencia_final.encontrado)) {
            if (texto.length > 4) {
                if (last_size > 0) {
                    first_size = first_size + 1;
                } else {
                    first_size = 2;
                    texto = texto.substr(0, (texto.length - 1))
                }

                return buscar_coincidencia_parsel_especial(texto, first_size)
            } else {
                return {
                    coincidencia: '',
                    size: 0
                };
            }
        } else {
            /* Si coinciden se envía la concatenación de ambos caracteres */
            return {
                coincidencia: coincidencia_inicial.coincidencia + coincidencia_final.coincidencia,
                size: coincidencia_inicial.size + coincidencia_final.size
            };
        }
    }

    if (!window.hasOwnProperty("parselTranslator")) {
        window.parselTranslator = {
            traducir_a_parsel: traducir_texto_a_parsel,
            get_abecedario: get_abecedario,
            traducir_parsel_a_humano: traducir_parsel_a_humano
        };
    }
})();
