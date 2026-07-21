"use client";

import { Box } from "@mui/material";
import CoinRowVertical from "./CoinRowVertical";
import useBinanceTicker from "./useBinanceTicker";

export default function CoinTickerVertical({
  listCoin,
  tab,
  search,
}: {
  listCoin: string[];
  tab: number;
  search?: string | null;
}) {
  const { coins, coinList } = useBinanceTicker({
    listCoin,
    tab,
  });

  const filteredCoinList = search?.trim()
    ? coinList.filter((symbol) =>
        symbol.toLowerCase().includes(search.trim().toLowerCase()),
      )
    : coinList;

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
      }}
    >
      {filteredCoinList.map((symbol) => (
        <CoinRowVertical
          key={`${tab}-${symbol}`}
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
