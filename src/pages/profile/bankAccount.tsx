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
  Autocomplete,
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
  SelectChangeEvent,
  Step,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./profile.css";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import {
  addBankUser,
  getListAllBank,
  getListBankPayment,
  getListUserBank,
} from "@/services/Bank.service";
import swal from "sweetalert";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import NavigationGame from "@/hook/NavigationGame";
import { formatCurrency } from "@/utils/formatMoney";

type bank = {
  name: string;
  code: string;
}; // List of banks
export default function BankAccount() {
  const { user, loading } = useAuth();
  const [load, setLoad] = useState<boolean>(false);

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

  const [activeStep, setActiveStep] = useState<number>(4);
  const [bankNumber, setBankNumber] = useState<string>("");

  const [bank, setBank] = useState<bank | null>();
  const [availableBankList, setAvailableBankList] = useState<bank[]>([]);
  const [bankUser, setBankUser] = useState<any>();

  const fetchBankList = async () => {
    try {
      const response = await getListAllBank();
      const availableBanks = response.data;
      console.log("availableBankList", availableBanks);
      setAvailableBankList(availableBanks); // Update state with fetched data
    } catch (error) {
      console.error("availableBankList is error", error);
    }
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

  useEffect(() => {
    fetchBankList();
    fetchBankListByUser();
  }, []);
  const handleBankNumber = (e: any) => {
    setBankNumber(e.target.value);
  };
  const addbankNewUser = async () => {
    if (bank) {
      setLoad(true);
      addBankUser(bank.code, bank.code, bankNumber, bank.name).then(
        (res: any) => {
          console.log(res.data.length);

          if (res.data.length > 0) {
            setLoad(false);
            swal("Create Bank", "Create Bank by user Successful", "Success");
          } else {
            setLoad(false);
            swal("Create Bank", res.msg, "error");
          }
        }
      );
    } else {
      swal("Create Bank", "Please, fill in the information", "warning");
    }
  };
  return (
    <>
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
                    if (
                      step.title === "Deposit Money" &&
                      activeStep === index
                    ) {
                      NavigationGame("https://t.me/HitJuwa");
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
                        activeStep === index
                          ? "step-title-active"
                          : "step-title"
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
            borderRadius: 10,
            pt: (theme) => `${theme.spacing(1)} !important`,
          }}
        >
          <Grid
            container
            sx={{
              backgroundColor: "#0F192F",
              width: "100%",
              padding: 4.5,
              borderRadius: "8px",
            }}
          >
            <Grid container item xs={12} md={6} spacing={3.5}>
              <Grid container item xs={24} md={12}>
                <Typography variant="h5" sx={{ color: "white", padding: 2 }}>
                  Bank Account
                </Typography>
                <Typography variant="body2" sx={{ color: "white" }}>
                  You need to link at least one bank account to be able to
                  deposit and withdraw money
                </Typography>
              </Grid>
              <Grid item xs={24} md={12}>
                <Typography variant="caption" sx={{ color: "#73879a" }}>
                  Choose a Bank <span style={{ color: "red" }}>*</span>
                </Typography>
                <Autocomplete
                  disablePortal
                  sx={{
                    height: "35px",
                    outline: "none",
                    marginBottom: "8px",
                    color: "white",
                    backgroundColor: "#283145",
                    borderRadius: "7px",
                    "& .MuiInputBase-root": {
                      backgroundColor: "#283145",
                      color: "white",
                    },
                    "& input": {
                      marginTop: "-8px",
                    },
                  }}
                  slotProps={{
                    paper: {
                      sx: {
                        backgroundColor: "#283145", // Đổi màu nền popup
                        "& .MuiAutocomplete-option": {
                          color: "white", // Màu chữ của các tùy chọn
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#3c455b", // Màu nền khi hover
                        },
                      },
                    },
                  }}
                  options={availableBankList}
                  getOptionLabel={(option: { code: string; name: string }) =>
                    option.name || ""
                  }
                  value={
                    availableBankList.find(
                      (bankItem: any) => bankItem?.name === bank
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    console.log("newValue", newValue);

                    setBank(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select a bank"
                      value={bank}
                      sx={{
                        backgroundColor: "#283145",
                        borderRadius: 7,
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: {
                          outline: "none",
                          color: "white",
                          height: "38px",
                          backgroundColor: "#283145",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              {/* <Grid item xs={24} md={12}>
                <FormControl fullWidth>
                  <Typography variant="caption" sx={{ color: "#808691" }}>
                    Bank Name<span style={{ color: "red" }}>*</span>
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
                    value={bankUser ? bankUser.bankName : bank ? bank.name : ""}
                  />
                </FormControl>
              </Grid> */}
              <Grid item xs={24} md={12}>
                <FormControl fullWidth>
                  <Typography variant="caption" sx={{ color: "#73879a" }}>
                    {" "}
                    Account Number <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <input
                    onChange={handleBankNumber}
                    style={{
                      color: "white",
                      borderRadius: "7px",
                      height: "35px",
                      backgroundColor: "#283145",
                      outline: "none",
                      paddingLeft: 10,
                      border: "none",
                    }}
                    // defaultValue={bankUser ? bankUser.bankNumber : ""}
                    disabled={bankUser ? true : false}
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
                  sx={{ backgroundColor: "green", marginTop: 5 }}
                  onClick={() => addbankNewUser()}
                >
                  Comfirm
                </Button>
              </Grid>
            </Grid>
            {loading || load ? (
              <SimpleBackdrop />
            ) : (
              <Grid sx={{ padding: 3 }} item xs={12} md={6}>
                <Grid>
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
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Box>
    </>
  );
}
