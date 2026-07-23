/**
 * ponytail: smallest check that resolve/parse keep SaleSmartly default intact.
 * Run: npx tsx src/utils/chatScript.selfcheck.ts
 */
import assert from "node:assert/strict";
import { DEFAULT_CHAT_SCRIPT, parseChatScripts, resolveChatScript } from "./chatScript";

assert.equal(resolveChatScript(""), DEFAULT_CHAT_SCRIPT);
assert.equal(resolveChatScript("   "), DEFAULT_CHAT_SCRIPT);
assert.equal(
  resolveChatScript("<script src='https://x.test/a.js'></script>"),
  "<script src='https://x.test/a.js'></script>",
);

const parts = parseChatScripts(DEFAULT_CHAT_SCRIPT);
assert.equal(parts.length, 2);
assert.match(parts[0]?.code ?? "", /__ssc/);
assert.match(parts[1]?.src ?? "", /salesmartly\.com/);

console.log("chatScript.selfcheck: ok");
