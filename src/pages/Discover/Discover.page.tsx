import { Box } from "@mui/material";
import React from "react";
import AdvancedRealTimeChartWidget from "../../components/ChartView/AdvancedRealTimeChart";
export default function DiscoverPage() {
  return (
    <Box sx={{ background: "#000", paddingTop: "50px" }}>
      <Box
        sx={{
          height: "700px",
          // padding: "20px 0",
        }}
      >
        <AdvancedRealTimeChartWidget />
      </Box>
    </Box>
  );
}
