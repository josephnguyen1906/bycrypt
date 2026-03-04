import { create } from "zustand";
import { getMe } from "@/services/User.service";
import { IUser } from "@/shared/interfaces";

interface UserState {
  user: IUser | null;
  loading: boolean;
  isLiveActive: boolean;
  setUser: (user: any) => void;
  setLiveActive: (status: boolean) => void;
  fetchUser: () => Promise<void>;
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
