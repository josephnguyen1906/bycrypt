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
      <div className="info-footer">
        <Image src="/images/logo.svg" width={130} height={100} alt="" />
        <div className="info-title">
          <h2>
            DA88 - Nhà cái thể thao trực tuyến, Siêu chợ games đổi thưởng đỉnh
            cao
          </h2>
          <p>
            DA88 là trang cá cược thể thao hấp dẫn, cung cấp đa dạng về sản phẩm
            trò chơi như Thể Thao, Trò Chơi, Casino Trực Tuyến và thưởng hoàn
            trả cao nhất trên thị trường.
          </p>
        </div>
      </div>
      <div className="list-menu">
        <div className="menu-1">
          <h3>Thể thao</h3>
          <ul>
            <li>
              <Link href={"#"}>Lịch thi đấu</Link>
            </li>
            <li>
              <Link href={"#"}>Cược thể thao</Link>
            </li>
          </ul>
        </div>
        <div className="menu-1">
          <h3>Về chúng tôi</h3>
          <ul>
            <li>
              <Link href={"#"}>Giới thiệu</Link>
            </li>
            <li>
              <Link href={"#"}>Điều kiện - Điều khoản</Link>
            </li>
            <li>
              <Link href={"#"}>Bảo mật</Link>
            </li>
            <li>
              <Link href={"#"}>Chơi game có trách nhiệm</Link>
            </li>
            <li>
              <Link href={"#"}>Quy định chung</Link>
            </li>
          </ul>
        </div>
        <div className="menu-1">
          <h3>Trò chơi</h3>
          <ul>
            <li>
              <Link href={"#"}>Bắn cá</Link>
            </li>
            <li>
              <Link href={"#"}>Slots</Link>
            </li>
            <li>
              <Link href={"#"}>Nổ hũ</Link>
            </li>
            <li>
              <Link href={"#"}>Game bài</Link>
            </li>
            <li>
              <Link href={"#"}>Lô đề</Link>
            </li>
          </ul>
        </div>
        <div className="menu-1">
          <h3>Hỗ trợ 24/7</h3>
          <ul>
            <li>
              <Link href={"#"}>Trực tuyến 24/7</Link>
            </li>
            <li>
              <Link href={"#"}>Cộng đồng</Link>
            </li>
            <li>
              <Link href={"#"}>Hướng dẫn nạp rút</Link>
            </li>
          </ul>
        </div>
        <div className="menu-1">
          <h3>Thông tin</h3>
          <ul>
            <li>
              <Link href={"#"}>Khuyến mãi / Sự kiện</Link>
            </li>
            <li>
              <Link href={"#"}>Tin tức</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="title-2">
        <p>Copyright © 2024 Powered By DA88 All Rights Reserved.</p>
        <div className="title-img2">
          <Image
            src={"/images/copyright-logo.png"}
            alt=""
            width={120}
            height={30}
          />
          <Image
            src={"/images/DMCA_logo-grn-btn100w.png"}
            alt=""
            width={100}
            height={30}
          />
        </div>
      </div>
    </footer>
  );
}
