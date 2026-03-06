export interface IStatistical {
  user_count: number;
  banner_count: number;
  support_count: number;
  noti_count: number;
  money_count: number;
}

export interface IResponse {
  message: string;
  status: number;
  success: boolean;
  data: any;
}

export interface INotification {
  id: string;
  title?: string;
  describe?: string;
  url_img: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ISupport {
  id: string;
  link?: string;
  phone?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ICheckout {
  id: string;
  id_user: string;
  money: number;
  describe: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IWallet {
  id: string;
  user_id: string;
  money: number;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  id: string;
  username: string;
  phone: string;
  cccd: string;
  fullname: string;
  cardzm: string;
  cardfm: string;
  rzstatus: number;
  level: number;
  invit_1: number;
  invit_2: number;
  invit_3: number;
  path: string;
  logins: number;
  addip: string;
  addr: string;
  addtime: number;
  endtime: number;
  lgtime: Date;
  loginip: string;
  loginaddr: string;
  logintime: Date;
  rztime: number;
  rzuptime: number;
  status: number;
  wdstatus: number;
  txstate: number;
  invit: string;
  stoptime: number;
  is_agent: number;
  kefu: number;
  bank_name: string;
  bank_acc_no: string;
  bank_acc_name: string;
  wallet: string;
  money: string;
  balance: {
    usdt: string;
    usdt_d: string;
    usdt_total: string;
    pi: string;
    pi_d: string;
    pi_total: string;
  };
}

export interface IProfile {
  avatar: string;
  name: string;
  email: string;
}
export interface IBannerImg {
  id: string;
  url_img: string;
  created_at: string;
  updated_at: string;
}

export interface IClientStoreSide {
  getStore(key: string): any;
  setStore<T>(key: string, value: T, options?: { expires: number }): void;
}

export interface IOrepool {
  overview: IOrepoolIterm[];
  exclusive: IOrepoolIterm[];
  shared: IOrepoolIterm[];
  mylist: IOrepoolIterm[];
  webkj: string;
}

export interface IOrepoolIterm {
  id: number;
  title: string;
  allnum: number;
  sellnum: number;
  pricecoin: string;
  cycle: number;
  suanl: number;
  type: number;
  rtype: number;
  sharebl: string;
  sharecode: string;
  content: string;
  imgs: string;
  outtype: number;
  dayoutnum: string;
  outcoin: string;
  pricenum: string;
  ycnum: number;
  jlnum: string;
  jlcoin: string;
  buyask: number;
  asknum: number;
  djout: number;
  djday: number;
  status: number;
  buymax: number;
  addtime: Date;
}

export interface IStaking {
  id: number;
  name: string;
  min: string;
  max: string;
  open: number;
  percent: number;
  imgs: string;
  content: string;
  addtime: Date;
  status: number;
  state: number;
}

export interface IHistoryExchange {
  id: number;
  from_amount: string;
  from_coin: string;
  from_rate_usdt: string;
  to_amount: string;
  to_coin: string;
  to_rate_usdt: string;
  username: string;
  userid: number;
  status: number;
  addtime: Date;
}
