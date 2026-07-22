// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/messages/en.json";
import vi from "@/messages/vi.json";
import ja from "@/messages/ja.json";
import id from "@/messages/id.json";
import de from "@/messages/de.json";
import es from "@/messages/es.json";
import po from "@/messages/po.json";
import fr from "@/messages/fr.json";
import it from "@/messages/it.json";
import ko from "@/messages/ko.json";
import th from "@/messages/th.json";
import gr from "@/messages/gr.json";

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
    ja: { translation: ja },
    id: { translation: id },
    de: { translation: de },
    es: { translation: es },
    po: { translation: po },
    fr: { translation: fr },
    it: { translation: it },
    ko: { translation: ko },
    th: { translation: th },
    gr: { translation: gr },
  },
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

if (typeof window !== "undefined") {
  const saved = window.localStorage.getItem("lang");
  if (saved) {
    i18n.changeLanguage(saved);
  }
}

export default i18n;
