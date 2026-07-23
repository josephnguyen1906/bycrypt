/** Default SaleSmartly embed for /chat when admin chat_script is empty. */
export const DEFAULT_CHAT_SCRIPT = `<script>window.__ssc=window.__ssc||{};window.__ssc.license=window.__ssc.license||'g1vfb1b';</script>
<script src="https://plugin-code.salesmartly.com/js/project_783639_810552_1784725341.js"></script>`;

export function resolveChatScript(raw: unknown): string {
  if (typeof raw !== "string") return DEFAULT_CHAT_SCRIPT;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : DEFAULT_CHAT_SCRIPT;
}

/** Extract <script> nodes from an HTML snippet (admin-provided widget embed). */
export function parseChatScripts(html: string): Array<{ src?: string; code?: string }> {
  const results: Array<{ src?: string; code?: string }> = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const attrs = match[1] ?? "";
    const body = (match[2] ?? "").trim();
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    const src = srcMatch?.[1]?.trim();
    if (src) {
      results.push({ src });
      continue;
    }
    if (body) {
      results.push({ code: body });
    }
  }
  return results;
}

/**
 * Inject admin chat widget scripts into document.body.
 * Returns a disposer that removes the injected <script> tags (widget UI may linger).
 */
export function injectChatScripts(html: string): Promise<() => void> {
  if (typeof document === "undefined") {
    return Promise.resolve(() => undefined);
  }

  const nodes = parseChatScripts(html);
  const injected: HTMLScriptElement[] = [];

  const loadOne = (item: { src?: string; code?: string }) =>
    new Promise<void>((resolve) => {
      const el = document.createElement("script");
      el.dataset.bycryptChatScript = "1";
      if (item.src) {
        el.src = item.src;
        el.async = true;
        el.onload = () => resolve();
        el.onerror = () => resolve();
      } else if (item.code) {
        el.text = item.code;
      }
      document.body.appendChild(el);
      injected.push(el);
      if (!item.src) resolve();
    });

  return nodes
    .reduce((chain, item) => chain.then(() => loadOne(item)), Promise.resolve())
    .then(
      () => () => {
        injected.forEach((el) => el.remove());
      },
    );
}
