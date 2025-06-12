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
  return contentInstance.get("/api/me");
};

// Cập nhập mật khẩu tài khoản
const updatePassword = (
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string
) => {
  return contentInstance.post(`/api/auth/change-password`, {
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });
};

// Cập nhập mật khẩu bảo mật game
const updatePasswordWithdrawals = (
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string
) => {
  return contentInstance.post(`/api/auth/change-password-security`, {
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });
};

export {
  loginUser,
  signupUser,
  updatePassword,
  getMe,
  updatePasswordWithdrawals,
};
