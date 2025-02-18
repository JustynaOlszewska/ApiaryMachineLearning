import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../src/locales/en/translation.json";
import translationPL from "../src/locales/pl/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // keySeparator: true,
    resources,
    fallbackLng: "en", // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
