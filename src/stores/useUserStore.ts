import { create } from "zustand";
import { getMe } from "@/services/User.service";

interface UserState {
  user: IUser | null;
  loading: boolean;
  isLiveActive: boolean;
  setUser: (user: any) => void;
  setLiveActive: (status: boolean) => void;
  fetchUser: () => Promise<void>;
}
interface IUser {
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
interface ConfigState {
  config: any;
  loading: boolean;
  setConfig: (user: any) => void;
  fetchConfig: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  isLiveActive: false,
  setUser: (user) => set({ user }),
  setLiveActive: (status: boolean) => set({ isLiveActive: status }),
  fetchUser: async () => {
    set({ loading: true });
    try {
      const res: any = await getMe();
      if (res?.status) set({ user: res.data });
      else set({ user: null });
    } catch {
      set({ user: null });
      window.localStorage.removeItem("betRulesAccepted");
    } finally {
      set({ loading: false });
    }
  },
}));
