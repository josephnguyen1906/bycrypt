export interface userResponse {
  id: string;
  username: string;
  phone: string;
  money: string;
  cardzm: string;
  cardfm: string;
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
  stoptime: number;
  is_agent: number;
  kefu: number;
  trc: string;
  erc: string;
  eth: string;
  btc: string;
}

export interface Icoin {
  id: string;
  coinname: string;
  name: string;
  symbol: string;
  title: string;
}
