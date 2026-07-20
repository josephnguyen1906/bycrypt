// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/messages/en.json";
import vi from "@/messages/vi.json";
import ja from "@/messages/ja.json";

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    ja: { translation: ja },
  },
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
