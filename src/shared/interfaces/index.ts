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
  money: string;
  cardzm: string;
  cardfm: string;
  bank_qr: string;
  rzstatus: number;
  level: number;
  invit_1: number;
  invit_2: number;
  invit_3: number;
  logins: number;
  addip: string;
  addr: string;
  path: string;
  loginip: string;
  endtime: number;
  rztime: number;
  rzuptime: number;
  lgtime: Date;
  status: number;
  txstate: number;
  invit: string;
  bank_name: string;
  bank_acc_no: string;
  bank_acc_name: string;
  wallet: string;
  stoptime: number;
  is_agent: number;
  wdstatus: number;
  kefu: number;
  trc: string;
  erc: string;
  eth: string;
  btc: string;
  balance: {
    usdt: string;
    vnd: string;
  };
  TRC20: {
    wallet: string;
    wallet_qr: string;
  };
  BEP20: {
    wallet: string;
    wallet_qr: string;
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

// export interface getListUserBank {

// }
