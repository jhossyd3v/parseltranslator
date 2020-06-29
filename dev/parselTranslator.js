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

    /* Busca la coincidencia de caracter en el abecedario */
    let traducir_caracter_a_parsel = function (caracter = "") {
        caracter = caracter.toLowerCase();
        let nuevo_caracter = abecedario[caracter] ?? caracter;

        if (nuevo_caracter == undefined) {
            return caracter;
        }

        return nuevo_caracter;
    };

    let traducir_texto_a_parsel = function (texto = "") {
        let caracteres = texto.split("");
        let nueva_palabra = "";

        caracteres.forEach((caracter) => {
            nueva_palabra += traducir_caracter_a_parsel(caracter);
        });

        return nueva_palabra;
    };

    let get_abecedario = function () {
        return abecedario;
    };

    let traducir_parsel_a_humano = function (texto = "") {
        let palabras = texto.split(" ");
        let traduccion = '';

        palabras.forEach((palabra) => {
            traduccion = traduccion + analizar_palabra_parsel(palabra) + " ";
        });

        return traduccion.trim();
    };

    let analizar_palabra_parsel = function (texto = "", inicio = 0) {
        if (inicio == 0) {
            en_parsel = '';
        }

        let porcion = texto.substr(inicio, 4);
        let coincidencia = buscar_coincidencia_parsel(porcion);

        if (inicio > texto.length) {
            return en_parsel;
        } else {
            en_parsel = en_parsel + coincidencia.coincidencia;
            inicio += coincidencia.size;
            return analizar_palabra_parsel(texto, inicio);
        }
    };

    let buscar_coincidencia_parsel = function (texto = "", size = 4) {
        let respuesta = {
            coincidencia: texto,
            size: size
        };

        let porcion = texto.substr(0, size);

        let abecedario_keys = Object.keys(abecedario);
        let filtrado = abecedario_keys.filter(letra => {
            return abecedario[letra] == porcion.toLowerCase();
        })

        if (filtrado.length == 0 && size > 2) {
            let new_size = size - 1;
            return buscar_coincidencia_parsel(texto, new_size);
        } else {
            if (filtrado.length == 0) {
                respuesta.coincidencia = respuesta.coincidencia.trim().substr(0, 1);
                respuesta.size = 1;
            } else {
                respuesta.coincidencia = filtrado[0];
            }
            return respuesta;
        }
    };

    if (!window.hasOwnProperty("parselTranslator")) {
        window.parselTranslator = {
            traducir_a_parsel: traducir_texto_a_parsel,
            get_abecedario: get_abecedario,
            traducir_parsel_a_humano: traducir_parsel_a_humano
        };
    }
})();
