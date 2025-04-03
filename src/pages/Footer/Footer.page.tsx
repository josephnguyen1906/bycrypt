import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./Footer.css";
import { IconButton } from "@mui/material";
import { NewReleases, Newspaper, Telegram, YouTube } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { VisaIcon } from "@/shared/Svgs/Svg.component";
import { PaymentMenuFooter } from "@/datafake/Menu";

export default function FooterPage() {
  return (
    <footer>
      <div className="list-menu">
        <div className="menu-1">
          <Link
            href={"/"}
            prefetch={false}
            style={{
              textDecoration: "none",
              color: "#fff",
              fontFamily: "sans-serif",
              fontStyle: "italic",
            }}
          >
            {/* <Image
              src="/images/openart-1bd95ea5-a202-4491-b723-436d1d59311f.png"
              width={100}
              height={40}
              alt=""
            /> */}
            <h2>Reddy232</h2>
          </Link>
          <p>
            Reddy232 is the leading reputable bookmaker in the Americas. Game
            Vault offers online entertainment services with a wide range of
            products: Sports predictions, Virtual Sports, Number Game, Keno,
            Online Casino,...
          </p>
          <br />
          <p>
            Reddy232 is committed to the utmost confidentiality of your
            information. No secretion disclose and provide information to any
            third party. Protection policy This information applies to all
            participating members at Reddy232.
          </p>
        </div>
        <div className="menu-2">
          <h3>Contact</h3>
          <ul>
            <li>
              <Link href={"#"}>
                <Telegram /> Telegram support
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                {" "}
                <Newspaper />
                Blog
              </Link>
            </li>
            <li>
              <Link href={"#"}>
                <YouTube /> Youtube
              </Link>
            </li>
          </ul>
        </div>
        <div className="menu-3">
          <h3>Payment Partners</h3>
          <ul>
            {PaymentMenuFooter.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  style={{ height: "50px", alignItems: "center" }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="title-2">
        <p>Copyright © Reddy232 2010-2026 All rights reserved</p>
      </div>
    </footer>
  );
}
