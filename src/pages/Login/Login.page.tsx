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
  Link,
  InputAdornment,
  List,
  ListItemButton,
  Dialog,
} from "@mui/material";
import { getWebsiteConfig, loginUser } from "@/services/User.service";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { NextIcon, PreviousIcon } from "@/shared/Svgs/Svg.component";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
interface Country {
  id: number;
  name: string;
  code: string;
  phoneCode: string;
  img: string;
}

const listLanguage = [
  {
    id: 0,
    code: "en",
    name: "English",
    phoneCode: "1",
    img: "https://flagcdn.com/us.svg",
  },
  {
    id: 1,
    code: "vi",
    name: "Tiếng Việt",
    phoneCode: "84",
    img: "https://flagcdn.com/vn.svg",
  },
  {
    id: 2,
    code: "ja",
    name: "日本語",
    phoneCode: "81",
    img: "https://flagcdn.com/jp.svg",
  },
  {
    id: 3,
    code: "id",
    name: "Bahasa Indonesia",
    phoneCode: "62",
    img: "https://flagcdn.com/id.svg",
  },
  {
    id: 4,
    code: "de",
    name: "Deutsch",
    phoneCode: "49",
    img: "https://flagcdn.com/de.svg",
  },
  {
    id: 5,
    code: "es",
    name: "Español",
    phoneCode: "34",
    img: "https://flagcdn.com/es.svg",
  },
  {
    id: 6,
    code: "po",
    name: "Portugal",
    phoneCode: "351",
    img: "https://flagcdn.com/pt.svg",
  },
  {
    id: 7,
    code: "fr",
    name: "Français",
    phoneCode: "33",
    img: "https://flagcdn.com/fr.svg",
  },
  {
    id: 8,
    code: "it",
    name: "Italiano",
    phoneCode: "39",
    img: "https://flagcdn.com/it.svg",
  },
  {
    id: 9,
    code: "ko",
    name: "한국인",
    phoneCode: "82",
    img: "https://flagcdn.com/kr.svg",
  },
  {
    id: 10,
    code: "th",
    name: "ไทย",
    phoneCode: "66",
    img: "https://flagcdn.com/th.svg",
  },
  {
    id: 11,
    code: "gr",
    name: "Ελληνικά",
    phoneCode: "30",
    img: "https://flagcdn.com/gr.svg",
  },
];
export default function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadding, setLoadding] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleUsername = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const [loginType, setLoginType] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [countryModal, setCountryModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    id: 0,
    code: "en",
    name: "English",
    img: "https://flagcdn.com/us.svg",
    phoneCode: "1",
  });
  const [countrySearch, setCountrySearch] = useState("");
  const [configs, setConfigs] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const referral = async () => {
      try {
        const config: any = await getWebsiteConfig();

        if (config.status === true) {
          setConfigs(config.data);
        }
      } catch (errors: any) {
        console.log(errors?.message);
      }
    };
    referral();
  }, []);
  // Login handler
  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      setLoadding(true);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      await loginUser(formData)
        .then((res: any) => {
          if (res?.status === true) {
            window.localStorage.setItem("token", res.token);
            window.location.href = "/";
          } else {
            toast.error(res?.message);
          }
        })
        .catch((err: any) => {
          const msg = err?.response?.data?.message || err.message;
          toast.error(msg);
        })
        .finally(() => {
          setLoadding(false);
          setError("");
        });
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "460px",
        margin: "auto",
        minHeight: "100vh",
        background: "#0E0F18",
        pt: 2,
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
          mt: { xs: 0, sm: 2 },
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
              position: "fixed",
              top: "20px",
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
            {t("LoginPage.title1")}
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

          {error.length > 0 && (
            <Typography
              sx={{ color: "red", fontSize: "14px", p: "10px", mt: 2 }}
            >
              Error: {error}
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
              {t("LoginPage.label2")}
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
                placeholder={t("LoginPage.placeholder2")}
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

            <Box
              onClick={() => {
                const newWindow = window.open(
                  configs.telegram,
                  "_blank",
                  "noopener,noreferrer",
                );
                if (newWindow) {
                  newWindow.opener = null;
                }
              }}
              sx={{
                background: "none",
                color: "#00A609",
                borderRadius: "14px",
                height: 20,
                textAlign: "left",
                textTransform: "none",
                cursor: "pointer",
                fontSize: "13px",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              {t("LoginPage.title2")}
            </Box>
            <Box mt={3} width={"100%"}>
              <Button
                fullWidth
                onClick={login}
                sx={{
                  background: "#00A609",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "12px",
                  height: 52,
                  textTransform: "none",
                  "&:hover": {
                    background: "#4de000",
                  },
                }}
              >
                {t("LoginPage.title1")}
              </Button>
              <Button
                fullWidth
                sx={{
                  border: "1px solid #00A609",
                  background: "none",
                  color: "#00A609",
                  fontWeight: 600,
                  mt: 2,
                  borderRadius: "12px",
                  height: 52,
                  textTransform: "none",
                  "&:hover": {
                    background: "#4de000",
                    color: "white",
                  },
                }}
              >
                {t("LoginPage.title3")}
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <Typography
                sx={{ color: "white", fontSize: 13, fontWeight: 400 }}
              >
                {t("LoginPage.title4")}
              </Typography>
              <Typography
                onClick={() => {
                  router.push("/signup");
                }}
                sx={{
                  color: "#00A609",
                  fontSize: 13,
                  fontWeight: 400,
                  cursor: "pointer",
                }}
              >
                {t("LoginPage.title5")}
              </Typography>
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
