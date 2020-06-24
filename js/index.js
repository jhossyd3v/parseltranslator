window.onload = function () {
    let boton_traducir = document.getElementById('boton_traducir');
    let boton_cambiar = document.getElementById('boton_cambiar');
    boton_traducir.onclick = traducir_click;
    boton_cambiar.onclick = cambio_click;
};

function traducir_click(event) {
    let ta_from = document.getElementById('ta_from');
    let ta_to = document.getElementById('ta_to');

    let data_traduccion = boton_cambiar.getAttribute('data-traduccion');
    let texto_from = ta_from.value;
    let texto_to = '';
    if (data_traduccion == 'parsel_humano') {
        texto_to = parselTranslator.traducir_a_parsel(texto_from);
    } else {
        texto_to = parselTranslator.traducir_parsel_a_humano(texto_from);
    }
    ta_to.value = texto_to;
}

function cambio_click(event) {
    let data_traduccion = boton_cambiar.getAttribute('data-traduccion');
    let label_from = document.querySelector('label[for="ta_from"]');
    let label_to = document.querySelector('label[for="ta_to"]');
    let ta_from = document.getElementById('ta_from');
    let ta_to = document.getElementById('ta_to');
    if (data_traduccion == 'parsel_humano') {
        boton_cambiar.setAttribute('data-traduccion', 'humano_parsel');
        label_from.textContent = 'Humano';
        label_to.textContent = 'Parsel';
    } else {
        boton_cambiar.setAttribute('data-traduccion', 'parsel_humano');
        label_from.textContent = 'Parsel';
        label_to.textContent = 'Humano';
    }
    ta_from.value = '';
    ta_to.value = '';
}