import {
  CasinoCardsIcon,
  CasinoIcon,
  ChickenIcon,
  FishIcon,
  GameIcon,
  HomeMobileIcon,
  LottoIcon,
  MasterCardIcon,
  MoneybagIcon,
  MonyExchangeIcon,
  SlotsIcon,
  SpinsIcon,
  SportIcon,
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
    link: "/",
    title: "Home",
  },
  {
    id: "2",
    link: "/sport",
    title: "Sport",
  },
  {
    id: "3",
    link: "/livecasino",
    title: "Live Casino",
  },
  {
    id: "4",
    link: "/gamecasio",
    title: "Card Games",
  },
  {
    id: "5",
    link: "/slots",
    title: "Slots",
  },
  {
    id: "6",
    link: "/fish",
    title: "Fish",
  },
  {
    id: "7",
    link: "/chicken",
    title: "Chicken Fight",
  },
  {
    id: "8",
    link: "/lotto",
    title: "Lotto",
  },
  {
    id: "9",
    link: "/event",
    title: "Event",
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
    icon: <Telegram fontSize="small" sx={{ color: "white" }} />,
  },
  {
    id: "2",
    title: "Support",
    link: "tel:14699013597",
    icon: <SupportAgent fontSize="small" sx={{ color: "white" }} />,
  },
  // {
  //   id: "3",
  //   title: "Youtube",
  //   link: "#",
  //   icon: <YouTube fontSize="small" sx={{ color: "white" }} />,
  // },
  {
    id: "4",
    title: "Facebook",
    link: "https://www.facebook.com/profile.php?id=61570404908772",
    icon: <Facebook fontSize="small" sx={{ color: "white" }} />,
  },
  {
    id: "5",
    title: "Message",
    link: "https://m.me/61570404908772",
    icon: <Message fontSize="small" sx={{ color: "white" }} />,
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

export const GameSlotsMenu = [
  {
    id: "1",
    icon: <Image src={"/images/jili.png"} width={40} height={40} alt="" />,
    title: "JILI ",
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
    id: "13",
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
    icon: <Image src={"/images/r88.png"} width={40} height={40} alt="" />,
    title: "R88 ",
    productType: "R88",
    gameType: "RNG",
  },
  // {
  //   id: "7",
  //   icon: <Image src={"/images/jdb.png"} width={40} height={40} alt="" />,
  //   title: "JDB ",
  //   productType: "JDB",
  //   gameType: "RNG",
  // },
];
