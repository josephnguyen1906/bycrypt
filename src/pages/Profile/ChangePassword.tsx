"use client";
import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Tabs, Tab } from "@mui/material";
import {
  updateBank,
  updatePassword,
  updatePaymentPassword,
} from "@/services/User.service";
import { toast } from "react-toastify";
import useAuth from "@/hook/useAuth";
import { useTranslation } from "react-i18next";
import { WASI } from "wasi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Tab {
  tab: number | null;
  subTab: number | null;
}
export default function ChangePassword(props: Tab) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPassword, setOldPassword] = useState<string | null>(null);
  const [bankName, setBankName] = useState<string | null>(null);
  const [bankAccNo, setbankAccNo] = useState<string | null>(null);
  const [bankAccName, setbankAccName] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [newPaymentPassword, setNewPaymentPassword] = useState("");
  const [confirmPaymentPassword, setConfirmPaymentPassword] = useState("");
  const [value, setValue] = useState(props.tab || 0);
  const [subTab, setSubTab] = useState(props.subTab || 0);

  useEffect(() => {
    if (user) {
      setBankName(user.bank_name);
      setbankAccName(user.bank_acc_name);
      setbankAccNo(user.bank_acc_no);
      setWallet(user.wallet);
    }
  }, [user]);
  const handleChangeSubTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSubTab(newValue);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (currentPassword && newPassword && confirmPassword) {
      await updatePassword(currentPassword, newPassword, confirmPassword)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass1"));
          } else {
            toast.error(t("Toast.change_pass2"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handleSubmitPayment = async (e: any) => {
    e.preventDefault();
    if (newPaymentPassword !== confirmPaymentPassword) {
      toast.warning(t("Toast.change_pass4"));
      return;
    }
    if (oldPassword && newPaymentPassword && confirmPaymentPassword) {
      const formData = new FormData();
      formData.append("current_paypassword", oldPassword);
      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);
      await updatePaymentPassword(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass4"));
          } else {
            toast.error(t("Toast.change_pass5"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
    if (!oldPassword && newPaymentPassword && confirmPaymentPassword) {
      const formData = new FormData();
      formData.append("paypassword", newPaymentPassword);
      formData.append("confirm_paypassword", confirmPaymentPassword);
      await updatePaymentPassword(formData)
        .then((response: any) => {
          if (response.status === true) {
            toast.success(t("Toast.change_pass6"));
          } else {
            toast.error(t("Toast.change_pass7"));
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };
  const handleSubmitBank = async (e: any) => {
    e.preventDefault();

    if (subTab === 0) {
      if (bankAccNo && bankAccName && bankName) {
        const formData = new FormData();
        formData.append("bank_name", bankName);
        formData.append("bank_acc_no", bankAccNo);
        formData.append("bank_acc_name", bankAccName);
        await updateBank(formData)
          .then((response: any) => {
            if (response.status === true) {
              toast.success(t("Toast.change_pass9"));
            } else {
              toast.error(t("Toast.change_pass8"));
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        toast.error(t("Toast.Desposit5"));
      }
    } else {
      if (wallet) {
        const formData = new FormData();
        formData.append("wallet", wallet);
        await updateBank(formData)
          .then((response: any) => {
            if (response.status === true) {
              toast.success(t("Toast.change_pass9"));
            } else {
              toast.error(t("Toast.change_pass8"));
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        toast.error(t("Toast.Desposit5"));
      }
    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box
        sx={{
          borderBottom: 1,
          width: {
            xs: "100%",
            sm: "80%",
          },
          margin: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            width: {
              xs: "100%",
              sm: "80%",
            },
            padding: "0px 10px",
            "& .MuiTab-root": {
              color: "#909090",
              fontSize: "18px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              "&:hover": { color: "#fff" },
              "&.Mui-selected": {
                color: "#fff",
                fontWeight: 700,
                borderBottom: "2px solid #fff",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#000",
            },
          }}
        >
          <Tab label={t("ProfilePage.tab_pass1")} {...a11yProps(0)} />
          <Tab label={t("ProfilePage.tab_pass2")} {...a11yProps(1)} />
          <Tab label={t("ProfilePage.tab_pass3")} {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
              },
              margin: "auto",
              textAlign: {
                xs: "Center",
                sm: "left",
              },
              mt: 4,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              {t("ProfilePage.title_change")}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              * {t("ProfilePage.change_note")}
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={t("ProfilePage.change_label1")}
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text1")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label={t("ProfilePage.change_label2")}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text2")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label3")}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text3")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#fff",
                  color: "black",
                  width: "250px",
                  height: "50px",
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
              >
                {t("ProfilePage.button_change")}
              </Button>
            </form>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
              },
              margin: "auto",
              textAlign: {
                xs: "Center",
                sm: "left",
              },
              mt: 4,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              {t("ProfilePage.change_pay_title")}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              gutterBottom
              sx={{ color: "#fff" }}
            >
              * {t("ProfilePage.change_pay_note")}
            </Typography>
            <form onSubmit={handleSubmitPayment}>
              {user && user.wdstatus === 1 && (
                <TextField
                  fullWidth
                  label={t("ProfilePage.change_label1")}
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  margin="normal"
                  required
                  helperText={t("ProfilePage.helper_text1")}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                      "&.Mui-focused": {
                        color: "#fff", // giữ màu trắng khi label floating
                      },
                    }, // Label màu trắng
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
              )}
              <TextField
                fullWidth
                label={t("ProfilePage.change_label2")}
                type="password"
                value={newPaymentPassword}
                onChange={(e) => setNewPaymentPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text2")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label3")}
                type="password"
                value={confirmPaymentPassword}
                onChange={(e) => setConfirmPaymentPassword(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text3")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#fff",
                  color: "black",
                  width: "250px",
                  height: "50px",
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
              >
                {t("ProfilePage.button_change")}
              </Button>
            </form>
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Tabs
            value={subTab}
            onChange={handleChangeSubTab}
            textColor="inherit"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
              },
              padding: "0px 10px",
              "& .MuiTab-root": {
                color: "#909090",
                fontSize: "15px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                "&:hover": { color: "#fff" },
                "&.Mui-selected": {
                  color: "#fff",
                  fontWeight: 700,
                  borderBottom: "2px solid #fff",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#000",
              },
            }}
          >
            <Tab
              label={t("ProfilePage.tab_bank")}
              onClick={() => setSubTab(0)}
            />
            <Tab
              label={t("ProfilePage.tab_wallet")}
              onClick={() => setSubTab(1)}
            />
          </Tabs>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "80%",
              },
              margin: "auto",
              textAlign: {
                xs: "Center",
                sm: "left",
              },
              mt: 4,
            }}
          >
            {/* <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#fff" }}
            >
              {t("ProfilePage.add_bank")}
            </Typography>

            <form onSubmit={handleSubmitBank}>
              <TextField
                fullWidth
                label={t("ProfilePage.change_label4")}
                type="text"
                value={user?.bank_name || bankName}
                onChange={(e) => setBankName(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text4")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label5")}
                type="text"
                value={user?.bank_acc_no || bankAccNo}
                onChange={(e) => setbankAccNo(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text5")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label6")}
                type="text"
                value={user?.bank_acc_name || bankAccName}
                onChange={(e) => setbankAccName(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text6")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label={t("ProfilePage.change_label7")}
                type="text"
                value={user?.wallet || wallet}
                onChange={(e) => setWallet(e.target.value)}
                margin="normal"
                required
                helperText={t("ProfilePage.helper_text7")}
                InputLabelProps={{
                  sx: {
                    color: "#fff",
                    "&.Mui-focused": {
                      color: "#fff", // giữ màu trắng khi label floating
                    },
                  }, // Label màu trắng
                }}
                InputProps={{
                  sx: {
                    color: "#fff", // Chữ nhập vào màu trắng
                    "& .MuiInputBase-input::placeholder": {
                      color: "#fff", // Placeholder màu trắng
                      opacity: 1,
                    },
                  },
                }}
                FormHelperTextProps={{
                  sx: { color: "#fff" }, // HelperText màu trắng
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#fff",
                  color: "black",
                  width: "250px",
                  height: "50px",
                  borderRadius: "15px",
                  textTransform: "capitalize",
                }}
              >
                {t("ProfilePage.button_save")}
              </Button>
            </form> */}

            {subTab === 0 && (
              <form onSubmit={handleSubmitBank}>
                {/* --- Các field ngân hàng --- */}
                <TextField
                  fullWidth
                  label={t("ProfilePage.change_label4")}
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  margin="normal"
                  required
                  helperText={t("ProfilePage.helper_text4")}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                      "&.Mui-focused": {
                        color: "#fff", // giữ màu trắng khi label floating
                      },
                    }, // Label màu trắng
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label={t("ProfilePage.change_label5")}
                  type="text"
                  value={bankAccNo}
                  onChange={(e) => setbankAccNo(e.target.value)}
                  margin="normal"
                  required
                  helperText={t("ProfilePage.helper_text5")}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                      "&.Mui-focused": {
                        color: "#fff", // giữ màu trắng khi label floating
                      },
                    }, // Label màu trắng
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label={t("ProfilePage.change_label6")}
                  type="text"
                  value={bankAccName}
                  onChange={(e) => setbankAccName(e.target.value)}
                  margin="normal"
                  required
                  helperText={t("ProfilePage.helper_text6")}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                      "&.Mui-focused": {
                        color: "#fff", // giữ màu trắng khi label floating
                      },
                    }, // Label màu trắng
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: "#fff",
                    color: "black",
                    width: "250px",
                    height: "50px",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  {t("ProfilePage.button_save")}
                </Button>
              </form>
            )}

            {subTab === 1 && (
              <form onSubmit={handleSubmitBank}>
                {/* --- Field ví --- */}
                <TextField
                  fullWidth
                  label={t("ProfilePage.change_label7")}
                  type="text"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  margin="normal"
                  required
                  helperText={t("ProfilePage.helper_text7")}
                  InputLabelProps={{
                    sx: {
                      color: "#fff",
                      "&.Mui-focused": {
                        color: "#fff", // giữ màu trắng khi label floating
                      },
                    }, // Label màu trắng
                  }}
                  InputProps={{
                    sx: {
                      color: "#fff", // Chữ nhập vào màu trắng
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff", // Placeholder màu trắng
                        opacity: 1,
                      },
                    },
                  }}
                  FormHelperTextProps={{
                    sx: { color: "#fff" }, // HelperText màu trắng
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#fff",
                      },
                      "&:hover fieldset": {
                        borderColor: "#fff",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#fff",
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  sx={{
                    mt: 2,
                    backgroundColor: "#fff",
                    color: "black",
                    width: "250px",
                    height: "50px",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  {t("ProfilePage.button_save")}
                </Button>
              </form>
            )}
          </Box>
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
