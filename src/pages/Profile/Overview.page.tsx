"use client";
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
            <StyledPaper>
              <Typography variant="h6">
                Get verified to secure your account
              </Typography>
              <Typography>
                Provide your ID, a selfie, and personal information.
              </Typography>
              <Button variant="contained" sx={{ mt: 1 }}>
                Get verified
              </Button>
            </StyledPaper>
            <StyledPaper>
              <Typography variant="h6">Today’s crypto prices</Typography>
              <CryptoTable>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BTC</td>
                      <td>$109,749.4</td>
                      <td style={{ color: "red" }}>-0.49%</td>
                    </tr>
                    <tr>
                      <td>ETH</td>
                      <td>$2,786.38</td>
                      <td style={{ color: "red" }}>-1.07%</td>
                    </tr>
                    <tr>
                      <td>OKB</td>
                      <td>$53.4400</td>
                      <td style={{ color: "red" }}>-0.63%</td>
                    </tr>
                    <tr>
                      <td>SOL</td>
                      <td>$165.21</td>
                      <td style={{ color: "green" }}>+0.05%</td>
                    </tr>
                    <tr>
                      <td>TON</td>
                      <td>$3.3270</td>
                      <td style={{ color: "red" }}>-0.66%</td>
                    </tr>
                  </tbody>
                </table>
              </CryptoTable>
            </StyledPaper>
          </Grid>
          {/* Right Section */}
          <Grid item xs={4}>
            <StyledPaper>
              <Typography variant="h6">Announcements</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary">
                06/10/2025 - OKX to delist several perpetual futures
              </Typography>
              <Typography variant="body2" color="text.secondary">
                06/10/2025 - OKX to list perpetual for RESOLV crypto
              </Typography>
              <Typography variant="body2" color="text.secondary">
                06/10/2025 - Announcement from OKX regarding the delay of RESOLV
                (Resolv) listing
              </Typography>
              <Typography variant="body2" color="text.secondary">
                06/10/2025 - OKX to adjust position tiers of several futures
              </Typography>
            </StyledPaper>
            <StyledPaper>
              <Typography variant="h6">
                Download app and trade on the go
              </Typography>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography>OKX App</Typography>
                <Box
                  component="img"
                  src="/qrcode.png"
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
