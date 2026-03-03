import { authInstance, contentInstance } from "@/configs/CustomizeAxios";

// đăng nhập
const loginUser = (formData: FormData) => {
  return authInstance.post("/api/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Đăng ký
const signupUser = (formData: FormData) => {
  return authInstance.post("/api/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Đăng ký
const sendCode = (formData: FormData) => {
  return authInstance.post("/api/send-verification-code", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getMe = () => {
  return contentInstance.get("/api/user/me");
};

// Cập nhập mật khẩu tài khoản
const updatePassword = (
  old_password: string,
  new_password: string,
  new_password_confirmation: string,
) => {
  return contentInstance.post(`/api/user/change-password`, {
    old_password,
    new_password,
    new_password_confirmation,
  });
};
const updatePaymentPassword = (formData: FormData) => {
  return contentInstance.post(`/api/user/change-paypassword`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const verifiUser = (formData: FormData) => {
  return contentInstance.post("/api/user/verify-account", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const topUpCoins = (formData: FormData) => {
  return contentInstance.post("/api/finance/deposit", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const sellCoins = (formData: FormData) => {
  return contentInstance.post("/api/finance/withdraw", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createOrder = (formData: FormData) => {
  return contentInstance.post("/api/contract/create-order", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateBank = (formData: FormData) => {
  return contentInstance.post("/api/user/update-bank", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const buyMining = (formData: FormData) => {
  return contentInstance.post("/api/orepool/buy-mining-machine", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const buySubscribe = (formData: FormData) => {
  return contentInstance.post("/api/issue/subscribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Cập nhập mật khẩu tài khoản
const getReferral = () => {
  return contentInstance.get(`/api/user/referral`);
};

const getOrepool = () => {
  return contentInstance.get("/api/orepool");
};

const getNotification = () => {
  return contentInstance.get("/api/user/notices");
};

const getBills = () => {
  return contentInstance.get("/api/user/bills");
};

const getMyWallet = () => {
  return contentInstance.get("/api/finance/balance");
};

const getWebsiteConfig = () => {
  return contentInstance.get("/api/config");
};
const getListCoin = () => {
  return contentInstance.get("/api/contract/coin");
};
const getBuySellConfig = () => {
  return contentInstance.get("/api/contract/settings");
};
const getStaking = () => {
  return contentInstance.get("/api/issue/list");
};
const getBbhistoryorder = () => {
  return contentInstance.get("/api/trade/bbhistoryorder");
};
const getContractpc = () => {
  return contentInstance.get("/api/contract/contractpc");
};
const getContractjc = () => {
  return contentInstance.get("/api/contract/contractjc");
};
const getNormalmin = () => {
  return contentInstance.get("/api/orepool/normalmin");
};
const getOverduemin = () => {
  return contentInstance.get("/api/orepool/overduemin");
};
const getNormalissue = () => {
  return contentInstance.get("/api/issue/normalissue");
};
const getOverdueissue = () => {
  return contentInstance.get("/api/issue/overdueissue");
};
const getMyStaking = () => {
  return contentInstance.get("/api/issue/me");
};
const getOrderResult = (id: number) => {
  return contentInstance.get("/api/contract/check-order?id=" + id);
};
const fetchCheckinData = () => {
  return contentInstance.get("/api/checkin/history");
};

const postDaily = () => {
  return contentInstance.post(`/api/checkin`);
};
const getProgressContract = () => {
  return contentInstance.get("/api/contract/progress-contract");
};
const getNotiDetail = (id: string) => {
  return contentInstance.get("/api/user/notices/" + id);
};
const getSafeActive = (id: string, status?: string | null) => {
  const url = `/api/orepool/working?coin=${id}${
    status ? `&status=${status}` : ""
  }`;
  return contentInstance.get(url);
};

const getDepositHistory = () => {
  return contentInstance.get("/api/finance/deposit/history");
};
const getWithdrawHistory = () => {
  return contentInstance.get("/api/finance/withdraw/history");
};
const seeAllNoti = () => {
  return contentInstance.post("/api/user/notices/mark-all-read");
};
const getCheck = (id: string) => {
  return contentInstance.get("/api/finance/withdraw/detail/" + id);
};
const getCheckDeposit = (id: string) => {
  return contentInstance.get("/api/finance/deposit/detail/" + id);
};
const ConvertUSDT = (formData: FormData) => {
  return contentInstance.post("/api/finance/convert-usdt", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const WithdrawSafe = (formData: FormData) => {
  return contentInstance.post("/api/orepool/cashout-safe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const SendSafe = (formData: FormData) => {
  return contentInstance.post("/api/orepool/purchase-safe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  loginUser,
  signupUser,
  updatePassword,
  getMe,
  getReferral,
  getOrepool,
  getNotification,
  getBills,
  getMyWallet,
  verifiUser,
  topUpCoins,
  getWebsiteConfig,
  updatePaymentPassword,
  sellCoins,
  getListCoin,
  createOrder,
  getBuySellConfig,
  getStaking,
  buyMining,
  getContractpc,
  getContractjc,
  getNormalmin,
  getOverduemin,
  getNormalissue,
  getOverdueissue,
  getBbhistoryorder,
  buySubscribe,
  getMyStaking,
  getOrderResult,
  fetchCheckinData,
  postDaily,
  getProgressContract,
  updateBank,
  getNotiDetail,
  seeAllNoti,
  ConvertUSDT,
  getSafeActive,
  WithdrawSafe,
  SendSafe,
  getDepositHistory,
  getWithdrawHistory,
  getCheck,
  getCheckDeposit,
  sendCode,
};
