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
  return contentInstance.post(`/api/change-password`, {
    old_password,
    new_password,
    new_password_confirmation,
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

export {
  loginUser,
  signupUser,
  updatePassword,
  getMe,
  getReferral,
  getOrepool,
  getNotification,
  getBills,
};
