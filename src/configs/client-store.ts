export function getStore(key: string): any {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (e) {
    return raw;
  }
}

export function getToken() {
  const store =
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
  return store;
}
export function setStore<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
