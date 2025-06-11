import {
  CasinoCardsIcon,
  CasinoIcon,
  ChickenIcon,
  FishIcon,
  FishMenuIcon,
  GameCasinoMenuIcon,
  GameFastMenuIcon,
  GameIcon,
  HomeMobileIcon,
  LoDeMenuIcon,
  LottoIcon,
  MasterCardIcon,
  MoneybagIcon,
  MonyExchangeIcon,
  P2PMenuIcon,
  QuaySoMenuIcon,
  SlotMenuIcon,
  SlotsIcon,
  SpinsIcon,
  SportIcon,
  TableGameMenuIcon,
  TabletGameIcon,
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
import Image from "next/image";

export const MenuWebsite = [
  {
    id: "1",
    link: "/trade",
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
    link: "/discover",
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
  {
    id: "3",
    link: "#",
    title: "IDO Launchpad",
    item: [],
  },
  {
    id: "4",
    link: "#",
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
    link: "#",
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

export const PaymentMenuFooter = [
  {
    id: "1",
    icon: <VisaIcon width="25px" height="25px" />,
    title: "Visa",
    link: "#",
  },
  {
    id: "2",
    icon: <MasterCardIcon width="25px" height="25px" />,
    title: "MasterCard",
    link: "#",
  },
  {
    id: "3",
    icon: <USDTIcon width="25px" height="25px" />,
    title: "USDT",
    link: "#",
  },
];

export const ListMenu = [
  {
    id: "1",
    icon: <TableGameMenuIcon />,
    title: "Table Games ",
    link: "/tablegame",
  },
  {
    id: "2",
    icon: <SlotMenuIcon />,
    title: "Slots ",
    link: "/slots",
  },
  {
    id: "3",
    icon: <GameCasinoMenuIcon />,
    title: "Game Bài ",
    link: "/gamecasio",
  },
  {
    id: "4",
    icon: <FishMenuIcon />,
    title: "Bắn Cá ",
    link: "/fish",
  },
  {
    id: "5",
    icon: <GameFastMenuIcon />,
    title: "Game Nhanh ",
    link: "/gamesfast",
  },
  {
    id: "6",
    icon: <LoDeMenuIcon />,
    title: "Lô Đề ",
    link: "/lotto",
  },
  {
    id: "7",
    icon: <QuaySoMenuIcon />,
    title: "Quay Số ",
    link: "/spins",
  },
];

export const GameSlotsMenu = [
  {
    id: "1",
    icon: (
      <Image
        src={"/images/icon-all-mb.webp"}
        width={40}
        height={40}
        alt=""
        style={{ width: "25px" }}
      />
    ),
    title: "Tất cả ",
    productType: "JL",
    gameType: "RNG",
  },
  {
    id: "2",
    icon: <Image src={"/images/cq9.png"} width={40} height={40} alt="" />,
    title: "CQ9 ",
    productType: "CQ9",
    gameType: "RNG",
  },
  {
    id: "3",
    icon: <Image src={"/images/pg.png"} width={40} height={40} alt="" />,
    title: "PG ",
    productType: "PG",
    gameType: "RNG",
  },
  {
    id: "4",
    icon: <Image src={"/images/fc.png"} width={40} height={40} alt="" />,
    title: "FC ",
    productType: "FC",
    gameType: "RNG",
  },
  {
    id: "5",
    icon: <Image src={"/images/ka.png"} width={40} height={40} alt="" />,
    title: "KA ",
    productType: "KA",
    gameType: "RNG",
  },
  {
    id: "6",
    icon: <Image src={"/images/jili.png"} width={40} height={40} alt="" />,
    title: "JILI ",
    productType: "JL",
    gameType: "RNG",
  },
  {
    id: "7",
    icon: <Image src={"/images/jdb.png"} width={40} height={40} alt="" />,
    title: "JDB ",
    productType: "JDB",
    gameType: "RNG",
  },
];
