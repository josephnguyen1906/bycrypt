"use client";

import { getDataChart } from "@/services/User.service";
import { useEffect, useRef, useState } from "react";

export interface CoinData {
  symbol: string;
  price: number;
  percent: number;
  history: number[];
}

async function fetchCoin(symbol: string, tab: number): Promise<CoinData> {
  if (tab == 1) {
    const base = symbol.slice(0, 3);
    const quote = symbol.slice(3);

    const from = new Date();
    from.setDate(from.getDate() - 30);

    const fromDate = from.toISOString().split("T")[0];

    const [rateRes, historyRes] = await Promise.all([
      fetch(`https://api.frankfurter.dev/v2/rate/${base}/${quote}`, {
        cache: "no-store",
      }),
      fetch(
        `https://api.frankfurter.dev/v2/rates?base=${base}&quotes=${quote}&from=${fromDate}`,
        {
          cache: "no-store",
        },
      ),
    ]);

    const rate = await rateRes.json();
    const historyData = await historyRes.json();

    const history = Array.isArray(historyData)
      ? historyData.map((item) => Number(item.rate))
      : [];

    const price = Number(rate.rate);

    const first = history[0] ?? price;

    const percent = first === 0 ? 0 : ((price - first) / first) * 100;

    return {
      symbol,
      price,
      percent,
      history: history.length ? history : Array(48).fill(price),
    };
  } else {
    // Crypto
    const [tickerRes, klineRes] = await Promise.all([
      fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`, {
        cache: "no-store",
      }),
      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=30m&limit=48`,
        {
          cache: "no-store",
        },
      ),
    ]);

    const ticker = await tickerRes.json();
    const klines = await klineRes.json();

    const history = klines.map((item: any) => Number(item[4]));

    const hasTrading = Number(ticker.count) > 0 && Number(ticker.lastPrice) > 0;

    return {
      symbol,
      price: hasTrading ? Number(ticker.lastPrice) : (history.at(-1) ?? 0),
      percent: hasTrading ? Number(ticker.priceChangePercent) : 0,
      history,
    };
  }
}

export default function useBinanceTicker({
  listCoin,
  tab,
}: {
  listCoin: string[];
  tab: number;
}) {
  const [coins, setCoins] = useState<Record<string, CoinData>>({});
  const [loading, setLoading] = useState(true);
  const requestIdRef = useRef(0);

  const loadData = async () => {
    const requestId = ++requestIdRef.current;

    try {
      const result = await Promise.all(listCoin.map((e) => fetchCoin(e, tab)));

      // request cũ thì bỏ
      if (requestId !== requestIdRef.current) return;

      const map: Record<string, CoinData> = {};

      result.forEach((coin) => {
        map[coin.symbol] = coin;
      });

      setCoins(map);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData();

    const timer = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(timer);
  }, [tab, listCoin]);

  return {
    coins,
    coinList: listCoin,
    loading,
  };
}
