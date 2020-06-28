window.onload = function () {
    document.getElementById('abc_container').innerHTML = render_abecedario();
}

function render_abecedario() {
    let abecedario = parselTranslator.get_abecedario();
    let abecedario_keys = Object.keys(abecedario);
    let htmlContent = "";

    abecedario_keys.forEach((letra) => {
        htmlContent += `<div class="abc_item">
                                <span class="abc_item--letra"> ${letra} = </span>
                                <span class="abc_item--parsel">${abecedario[letra]}</span>
                            </div>`;
    });

    return htmlContent;
}