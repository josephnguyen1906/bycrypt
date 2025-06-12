"use client";
import useAuth from "@/hook/useAuth";
import { getReferral } from "@/services/User.service";
import { UserIcon } from "@/shared/Svgs/Svg.component";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));
export default function InvitationPage() {
  const { user } = useAuth();
  const [referral, setReferral] = useState<any>(null);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getReferral();
        if (res.status === true) {
          setReferral(res.data);
        }
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Box
        sx={{
          padding: 2,
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
              src={user?.username} // Replace with actual profile image path
              alt={user?.username}
              sx={{ width: 80, height: 80, borderRadius: "50%" }}
            />
            <Box
              sx={{
                borderRight: "1px solid #ddd",
                paddingRight: 2,
                marginRight: 2,
              }}
            >
              <Typography variant="h6">{user?.username}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.phone}
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
              <Typography>{user?.username} </Typography>
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
              <Typography>{user?.addr} </Typography>
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
          <Grid item xs={9}>
            <StyledPaper sx={{ display: "grid", gap: 3 }}>
              <Typography
                variant="h2"
                sx={{ fontSize: "30px", fontWeight: "bold" }}
              >
                Group Information
              </Typography>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Member statistics:
                  </Typography>
                  <Typography>
                    {referral?.carr.allrz} Verified Person
                  </Typography>
                  <Typography>
                    {referral?.carr.allnrz} Unverified person
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    First generation member:
                  </Typography>
                  <Typography>{referral?.carr.one} Verified Person</Typography>
                  <Typography>
                    {referral?.carr.onen} Unverified person
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Two generation member:
                  </Typography>
                  <Typography>{referral?.carr.two} Verified Person</Typography>
                  <Typography>
                    {referral?.carr.twon} Unverified person
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Three generation member:
                  </Typography>
                  <Typography>
                    {referral?.carr.three} Verified Person
                  </Typography>
                  <Typography>
                    {referral?.carr.threen} Unverified person
                  </Typography>
                </Box>
              </Box>
            </StyledPaper>
            <StyledPaper>
              <Typography
                variant="h4"
                sx={{ fontSize: "25px", fontWeight: "bold", mb: 3 }}
              >
                Login diary
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Login type</TableCell>
                      <TableCell>Login IP</TableCell>
                      <TableCell>Login date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {referral?.loglist?.map((row: any) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.remark}
                        </TableCell>
                        <TableCell>{row.addip}</TableCell>
                        <TableCell>
                          {new Date(row?.addtime * 1000).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
          {/* Right Section */}
          <Grid item xs={3}>
            <StyledPaper>
              <Typography
                variant="h4"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Referral code
              </Typography>
              <Box sx={{ mt: 1, mb: 2, textAlign: "center" }}>
                <Box
                  component="img"
                  src={referral?.qrcode_url}
                  alt="QR Code"
                  sx={{ width: 150, height: 150 }}
                />
                <Typography>My referral code: {referral?.invit}</Typography>
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
