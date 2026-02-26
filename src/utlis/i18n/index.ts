"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "../../../public/locales/en/common.json";
import arCommon from "../../../public/locales/ar/common.json";

// the translations
const resources = {
  en: {
    translation: enCommon,
  },
  ar: {
    translation: arCommon,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
