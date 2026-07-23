/** SaleSmartly ssq helpers (plugin-code.salesmartly.com). */
type SsqApi = {
  push?: (...args: unknown[]) => void;
  (...args: unknown[]): void;
};

declare global {
  interface Window {
    ssq?: SsqApi;
    __ssc?: { license?: string; setting?: Record<string, unknown> };
  }
}

/** Call before loading the project script (matches plugin bootstrap). */
export function preInitSaleSmartly() {
  if (typeof window === "undefined") return;
  window.__ssc = window.__ssc || {};
  if (!window.__ssc.license) {
    window.__ssc.license = "g1vfb1b";
  }
}

export function ssqPush(...args: unknown[]): boolean {
  const ssq = window.ssq;
  if (!ssq) return false;
  try {
    if (typeof ssq.push === "function") {
      ssq.push(...args);
    } else {
      ssq(...args);
    }
    return true;
  } catch {
    return false;
  }
}

export function openSaleSmartlyChat(): boolean {
  return ssqPush("chatOpen");
}

export function closeSaleSmartlyChat(): boolean {
  return ssqPush("chatClose");
}

let readyOpenBound = false;

export function resetSaleSmartlyReadyBinding() {
  readyOpenBound = false;
}

/** Open chat once after SDK onReady (avoids connect errors from early chatOpen). */
export function openSaleSmartlyWhenReady(): boolean {
  if (!window.ssq) return false;
  if (readyOpenBound) return true;
  readyOpenBound = true;
  ssqPush("onReady", () => {
    openSaleSmartlyChat();
  });
  return true;
}

const LAUNCHER_SELECTORS = ["#SSC_WIDGET", '[id^="SSC_"]'];

/** ponytail: DOM scan for injected launcher; upgrade path = SS SDK position API in dashboard. */
export function adjustSaleSmartlyLauncherBottom(offsetPx: number) {
  if (typeof document === "undefined") return;
  for (const sel of LAUNCHER_SELECTORS) {
    document.querySelectorAll(sel).forEach((node) => {
      const el = node as HTMLElement;
      el.style.setProperty("bottom", `${offsetPx}px`, "important");
    });
  }
}

export function pathsWithMobileNav(pathname: string | null): boolean {
  if (!pathname) return false;
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    p !== "/login/" &&
    p !== "/signup/" &&
    p !== "/chat/" &&
    p !== "/trade/" &&
    p !== "/trade-chart/"
  );
}

export function isChatPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return pathname === "/chat" || pathname === "/chat/";
}
