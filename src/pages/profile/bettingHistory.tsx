"use client";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Step,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import {
  ProfileBettingHistory,
  ProfileDeposit,
  ProfileDiscount,
  ProfileEmptyIcon,
  ProfileGeneral,
  ProfileTransHistory,
  ProfileUserInfo,
  ProfileWBankAccount,
  ProfileWithdraw,
} from "@/shared/Svgs/Svg.component";
import LoadingComponent from "@/components/Loading";
import { BetHistoryItem } from "@/interface/BetHistory.interface";
import { getBettingHistory } from "@/services/Bank.service";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import "./profile.css";
import { formatCurrency } from "@/utils/formatMoney";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  // return `${year}-${month}-${day}`;
  return `${day}/${month}-${year};`;
};
export default function BettingHistory() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // handle steps
  const steps = [
    {
      icon: <ProfileGeneral height="24px" width="24px" />, // Replace with actual icon components
      title: "General",
      link: "/profile/",
    },
    {
      icon: <ProfileUserInfo height="24px" width="24px" />,
      title: "Personal Details",
      link: "/profile/personal-detail",
    },
    {
      icon: <ProfileDeposit height="24px" width="24px" />,
      title: "Deposit Money",
      link: "/profile/account-deposit",
    },
    {
      icon: <ProfileWithdraw height="24px" width="24px" />,
      title: "Withdraw Money",
      link: "/profile/account-withdraw",
    },
    {
      icon: <ProfileWBankAccount height="24px" width="24px" />,
      title: "Bank Account",
      link: "/profile/bank-account",
    },
    {
      icon: <ProfileDiscount height="24px" width="24px" />,
      title: "Promotion",
      link: "/profile/account-promotion",
    },
    {
      icon: <ProfileBettingHistory fill="green" height="24px" width="24px" />,
      title: "Betting History",
      link: "/profile/betting-history",
    },
    {
      icon: <ProfileTransHistory height="24px" width="24px" />,
      title: "Transaction History",
      link: "/profile/transaction-history",
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(6);

  const [transType, setTransType] = React.useState("both");
  const handleSetTransType = (event: SelectChangeEvent) => {
    setTransType(event.target.value as string);
  };

  // type of status handler
  const [statusType, setStatusType] = React.useState("all");
  const handleSetStatusType = (event: SelectChangeEvent) => {
    setTransType(event.target.value as string);
  };

  const [rows, setRows] = useState<BetHistoryItem[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const [fromDate, setFromDate] = useState<string>(formatDate(sevenDaysAgo));
  const [toDate, setToDate] = useState<string>(formatDate(now));
  console.log("formatDate(now)", formatDate(now));
  const fetchBettingHistory = async () => {
    try {
      if (!fromDate || !toDate) return;
      // Ensure proper date format
      const response = await getBettingHistory(page, limit, fromDate, toDate);

      const { dataExport, total } = response.data;
      setRows(dataExport);
      setTotal(total);
    } catch (error) {
      console.error("Error fetching betting history:", error);
    }
  };

  useEffect(() => {
    fetchBettingHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, fromDate, toDate]);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020D24",
        width: { xs: "100%", sm: "80%" },
        margin: "auto",
        height: "800px",
        paddingTop: { xs: 15, sm: 20 },
        gap: 2,
      }}
    >
      <Grid
        className="profile-main"
        sx={{
          backgroundColor: "#0F192F",
          borderRadius: 3,
          width: { xs: "100%", sm: "65%" },
          maxWidth: 272,
          textAlign: "center",
        }}
      >
        <Grid sx={{ borderBottom: "1px solid #020d24" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -10,
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="/images/quyphai17.jpg"
              sx={{
                width: 132,
                height: 132,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              textAlign: "center",
              backgroundColor: "transparent",
              color: "white",
            }}
          >
            {" "}
            {user?.name}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            sx={{ color: "yellow", textAlign: "center" }}
          >
            {" "}
            {formatCurrency(user?.coin ?? 0)} USD
          </Typography>
        </Grid>

        <Stepper
          connector={<></>}
          orientation="vertical"
          activeStep={activeStep}
          sx={{
            backgroundColor: "#0F192F",
            borderRadius: 3,
            width: "100%",
            maxWidth: "360px",
            maxHeight: "384px",
            height: "384px",
            textAlign: "center",
            position: "relative",
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <div
                className={
                  activeStep === index ? "step-label-active" : "step-label"
                }
                style={{ height: "48px", cursor: "pointer" }}
                onClick={() => {
                  if (step.title === "Deposit Money") {
                    window.open(
                      "https://t.me/HitJuwa",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  } else {
                    router.replace(step.link);
                  }
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    fontSize: "16px",
                    gap: "10px",
                    fontWeight: 600,
                    lineHeight: "24px",
                    padding: "12px 24px",
                  }}
                >
                  {step.icon} {/* Render the icon */}
                  <Typography
                    className={
                      activeStep === index ? "step-title-active" : "step-title"
                    }
                  >
                    {step.title}
                  </Typography>
                </div>
              </div>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {loading ? (
        <>
          <SimpleBackdrop />
          <CardContent
            sx={{
              width: { xs: "100%", sm: "65%" },
              marginTop: 9,
              borderRadius: 10,
              pt: (theme) => `${theme.spacing(6)} !important`,
            }}
          >
            <Grid
              container
              sx={{
                backgroundColor: "#0F192F",
                width: "100%",
                // padding: 4.5,
                borderRadius: "8px",
              }}
            >
              <Grid
                container
                item
                xs={12}
                md={6}
                spacing={3.5}
                sx={{ paddingLeft: 4.5, paddingTop: 4.5 }}
              >
                {/* <Grid container item xs={24} md={12}> */}
                <Typography variant="h6" sx={{ color: "white", padding: 2 }}>
                  Betting History
                </Typography>
                {/* </Grid> */}
              </Grid>

              <Grid
                width={"100%"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                {/* <Grid width={"100%"}> */}
                <Grid
                  container
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Grid item xs={8} md={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ color: "#73879a" }}>
                        From date
                      </Typography>
                      <Input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        sx={{
                          width: { xs: "200px", sm: "100%" },
                          paddingLeft: 2,
                          color: "white",
                          borderRadius: "7px",
                          height: "35px",
                          backgroundColor: "#283145",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={8} md={4}>
                    <FormControl fullWidth>
                      <Typography sx={{ color: "#73879a" }}>To date</Typography>
                      <Input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        sx={{
                          width: { xs: "200px", sm: "100%" },
                          color: "white",
                          paddingLeft: 2,
                          borderRadius: "7px",
                          height: "35px",
                          backgroundColor: "#283145",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {/* sort session*/}
                
              </Grid>
              <Grid container width={"100%"} marginTop={3.5}>
                <TableContainer
                  sx={{
                    width: "100%",
                    backgroundColor: "#0F192F",
                    overflowX: "auto", // Để scroll ngang
                    scrollbarWidth: "none", // Ẩn scrollbar ngang
                    "&::-webkit-scrollbar": {
                      display: "none", // Ẩn scrollbar ngang (Webkit)
                    },
                  }}
                  component={Paper}
                >
                  <Table sx={{ width: "550px" }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "#283145" }}>
                      <TableRow sx={{ height: "40px", width: "100%" }}>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "120px",
                          }}
                        >
                          Trans Time
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "120px",
                          }}
                        >
                          Bet Tim
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "100px",
                          }}
                        >
                          Valid Bet Amount
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "80px",
                          }}
                        >
                          Bet Amount
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "80px",
                          }}
                        >
                          Win Amount
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "80px",
                          }}
                        >
                          Win/Lose
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "100px",
                          }}
                        >
                          Product Type
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "100px",
                          }}
                        >
                          Game Category
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "100px",
                          }}
                        >
                          Game Name
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{
                            color: "#73879a",
                            height: "40px",
                            width: "40px",
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={9}
                            align="left"
                            sx={{ color: "white", marginLeft: 20 }}
                          >
                            <Grid
                              width="100%"
                              container
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "320px",
                                paddingRight: { xs: 90, sm: 50 },
                              }}
                            >
                              <ProfileEmptyIcon height="78px" width="96px" />
                              <h1
                                style={{
                                  color: "white",
                                  marginBottom: 3,
                                }}
                              >
                                Bet History is empty
                              </h1>
                              <Typography variant="body2">
                                You have not placed any bets in the system.
                              </Typography>
                              <Typography marginBottom={3} variant="body2">
                                Please deposit money to participate in betting
                                right.
                              </Typography>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "green" }}
                              >
                                Deposit Now!
                              </Button>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ) : (
                        rows.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{ backgroundColor: "#0F192F" }}
                          >
                            <TableCell sx={{ color: "white" }}>
                              {new Date(row.transactionTime).toLocaleString()}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.betTime}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.validBetAmount}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.betAmount}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.winAmount}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.productType}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.gameCategory}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.gameName}
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                              {row.status.defaultValue}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                  <Pagination
                    count={Math.ceil(total / limit)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    sx={{ color: "white" }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </>
      ) : (
        <CardContent
          sx={{
            width: { xs: "100%", sm: "65%" },
            marginTop: 9,
            borderRadius: 10,
            pt: (theme) => `${theme.spacing(6)} !important`,
          }}
        >
          <Grid
            container
            sx={{
              backgroundColor: "#0F192F",
              width: "100%",
              // padding: 4.5,
              borderRadius: "8px",
            }}
          >
            <Grid
              container
              item
              xs={12}
              md={6}
              spacing={3.5}
              sx={{ paddingLeft: 4.5, paddingTop: 4.5 }}
            >
              {/* <Grid container item xs={24} md={12}> */}
              <Typography variant="h6" sx={{ color: "white", padding: 2 }}>
                Betting History
              </Typography>
              {/* </Grid> */}
            </Grid>

            <Grid
              width={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/* <Grid width={"100%"}> */}
              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs={8} md={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ color: "#73879a" }}>From date</Typography>
                    <Input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      sx={{
                        width: { xs: "200px", sm: "100%" },
                        paddingLeft: 2,
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={8} md={4}>
                  <FormControl fullWidth>
                    <Typography sx={{ color: "#73879a" }}>To date</Typography>
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      sx={{
                        width: { xs: "200px", sm: "100%" },
                        color: "white",
                        paddingLeft: 2,
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              
            </Grid>
            <Grid container width={"100%"} marginTop={3.5}>
              <TableContainer
                sx={{
                  width: "100%",
                  backgroundColor: "#0F192F",
                  overflowX: "auto", // Để scroll ngang
                  scrollbarWidth: "none", // Ẩn scrollbar ngang
                  "&::-webkit-scrollbar": {
                    display: "none", // Ẩn scrollbar ngang (Webkit)
                  },
                }}
                component={Paper}
              >
                <Table sx={{ width: "1190px" }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "#283145" }}>
                    <TableRow sx={{ height: "40px", width: "100%" }}>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "140px",
                        }}
                      >
                        Transaction Time
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "120px",
                        }}
                      >
                        Bet Time
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "140px",
                        }}
                      >
                        Valid Bet Amount
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "110px",
                        }}
                      >
                        Bet Amount
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "110px",
                        }}
                      >
                        Win Amount
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "60px",
                        }}
                      >
                        Win/Lose
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "120px",
                        }}
                      >
                        Product Type
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "140px",
                        }}
                      >
                        Game Category
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "130px",
                        }}
                      >
                        Game Name
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          color: "#73879a",
                          height: "40px",
                          width: "40px",
                        }}
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          align="left"
                          sx={{ color: "white", marginLeft: 20 }}
                        >
                          <Grid
                            width="100%"
                            container
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              height: "320px",
                              paddingRight: { xs: 90, sm: 50 },
                            }}
                          >
                            <ProfileEmptyIcon height="78px" width="96px" />
                            <h1
                              style={{
                                color: "white",
                                marginBottom: 3,
                              }}
                            >
                              Bet History is empty
                            </h1>
                            <Typography variant="body2">
                              You have not placed any bets in the system.
                            </Typography>
                            <Typography marginBottom={3} variant="body2">
                              Please deposit money to participate in betting
                              right.
                            </Typography>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "green" }}
                            >
                              Deposit Now!
                            </Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ) : (
                      rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{ backgroundColor: "#0F192F" }}
                        >
                          <TableCell sx={{ color: "white" }}>
                            {new Date(row.transactionTime).toLocaleString()}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.betTime}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.validBetAmount}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.betAmount}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.winAmount}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.productType}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.gameCategory}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.gameName}
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            {row.status.defaultValue}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
                <Pagination
                  count={Math.ceil(total / limit)}
                  page={page}
                  onChange={handleChangePage}
                  color="primary"
                  sx={{ color: "white" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      )}
    </Box>
  );
}
