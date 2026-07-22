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
  ui_locale?: string;
  phone: string;
  cccd: string;
  fullname: string;
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  country: string;
  phonenumber: string;
  loan: string;
  img_loan: string;
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
  trade_locked?: number;
  trade_lock_msg?: string | null;
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
  kjtitle: string;
  title: string;
  allnum: number;
  sellnum: number;
  synum: number;
  outnum: number;
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

export interface IMyStaking {
  id: number;
  pid: number;
  uid: number;
  account: string;
  name: string;
  num: string;
  open: number;
  percent: string;
  addtime: Date;
  endtime: Date;
  endday: Date;
  status: number;
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

export interface IDepositMethod {
  id: number;
  name: string;
  wallet: string;
  address: string;
  qrcode_url: string;
  coin: string;
  status: number;
}

export interface IFinaceBalace {
  id: number;
  name: string;
  title: string;
  balance: {
    available: string;
    freeze: string;
    total: string;
  };
  deposit_network: string;
  addresss: string;
  deposit_status: number;
  deposit_min: number;
  withdraw_status: number;
  withdraw_min: number;
  withdraw_max: number;
  bank: number;
}

export interface IWithdrawHistory {
  id: number;
  userid: number;
  username: string;
  wallet: string;
  coinname: string;
  txid: string;
  num: string;
  fee: string;
  mum: string;
  address: string;
  sort: number;
  addtime: Date;
  endtime: Date;
  st: number;
  status: number;
  to_user: number;
  admin_view: number;
}

export interface ITranferHistory {
  id: number;
  userid: number;
  username: string;
  coinid: number;
  coinname: string;
  amount: string;
  from: string;
  to: string;
  addtime: Date;
  status: number;
}

export interface IHistoryOpen {
  id: number;
  uid: number;
  username: string;
  num: number;
  hybl: number;
  hyzd: number;
  coinname: string;
  status: number;
  is_win: number;
  buytime: Date;
  selltime: Date;
  intselltime: number;
  buyprice: string;
  sellprice: string;
  ploss: string;
  time: number;
  kongyk: number;
  invit: string;
  tznum: number;
}
export interface IHistoryClose {
  id: number;
  uid: number;
  username: string;
  num: number;
  hybl: number;
  hyzd: number;
  coinname: string;
  status: number;
  is_win: number;
  buytime: Date;
  selltime: Date;
  intselltime: number;
  buyprice: string;
  sellprice: string;
  ploss: string;
  time: number;
  kongyk: number;
  invit: string;
  tznum: number;
}

export interface IMyOrepool {
  id: number;
  kid: number;
  sharbltxt: null;
  type: number;
  sharebl: null;
  uid: number;
  username: string;
  kjtitle: string;
  imgs: string;
  status: number;
  cycle: number;
  synum: number;
  outtype: number;
  outcoin: string;
  outnum: string;
  outusdt: string;
  djout: number;
  djnum: number;
  addtime: Date;
  endtime: Date;
  intaddtime: number;
  intendtime: number;
  last_earning_at: Date;
}
