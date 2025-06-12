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
  return contentInstance.get(`/api/referral`);
};

export { loginUser, signupUser, updatePassword, getMe, getReferral };
