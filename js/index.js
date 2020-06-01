window.onload = function () {
    let boton_traducir = document.getElementById('boton_traducir');
    boton_traducir.onclick = traducir_click;
};

function traducir_click(event) {
    let ta_normal = document.getElementById('ta_normal');
    let ta_parsel = document.getElementById('ta_parsel');

    let texto_normal = ta_normal.value;
    let texto_parsel = parselTranslator.traducir_a_parsel(texto_normal);
    ta_parsel.value = texto_parsel;
}