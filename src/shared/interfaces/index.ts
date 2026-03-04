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

// export interface getListUserBank {

// }
