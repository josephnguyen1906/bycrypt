"use client";
import useAuth from "@/hook/useAuth";
import { VerifiedIcon, WarningIcon } from "@/shared/Svgs/Svg.component";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export default function AccountPage() {
  const { user, loading } = useAuth();
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <Box>
          <Avatar
            src={user?.username}
            alt={user?.username}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        <Box sx={{ width: "70%" }}>
          <Typography variant="h3" sx={{ fontSize: "25px", fontWeight: "600" }}>
            Personal info
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              borderBottom: "1px solid #e0e0e0",
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#000",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Nickname
            </Typography>
            <Typography sx={{ color: "#827a75", fontSize: "16px" }}>
              {user?.username || "test@gmail.com"}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#000",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Phone
            </Typography>
            <Typography sx={{ color: "#827a75", fontSize: "16px" }}>
              {user?.phone || "0918188172727"}
            </Typography>
          </Box>
          <Typography variant="h3" sx={{ fontSize: "25px", fontWeight: "600" }}>
            Verification info
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              borderBottom: "1px solid #e0e0e0",
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#000",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Identity verification
            </Typography>
            <Typography sx={{ color: "#827a75", fontSize: "16px" }}>
              {user?.cardfm === undefined ||
              user?.cardfm === null ||
              user?.cardfm === "" ? (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <WarningIcon /> Unverified
                </span>
              ) : (
                <span>
                  <VerifiedIcon /> Verified
                </span>
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              padding: "20px 0px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#000",
                fontWeight: 500,
                fontSize: "16px",
                width: "30%",
              }}
            >
              Country/Region
            </Typography>
            <Typography sx={{ color: "#827a75", fontSize: "16px" }}>
              {user?.addr || "Vietnam"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
