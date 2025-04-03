"use client";
import LoadingComponent from "@/components/Loading";
import useAuth from "@/hook/useAuth";
import "./profile.css";
import {
  ProfileBettingHistory,
  ProfileDeposit,
  ProfileDepositStep1,
  ProfileDepositStep2,
  ProfileDepositStep3,
  ProfileDiscount,
  ProfileEmptyIcon,
  ProfileGeneral,
  ProfileTransHistory,
  ProfileUserInfo,
  ProfileWBankAccount,
  ProfileWithdraw,
} from "@/shared/Svgs/Svg.component";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Step,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createQRBank, getListBankPayment } from "@/services/Bank.service";
import swal from "sweetalert";
import { toast } from "react-toastify";
import Image from "next/image";
import DepostQRBankComponent from "@/components/popup/DepostQRBank.component";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import "./profile.css";
import NavigationGame from "@/hook/NavigationGame";
import { formatCurrency } from "@/utils/formatMoney";

export default function Deposit() {
  const { user, loading } = useAuth();
  const [load, setLoad] = useState<boolean>(false);
  const [bankAdmin, setBankAdmin] = useState<any>();
  const router = useRouter();
  const [qrData, setQrData] = useState<any | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  // handle steps
  useEffect(() => {
    getListBankPayment().then((res) => {
      if (res.data.length > 0) {
        setBankAdmin(res.data[0]);
      }
    });
  }, []);
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
      icon: <ProfileDeposit fill="green" height="24px" width="24px" />,
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
      icon: <ProfileBettingHistory height="24px" width="24px" />,
      title: "Betting History",
      link: "/profile/betting-history",
    },
    {
      icon: <ProfileTransHistory height="24px" width="24px" />,
      title: "Transaction History",
      link: "/profile/transaction-history",
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(2);

  const [amount, setAmount] = React.useState<string>();
  const quickOptions = [
    "50000",
    "100000",
    "200000",
    "300000",
    "400000",
    "500000",
    "1000000",
    "2000000",
  ];

  const handleQuickSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const deposit = () => {
    if (bankAdmin) {
      setLoad(true);
      createQRBank(bankAdmin?.bankProvide, Number(amount)).then((res: any) => {
        if (res.status === true) {
          console.log(res);

          setQrData(res);
          setOpenPopup(true);
          setLoad(false);
        } else {
          swal("Depost", res.msg, "error");
          setLoad(false);
        }
      });
    } else {
      swal(
        "Depost",
        "Unable to recharge at this time, Please recharge at another time",
        "error"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#020D24",
        width: { xs: "90%", sm: "80%" },
        height: { xs: "1000px", sm: "800px" },
        paddingTop: { xs: 75, sm: 20 },
        // paddingBottom: { xs: 60, sm: 0 },
        margin: "auto",
        gap: 2,
      }}
    >
      <Grid
        className="profile-main"
        sx={{
          backgroundColor: "#0F192F",
          borderRadius: 3,
          width: "90%",
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
            {formatCurrency(user?.coin ?? 0)}USD
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

      <Box
        sx={{
          width: "100%",
          borderRadius: 6.5,
          pt: (theme) => `${theme.spacing(6)} !important`,
          backgroundColor: "#0F192F",
          padding: 6,
        }}
      >
        {loading || load ? (
          <>
            <SimpleBackdrop />
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: { xs: "center", sm: "left" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  marginBottom: 2,
                }}
              >
                Withdraw money
              </Typography>
            </Grid>
            {/* Input Field */}
            <Grid
              container
              sx={{
                backgroundColor: "#0F192F",
                width: "100%",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid
                container
                sx={{
                  width: { xs: "100%", sm: "51%" },
                  spacing: 1,
                }}
              >
                <Box sx={{ marginBottom: 2, width: "100%" }}>
                  <Grid display={"flex"} justifyContent={"space-between"}>
                    <Typography
                      sx={{ color: "#808687", marginBottom: 2 }}
                      variant="body2"
                      gutterBottom
                    >
                      Enter the deposit amount
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "right",
                        marginTop: 1,
                        color: "green",
                      }}
                    >
                      = {Number(amount ?? 0).toLocaleString("en-US")}USD
                    </Typography>
                  </Grid>
                  <TextField
                    sx={{
                      backgroundColor: "#2A3144",
                      borderRadius: "8px",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                    fullWidth
                    variant="outlined"
                    value={amount ?? 0}
                    onChange={handleInputChange}
                    placeholder="From 50USD - 1,000,000USD"
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ marginRight: 1, color: "white" }}>
                          $
                        </Typography>
                      ),
                    }}
                  />
                </Box>

                {/* Quick Select Options */}
                <Box sx={{ marginBottom: 2, width: "100%" }}>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 3, marginBottom: 1, color: "#808687" }}
                    gutterBottom
                  >
                    Quick Pick
                  </Typography>
                  <Grid container spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
                    {quickOptions.map((option) => (
                      <Grid item key={option}>
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: "70px",
                            padding: "6px 12px",
                            border: "1px solid",
                            borderColor:
                              amount === option ? "green" : "#2A3144",
                            backgroundColor:
                              amount === option ? "#1B2735" : "#2A3144",
                            color: amount === option ? "green" : "#fff",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            "&:hover": {
                              borderColor: "green",
                            },
                          }}
                          onClick={() => setAmount(option)}
                        >
                          {Number(option).toLocaleString("en-US")}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Generate QR Code Button */}
                <Box sx={{ marginBottom: 2, width: "100%" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    href="https://t.me/HitJuwa"
                    sx={{
                      marginTop: 4,
                      borderRadius: "8px",
                      padding: "10px 20px",
                    }}
                  >
                    Create a QR code
                  </Button>
                </Box>
              </Grid>
              {/* Instructions */}
              <Grid
                container
                sx={{
                  width: { xs: "100%", sm: "47%" },
                  spacing: 2,
                  borderRadius: 5,
                  padding: 3,
                  backgroundColor: "#0D1322",
                  height: { xs: "auto", sm: "350px" },
                  gap: { xs: 5, sm: 0 },
                  // flexDirection: "column",
                }}
              >
                <Grid width={"100%"} spacing={2}>
                  <h6 style={{ color: "#808691", fontSize: 10 }}>
                    QR code scanning instructions
                  </h6>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "#272B32",
                      width: "95%",
                      height: "170px",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "block",
                        justifyItems: "center",
                      }}
                    >
                      <ProfileDepositStep1 width="36px" height="36px" />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant="h6"
                        gutterBottom
                      >
                        Step 1
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, textAlign: "center" }}
                      >
                        Enter the amount and tap generate QR code.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "#272B32",
                      width: "95%",
                      height: "170px",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "block",
                        justifyItems: "center",
                      }}
                    >
                      <ProfileDepositStep2 width={"36px"} height="36px" />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant="h6"
                        gutterBottom
                      >
                        Step 2
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, textAlign: "center" }}
                      >
                        Log in to the banking app and scan the QR code.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "#272B32",
                      width: "95%",
                      height: "170px",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "block",
                        justifyItems: "center",
                      }}
                    >
                      <ProfileDepositStep3 height="36px" width="36px" />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant="h6"
                        gutterBottom
                      >
                        Step 3
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, textAlign: "center" }}
                      >
                        Make money transfers with the content provided by the
                        system level.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  justifyContent={"space-between"}
                  direction={"column"}
                  spacing={3}
                >
                  <h6 style={{ color: "yellow", padding: 5 }}>*Note:</h6>

                  <h6 style={{ color: "#808691", fontSize: 10, padding: 3 }}>
                    - This code can only{" "}
                    <strong style={{ fontWeight: 600, color: "white" }}>
                      be USED 1 TIME.
                    </strong>
                  </h6>

                  <h6 style={{ color: "#808691", fontSize: 10, padding: 3 }}>
                    - Applicable to cashback promotions only.
                  </h6>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              container
              spacing={3}
              sx={{
                justifyContent: { xs: "center", sm: "left" },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  marginBottom: 2,
                }}
              >
                Withdraw money
              </Typography>
            </Grid>
            {/* Input Field */}
            <Grid
              container
              sx={{
                backgroundColor: "#0F192F",
                width: "100%",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Grid
                container
                sx={{
                  width: { xs: "100%", sm: "51%" },
                  spacing: 1,
                }}
              >
                <Box sx={{ marginBottom: 2, width: "100%" }}>
                  <Grid display={"flex"} justifyContent={"space-between"}>
                    <Typography
                      sx={{ color: "#808687", marginBottom: 2 }}
                      variant="body2"
                      gutterBottom
                    >
                      Enter the deposit amount
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "right",
                        marginTop: 1,
                        color: "green",
                      }}
                    >
                      = {Number(amount ?? 0).toLocaleString("en-US")}USD
                    </Typography>
                  </Grid>
                  <TextField
                    sx={{
                      backgroundColor: "#2A3144",
                      borderRadius: "8px",
                      "& .MuiInputBase-input": {
                        color: "white",
                      },
                    }}
                    fullWidth
                    variant="outlined"
                    value={amount ?? 0}
                    onChange={handleInputChange}
                    placeholder="From 50USD - 1,000,000USD"
                    InputProps={{
                      startAdornment: (
                        <Typography sx={{ marginRight: 1, color: "white" }}>
                          $
                        </Typography>
                      ),
                    }}
                  />
                </Box>

                {/* Quick Select Options */}
                <Box sx={{ marginBottom: 2, width: "100%" }}>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 3, marginBottom: 1, color: "#808687" }}
                    gutterBottom
                  >
                    Quick Pick
                  </Typography>
                  <Grid container spacing={2} sx={{ flexWrap: "wrap", gap: 1 }}>
                    {quickOptions.map((option) => (
                      <Grid item key={option}>
                        <Button
                          variant="contained"
                          sx={{
                            minWidth: "70px",
                            padding: "6px 12px",
                            border: "1px solid",
                            borderColor:
                              amount === option ? "green" : "#2A3144",
                            backgroundColor:
                              amount === option ? "#1B2735" : "#2A3144",
                            color: amount === option ? "green" : "#fff",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            "&:hover": {
                              borderColor: "green",
                            },
                          }}
                          onClick={() => setAmount(option)}
                        >
                          {Number(option).toLocaleString("en-US")}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Generate QR Code Button */}
                <Box sx={{ marginBottom: 2, width: "100%" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => NavigationGame("https://t.me/HitJuwa")}
                    sx={{
                      marginTop: 4,
                      borderRadius: "8px",
                      padding: "10px 20px",
                    }}
                  >
                    Create a QR code
                  </Button>
                </Box>
              </Grid>
              {/* Instructions */}
              <Grid
                container
                sx={{
                  width: { xs: "100%", sm: "47%" },
                  spacing: 2,
                  borderRadius: 5,
                  padding: 3,
                  backgroundColor: "#0D1322",
                  height: { xs: "auto", sm: "350px" },
                  gap: { xs: 5, sm: 0 },
                  // flexDirection: "column",
                }}
              >
                <Grid width={"100%"} spacing={2}>
                  <h6 style={{ color: "#808691", fontSize: 10 }}>
                    QR code scanning instructions
                  </h6>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "#272B32",
                      width: "95%",
                      height: "170px",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "block",
                        justifyItems: "center",
                      }}
                    >
                      <ProfileDepositStep1 width="36px" height="36px" />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant="h6"
                        gutterBottom
                      >
                        Step 1
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, textAlign: "center" }}
                      >
                        Enter the amount and tap generate QR code.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "#272B32",
                      width: "95%",
                      height: "170px",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "block",
                        justifyItems: "center",
                      }}
                    >
                      <ProfileDepositStep2 width={"36px"} height="36px" />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant="h6"
                        gutterBottom
                      >
                        Step 2
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, textAlign: "center" }}
                      >
                        Log in to the banking app and scan the QR code.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card
                    sx={{
                      backgroundColor: "#272B32",
                      width: "95%",
                      height: "170px",
                    }}
                  >
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "block",
                        justifyItems: "center",
                      }}
                    >
                      <ProfileDepositStep3 height="36px" width="36px" />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 14,
                          textAlign: "center",
                        }}
                        variant="h6"
                        gutterBottom
                      >
                        Step 3
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: 10, textAlign: "center" }}
                      >
                        Make money transfers with the content provided by the
                        system level.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  justifyContent={"space-between"}
                  direction={"column"}
                  spacing={3}
                >
                  <h6 style={{ color: "yellow", padding: 5 }}>*Note:</h6>

                  <h6 style={{ color: "#808691", fontSize: 10, padding: 3 }}>
                    - This code can only{" "}
                    <strong style={{ fontWeight: 600, color: "white" }}>
                      be USED 1 TIME.
                    </strong>
                  </h6>

                  <h6 style={{ color: "#808691", fontSize: 10, padding: 3 }}>
                    - Applicable to cashback promotions only.
                  </h6>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Box>

      <DepostQRBankComponent
        open={openPopup}
        data={qrData}
        onClose={() => setOpenPopup(false)}
      />
    </Box>
  );
}
