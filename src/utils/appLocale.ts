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

/** TradingView / chart widgets use slightly different locale codes. */
function chartLocaleFromApp(code: string): string {
  if (code === "po") return "pt";
  if (code === "gr") return "el";
  return code;
}

export function applyAppLocale(code: string): void {
  const normalized = code.trim().toLowerCase();
  if (!APP_LOCALES.has(normalized)) {
    return;
  }

  i18n.changeLanguage(normalized);
  if (typeof window !== "undefined") {
    window.localStorage.setItem("lang", normalized);
    window.localStorage.setItem("language", chartLocaleFromApp(normalized));
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
