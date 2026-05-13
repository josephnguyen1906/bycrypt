import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./Footer.css";
import { IconButton } from "@mui/material";
import { NewReleases, Newspaper, Telegram, YouTube } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  DiscordIcon,
  FacebookIcon,
  TeleIcon,
  TiktokIcon,
  VisaIcon,
  YoutubeIcon,
} from "@/shared/Svgs/Svg.component";

export default function FooterPage() {
  return (
    <>
      <footer
        style={{ backgroundColor: "#000", color: "#fff", paddingTop: "50px" }}
      >
        <div className="footer-icon">
          <Image src={"/images/logo.png"} width={50} height={50} alt="" />
          <p>©2017 - 2025 DOIUSDT</p>
        </div>
        <div
          className="menu-footer"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            padding: "0 20px",
          }}
        >
          <div>
            <h3>More about Staking</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="#">About us</Link>
              </li>
              <li>
                <Link href="/candidate-privacy-notice">
                  Candidate Privacy Notice
                </Link>
              </li>
              <li>
                <Link href="#">Careers</Link>
              </li>
              <li>
                <Link href="/#">Contact us</Link>
              </li>
              <li>
                <Link href="#">Terms of service</Link>
              </li>
              <li>
                <Link href="#">Privacy notice</Link>
              </li>
              <li>
                <Link href="#">Disclosures</Link>
              </li>
              <li>
                <Link href="#">Whistleblower notice</Link>
              </li>
              <li>
                <Link href="#">Law enforcement</Link>
              </li>
              <li>
                <Link href="#">DoiUSDT app</Link>
              </li>
              <li>
                <Link href="#">DoiUSDT TR</Link>
              </li>
              <li>
                <Link href="#">xBTC</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Products</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="#">Buy crypto</Link>
              </li>
              <li>
                <Link href="#">P2P trading</Link>
              </li>
              <li>
                <Link href="#">Convert</Link>
              </li>
              <li>
                <Link href="#">Trade</Link>
              </li>
              <li>
                <Link href="#">Earn</Link>
              </li>
              <li>
                <Link href="#">OKTC</Link>
              </li>
              <li>
                <Link href="#">Trading bots</Link>
              </li>
              <li>
                <Link href="#">All cryptocurrencies</Link>
              </li>
              <li>
                <Link href="#">Learn</Link>
              </li>
              <li>
                <Link href="#">TradingView</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="#">Affiliate</Link>
              </li>
              <li>
                <Link href="#">API</Link>
              </li>
              <li>
                <Link href="#">Historical market data</Link>
              </li>
              <li>
                <Link href="#">CEX fee schedule</Link>
              </li>
              <li>
                <Link href="#">Listing application</Link>
              </li>
              <li>
                <Link href="#">P2P Merchant application</Link>
              </li>
              <li>
                <Link href="#">Support</Link>
              </li>
              <li>
                <Link href="#">Support center</Link>
              </li>
              <li>
                <Link href="#">Channel verification</Link>
              </li>
              <li>
                <Link href="#">Announcements</Link>
              </li>
              <li>
                <Link href="#">Connect with Staking</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Buy crypto</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="#">Buy USDT</Link>
              </li>
              <li>
                <Link href="#">Buy USDC</Link>
              </li>
              <li>
                <Link href="#">Buy Bitcoin</Link>
              </li>
              <li>
                <Link href="#">Buy ADA</Link>
              </li>
              <li>
                <Link href="#">Buy Solana</Link>
              </li>
              <li>
                <Link href="#">Buy Litecoin</Link>
              </li>
              <li>
                <Link href="#">Buy XRP</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Trade</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Link href="#">BTC/USDC</Link>
              </li>
              <li>
                <Link href="#">ETH/USDC</Link>
              </li>
              <li>
                <Link href="#">BTC/USDT</Link>
              </li>
              <li>
                <Link href="#">ETH/USDT</Link>
              </li>
              <li>
                <Link href="#">LTC/USDT</Link>
              </li>
              <li>
                <Link href="#">SOL/USDT</Link>
              </li>
              <li>
                <Link href="#">XRP/USDT</Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="footer-icon-socal"
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "left",
            marginLeft: "250px",
            padding: "50px 0",
            alignItems: "center",
          }}
        >
          <h2>Community</h2>
          <ul
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
              marginLeft: "50px",
            }}
          >
            <li>
              <a href="#">
                <TiktokIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <TeleIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <DiscordIcon />
              </a>
            </li>
            <li>
              <a href="#">
                <YoutubeIcon />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
