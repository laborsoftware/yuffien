//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
    const locales = require.context("/", true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key)
        }
    })
    console.log(messages)
    return messages
}

const i18n = new VueI18n({
    locale: setI18nLanguage(), // set locale
    fallbackLocale: setI18nLanguage(),
    messages: loadLocaleMessages(), // set locale messages

})


function setI18nLanguage() {
    const lang = navigator.language;
    let shortLang = "";

    document.querySelector('html').setAttribute('lang', lang)

    shortLang = lang.split("-")[0].toString();
    return shortLang;
}

export default i18n;