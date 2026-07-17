// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/messages/en.json";
import vi from "@/messages/vi.json";
import ja from "@/messages/ja.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    lng: "vi",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
