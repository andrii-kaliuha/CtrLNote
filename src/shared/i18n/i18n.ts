import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEn from "./locales/english.json";
import translationUa from "./locales/ukrainian.json";
import translationPl from "./locales/polish.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      english: {
        translation: translationEn,
      },
      ukrainian: {
        translation: translationUa,
      },
      polish: {
        translation: translationPl,
      },
    },
    fallbackLng: "english",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
