"use client";
import React, { useCallback, useState } from "react";
import "./Sidebar.css";
import Link from "next/link";
import Image from "next/image";
import {
  AgentIcon,
  ClaimIcon,
  DownloadAppIcon,
  EventIcon,
  HistoryIcon,
  InterestIcon,
  MissionIcon,
  NextIcon,
  RebateIcon,
  ReportIcon,
  SupportIcon,
  VIPIcon,
} from "@/shared/Svgs/Svg.component";
import { Icon, IconButton, Tooltip } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { MenuSupport } from "@/datafake/Menu";

export default function SidebarPage() {
  const [login, setLogin] = useState<boolean>(false);
  const handlePopupLogin = useCallback((isReload: boolean) => {
    if (isReload) {
      setLogin(false);
    }
  }, []);
  return (
    <div className="asider">
      <div className="sidebar">
        <nav>
          <ul className="menu-up">
            {MenuSupport.map((item) => (
              <li key={item.id}>
                <Link href={item.link}>
                  <Tooltip title={item.title} placement="right" color="white">
                    <IconButton>{item.icon}</IconButton>
                  </Tooltip>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
