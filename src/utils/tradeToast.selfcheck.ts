/**
 * Runnable check: node -e "require('ts-node/register'); require('./src/utils/tradeToast.selfcheck.ts')"
 * Or: npx tsx src/utils/tradeToast.selfcheck.ts
 */
import { localizeTradeToast } from "./tradeToast";

const t = ((key: string) => `T:${key}`) as any;
const i18n = {
  exists: (key: string) =>
    [
      "Toast.insufficient_balance",
      "Toast.order_success",
      "Toast.order_failed",
      "Toast.close_before_flip",
    ].includes(key),
} as any;

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

assert(
  localizeTradeToast(
    { code: "insufficient_balance", message: "Insufficient USDT balance." },
    t,
    i18n,
  ) === "T:Toast.insufficient_balance",
  "code path",
);

assert(
  localizeTradeToast({ message: "Insufficient USDT balance." }, t, i18n) ===
    "T:Toast.insufficient_balance",
  "message map path",
);

assert(
  localizeTradeToast(
    { code: "order_success", message: "Position opened." },
    t,
    i18n,
    "Toast.order_success",
  ) === "T:Toast.order_success",
  "success code",
);

assert(
  localizeTradeToast(
    { code: "trade_locked", message: "Custom lock reason" },
    t,
    i18n,
  ) === "Custom lock reason",
  "trade lock custom message",
);

console.log("tradeToast.selfcheck: ok");
