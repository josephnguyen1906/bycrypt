"use client";
import MarketDataWidget from "@/components/ChartView/MarketDataWidget";
import { ProfileIcon, UserIcon } from "@/shared/Svgs/Svg.component";
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Divider,
  styled,
  Avatar,
} from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CryptoTable = styled("div")({
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
  },
  "& th, & td": {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
});

const Announcements = [
  {
    date: "06/10/2025",
    title: "OKX to delist several perpetual futures",
  },
  {
    date: "06/10/2025",
    title: "OKX to list perpetual for RESOLV crypto",
  },
  {
    date: "06/10/2025",
    title:
      "Announcement from OKX regarding the delay of RESOLV (Resolv) listing",
  },
  {
    date: "06/10/2025",
    title: "OKX to adjust position tiers of several futures",
  },
];

export default function OverviewPage() {
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Box
        sx={{
          padding: 2,
          backgroundColor: "#fff",
          paddingTop: "80px",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2, // Space between elements
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              src="/profile-placeholder.png" // Replace with actual profile image path
              alt="Profile"
              sx={{ width: 80, height: 80, borderRadius: "50%" }}
            />
            <Box
              sx={{
                borderRight: "1px solid #ddd",
                paddingRight: 2,
                marginRight: 2,
              }}
            >
              <Typography variant="h6">huy***@gmail.com</Typography>
              <Typography variant="body2" color="text.secondary">
                718329357189846177
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Email
              </Typography>
              <Typography>huy***@gmail.com</Typography>
            </Box>
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Identity verification
              </Typography>
              <Button
                type="button"
                sx={{
                  background: "none",
                  border: "1px solid gray",
                  fontSize: "10px",
                  color: "#000",
                  width: "80px",
                  borderRadius: "10px",
                }}
              >
                Verify now
              </Button>
            </Box>
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Country/Region
              </Typography>
              <Typography>Vietnam</Typography>
            </Box>
            <Box sx={{ display: "grid", alignItems: "center" }}>
              <Typography sx={{ color: "gray", fontSize: "13px" }}>
                Trading fee tier
              </Typography>
              <Typography>Regular user</Typography>
            </Box>
          </Box>
          <Button
            type="button"
            sx={{
              background: "none",
              border: "1px solid gray",
              fontSize: "10px",
              color: "#000",
              borderRadius: "10px",
              marginLeft: "20px",
            }}
          >
            <UserIcon fill="#000" />
            View profile
          </Button>
        </Box>
        <Grid container spacing={2}>
          {/* Left Section */}
          <Grid item xs={8}>
            <StyledPaper sx={{ display: "grid", gap: 2 }}>
              <Typography
                variant="h2"
                sx={{ fontSize: "30px", fontWeight: "bold" }}
              >
                Get verified to secure your account
              </Typography>
              <Typography>
                Provide your ID, a selfie, and personal information.
              </Typography>
              <Button
                type="button"
                sx={{
                  mt: 1,
                  backgroundColor: "#000",
                  color: "#fff",
                  borderRadius: "20px",
                  width: "150px",
                  height: "50px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
              >
                Get verified
              </Button>
            </StyledPaper>
            <StyledPaper>
              <Typography
                variant="h4"
                sx={{ fontSize: "25px", fontWeight: "bold" }}
              >
                Today’s crypto prices
              </Typography>
              <MarketDataWidget width={750} height={450} theme="light" />
            </StyledPaper>
          </Grid>
          {/* Right Section */}
          <Grid item xs={4}>
            <StyledPaper>
              <Typography
                variant="h3"
                sx={{ fontSize: "28px", fontWeight: "bold" }}
              >
                Announcements
              </Typography>
              {Announcements.map((announcement, index) => (
                <Box key={index}>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ padding: "10px 0px" }}>
                    <Typography variant="body2" color="text.secondary">
                      {announcement.date}
                    </Typography>
                    <Typography variant="body2" color="black">
                      {announcement.title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </StyledPaper>
            <StyledPaper>
              <Typography
                variant="h4"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Download app and trade on the go
              </Typography>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Box
                  component="img"
                  src="/images/qr.png"
                  alt="QR Code"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography>Scan to download</Typography>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
