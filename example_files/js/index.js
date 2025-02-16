let translator_button = document.getElementById('translator__button');
let switch_button = document.getElementById('translator__switch__button');
const cookieBanner = document.querySelector('.cookie-banner');
const cookieAccept = document.querySelector('.cookie__accept');
const cookieReject = document.querySelector('.cookie__reject');
/* let switch_button;
let translator_button; */
window.onload = function () {
    // know if the user has accepted the cookies
    const appConsentCookie = document.cookie.split(';').find(cookie => cookie.includes('app_analytics_consent'));

    if (appConsentCookie) {
        cookieBanner.classList.add('hidden');
    }
    cookieAccept.addEventListener('click', () => {
        if (window.clarity) {
            window.clarity('consent')
        }
        consentGrantedGoogleTagManager()
        setCookie('app_analytics_consent', 'true', 365);
        cookieBanner.classList.add('hidden');
    })
    cookieReject.addEventListener('click', () => {
        cookieBanner.classList.add('hidden');
    })

    translator_button.onclick = translator_click;
    switch_button.onclick = switch_click;
};

function consentGrantedGoogleTagManager() {
    if (gtag) {
        gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted'
        });
    }
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

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