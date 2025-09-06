import useAuth from "@/hook/useAuth";
import {
  updateBank,
  updatePassword,
  updatePaymentPassword,
} from "@/services/User.service";
import {
  Autocomplete,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
type iProps = {
  subTabs: any;
};
const walletType = [
  {
    id: "TRC20",
    name: "TRC20",
  },
  {
    id: "BEP20",
    name: "BEP20",
  },
];
export default function ChangeBank({ subTabs }: iProps) {
  const { t } = useTranslation();

  const { user, refetchUser } = useAuth();
  const [bankName, setBankName] = useState<string | null>(null);
  const [bankAccNo, setbankAccNo] = useState<string | null>(null);
  const [bankAccName, setbankAccName] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const frontFileInput = useRef<HTMLInputElement>(null);
  const [frontImage, setFrontImage] = useState<File>();
  const [walletNetwork, setWalletNetwork] = useState<string | null>(null);

  const [subTab, setSubTab] = useState(subTabs || 0);
  const handleFrontChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFrontImage(file);
    }
  };
  useEffect(() => {
    if (user) {
      setBankName(user.bank_name);
      setbankAccName(user.bank_acc_name);
      setbankAccNo(user.bank_acc_no);
      setWallet(user.wallet);
    }
  }, [user]);

  useEffect(() => {
    if (walletNetwork) {
      if (walletNetwork == "TRC20") {
        setWallet(user?.TRC20?.wallet || "");
      } else if (walletNetwork == "BEP20") {
        setWallet(user?.BEP20?.wallet || "");
      } else {
        setWallet(null);
      }
    }
  }, [walletNetwork, user]);
  const handleChangeSubTab = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setSubTab(newValue);
  };
  const handleSubmitBank = async (e: any) => {
    e.preventDefault();

    if (subTab === 0) {
      if (bankAccNo && bankAccName && bankName) {
        const formData = new FormData();
        formData.append("bank_name", bankName);
        formData.append("bank_acc_no", bankAccNo);
        formData.append("bank_acc_name", bankAccName);
        if (frontImage) formData.append("bank_qr", frontImage);
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
        await refetchUser();
      } else {
        toast.error(t("Toast.Desposit5"));
      }
    } else {
      if (wallet && walletNetwork) {
        const formData = new FormData();
        formData.append("wallet_type", walletNetwork);
        formData.append("wallet", wallet);
        if (frontImage) formData.append("wallet_qr", frontImage);
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
        await refetchUser();
      } else {
        toast.error(t("Toast.Desposit5"));
      }
    }
  };
  return (
    <>
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
        <Tab label={t("ProfilePage.tab_bank")} onClick={() => setSubTab(0)} />
        <Tab label={t("ProfilePage.tab_wallet")} onClick={() => setSubTab(1)} />
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
                shrink: true,
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
                shrink: true,
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
                shrink: true,
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
            <Typography
              sx={{
                color: "white",
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              {t("ProfilePage.change_label8")}
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="file"
              ref={frontFileInput}
              onChange={handleFrontChange}
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
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  width: "100%",
                  height: {
                    xs: "52px",
                    sm: "45px",
                  },
                  fontSize: { xs: "16px", sm: "14px" },
                  lineHeight: {
                    xs: "35px",
                    sm: "45px",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px", // chỉnh padding trái phải
                  display: "flex",
                  alignItems: "center", // quan trọng để căn giữa
                  height: "90%", // full chiều cao TextField
                  boxSizing: "border-box",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                  opacity: 1, // để không bị mờ
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
            {/* --- Field {t("Toast.Wallet")} --- */}
            <Autocomplete
              id="country-select-demo"
              sx={{ padding: "20px 0px" }}
              options={walletType}
              autoHighlight
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setWalletNetwork(newValue?.name || "TRC20");
              }}
              renderOption={(props, option) => {
                const { ...optionProps } = props;
                return (
                  <Box
                    key={option.id}
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...optionProps}
                  >
                    {t("ProfilePage.lan") + " " + option.name}
                  </Box>
                );
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  label={t("ProfilePage.change_label9")}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "white" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      color: "white",
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },

                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                  }}
                  slotProps={{
                    htmlInput: {
                      ...params.inputProps,
                      autoComplete: "new-password",
                    },
                  }}
                />
              )}
            />
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
                shrink: true,
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
            <Typography
              sx={{
                color: "white",
                marginTop: "10px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            >
              {t("ProfilePage.change_label10")}
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="file"
              ref={frontFileInput}
              onChange={handleFrontChange}
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
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  width: "100%",
                  height: {
                    xs: "52px",
                    sm: "45px",
                  },
                  fontSize: { xs: "16px", sm: "14px" },
                  lineHeight: {
                    xs: "35px",
                    sm: "45px",
                  },
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "0 14px", // chỉnh padding trái phải
                  display: "flex",
                  alignItems: "center", // quan trọng để căn giữa
                  height: "90%", // full chiều cao TextField
                  boxSizing: "border-box",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                  opacity: 1, // để không bị mờ
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
    </>
  );
}
