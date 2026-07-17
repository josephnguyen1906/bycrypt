"use client";

import { Box } from "@mui/material";
import CoinRow from "./CoinRow";
import useBinanceTicker from "./useBinanceTicker";

export default function CoinTicker({
  listCoin,
  tab,
}: {
  listCoin: string[];
  tab: number;
}) {
  const { coins, coinList } = useBinanceTicker({ listCoin, tab });

  console.log("coinList", coinList);
  console.log("coins", coins);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#0E0F18",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {coinList.map((symbol) => (
        <CoinRow
          key={`${tab}-${symbol}`}
          tab={tab}
          data={
            coins[symbol] ?? {
              symbol,
              price: 0,
              percent: 0,
              history: [],
            }
          }
        />
      ))}
    </Box>
  );
}
