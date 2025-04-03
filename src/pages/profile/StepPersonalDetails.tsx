/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import InfoIcon from "@mui/icons-material/Info";
// import { Icon } from "@mui/material";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Step,
  Stepper,
} from "@mui/material";
import { userResponse } from "@/interface/user.interface";
import useAuth from "@/hook/useAuth";
import LoadingComponent from "@/components/Loading";
import {
  ProfileBettingHistory,
  ProfileDeposit,
  ProfileDiscount,
  ProfileGeneral,
  ProfileTransHistory,
  ProfileUserInfo,
  ProfileWBankAccount,
  ProfileWithdraw,
} from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";
import "./profile.css";
import SimpleBackdrop from "@/components/Loading/LoaddingPage";
import { updatePassword } from "@/services/User.service";
import NavigationGame from "@/hook/NavigationGame";
import { formatCurrency } from "@/utils/formatMoney";
export interface PersonalProps {
  user: userResponse;
}

export default function PersonalDetails() {
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
      icon: <ProfileUserInfo fill="green" height="24px" width="24px" />,
      title: "Personal Details",
      link: "/profile/personal-detail",
    },
    {
      icon: <ProfileDeposit height="24px" width="24px" />,
      title: "Deposit Money",
      link: "https://t.me/HitJuwa",
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

  const [activeStep, setActiveStep] = useState<number>(1);

  const [username, setUsername] = useState(user?.username || "");
  const [displayName, setDisplayName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");

  // Handlers for input changes
  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDisplayName(e.target.value);
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  // Submit handler
  //
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async () => {
    const id = user.id;
    const updatedData = {
      username,
      name: displayName,
      phone,
      email,
    };

    try {
      const response = await fetch(`/update-info-user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert("User information updated successfully!");
      } else {
        alert("Failed to update user information.");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  // change password
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangePassword = async () => {
    // Validate input
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    try {
      // Call the API function
      await updatePassword(oldPassword, newPassword, newPasswordConfirm);
      setSuccessMessage("Password changed successfully.");
      setErrorMessage(""); // Clear error message
    } catch (error: any) {
      // Handle errors from the API
      setErrorMessage(
        error.response?.data?.message || "Failed to change password."
      );
    }
  };

  return (
    <>
      <Box className="profile-m" sx={{ paddingTop: { xs: 15, sm: 25 } }}>
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
              variant="body2"
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
                      variant="body2"
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
            width: {
              xs: "100%",
              sm: "65%",
            },
            borderRadius: 10,
            pt: (theme) => `${theme.spacing(6)} !important`,
          }}
        >
          {loading ? (
            <>
              <SimpleBackdrop />
              <Grid
                container
                sx={{
                  backgroundColor: "#0F192F",
                  borderRadius: "7px",
                  width: "100%",
                  padding: {
                    xs: 1.5,
                    sm: 4.5,
                  },
                  // marginTop: {
                  //   xs: 5,
                  //   sm: 20,
                  // },
                }}
              >
                <Grid
                  sx={{
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <h3 style={{ color: "white" }}>Personal Details</h3>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        height: "40px",
                        lineHeight: "40px",
                      }}
                    >
                      User Name
                    </Typography>
                    <input
                      value={user?.username}
                      disabled
                      onChange={handleChangeUsername}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{ color: "white", height: "40px", lineHeight: "40px" }}
                  >
                    Display Name
                  </Typography>
                  <input
                    value={user?.name}
                    disabled
                    onChange={handleChangeDisplayName}
                    style={{
                      color: "white",
                      borderRadius: "7px",
                      height: "35px",
                      backgroundColor: "#283145",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      paddingLeft: 10,
                    }}
                  />
                </Grid>

                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        height: "40px",
                        lineHeight: "40px",
                      }}
                    >
                      Phone Number
                    </Typography>
                    <input
                      value={user?.phone}
                      disabled
                      onChange={handleChangePhone}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Grid display={"flex"} justifyContent={"space-between"}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          height: "40px",
                          lineHeight: "40px",
                        }}
                      >
                        Email
                      </Typography>
                    </Grid>
                    <input
                      value={user?.email}
                      disabled
                      onChange={handleChangeEmail}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid
                  container
                  width={"100%"}
                  marginTop={3}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    message={snackbarMessage}
                  />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor="#1a202c"
                    color="#fbbf24"
                    padding={1}
                    borderRadius="8px"
                    width="100%"
                    mx="auto"
                  >
                    <InfoIcon sx={{ marginRight: 1 }} />
                    <Typography
                      variant="body2"
                      fontSize="13px"
                      fontWeight="500"
                      sx={{ color: "yellow" }}
                    >
                      All your information at Reddy232 is confidential
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid
              container
              sx={{
                backgroundColor: "#0F192F",
                borderRadius: "7px",
                width: "100%",
                display: {
                  xs: "block",
                  sm: "flex",
                },
                padding: {
                  xs: 1.5,
                  sm: 4.5,
                },
                // marginTop: {
                //   xs: 5,
                //   sm: 20,
                // },
              }}
            >
              <Grid
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <h3 style={{ color: "white" }}>Personal Details</h3>
              </Grid>

              <Grid container item xs={12} md={6} padding={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        height: "40px",
                        lineHeight: "40px",
                      }}
                    >
                      User Name
                    </Typography>
                    <input
                      value={user?.username}
                      disabled
                      onChange={handleChangeUsername}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{ color: "white", height: "40px", lineHeight: "40px" }}
                  >
                    Display Name
                  </Typography>
                  <input
                    value={user?.name}
                    disabled
                    onChange={handleChangeDisplayName}
                    style={{
                      color: "white",
                      borderRadius: "7px",
                      height: "35px",
                      backgroundColor: "#283145",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      paddingLeft: 10,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        height: "40px",
                        lineHeight: "40px",
                      }}
                    >
                      Phone Number
                    </Typography>
                    <input
                      value={user?.phone}
                      disabled
                      onChange={handleChangePhone}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Grid display={"flex"} justifyContent={"space-between"}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          height: "40px",
                          lineHeight: "40px",
                        }}
                      >
                        Email
                      </Typography>
                    </Grid>
                    <input
                      value={user?.email}
                      disabled
                      onChange={handleChangeEmail}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={6} padding={2}>
                <Typography
                  variant={"h4"}
                  sx={{
                    display: {
                      xs: "block",
                      sm: "none",
                    },
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                    margin: "auto",
                  }}
                >
                  Change Password
                </Typography>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        height: "40px",
                        lineHeight: "40px",
                      }}
                    >
                      Type old password
                    </Typography>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      style={{
                        color: "white",
                        borderRadius: "7px",
                        height: "35px",
                        backgroundColor: "#283145",
                        border: "none",
                        outline: "none",
                        paddingLeft: 10,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{ color: "white", height: "40px", lineHeight: "40px" }}
                  >
                    Type new password
                  </Typography>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      color: "white",
                      borderRadius: "7px",
                      height: "35px",
                      backgroundColor: "#283145",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      paddingLeft: 10,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    sx={{ color: "white", height: "40px", lineHeight: "40px" }}
                  >
                    Confirm new password
                  </Typography>
                  <input
                    type="password"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                    style={{
                      color: "white",
                      borderRadius: "7px",
                      height: "35px",
                      backgroundColor: "#283145",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      paddingLeft: 10,
                    }}
                  />
                </Grid>

                {errorMessage && (
                  <Typography
                    variant="body2"
                    sx={{ color: "red", marginTop: 1 }}
                  >
                    {errorMessage}
                  </Typography>
                )}
                {successMessage && (
                  <Typography
                    variant="body2"
                    sx={{ color: "green", marginTop: 1 }}
                  >
                    {successMessage}
                  </Typography>
                )}

                <Grid
                  item
                  xs={12}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                  padding={2}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "green",
                      margin: "auto",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>

              <Grid
                container
                width={"100%"}
                marginTop={3}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {/* <Button
                  variant="contained"
                  sx={{ backgroundColor: "green" }}
                  onClick={handleSubmit}
                >
                  Change Password
                </Button> */}
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={6000}
                  onClose={handleSnackbarClose}
                  message={snackbarMessage}
                />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#1a202c"
                  color="#fbbf24"
                  padding={1}
                  borderRadius="8px"
                  width="100%"
                  mx="auto"
                >
                  <InfoIcon sx={{ marginRight: 1 }} />
                  <Typography
                    variant="body2"
                    fontSize="13px"
                    fontWeight="500"
                    sx={{ color: "yellow" }}
                  >
                    All your information at Reddy232 is confidential
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Box>
    </>
  );
}
