/**
 * ponytail: tiny guard for Trade list refresh rules.
 * Run: `npx tsx src/utils/tradeLists.selfcheck.ts`
 */
import { normalizeList, shouldShowPositions } from "./tradeLists";

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

assert(normalizeList(null).length === 0, "null → []");
assert(normalizeList([{ id: 1 }]).length === 1, "array passthrough");
assert(
  shouldShowPositions(true, [{ id: 1 }], []) === true,
  "perp positions visible",
);
assert(
  shouldShowPositions(false, [], [{ id: 2 }]) === true,
  "contract orders on positions tab",
);
assert(
  shouldShowPositions(true, [], [{ id: 2 }]) === false,
  "contract orders ignored in perp mode",
);

console.log("tradeLists.selfcheck: ok");
