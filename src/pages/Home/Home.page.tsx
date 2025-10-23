"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import "./Home.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/Loading";
import swal from "sweetalert";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import useAuth from "@/hook/useAuth";
import TradingViewHotlists from "@/components/ChartView/TradingViewHotlists";
import { CoinIcon, SearchIcon } from "@/shared/Svgs/Svg.component";
import { CloseOutlined, Search } from "@mui/icons-material";
import { formatCurrency } from "@/utils/formatMoney";
import { getWebsiteConfig } from "@/services/User.service";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { user, loading } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [websiteConfig, setWebsiteConfig] = useState<any>(null);
  const route = useRouter();
  useEffect(() => {
    const referral = async () => {
      try {
        const buySellConfig: any = await getWebsiteConfig();
        if (buySellConfig) {
          setWebsiteConfig(buySellConfig.data);
        }

        const hasShownPopup = sessionStorage.getItem("popupShown");

        if (
          user &&
          !hasShownPopup &&
          buySellConfig.data.checkin_notify_status === 1
        ) {
          setShowPopup(true);
          sessionStorage.setItem("popupShown", "true");

          // Auto close sau 10 giây (tuỳ chỉnh)
          setTimeout(() => {
            setShowPopup(false);
          }, 10000);
        }
      } catch (errors: any) {
        // toast.error(errors?.message);
      }
    };

    if (!loading) {
      referral();
    }
  }, [user, loading]);

  return (
    <div className="home">
      <div className="home-webiste">
        <div className="home-join">
          <div className="home-join-left">
            <h2>{t("HomePage.join_title")}</h2>
            <div className="send-mail">
              <input
                type="text"
                placeholder="Enter Email"
                style={{ color: "#fff" }}
              />
              <button type="button">{t("HomePage.what_is_button")}</button>
            </div>
            <div className="join-img">
              <img
                src="/images/DD7AC9432E675714.webp"
                alt="join"
                width={200}
                height={200}
                loading="lazy"
              />
              <img
                src="/images/499A92F3657A52EC.webp"
                alt="join"
                width={200}
                height={200}
                loading="lazy"
              />
              <img
                src="/images/6279B178FADAFCC5.webp"
                alt="join"
                width={60}
                height={60}
                style={{ width: "60px", height: "60px" }}
                loading="lazy"
              />
            </div>
          </div>
          <div className="home-join-right">
            <video
              src="/images/79620084DA93114F.webm"
              autoPlay
              loop
              muted
              height={580}
            />
          </div>
        </div>
        <div className="trade-like">
          <div className="trade-like-title">
            <h2>{t("HomePage.trade_like_title")}</h2>
            <p>{t("HomePage.trade_like_description")}</p>
          </div>
          <video
            src="./images/882D5049A31E763B.mp4"
            autoPlay
            loop
            muted
            height={580}
          />
        </div>
        <div className="trade-way">
          <div className="trade-way-title">
            <h2>{t("HomePage.trade_way_title")}</h2>
            <p>{t("HomePage.trade_way_description")}</p>
          </div>
          <video
            src="./images/D47D930F643E7A00.webm"
            autoPlay
            loop
            muted
            height={580}
          />
        </div>
        <div className="what-is">
          <div className="what-is-top">
            <div className="what-is-left">
              <h2>{t("HomePage.what_is_title")}</h2>
              <p>{t("HomePage.what_is_description")}</p>
              <button type="button">{t("HomePage.what_is_button")}</button>
            </div>
            <div className="what-is-right">
              <Image
                src="./images/logo1.png"
                alt="what-is"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="what-is-video">
            <section className="video-section">
              <div className="video-item">
                <video
                  className="video-content"
                  aria-labelledby=":Rk:"
                  playsInline
                  controls
                  src="./images/B961D658AE174818.mp4"
                  poster="https://www.okx.com/cdn/assets/imgs/2211/30151288EAF5AEE6.jpg?x-oss-process=image/format,webp"
                >
                  <track kind="captions" />
                </video>
                <div className="video-text" id=":Rk:">
                  <p className="video-title">{t("HomePage.video_1_title")}</p>
                  <p className="video-desc">
                    {t("HomePage.video_1_description")}
                  </p>
                </div>
              </div>
              <div className="video-item">
                <video
                  className="video-content"
                  aria-labelledby=":RkH1:"
                  controls
                  playsInline
                  src="./images/BC5098F4F6DEB68C.mp4"
                  poster="https://www.okx.com/cdn/assets/imgs/249/F2B1EAC7B28A4F87.jpg?x-oss-process=image/format,webp"
                >
                  <track kind="captions" />
                </video>
                <div className="video-text" id=":RkH1:">
                  <p className="video-title">{t("HomePage.video_2_title")}</p>
                  <p className="video-desc">
                    {t("HomePage.video_2_description")}
                  </p>
                </div>
              </div>
              <div className="video-item">
                <video
                  className="video-content"
                  aria-labelledby=":RkH2:"
                  controls
                  playsInline
                  src="./images/CCAA7B610D3D33D4.mp4"
                  poster="https://www.okx.com/cdn/assets/imgs/2211/EF1304B5D4D9DB3E.jpg?x-oss-process=image/format,webp"
                >
                  <track kind="captions" />
                </video>
                <div className="video-text" id=":RkH2:">
                  <p className="video-title">{t("HomePage.video_3_title")}</p>
                  <p className="video-desc">
                    {t("HomePage.video_3_description")}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="question">
            <h2>{t("HomePage.questions_title")}</h2>
            <Accordion
              sx={{
                backgroundColor: "#000",
                borderBottom: "1px solid #fff",
                color: "#fff",
                "& .MuiAccordionSummary-root": { color: "#fff" },
                "& .MuiAccordionDetails-root": { color: "gray" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ControlPointIcon
                    sx={{ color: "#fff" }}
                    style={{ fontSize: 40 }}
                  />
                }
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  component="span"
                  sx={{ fontSize: 35, padding: "50px 0px" }}
                >
                  {t("HomePage.accordion_1_title")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                {t("HomePage.accordion_1_description")}
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "#000",
                borderBottom: "1px solid #fff",
                color: "#fff",
                "& .MuiAccordionSummary-root": { color: "#fff" },
                "& .MuiAccordionDetails-root": { color: "gray" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ControlPointIcon
                    sx={{ color: "#fff" }}
                    style={{ fontSize: 40 }}
                  />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography
                  component="span"
                  sx={{ fontSize: 35, padding: "50px 0px" }}
                >
                  {t("HomePage.accordion_2_title")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                {t("HomePage.accordion_2_description")}
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "#000",
                borderBottom: "1px solid #fff",
                color: "#fff",
                "& .MuiAccordionSummary-root": { color: "#fff" },
                "& .MuiAccordionDetails-root": { color: "gray" },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ControlPointIcon
                    sx={{ color: "#fff" }}
                    style={{ fontSize: 40 }}
                  />
                }
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography
                  component="span"
                  sx={{ fontSize: 35, padding: "50px 0px" }}
                >
                  {t("HomePage.accordion_3_title")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                {t("HomePage.accordion_3_description")}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="home-mobile">
          {!user ? (
            <Box>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  width: "180px",
                  margin: "auto",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {t("HomePage.mobile_new_alternative")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  padding: "10px 0",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {t("HomePage.mobile_crypto_journey")}
              </Typography>
              <Box
                sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}
              >
                <img
                  src="/images/7889D86ACE77574B.png"
                  style={{ height: "350px", objectFit: "contain" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <Button
                  sx={{
                    width: "150px",
                    backgroundColor: "#909090",
                    color: "white",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    "&:hover": { backgroundColor: "#909090" },
                  }}
                  onClick={() => route.push("/login")}
                >
                  {t("HomePage.mobile_login")}
                </Button>
                <Button
                  sx={{
                    width: "150px",
                    backgroundColor: "#fcd534",
                    color: "#000",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    "&:hover": { backgroundColor: "white" },
                  }}
                  onClick={() => route.push("/signup")}
                >
                  {t("HomePage.mobile_signup")}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Search
                  sx={{ color: "white", position: "absolute", margin: "5px" }}
                />
                <TextField
                  placeholder={t("HomePage.mobile_search_placeholder")}
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{
                    width: "90%",
                    height: "35px",
                    borderRadius: "10px",
                    margin: "auto",
                    paddingLeft: "20px",
                    backgroundColor: "rgba(142, 142, 142, 0.34)",
                    "& .MuiInputBase-root": {
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 14px",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      boxSizing: "border-box",
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "white",
                      fontSize: { xs: "12px", sm: "14px" },
                      opacity: 1,
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "100%", display: "flex", padding: "5px 20px" }}>
                <Box sx={{ width: "100%", textAlign: "left" }}>
                  <Typography sx={{ color: "#909090", padding: "5px 0" }}>
                    {t("HomePage.mobile_estimated_value")}
                  </Typography>
                  <Box
                    sx={{
                      height: "30px",
                      display: "flex",
                      gap: "5px",
                      alignItems: "flex-end",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {user?.balance?.usdt
                        ? `${parseFloat(
                            user.balance.usdt
                          ).toLocaleString()} USDT`
                        : "0 "}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "auto",
                  gap: "10px",
                }}
              >
                <Button
                  onClick={() => route.push("/deposit")}
                  sx={{
                    width: "35%",
                    height: "35px",
                    borderRadius: "15px",
                    background: "#fcd534",
                    color: "black",
                    textTransform: "capitalize",
                    "&:hover": { background: "#fcd534" },
                  }}
                >
                  {t("HomePage.mobile_deposit")}
                </Button>

                <Button
                  onClick={() => route.push("/withdraw")}
                  sx={{
                    width: "35%",
                    height: "35px",
                    borderRadius: "15px",
                    background: "#fcd534",
                    textTransform: "capitalize",
                    color: "black",
                    "&:hover": { background: "#fcd534" },
                  }}
                >
                  {t("HomePage.mobile_withdraw")}
                </Button>

                <Button
                  onClick={() => route.push("/convert")}
                  sx={{
                    width: "35%",
                    height: "35px",
                    borderRadius: "15px",
                    background: "#fcd534",
                    color: "black",
                    textTransform: "capitalize",
                    "&:hover": { background: "#fcd534" },
                  }}
                >
                  {t("BuySellPage.trade")}
                </Button>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  margin: "auto",
                  backgroundColor: "rgba(142, 142, 142, 0.34)",
                  borderRadius: "10px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  p: "10px",
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "90%",
                    },
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    margin: "0 auto",
                    paddingTop: "10px",
                    gap: "5px",
                    p: {
                      xs: "15px 0px",
                      sm: "15px 0px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      alignItems: "Center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "Center",
                        justifyContent: "center",
                      }}
                    >
                      <img src="/images/vietnam.png" width={30} height={30} />
                      <Typography sx={{ fontSize: "14px", color: "white" }}>
                        {t("Toast.Wallet")} VND
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "Center",
                        justifyContent: "center",
                      }}
                    >
                      <img src="/images/usdt.png" width={30} height={30} />
                      <Typography sx={{ fontSize: "14px", color: "white" }}>
                        {t("Toast.Wallet")} USDT
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      alignItems: "Center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "Center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#fcd534",
                          fontWeight: "bold",
                        }}
                      >
                        {parseFloat(user.balance.vnd).toLocaleString()} VND
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "Center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#fcd534",
                          fontWeight: "bold",
                        }}
                      >
                        {parseFloat(user.balance.usdt).toLocaleString()} USDT
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ width: "90%", margin: "auto" }}>
                <TradingViewHotlists />
              </Box>
              <Box
                sx={{
                  paddingTop: "40px",
                  paddingBottom: "100px",
                  background: "#000",
                }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "22px",
                    textAlign: "center",
                  }}
                >
                  {t("HomePage.questions_title")}
                </h2>
                <Accordion
                  sx={{
                    backgroundColor: "#000",
                    color: "white",
                    "& .MuiAccordionSummary-root": { color: "white" },
                    "& .MuiAccordionDetails-root": { color: "grwhiteay" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ControlPointIcon
                        sx={{ color: "white" }}
                        style={{ fontSize: 20 }}
                      />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        padding: "10px 0px",
                        color: "white",
                      }}
                    >
                      {t("HomePage.accordion_1_title")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ fontSize: 14, color: "gray" }}>
                    {t("HomePage.accordion_1_description")}
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    backgroundColor: "#000",
                    color: "white",
                    "& .MuiAccordionSummary-root": { color: "white" },
                    "& .MuiAccordionDetails-root": { color: "gray" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ControlPointIcon
                        sx={{ color: "white" }}
                        style={{ fontSize: 20 }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        padding: "10px 0px",
                        color: "white",
                      }}
                    >
                      {t("HomePage.accordion_2_title")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ fontSize: 14, color: "gray" }}>
                    {t("HomePage.accordion_2_description")}
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    backgroundColor: "#000",
                    color: "#000",
                    "& .MuiAccordionSummary-root": { color: "#000" },
                    "& .MuiAccordionDetails-root": { color: "gray" },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ControlPointIcon
                        sx={{ color: "white" }}
                        style={{ fontSize: 20 }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        padding: "10px 0px",
                        color: "white",
                      }}
                    >
                      {t("HomePage.accordion_3_title")}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ fontSize: 14, color: "gray" }}>
                    {t("HomePage.accordion_3_description")}
                  </AccordionDetails>
                </Accordion>
              </Box>
              {showPopup && (
                <Box
                  sx={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                  }}
                >
                  <Box
                    sx={{
                      background: "white",
                      borderRadius: "10px",
                      padding: "20px",
                      width: {
                        xs: "90%",
                        sm: "500px",
                      },
                      textAlign: "center",
                      position: "relative",
                      marginTop: {
                        xs: "-20%",
                        sm: "10px",
                      },
                    }}
                  >
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          padding: "5px",
                        }}
                      >
                        {t("HomePage.popup_notification_title")}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "16px",
                          padding: "10px",
                        }}
                      >
                        {t("StakingPage.wellcome")}
                      </Typography>
                      <Button
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "5px",
                          color: "black",
                          "&:hover": { background: "none" },
                        }}
                        onClick={() => setShowPopup(false)}
                      >
                        <CloseOutlined style={{ fontSize: "20px" }} />
                      </Button>
                    </>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </div>
      )}
    </div>
  );
}
