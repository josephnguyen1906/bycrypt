import i18n from "@/i18n";

const APP_LOCALES = new Set([
  "vi",
  "en",
  "ja",
  "id",
  "de",
  "es",
  "po",
  "fr",
  "it",
  "ko",
  "th",
  "gr",
]);

/** Phone-country codes that map onto an existing i18n resource pack. */
const COUNTRY_TO_I18N: Record<string, string> = {
  "zh-tw": "en",
  "en-au": "en",
  "en-sg": "en",
  pl: "en",
  nl: "en",
  ms: "en",
};

/** TradingView / chart widgets use slightly different locale codes. */
function chartLocaleFromApp(code: string): string {
  if (code === "po") return "pt";
  if (code === "gr") return "el";
  if (code === "zh-tw") return "zh_TW";
  return code;
}

function resolveI18nCode(code: string): string | null {
  const normalized = code.trim().toLowerCase();
  if (APP_LOCALES.has(normalized)) {
    return normalized;
  }
  return COUNTRY_TO_I18N[normalized] ?? null;
}

export function applyAppLocale(code: string): void {
  const countryKey = code.trim();
  const i18nCode = resolveI18nCode(countryKey);
  if (!i18nCode) {
    return;
  }

  i18n.changeLanguage(i18nCode);
  if (typeof window !== "undefined") {
    // Keep original country code for phone default; i18n uses mapped pack.
    window.localStorage.setItem("lang", countryKey);
    window.localStorage.setItem("language", chartLocaleFromApp(i18nCode));
  }
}

export function resolveAuthLocale(
  loginType: "phone" | "email",
  countryCode: string,
  fallback?: string,
): string {
  if (loginType === "phone" && countryCode) {
    return countryCode;
  }

  return fallback || i18n.language || "vi";
}
