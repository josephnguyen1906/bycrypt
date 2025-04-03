"use client";
import LoadingComponent from "@/components/Loading";
import useAuth from "@/hook/useAuth";
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
import {
  Avatar,
  Box,
  Button,
  CardContent,
  FormControl,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Step,
  Stepper,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { contentInstance } from "@/configs/CustomizeAxios";
import { error } from "console";
import { getListUserBank, withdrawalsUser } from "@/services/Bank.service";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./profile.css";
import swal from "sweetalert";
import { formatCurrency } from "@/utils/formatMoney";

export default function Withdraw() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bankUser, setBankUser] = useState<any>();
  const [load, setLoad] = useState<boolean>(false);
  const [amountMoney, setAmountMoney] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      icon: <ProfileWithdraw fill="green" height="24px" width="24px" />,
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
  useEffect(() => {
    fetchBankListByUser();
  }, []);
  const handleAmountMoney = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountMoney(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [activeStep, setActiveStep] = useState<number>(3);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fetchBankListByUser = async () => {
    try {
      const response = await getListUserBank();
      const availableBanks = response.data;
      console.log("availableBankList", availableBanks);
      setBankUser(availableBanks[0]);
    } catch (error) {
      console.error("availableBankList is error", error);
    }
  };
  const WithdrawUser = async () => {
    if (!bankUser || bankUser === undefined || bankUser === "") {
      swal("Bank", "You haven't added a bank account", "error");
    }
    if (bankUser && password !== "" && amountMoney !== "") {
      setLoad(true);

      withdrawalsUser(
        bankUser.bankName,
        bankUser.bankNumber,
        bankUser.bankProvide,
        Number(amountMoney),
        password
      ).then((res: any) => {
        if (res.status === true) {
          setLoad(false);
          swal(
            "Withdraw",
            "Withdrawal Order Creation Successful. The system will automatically transfer funds to your account",
            "Success"
          );
        } else {
          setLoad(false);
          swal("Withdraw", res.msg, "error");
        }
      });
    } else {
      swal("Withdraw", "Please, fill in the information", "warning");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#020D24",
        width: { xs: "95%", sm: "80%" },
        height: { xs: "1000px", sm: "800px" },
        paddingTop: { xs: 15, sm: 20 },
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
          width: "30%",
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
              // marginTop: -10,
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

      <CardContent
        sx={{
          width: "100%",
          marginTop: -6,
          borderRadius: 10,
          pt: (theme) => `${theme.spacing(6)} !important`,
        }}
      >
        <Grid
          container
          sx={{
            backgroundColor: "#0F192F",
            width: "100%",
            padding: { xs: 2, sm: 4.5 },
            borderRadius: "8px",
          }}
        >
          <Grid container width={"100%"}>
            <Grid container item xs={8} md={4}>
              <Typography variant="h6" sx={{ color: "white", padding: 2 }}>
                Withdraw money
              </Typography>
            </Grid>
            <CardContent
              sx={{
                width: "100%",
                borderRadius: 10,
                pt: (theme) => `${theme.spacing(1)} !important`,
              }}
            >
              <Grid
                container
                sx={{
                  backgroundColor: "#0F192F",
                  width: "100%",
                  borderRadius: "8px",
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {loading || load ? (
                  <>
                    <SimpleBackdrop />
                    <Grid
                      container
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "51%",
                        },
                      }}
                      spacing={3}
                    >
                      <Grid container item xs={24} md={12}>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          You need to link at least one bank account to be able
                          to deposit and withdraw money
                        </Typography>
                      </Grid>

                      <Grid item xs={24} md={12}>
                        <FormControl fullWidth sx={{ margin: "auto" }}>
                          <Typography sx={{ color: "#73879a", fontSize: 14 }}>
                            {" "}
                            Amount money
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <input
                            style={{
                              color: "white",
                              borderRadius: "7px",
                              height: "35px",
                              backgroundColor: "#283145",
                              outline: "none",
                              border: "none",
                              paddingLeft: 10,
                            }}
                            onChange={handleAmountMoney}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={24} md={12}>
                        <FormControl fullWidth>
                          <Typography sx={{ color: "#808691", fontSize: 14 }}>
                            Type password{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <input
                            style={{
                              color: "white",
                              borderRadius: "7px",
                              height: "35px",
                              backgroundColor: "#283145",
                              outline: "none",
                              border: "none",
                              paddingLeft: 10,
                            }}
                            type="password"
                            onChange={handlePassword}
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"100%"}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "green",
                            marginTop: 5,
                            padding: "10px 25px",
                          }}
                          onClick={() => WithdrawUser()}
                        >
                          Withdraw
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "47%",
                        },
                        marginTop: {
                          xs: 5,
                          sm: 0,
                        },
                        margin: "auto",
                      }}
                    >
                      <Grid
                        width="100%"
                        container
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "320px",
                          backgroundColor: "#020D24",
                          borderRadius: "8px",
                        }}
                      >
                        {bankUser ? (
                          <>
                            <ListItem
                              sx={{
                                background: "#283145",
                                width: "90%",
                                borderRadius: 5,
                                color: "white",
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <AccountBalanceIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                color="white"
                                primary={bankUser.bankName}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      sx={{ color: "white", display: "inline" }}
                                    >
                                      {bankUser.bankNumber}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                          </>
                        ) : (
                          <>
                            <ProfileEmptyIcon height="78px" width="96px" />

                            <Typography marginBottom={3} variant="body2">
                              The beneficiary account is empty
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "51%",
                        },
                      }}
                      spacing={3}
                    >
                      <Grid container item xs={24} md={12}>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          You need to link at least one bank account to be able
                          to deposit and withdraw money
                        </Typography>
                      </Grid>

                      <Grid item xs={24} md={12}>
                        <FormControl fullWidth sx={{ margin: "auto" }}>
                          <Typography sx={{ color: "#73879a", fontSize: 14 }}>
                            {" "}
                            Amount money
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <input
                            style={{
                              color: "white",
                              borderRadius: "7px",
                              height: "35px",
                              backgroundColor: "#283145",
                              outline: "none",
                              border: "none",
                              paddingLeft: 10,
                            }}
                            onChange={handleAmountMoney}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={24} md={12}>
                        <FormControl fullWidth>
                          <Typography sx={{ color: "#808691", fontSize: 14 }}>
                            Type password{" "}
                            <span style={{ color: "red" }}>*</span>
                          </Typography>
                          <input
                            style={{
                              color: "white",
                              borderRadius: "7px",
                              height: "35px",
                              backgroundColor: "#283145",
                              outline: "none",
                              border: "none",
                              paddingLeft: 10,
                            }}
                            type="password"
                            onChange={handlePassword}
                          />
                        </FormControl>
                      </Grid>
                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"100%"}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "green",
                            marginTop: 5,
                            padding: "10px 25px",
                          }}
                          onClick={() => WithdrawUser()}
                        >
                          Withdraw
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        width: {
                          xs: "100%",
                          sm: "47%",
                        },
                        marginTop: {
                          xs: 5,
                          sm: 0,
                        },
                        margin: "auto",
                      }}
                    >
                      <Grid
                        width="100%"
                        container
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "320px",
                          backgroundColor: "#020D24",
                          borderRadius: "8px",
                        }}
                      >
                        {bankUser ? (
                          <>
                            <ListItem
                              sx={{
                                background: "#283145",
                                width: "90%",
                                borderRadius: 5,
                                color: "white",
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <AccountBalanceIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                color="white"
                                primary={bankUser.bankName}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      sx={{ color: "white", display: "inline" }}
                                    >
                                      {bankUser.bankNumber}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                          </>
                        ) : (
                          <>
                            <ProfileEmptyIcon height="78px" width="96px" />

                            <Typography marginBottom={3} variant="body2">
                              The beneficiary account is empty
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </CardContent>
    </Box>
  );
}
