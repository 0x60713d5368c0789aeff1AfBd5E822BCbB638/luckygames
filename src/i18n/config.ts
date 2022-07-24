import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cn from "./cn.json";
import en from "./en.json";
import ru from "./ru.json";
import fr from "./fr.json";
import sa from "./sa.json";
import es from "./es.json";

const resources = {
  en: {
    translation: en,
  },
  cn: {
    translation: cn,
  },
  ru: {
    translation: ru,
  },
  fr: {
    translation: fr,
  },
  sa: {
    translation: sa,
  },
  es: {
    translation: es,
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
