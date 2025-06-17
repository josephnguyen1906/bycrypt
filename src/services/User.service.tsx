import { authInstance, contentInstance } from "@/configs/CustomizeAxios";

// đăng nhập
const loginUser = (email: string, password: string) => {
  return authInstance.post("/api/login", {
    email,
    password,
  });
};

// Đăng ký
const signupUser = (email: string, password: string) => {
  return authInstance.post("/api/register", {
    email,
    password,
  });
};

const getMe = () => {
  return contentInstance.get("/api/user/me");
};

// Cập nhập mật khẩu tài khoản
const updatePassword = (
  old_password: string,
  new_password: string,
  new_password_confirmation: string
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
};
