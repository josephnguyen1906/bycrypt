"use client";

import { Box } from "@mui/material";
import CoinRow from "./CoinRow";
import useBinanceTicker from "./useBinanceTicker";

export default function CoinTicker({
  listCoin,
  tab,
  search,
}: {
  listCoin: string[];
  tab: number;
  search?: string | null;
}) {
  const { coins, coinList } = useBinanceTicker({ listCoin, tab });
  const filteredCoinList = search?.trim()
    ? coinList.filter((symbol) =>
        symbol.toLowerCase().includes(search.trim().toLowerCase()),
      )
    : coinList;
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#0E0F18",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {filteredCoinList.map((symbol) => (
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
