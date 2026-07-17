import {
  AccountMenu1Icon,
  AccountMenu2Icon,
  AccountMenu3Icon,
  AccountMenu4Icon,
  AssetsIcon,
  CalendarIcon,
  CasinoCardsIcon,
  CasinoIcon,
  ChickenIcon,
  CoinIcon,
  CommandfrozenIcon,
  CpuStartIcon,
  CpuStopIcon,
  ExperimentIcon,
  FishIcon,
  GiftMenuIcon,
  HistoryIcon,
  HistoryMenuIcon,
  HomeMobileIcon,
  InvoiceMenuIcon,
  LiveChatMenuIcon,
  LoDeMenuIcon,
  LogoutMenuIcon,
  LottoIcon,
  MarketIcon,
  NapIcon,
  NotCommandfrozenIcon,
  OverviewIcon,
  P2PMenuIcon,
  ProfileIcon,
  QuaySoMenuIcon,
  RutIcon,
  SafeBoxIcon,
  SafeIcon,
  SlotsIcon,
  SportIcon,
  TradeIcon,
} from "@/shared/Svgs/Svg.component";
export const MenuAset = [
  {
    id: "1",
    link: "#",
    title: "Asset",
    item: [
      {
        id: 0,
        link: "/safevnd",
        title: "Open command",
        icon: <SafeBoxIcon width="30px" height="30px" fill="black" />,
      },
      {
        id: 1,
        link: "/safeusdt",
        title: "Close command",
        icon: <SafeBoxIcon width="30px" height="30px" fill="black" />,
      },
      // {
      //   id: 2,
      //   link: "/excavatoroperating",
      //   title: "Mining activity",
      //   icon: <CpuStartIcon />,
      // },
      // {
      //   id: 3,
      //   link: "/excavatorexpired",
      //   title: "Mining expired",
      //   icon: <CpuStopIcon />,
      // },
      // {
      //   id: 4,
      //   link: "/mystaking",
      //   title: "My Staking",
      //   icon: <ExperimentIcon fill="#000" />,
      // },
      // {
      //   id: 5,
      //   link: "/dailyrewards",
      //   title: "Daily Rewards",
      //   icon: <CalendarIcon fill="#000" />,
      // },
    ],
  },
];
export const MenuWebsite = [
  {
    id: "1",
    link: "/",
    title: "menu1",
    item: [],
  },
  {
    id: "2",
    link: "/trade",
    title: "menu2",
    item: [],
  },
  {
    id: "3",
    link: "/market",
    title: "menu3",
    item: [],
  },
  {
    id: "4",
    link: "/excavator",
    title: "menu4",
    item: [],
  },
  {
    id: "5",
    link: "/news",
    title: "menu5",
    item: [],
  },
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
    text: "Referral",
    icon: <GiftMenuIcon />,
    link: "/referral",
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
    text: "Referral",
    icon: <GiftMenuIcon />,
    link: "/referral",
  },

  // {
  //   text: "Live chat 24/7",
  //   icon: <LiveChatMenuIcon />,
  //   link: "#",
  // },
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
    text: "Referral",
    icon: <GiftMenuIcon fill="#fff" />,
    link: "/referral",
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
    link: "/safevnd",
    title: "History",
    icon: <SafeBoxIcon width="26px" height="26px" fill="#fff" />,
  },
  {
    id: "2",
    link: "/safeusdt",
    title: "My Staking",
    icon: <SafeBoxIcon width="26px" height="26px" fill="#fff" />,
  },
];

export const MenuAccount = [
  { id: 1, icon: <AccountMenu1Icon />, name: "AccountPage.menuTab1" },
  { id: 2, icon: <AccountMenu2Icon />, name: "AccountPage.menuTab2" },
  { id: 3, icon: <AccountMenu3Icon />, name: "AccountPage.menuTab3" },
  { id: 4, icon: <AccountMenu4Icon />, name: "AccountPage.menuTab4" },
];
