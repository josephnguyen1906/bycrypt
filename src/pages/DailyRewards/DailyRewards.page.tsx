"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  format,
  subDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { toast } from "react-toastify";
import { fetchCheckinData, postDaily } from "@/services/User.service";
import { formatCurrency } from "@/utils/formatMoney";

const DailyRewards = () => {
  const [loading, setLoading] = useState(true);
  const [checkinData, setCheckinData] = useState<any>(null);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetchCheckinData();
      setCheckinData(res.data);
    } catch (error) {
      toast.error("Failed to fetch check-in data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCheckin = async () => {
    try {
      await postDaily();
      toast.success("Daily attendance successful");
      getData();
    } catch (error: any) {
      toast.error(error?.info || "Daily attendance faild");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bgcolor="#000"
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  const today = new Date();
  const start = startOfMonth(today); // ví dụ: 2025-06-01
  const end = endOfMonth(today); // ví dụ: 2025-06-30

  const daysInMonth = eachDayOfInterval({ start, end });

  const last30Days = daysInMonth.map((date) => format(date, "yyyy-MM-dd"));
  return (
    <Box bgcolor="#000" color="#fff" minHeight="100vh" padding={3}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Daily Check-in Rewards
      </Typography>

      <Typography variant="body1" textAlign="center" mb={2}>
        Current streak:{" "}
        <strong>{checkinData && checkinData?.current_streak}</strong> days
      </Typography>
      <Box
        sx={{
          height: "50vh",
          overflowY: "auto",
          paddingRight: 1,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {last30Days.map((date, idx) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const match = checkinData?.history.find((h: any) =>
              isSameDay(new Date(h.checkin_date), date)
            );

            return (
              <Grid item xs={3} sm={3} md={2} key={idx}>
                <Paper
                  sx={{
                    backgroundColor: "#111",
                    padding: 2,
                    borderRadius: 2,
                    textAlign: "center",
                    border: match ? "2px solid #bafc42" : "1px solid #444",
                  }}
                >
                  <Typography variant="body2" color="#ccc">
                    {match ? (
                      <img src="/images/gift-box.png" width={30} height={30} />
                    ) : (
                      <img src="/images/gift.png" width={30} height={30} />
                    )}
                    <Typography
                      variant="subtitle1"
                      sx={{ color: "white", fontSize: "10px" }}
                    >
                      {format(date, "dd/MM/yyyy")}
                    </Typography>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="#ccc"
                    sx={{ fontSize: "10px" }}
                  >
                    {match
                      ? `${parseFloat(match.reward).toLocaleString()}Pi`
                      : "--"}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ height: "20vh" }}>
        <Button
          disabled={checkinData.has_checked_in_today}
          sx={{
            width: "100%",
            height: "40px",
            color: "black",
            background: "#00d084",
            marginTop: "10px",
            fontSize: "16px",
            textTransform: "capitalize",
            fontWeight: "bold",
            "&:disabled": {
              background: "gray",
            },
            "&:hover": {
              background: "#00d084",
            },
          }}
          onClick={handleCheckin}
        >
          Take attendance now
        </Button>
      </Box>
    </Box>
  );
};

export default DailyRewards;
