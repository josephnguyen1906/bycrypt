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

        if (user && !hasShownPopup) {
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
            <h2>
              Join the all-in-one crypto app in <br /> Vietnam
            </h2>
            <h2>{t("HomePage.title")}</h2>
            <div className="send-mail">
              <input
                type="text"
                placeholder="Enter Email"
                style={{ color: "#fff" }}
              />
              <button type="button">Try Staking</button>
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
            <h2>Trade like a pro</h2>
            <p>
              Get the lowest fees, fastest transactions, powerful APIs, and more
            </p>
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
            <h2>With you every step of the way</h2>
            <p>
              From making your first crypto trade to becoming a seasoned trader,
              you’ll have us to guide you through the process. No question is
              too small. No sleepless nights. Have confidence in your crypto.
            </p>
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
              <h2>What is Staking?</h2>
              <p>
                Find out why we{"'"}re your new favorite crypto app with some
                help from our world-class partners
              </p>
              <button type="button">Find out</button>
            </div>
            <div className="what-is-right">
              <Image
                src="./images/DBDC29AD98D75479.webp"
                alt="what-is"
                width={400}
                height={400}
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
                  <p className="video-title">Coach Pep Guardiola</p>
                  <p className="video-desc">
                    Explains “crazy football formation”
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
                  <p className="video-title">Rewrite the system</p>
                  <p className="video-desc">Welcome to Web3</p>
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
                  <p className="video-title">Snowboarder Scotty James</p>
                  <p className="video-desc">Brings in the whole family</p>
                </div>
              </div>
            </section>
          </div>
          <div className="question">
            <h2>Questions? We’ve got answers.</h2>
            <Accordion
              sx={{
                backgroundColor: "#000",
                borderBottom: "1px solid #fff",
                color: "#fff",
                "& .MuiAccordionSummary-root": {
                  color: "#fff", // Đảm bảo tiêu đề có màu trắng
                },
                "& .MuiAccordionDetails-root": {
                  color: "gray", // Đảm bảo nội dung có màu trắng
                },
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
                  What products does Staking provide?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                Staking is an innovative cryptocurrency exchange with advanced
                financial offerings. We offer cutting-edge crypto trading and
                earning services to millions of users globally in more than 180
                regions. With Staking, you can: Trade a wide variety of tokens
                and trading pairs. Connect to the world-famous TradingView
                Platform and trade crypto directly with their supercharged
                charts.
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "#000",
                borderBottom: "1px solid #fff",
                color: "#fff",
                "& .MuiAccordionSummary-root": {
                  color: "#fff",
                },
                "& .MuiAccordionDetails-root": {
                  color: "gray",
                },
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
                  How do I buy Bitcoin and other cryptocurrencies on Staking?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                Easily buy Bitcoin within minutes with GBP, EUR, USD, or your
                local currency. Staking supports various popular payment
                methods, including Visa, Mastercard, and ApplePay credit cards.
                To get started, check out our latest guide on how to buy Bitcoin
                on Staking. Want to buy, sell, or hold other coins that are
                gaining traction in the crypto ecosystem? Kickstart your journey
                with Staking and explore prices and other information for
                cryptos such as Bitcoin (BTC), Ethereum (ETH) and more!
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: "#000",
                borderBottom: "1px solid #fff",
                color: "#fff",
                "& .MuiAccordionSummary-root": {
                  color: "#fff",
                },
                "& .MuiAccordionDetails-root": {
                  color: "gray",
                },
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
                  What is crypto?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                Cryptocurrency is a decentralized digital currency that operates
                on blockchain technology. Its key features include transparency,
                borderless transactions and immutability. Some of the most
                popular cryptocurrencies, by market capitalization, include
                Bitcoin, Ethereum, Tether, which can be traded on Staking.
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
                A New Alternative
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  padding: "10px 0",
                  textAlign: "center",
                  color: "white",
                }}
              >
                To your Cryto Jouney
              </Typography>
              <Box
                sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}
              >
                <img
                  src="/images/7889D86ACE77574B.png"
                  style={{
                    height: "350px",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  // position: "fixed",
                  // margin: "auto",
                  // bottom: "100px",
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
                    "&:hover": {
                      backgroundColor: "#909090",
                    },
                  }}
                  onClick={() => route.push("/login")}
                >
                  Login
                </Button>
                <Button
                  sx={{
                    width: "150px",
                    backgroundColor: "white",
                    color: "#000",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => route.push("/signup")}
                >
                  Sign Up
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
                  placeholder="🔥Newly listed USDG assets"
                  variant="standard" // hoặc "filled" tùy mục đích, để tránh border mặc định
                  InputProps={{
                    disableUnderline: true, // ẩn gạch chân nếu dùng "standard"
                  }}
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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  padding: "5px 20px",
                }}
              >
                <Box sx={{ width: "100%", textAlign: "left" }}>
                  <Typography sx={{ color: "#909090", padding: "5px 0" }}>
                    Estimated total value
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
                  <Typography sx={{ color: "#909090", padding: "5px 0" }}>
                    PNL today $0.00(0.00%)
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "auto",
                }}
              >
                <Button
                  href="/deposit"
                  sx={{
                    width: "45%",
                    height: "35px",
                    borderRadius: "15px",
                    background: "#bafc42",
                    color: "black",
                    textTransform: "capitalize",
                    "&:hover": {
                      background: "#bafc42",
                    },
                  }}
                >
                  Deposit USDT
                </Button>
                <Button
                  href="/withdraw"
                  sx={{
                    width: "45%",
                    height: "35px",
                    borderRadius: "15px",
                    background: "#bafc42",
                    textTransform: "capitalize",
                    color: "black",
                    "&:hover": {
                      background: "#bafc42",
                    },
                  }}
                >
                  withdraw
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
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "Center",
                    justifyItems: "center",
                    padding: "10px",
                  }}
                >
                  <CoinIcon fill="white" width="150px" height="100px" />
                  <Box>
                    <Typography
                      sx={{
                        color: "gray",
                        fontSize: "20px",
                        fontWeight: "550",
                      }}
                    >
                      Welcome Reward!
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "11px",
                        fontWeight: "500",
                      }}
                    >
                      Increase the number of Pi Coins by staking without limits
                      in the Staking section. Maximum profit up to 45%, act fast
                      or you might miss out.
                    </Typography>
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
                <h2 style={{ color: "white" }}>
                  Questions? We’ve got answers.
                </h2>
                <Accordion
                  sx={{
                    backgroundColor: "#000",
                    borderBottom: "1px solid gray",
                    color: "white",
                    "& .MuiAccordionSummary-root": {
                      color: "white", // Đảm bảo tiêu đề có màu trắng
                    },
                    "& .MuiAccordionDetails-root": {
                      color: "grwhiteay", // Đảm bảo nội dung có màu trắng
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ControlPointIcon
                        sx={{ color: "white" }}
                        style={{ fontSize: 40 }}
                      />
                    }
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        padding: "10px 0px",
                        color: "white",
                      }}
                    >
                      What products does Staking provide?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ fontSize: 18, color: "gray" }}>
                    Staking is an innovative cryptocurrency exchange with
                    advanced financial offerings. We offer cutting-edge crypto
                    trading and earning services to millions of users globally
                    in more than 180 regions. With Staking, you can: Trade a
                    wide variety of tokens and trading pairs. Connect to the
                    world-famous TradingView Platform and trade crypto directly
                    with their supercharged charts.
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    backgroundColor: "#000",
                    borderBottom: "1px solid #fff",
                    color: "white",
                    "& .MuiAccordionSummary-root": {
                      color: "white",
                    },
                    "& .MuiAccordionDetails-root": {
                      color: "gray",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ControlPointIcon
                        sx={{ color: "white" }}
                        style={{ fontSize: 40 }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        padding: "10px 0px",
                        color: "white",
                      }}
                    >
                      How do I buy Bitcoin and other cryptocurrencies on
                      Staking?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ fontSize: 18, color: "gray" }}>
                    Easily buy Bitcoin within minutes with GBP, EUR, USD, or
                    your local currency. Staking supports various popular
                    payment methods, including Visa, Mastercard, and ApplePay
                    credit cards. To get started, check out our latest guide on
                    how to buy Bitcoin on Staking. Want to buy, sell, or hold
                    other coins that are gaining traction in the crypto
                    ecosystem? Kickstart your journey with Staking and explore
                    prices and other information for cryptos such as Bitcoin
                    (BTC), Ethereum (ETH) and more!
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{
                    backgroundColor: "#000",
                    borderBottom: "1px solid gray",
                    color: "#000",
                    "& .MuiAccordionSummary-root": {
                      color: "#000",
                    },
                    "& .MuiAccordionDetails-root": {
                      color: "gray",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ControlPointIcon
                        sx={{ color: "white" }}
                        style={{ fontSize: 40 }}
                      />
                    }
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      sx={{
                        fontSize: "20px",
                        padding: "10px 0px",
                        color: "white",
                      }}
                    >
                      What is crypto?
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ fontSize: 18, color: "gray" }}>
                    Cryptocurrency is a decentralized digital currency that
                    operates on blockchain technology. Its key features include
                    transparency, borderless transactions and immutability. Some
                    of the most popular cryptocurrencies, by market
                    capitalization, include Bitcoin, Ethereum, Tether, which can
                    be traded on Staking.
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
                      width: "90%",
                      textAlign: "center",
                      position: "relative",
                      marginTop: "-20%",
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
                        Notification
                      </Typography>
                      <img
                        src={
                          websiteConfig.websildeb ||
                          "/images/photo_2025-06-18_15-01-46-removebg-preview.png"
                        }
                        style={{ width: "100%", borderRadius: "15px" }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: "18px",
                          padding: "5px",
                        }}
                      >
                        {(websiteConfig && websiteConfig?.checkin_notify) ||
                          "Welcome to Staking"}
                      </Typography>
                      <Button
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "5px",
                          color: "black",
                          "&:hover": {
                            background: "none",
                          },
                        }}
                        onClick={() => {
                          setShowPopup(false);
                        }}
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
