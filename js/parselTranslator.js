(function abecedario() {
    let abecedario = {
        a: 'esh',
        b: 'ch',
        c: 'eish',
        d: 'shi',
        e: 'ash',
        f: 'asha',
        g: 'ei',
        h: 'shis',
        i: 'osh',
        j: 'xim',
        k: 'ss',
        l: 'suh',
        m: 'xan',
        n: 'sh',
        o: 'ush',
        p: 'cah',
        q: 'xii',
        r: 'in',
        s: 'shs',
        t: 'cass',
        u: 'ish',
        v: 'aus',
        w: 'xi',
        x: 'shh',
        y: 'sss',
        z: 'xiy'
    };

    let traducir_caracter_a_parsel = function (caracter = '') {
        caracter = caracter.toLowerCase();
        let nuevo_caracter = abecedario[caracter];
        if (nuevo_caracter == undefined) {
            return caracter;
        }

        return nuevo_caracter;
    }

    let traducir_texto_a_parsel = function (texto = '') {
        let caracteres = texto.split('');
        let nueva_palabra = '';

        caracteres.forEach(caracter => {
            nueva_palabra += traducir_caracter_a_parsel(caracter);
        })

        return nueva_palabra;
    }

    let render_abecedario = function () {
        let abecedario_keys = Object.keys(abecedario);
        let htmlContent = '';

        abecedario_keys.forEach(letra => {
            htmlContent += `<div class="abc_item">
                                <span class="abc_item--letra"> ${letra} = </span>
                                <span class="abc_item--parsel">${abecedario[letra]}</span>
                            </div>`;
        })

        return htmlContent;
    }

    if (!window.hasOwnProperty('parselTranslator')) {
        window.parselTranslator = {
            traducir_a_parsel: traducir_texto_a_parsel,
            render_abecedario: render_abecedario
        };
    }
})()
