"use client";
import useAuth from "@/hook/useAuth";
import { getBills, getReferral } from "@/services/User.service";
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
export default function BillPage() {
  const { user } = useAuth();
  const [bill, setBills] = useState<any>(null);
  useEffect(() => {
    const referral = async () => {
      try {
        const res: any = await getBills();
        if (res.status === true) {
          setBills(res.data);
        }
      } catch (errors: any) {
        toast.error(errors?.message);
      }
    };
    referral();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box
        sx={{
          padding: 2,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "0 auto",
        }}
      >
        <Grid container spacing={1}>
          {/* Left Section */}
          <Grid item xs={12} sm={12}>
            <StyledPaper
              sx={{
                display: "grid",
                gap: 2,
                background: "#000",
                border: "1px solid gray",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  mb: 3,
                  color: "#fff",
                }}
              >
                History of finance
              </Typography>
              <TableContainer component={Paper} sx={{ background: "#000" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#fff" }}>
                        Transaction Type
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>Currency</TableCell>
                      <TableCell sx={{ color: "#fff" }}>Quantity</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        Balance after transaction
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        Implementation date
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bill?.map((row: any) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "#fff" }}
                        >
                          {row.type === 1 ? "Bank" : "Wallet"}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {row.coinname}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>{row.num}</TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {row.afternum}
                        </TableCell>
                        <TableCell sx={{ color: "#fff" }}>
                          {new Date(row?.addtime).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
