import { Box } from "@mui/material";
import React from "react";
import AdvancedRealTimeChartWidget from "../../components/ChartView/AdvancedRealTimeChart";
export default function DiscoverPage() {
  return (
    <Box sx={{ background: "#000", paddingTop: "64px" }}>
      <Box
        sx={{
          height: "800px",
          padding: "20px 0",
        }}
      >
        <AdvancedRealTimeChartWidget />
      </Box>
    </Box>
  );
}
