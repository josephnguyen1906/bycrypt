export const DEFAULT_TRADE_LOCK_MESSAGE = "Tài khoản đang bị khóa giao dịch";

type TradeLockUser = {
  trade_locked?: number | boolean | null;
  trade_lock_msg?: string | null;
} | null | undefined;

export function isTradeLocked(user: TradeLockUser): boolean {
  return Number(user?.trade_locked) === 1;
}

export function getTradeLockMessage(user: TradeLockUser): string {
  const message = user?.trade_lock_msg?.trim();
  return message || DEFAULT_TRADE_LOCK_MESSAGE;
}
