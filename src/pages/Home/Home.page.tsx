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
  Button,
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
const responsiveSettings = [
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
];

export default function HomePage() {
  const [isFixed, setIsFixed] = useState(false);
  const route = useRouter();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;
  //     const isNearBottom = scrollPosition > documentHeight - windowHeight - 800;
  //     setIsFixed(scrollPosition > 300 && !isNearBottom);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="home">
      <div className="home-webiste">
        <div className="home-join">
          <div className="home-join-left">
            <h2>
              Join the all-in-one crypto app in <br /> Vietnam
            </h2>

            <div className="send-mail">
              <input
                type="text"
                placeholder="Enter Email"
                style={{ color: "#fff" }}
              />
              <button type="button">Try OKX</button>
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
              <h2>What is OKX?</h2>
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
                  What products does OKX provide?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                OKX is an innovative cryptocurrency exchange with advanced
                financial offerings. We offer cutting-edge crypto trading and
                earning services to millions of users globally in more than 180
                regions. With OKX, you can: Trade a wide variety of tokens and
                trading pairs. Connect to the world-famous TradingView Platform
                and trade crypto directly with their supercharged charts.
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
                  How do I buy Bitcoin and other cryptocurrencies on OKX?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ fontSize: 28, color: "gray" }}>
                Easily buy Bitcoin within minutes with GBP, EUR, USD, or your
                local currency. OKX supports various popular payment methods,
                including Visa, Mastercard, and ApplePay credit cards. To get
                started, check out our latest guide on how to buy Bitcoin on
                OKX. Want to buy, sell, or hold other coins that are gaining
                traction in the crypto ecosystem? Kickstart your journey with
                OKX and explore prices and other information for cryptos such as
                Bitcoin (BTC), Ethereum (ETH) and more!
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
                Bitcoin, Ethereum, Tether, which can be traded on OKX.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
