let translator_button = document.getElementById('translator__button');
let switch_button = document.getElementById('translator__switch__button');
/* let switch_button;
let translator_button; */
window.onload = function () {
    window.addEventListener('consentGranted', () => {
        window.clarity('consent')
    })
    translator_button.onclick = translator_click;
    switch_button.onclick = switch_click;
};

function translator_click(event) {
    let txt_from = document.getElementById('txt_from');
    let txt_to = document.getElementById('txt_to');

    let translate_data = switch_button.getAttribute('data-translate');
    let text_from = txt_from.value;
    let text_to = '';
    if (translate_data == 'parsel_human') {
        text_to = decoder_encoder.to_encode(text_from);
    } else {
        text_to = decoder_encoder.to_decode(text_from);
    }
    txt_to.value = text_to;
}

function switch_click(event) {
    let translate_data = switch_button.getAttribute('data-translate');
    let label_from = document.getElementById('text_from');
    let label_to = document.getElementById('text_to');
    let txt_from = document.getElementById('txt_from');
    let txt_to = document.getElementById('txt_to');
    if (translate_data == 'parsel_human') {
        switch_button.setAttribute('data-translate', 'human_parsel');
        label_from.textContent = 'Parsel';
        label_to.textContent = 'Humano';
    } else {
        switch_button.setAttribute('data-translate', 'parsel_human');
        label_from.textContent = 'Humano';
        label_to.textContent = 'Parsel';
    }
    txt_from.value = '';
    txt_to.value = '';
}