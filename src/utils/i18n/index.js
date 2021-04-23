import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import enJSON from './resources/en.json';
import jpJSON from './resources/jp.json'

const resources = {
    en: enJSON,
    jp: jpJSON
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: ['jp', 'en'],
        keySeparator: '.',
        debug: true,

        interpolation: {
            escapeValue: true
        },
    });

export default i18n;