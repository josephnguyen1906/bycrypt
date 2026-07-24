import { contractDurationSeconds } from "./contractDuration";

const cases: Array<{ name: string; ok: boolean }> = [
  {
    name: "db minutes",
    ok: contractDurationSeconds({ time: 2 }) === 120,
  },
  {
    name: "db 1.5 minutes",
    ok: contractDurationSeconds({ time: 1.5 }) === 90,
  },
  {
    name: "legacy api seconds",
    ok: contractDurationSeconds({ time: 120 }) === 120,
  },
  {
    name: "explicit time_seconds",
    ok: contractDurationSeconds({ time: 2, time_seconds: 120 }) === 120,
  },
  {
    name: "buy/sell span wins",
    ok:
      contractDurationSeconds({
        time: 120,
        buytime: "2026-07-24 15:30:55",
        selltime: "2026-07-24 15:32:55",
      }) === 120,
  },
];

for (const c of cases) {
  if (!c.ok) {
    throw new Error(`contractDuration.selfcheck failed: ${c.name}`);
  }
}

console.log("contractDuration.selfcheck: ok");
