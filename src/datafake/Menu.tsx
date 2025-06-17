import {
  CasinoCardsIcon,
  CasinoIcon,
  ChickenIcon,
  CommandfrozenIcon,
  CpuStartIcon,
  CpuStopIcon,
  ExperimentIcon,
  FishIcon,
  FishMenuIcon,
  GameCasinoMenuIcon,
  GameFastMenuIcon,
  GameIcon,
  GiftMenuIcon,
  HistoryIcon,
  HistoryMenuIcon,
  HomeMobileIcon,
  InvoiceMenuIcon,
  LiveChatMenuIcon,
  LoDeMenuIcon,
  LogoutMenuIcon,
  LottoIcon,
  MasterCardIcon,
  MoneybagIcon,
  MonyExchangeIcon,
  NapIcon,
  NotCommandfrozenIcon,
  OverviewIcon,
  P2PMenuIcon,
  ProfileIcon,
  QuaySoMenuIcon,
  RutIcon,
  SlotMenuIcon,
  SlotsIcon,
  SpinsIcon,
  SportIcon,
  TableGameMenuIcon,
  TabletGameIcon,
  TradeIcon,
  USDTIcon,
  VisaIcon,
} from "@/shared/Svgs/Svg.component";
import {
  Facebook,
  Message,
  SupportAgent,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import { link } from "fs";
import Image from "next/image";
export const MenuAset = [
  {
    id: "1",
    link: "#",
    title: "Asset",
    item: [
      {
        id: "1",
        link: "/history",
        title: "History",
        icon: <HistoryIcon />,
      },
      // {
      //   id: "2",
      //   link: "#",
      //   title: "Experiment",
      //   icon: <ExperimentIcon />,
      // },
      {
        id: "3",
        link: "/opencommand",
        title: "Open command",
        icon: <TradeIcon />,
      },
      {
        id: "4",
        link: "/closecommand",
        title: "Close command",
        icon: <TradeIcon />,
      },
      {
        id: "5",
        link: "/excavatoroperating",
        title: "Excavator operating",
        icon: <CpuStartIcon />,
      },
      {
        id: "6",
        link: "/excavatorexpired",
        title: "Excavator expired",
        icon: <CpuStopIcon />,
      },
      {
        id: "7",
        link: "/frozenCommand",
        title: "Frozen Command",
        icon: <CommandfrozenIcon />,
      },
      {
        id: "8",
        link: "/frozenyet",
        title: "Not frozen yet Command",
        icon: <NotCommandfrozenIcon />,
      },
    ],
  },
];
export const MenuWebsite = [
  {
    id: "1",
    link: "/asset",
    title: "Buy & Sell",
    item: [
      {
        id: "1",
        link: "#",
        title: "Buy & Sell Crypto",
        note: "Buying and selling without transaction fees through more than 100 payment methods.",
        icon: <P2PMenuIcon />,
      },
    ],
  },
  {
    id: "2",
    link: "/buysell",
    title: "Discover",
    item: [
      {
        id: "1",
        link: "#",
        title: "Markets",
        note: "View the latest market trends and prices, volume, and data.",
        icon: <P2PMenuIcon />,
      },
      {
        id: "2",
        link: "#",
        title: "Opportunities",
        note: "Discover hot and new crypto",
        icon: <P2PMenuIcon />,
      },
    ],
  },
  // {
  //   id: "3",
  //   link: "#",
  //   title: "IDO Launchpad",
  //   item: [],
  // },
  {
    id: "4",
    link: "/excavator",
    title: "Excavator",
    item: [
      {
        id: "1",
        link: "#",
        title: "Earn",
        note: "Don't just hold earn.",
        icon: <P2PMenuIcon />,
      },
      {
        id: "2",
        link: "#",
        title: "Loan",
        note: "Borrow to earn, borrow to spend",
        icon: <P2PMenuIcon />,
      },
      {
        id: "3",
        link: "#",
        title: "Jumpstart",
        note: "Discover new, hight-quality project around the world.",
        icon: <P2PMenuIcon />,
      },
    ],
  },
  {
    id: "5",
    link: "/trade",
    title: "Trade",
    item: [
      {
        id: "1",
        link: "#",
        title: "Convert",
        note: "Quick convertion, zero tranding fees, and no hidden costs.",
        icon: <P2PMenuIcon />,
      },
      {
        id: "2",
        link: "#",
        title: "Spot",
        note: "Buy and sell crypto with ease",
        icon: <P2PMenuIcon />,
      },
      {
        id: "3",
        link: "#",
        title: "Futures",
        note: "Trade perpetual futures and expiry futures with leverage.",
        icon: <P2PMenuIcon />,
      },
      {
        id: "4",
        link: "#",
        title: "Options",
        note: "Capitalize on market volatility with options trading.",
        icon: <P2PMenuIcon />,
      },
      {
        id: "3",
        link: "#",
        title: "Fre-market Futures",
        note: "Get early access to new futures contracts before they are listed on the exchange.",
        icon: <P2PMenuIcon />,
      },
    ],
  },
  // {
  //   id: "6",
  //   link: "#",
  //   title: "Notification",
  //   item: [],
  // },
];

export const MenuMobile = [
  {
    id: "1",
    link: "/",
    title: "Home",
    icon: <HomeMobileIcon width="20px" height="20px" className="icon-header" />,
  },
  {
    id: "2",
    link: "/sport",
    title: "Sport",
    icon: <SportIcon width="20px" height="20px" className="icon-header" />,
  },
  {
    id: "3",
    link: "/livecasino",
    title: "Live Casino",
    icon: (
      <CasinoIcon
        fill="#fff"
        width="20px"
        height="20px"
        className="icon-header"
      />
    ),
  },
  {
    id: "4",
    link: "/gamecasio",
    title: "Card Games",
    icon: (
      <CasinoCardsIcon width="20px" height="20px" className="icon-header" />
    ),
  },
  {
    id: "5",
    link: "/slots",
    title: "Slots",
    icon: <SlotsIcon width="20px" height="20px" className="icon-header" />,
  },

  {
    id: "6",
    link: "/fish",
    title: "Fish",
    icon: <FishIcon width="20px" height="20px" className="icon-header" />,
  },
  {
    id: "7",
    link: "/lotto",
    title: "Lotto",
    icon: <LottoIcon width="20px" height="20px" className="icon-header" />,
  },
  {
    id: "8",
    link: "/chicken",
    title: "Chicken Fight",
    icon: <ChickenIcon width="20px" height="20px" className="icon-header" />,
  },
];

export const MenuSupport = [
  {
    id: "1",
    title: "Telegram",
    link: "https://t.me/HitJuwa",
    icon: "/images/icon-telegram.webp",
  },
  {
    id: "2",
    title: "Phone",
    link: "tel:14699013597",
    icon: "/images/icon-phone.webp",
  },
  {
    id: "3",
    title: "Youtube",
    link: "#",
    icon: "/images/icon-community.webp",
  },
  {
    id: "4",
    title: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61570404908772",
    icon: "/images/icon-fb.webp",
  },
  {
    id: "5",
    title: "Chat",
    link: "",
    icon: "/images/icon-livechat.webp",
  },
];

export const menuItems = [
  {
    text: "Overview",
    icon: <OverviewIcon />,
    link: "/overview",
  },
  {
    text: "Account",
    icon: <ProfileIcon />,
    link: "/profile",
  },
  {
    text: "Security",
    icon: <NapIcon />,
    link: "/security",
  },
  {
    text: "Verified",
    icon: <RutIcon />,
    link: "/verified",
  },
  {
    text: "Referral",
    icon: <GiftMenuIcon />,
    link: "/referral",
  },

  {
    text: "Live chat 24/7",
    icon: <LiveChatMenuIcon />,
    link: "/livechat",
  },
  {
    text: "My invoice",
    icon: <InvoiceMenuIcon />,
    link: "/bill",
  },
  {
    text: "Log out",
    icon: <LogoutMenuIcon />,
    link: "/logout",
  },
];
export const menuItemMobile = [
  {
    text: "Overview",
    icon: <OverviewIcon />,
    link: "/overview",
  },
  {
    text: "Account",
    icon: <ProfileIcon />,
    link: "/profile",
  },
  {
    text: "Security",
    icon: <NapIcon />,
    link: "/security",
  },
  {
    text: "Verified",
    icon: <RutIcon />,
    link: "/verified",
  },
  {
    text: "Referral",
    icon: <GiftMenuIcon />,
    link: "/referral",
  },

  {
    text: "Live chat 24/7",
    icon: <LiveChatMenuIcon />,
    link: "/livechat",
  },
  {
    text: "My invoice",
    icon: <InvoiceMenuIcon />,
    link: "/bill",
  },
];

export const menuItemMobile2 = [
  {
    text: "Overview",
    icon: <OverviewIcon fill="#fff" />,
    link: "/overview",
  },
  {
    text: "Account",
    icon: <ProfileIcon fill="#fff" />,
    link: "/profile",
  },
  {
    text: "Security",
    icon: <NapIcon fill="#fff" />,
    link: "/security",
  },
  {
    text: "Verified",
    icon: <RutIcon fill="#fff" />,
    link: "/verified",
  },
  {
    text: "Referral",
    icon: <GiftMenuIcon fill="#fff" />,
    link: "/referral",
  },

  {
    text: "Live chat 24/7",
    icon: <LiveChatMenuIcon fill="#fff" />,
    link: "/livechat",
  },
  {
    text: "My invoice",
    icon: <InvoiceMenuIcon fill="#fff" />,
    link: "/bill",
  },
];
export const MenuAset2 = [
  {
    id: "1",
    link: "/history",
    title: "History",
    icon: <HistoryIcon fill="#fff" />,
  },
  // {
  //   id: "2",
  //   link: "#",
  //   title: "Experiment",
  //   icon: <ExperimentIcon fill="#fff" />,
  // },
  {
    id: "3",
    link: "/opencommand",
    title: "Open command",
    icon: <TradeIcon fill="#fff" />,
  },
  {
    id: "4",
    link: "/closecommand",
    title: "Close command",
    icon: <TradeIcon fill="#fff" />,
  },
  {
    id: "5",
    link: "/excavatoroperating",
    title: "Excavator operating",
    icon: <CpuStartIcon fill="#fff" />,
  },
  {
    id: "6",
    link: "/excavatorexpired",
    title: "Excavator expired",
    icon: <CpuStopIcon fill="#fff" />,
  },
  {
    id: "7",
    link: "/frozenCommand",
    title: "Frozen Command",
    icon: <CommandfrozenIcon fill="#fff" />,
  },
  {
    id: "8",
    link: "/frozenyet",
    title: "Not frozen yet Command",
    icon: <NotCommandfrozenIcon fill="#fff" />,
  },
];
