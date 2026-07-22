import type { TFunction, i18n } from "i18next";

type ApiToastPayload = {
  code?: string;
  message?: string;
} | null | undefined;

/** Fallback map for older API responses that only send `message`. */
const MESSAGE_TO_TOAST_KEY: Record<string, string> = {
  "Insufficient USDT balance.": "Toast.insufficient_balance",
  "Số dư không đủ. Vui lòng nạp thêm tiền vào tài khoản.":
    "Toast.insufficient_balance",
  "Position opened.": "Toast.order_success",
  "Position increased.": "Toast.order_success",
  "Đặt lệnh thành công": "Toast.order_success",
  "Failed to place perpetual order.": "Toast.order_failed",
  "Đã xảy ra lỗi khi đặt lệnh. Vui lòng thử lại sau.": "Toast.order_failed",
  "Failed to fetch market price.": "Toast.price_fetch_failed",
  "qty must be greater than 0.": "Toast.invalid_qty",
  "Close existing position before flipping side.": "Toast.close_before_flip",
  "Symbol not supported for perpetual trading.": "Toast.symbol_unsupported",
  "side must be buy or sell.": "Toast.invalid_side",
  "Invalid close quantity.": "Toast.invalid_close_qty",
  "User balance not found.": "Toast.balance_unavailable",
  "Không thể truy xuất số dư tài khoản. Vui lòng liên hệ hỗ trợ.":
    "Toast.balance_unavailable",
  "Open position not found.": "Toast.position_not_found",
  "Failed to close position.": "Toast.close_failed",
  "position_id or symbol required.": "Toast.missing_position_ref",
  "Position closed.": "Toast.close_success",
  "Position reduced.": "Toast.position_reduced",
  "Bạn đang có lệnh chưa hoàn thành. Vui lòng chờ lệnh hiện tại kết thúc.":
    "Toast.order_pending",
  "Thời gian được chọn không hợp lệ. Vui lòng chọn một thời gian hợp lệ.":
    "Toast.invalid_timeframe",
  "Lỗi khi lấy cài đặt. Vui lòng liên hệ hỗ trợ.": "Toast.settings_error",
};

function resolveToastKey(
  code: string | undefined,
  message: string | undefined,
  i18n: i18n,
): string | null {
  if (code) {
    const byCode = `Toast.${code}`;
    if (i18n.exists(byCode)) {
      return byCode;
    }
  }

  const trimmed = message?.trim();
  if (!trimmed) {
    return null;
  }

  const mapped = MESSAGE_TO_TOAST_KEY[trimmed];
  if (mapped && i18n.exists(mapped)) {
    return mapped;
  }

  if (/insufficient|không đủ số dư|so du khong du|余额不足/i.test(trimmed)) {
    return "Toast.insufficient_balance";
  }

  if (/amount.*(too high|quá cao)|đầu tư quá cao/i.test(trimmed)) {
    return "Toast.amount_too_high";
  }

  return null;
}

/**
 * Localize order/trade API toasts by stable `code`, then known `message`, then fallback key.
 * Admin custom trade-lock text is kept as-is when present.
 */
export function localizeTradeToast(
  payload: ApiToastPayload | string,
  t: TFunction,
  i18n: i18n,
  fallbackKey = "Toast.order_failed",
): string {
  const code = typeof payload === "string" ? undefined : payload?.code;
  const message =
    typeof payload === "string" ? payload : payload?.message?.trim();

  if (code === "trade_locked" && message) {
    return message;
  }

  const key = resolveToastKey(code, message, i18n);
  if (key) {
    return t(key);
  }

  // Unknown custom copy (e.g. trade lock without code) — keep if non-empty.
  if (message && !/^[A-Za-z0-9 .,_'\-:%/]+$/.test(message)) {
    return message;
  }

  return t(fallbackKey);
}
