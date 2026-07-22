"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Checkbox,
  List,
  ListItemButton,
  Dialog,
} from "@mui/material";
import { toast } from "react-toastify";
import { sendCode, signupUser } from "@/services/User.service";
import { useTranslation } from "react-i18next";
import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/navigation";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import {
  useLocalePhoneCountries,
  type LocalePhoneCountry,
} from "@/hooks/useLocalePhoneCountries";

export default function SignupPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [mailSent, setMailSent] = useState(false);
  const [loadding, setLoadding] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [countryModal, setCountryModal] = useState(false);
  const {
    countries: listLanguage,
    selectedCountry,
    setSelectedCountry,
  } = useLocalePhoneCountries();
  const [countrySearch, setCountrySearch] = useState("");
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowRePassword = () => setShowRePassword(!showRePassword);
  const router = useRouter();
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendInvite = async () => {
    if (!email || countdown > 0) return;

    setSending(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res: any = await sendCode(formData);

      if (res?.status) {
        setMailSent(true);
        setCountdown(60);
      } else {
        setErrorMsg(res?.message);
        toast.error(res?.message);
      }
    } catch (err: any) {
      const msg = err?.message || "Lỗi gửi mail";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };
  const signup = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginId = loginType === "phone" ? phone.trim() : email.trim();
    if (!loginId || !password) {
      setErrorMsg(t("Toast.signup1"));
      return;
    }

    setLoadding(true);
    setErrorMsg(null);

    try {
      const formData = new FormData();
      formData.append("email", loginId);
      formData.append("password", password);
      if (loginType === "phone") {
        formData.append("phone_code", selectedCountry.phoneCode);
      }
      if (mailSent) {
        formData.append("verification_code", inviteCode);
      } else {
        formData.append("invit", inviteCode);
      }
      formData.append("Repassword", rePassword);

      const res: any = await signupUser(formData);

      if (res?.status) {
        toast.success(t("Toast.signup2"));
        window.location.href = "/login";
      } else {
        setErrorMsg(res?.message);
        toast.error(res?.message);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Lỗi đăng ký";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoadding(false);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "460px",
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pt: 1,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "460px",
          },
          backgroundColor: "#0E0F18",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 0, sm: 1 },
          height: { xs: "100vh", sm: "auto" },
          pb: "30px",
          borderRadius: {
            xs: 0,
            sm: "10px",
          },
          p: 4,
        }}
      >
        <Box sx={{ maxWidth: "100%", width: "100%" }}>
          <IconButton
            sx={{
              background: "#0E0F18",
              "&:hover": {
                background: "#2a313aff",
              },
            }}
            onClick={() => router.back()}
          >
            <CloseIcon width="20px" height="20px" sx={{ color: "white" }} />
          </IconButton>
          <Typography
            sx={{
              color: "white",
              fontSize: "26px",
              fontWeight: "600",
              p: "10px",
            }}
          >
            {t("SignupPage.title1")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 2,
            }}
          >
            <Box
              onClick={() => setLoginType("phone")}
              sx={{
                flex: 1,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                background: loginType === "phone" ? "#181923" : "transparent",
                color: loginType === "phone" ? "#00A609" : "#92929B",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {t("LoginPage.label3")}
            </Box>

            <Box
              onClick={() => setLoginType("email")}
              sx={{
                flex: 1,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                background: loginType === "email" ? "#181923" : "transparent",
                color: loginType === "email" ? "#00A609" : "#92929B",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all .2s",
              }}
            >
              {t("LoginPage.label1")}
            </Box>
          </Box>

          {errorMsg && (
            <Typography color="error" fontSize={13} mt={1}>
              {errorMsg}
            </Typography>
          )}

          <form>
            <InputLabel
              sx={{
                color: "white",
                mb: "5px",
              }}
            >
              {loginType === "phone"
                ? t("LoginPage.label3")
                : t("LoginPage.label1")}
            </InputLabel>

            {loginType === "phone" ? (
              <TextField
                fullWidth
                placeholder={t("LoginPage.placeholder3")}
                variant="outlined"
                value={phone}
                onChange={(e) => {
                  // Chỉ cho nhập số
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value);
                }}
                sx={textField}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box
                          onClick={() => setCountryModal(true)}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.8,
                            cursor: "pointer",
                            pr: 1.5,
                            borderRight: "1px solid rgba(255,255,255,.1)",
                            height: "30px",
                          }}
                        >
                          <Image
                            src={selectedCountry.img}
                            width={30}
                            height={30}
                            style={{ height: "20px", objectFit: "contain" }}
                            alt={selectedCountry.code}
                          />

                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "13px",
                            }}
                          >
                            +{selectedCountry.phoneCode}
                          </Typography>

                          <Typography
                            sx={{
                              color: "#777",
                              fontSize: "12px",
                            }}
                          >
                            ▼
                          </Typography>
                        </Box>
                      </InputAdornment>
                    ),

                    endAdornment: phone ? (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setPhone("")} size="small">
                          <CancelIcon fontSize="small" sx={{ color: "#999" }} />
                        </IconButton>
                      </InputAdornment>
                    ) : undefined,
                  },
                }}
              />
            ) : (
              <TextField
                fullWidth
                placeholder={t("LoginPage.placeholder1")}
                variant="outlined"
                value={email}
                type="email"
                onChange={handleUsername}
                sx={textField}
                slotProps={{
                  input: {
                    endAdornment: email ? (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setEmail("")} size="small">
                          <CancelIcon fontSize="small" sx={{ color: "#999" }} />
                        </IconButton>
                      </InputAdornment>
                    ) : undefined,
                  },
                }}
              />
            )}

            <InputLabel sx={{ color: "white" }}>
              {t("SignupPage.label2")}
            </InputLabel>
            <Box
              sx={{
                mb: 2,
                borderRadius: "15px",
                mt: 1,
                width: "100%",
                height: "56px",
                position: "relative",
              }}
            >
              <TextField
                fullWidth
                placeholder={t("SignupPage.placeholder2")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePassword}
                sx={textField}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Visibility
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          ) : (
                            <VisibilityOff
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <InputLabel sx={{ color: "white" }}>
              {t("SignupPage.label3")}
            </InputLabel>
            <Box
              sx={{
                mb: 2,
                borderRadius: "15px",
                mt: 1,
                width: "100%",
                height: "56px",
                position: "relative",
              }}
            >
              <TextField
                fullWidth
                placeholder={t("SignupPage.placeholder3")}
                variant="outlined"
                type={showRePassword ? "text" : "password"}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                sx={textField}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowRePassword(!showRePassword)}
                        >
                          {showRePassword ? (
                            <Visibility
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          ) : (
                            <VisibilityOff
                              fontSize="small"
                              sx={{ color: "white" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            {/* Invite code */}
            {loginType == "email" && (
              <>
                <InputLabel sx={{ color: "white", mt: 2 }}>
                  {t("ChangePass.title7")}
                </InputLabel>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <TextField
                    fullWidth
                    placeholder={t("ChangePass.title10")}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    sx={textField}
                  />

                  <Button
                    onClick={handleSendInvite}
                    disabled={email.length === 0 || sending || countdown > 0}
                    sx={{
                      minWidth: 100,
                      height: 48,
                      borderRadius: "14px",
                      background: "#5BFF00",
                      color: "#000",
                      fontWeight: 600,
                      fontSize: 10,
                      textTransform: "none",
                      "&:disabled": {
                        background: "#9aa4b2",
                      },
                      "&:hover": {
                        background: "#4de000",
                      },
                    }}
                  >
                    {countdown > 0 ? `${countdown}s` : t("ChangePass.title11")}
                  </Button>
                </Box>
                {mailSent && (
                  <Typography color="#4ade80" fontSize={13} mt={1}>
                    {t("Toast.signup3")}
                  </Typography>
                )}
              </>
            )}
            <InputLabel sx={{ color: "white", mt: 1 }}>
              {" "}
              {t("SignupPage.label4")}
            </InputLabel>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <TextField
                fullWidth
                placeholder={t("SignupPage.placeholder4")}
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                sx={textField}
              />
            </Box>

            <Box display={"flex"} gap={"10px"} alignItems={"center"}>
              <Checkbox
                icon={
                  <CircleIcon
                    sx={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  />
                }
                checkedIcon={
                  <CheckIcon
                    sx={{
                      width: 16,
                      height: 16,
                      p: "2px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      color: "#16A34A",
                      boxSizing: "border-box",
                    }}
                  />
                }
                sx={{
                  p: 0,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              />
              <Typography color="#fff" fontSize={13}>
                {t("SignupPage.title4")}
              </Typography>
              <Typography color="#4ade80" fontSize={13}>
                {t("SignupPage.title5")}
              </Typography>
            </Box>
            <Box mt={2}>
              {/* Login */}
              <Button
                fullWidth
                onClick={signup}
                sx={{
                  background: "#5BFF00",
                  color: "#000",
                  fontWeight: 600,
                  borderRadius: "14px",
                  height: 52,
                  textTransform: "none",
                  boxShadow: "0 0 20px rgba(91,255,0,0.4)",
                  "&:hover": {
                    background: "#4de000",
                    boxShadow: "0 0 25px rgba(91,255,0,0.6)",
                  },
                }}
              >
                {t("SignupPage.title1")}
              </Button>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  width: "100%",
                  mt: 1,
                }}
              >
                <Typography
                  textAlign="center"
                  color="#9aa4b2"
                  my={2}
                  fontSize={14}
                >
                  {t("SignupPage.title2")}
                </Typography>

                <Button
                  fullWidth
                  onClick={() => router.push("/login")}
                  sx={{
                    background: "none",
                    color: "#4ade80",
                    fontWeight: 400,
                    borderRadius: 14,
                    width: 130,
                    textTransform: "none",
                  }}
                >
                  {t("SignupPage.title3")}
                </Button>
              </Box>
            </Box>
          </form>

          <Dialog
            open={countryModal}
            onClose={() => setCountryModal(false)}
            fullWidth
            maxWidth="xs"
            PaperProps={{
              sx: {
                background: "#20243F",
                color: "white",
                borderRadius: "14px",
                maxHeight: "80vh",
                margin: "12px",
              },
            }}
          >
            {/* Header */}
            <Box
              sx={{
                height: 58,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderBottom: "1px solid rgba(255,255,255,.05)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {t("LoginPage.title6")}
              </Typography>

              <IconButton
                onClick={() => setCountryModal(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  color: "#bbb",
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Search */}
            <Box sx={{ p: 1.5 }}>
              <TextField
                fullWidth
                size="small"
                placeholder={t("LoginPage.title7")}
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "#181B30",
                    color: "white",
                    borderRadius: "8px",
                  },

                  "& input::placeholder": {
                    color: "#777",
                    opacity: 1,
                  },

                  "& fieldset": {
                    borderColor: "rgba(255,255,255,.08)",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon
                          sx={{
                            color: "#777",
                            fontSize: 20,
                          }}
                        />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* Country List */}
            <List
              disablePadding
              sx={{
                overflowY: "auto",
                maxHeight: "55vh",
              }}
            >
              {listLanguage
                .filter((item) =>
                  item.name.toLowerCase().includes(countrySearch.toLowerCase()),
                )
                .map((country) => (
                  <ListItemButton
                    key={`${country.name}-${country.code}`}
                    onClick={() => {
                      setSelectedCountry(country);
                      setCountryModal(false);
                      setCountrySearch("");
                    }}
                    sx={{
                      minHeight: 58,
                      px: 2,
                      borderBottom: "1px solid rgba(255,255,255,.04)",
                      "&:hover": {
                        background: "#292D4A",
                      },
                    }}
                  >
                    <Image
                      src={country.img}
                      width={30}
                      height={30}
                      style={{ height: "20px", objectFit: "contain" }}
                      alt={country.code}
                    />

                    <Typography
                      sx={{
                        flex: 1,
                        color: "white",
                        fontSize: "13px",
                        pl: "10px",
                      }}
                    >
                      {country.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "13px",
                      }}
                    >
                      +{country.phoneCode}
                    </Typography>
                  </ListItemButton>
                ))}
            </List>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

const textField = {
  mb: 3,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#1A1B24",
    height: 48,
    color: "#fff",
    border: "none",
    "& fieldset": {
      borderColor: "none",
    },

    "&:hover fieldset": {
      borderColor: "none",
    },

    "&.Mui-focused fieldset": {
      border: "none",
      borderWidth: "1px",
    },
  },

  "& .MuiInputBase-input": {
    color: "#fff",
    border: "none",

    "&::placeholder": {
      color: "#7c8aa0",
      opacity: 1,
    },

    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #1e2a3a inset",
      WebkitTextFillColor: "#fff",
    },
  },
};
