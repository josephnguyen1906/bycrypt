import { Box } from "@mui/material";
import React from "react";
import TradeChart from "@/components/ChartView/TradeChart";
export default function TradePage() {
  return (
    <Box sx={{ background: "#000", paddingTop: "50px" }}>
      <Box
        sx={{
          height: "700px",
          // padding: "20px 0",
        }}
      >
        <TradeChart />
      </Box>
    </Box>
  );
}
