"use client";

import { Ref, useState, forwardRef, ReactElement, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import Fade, { FadeProps } from "@mui/material/Fade";
import { loginUser, signupUser } from "@/services/User.service";
import swal from "sweetalert";
import { toast } from "react-toastify";
import SimpleBackdrop from "../Loading/LoaddingPage";
import "./Logins.css";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export interface propPopup {
  activeTab: number;
  open: boolean;
  onClose: () => void;
}

const DialogLogin = (props: propPopup) => {
  // ** States
  const [loadding, setLoadding] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [activeTab, setActiveTab] = useState(props.activeTab);

  // Tab handler
  useEffect(() => {
    setActiveTab(props.activeTab);
  }, [props.activeTab]);

  // Input handlers
  const handleUserName = (e: any) => setUserName(e.target.value);
  const handleName = (e: any) => setName(e.target.value);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handlePhone = (e: any) => setPhone(e.target.value);
  const handleEmail = (e: any) => setEmail(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Login handler
  const login = async () => {
    if (userName !== "" && password !== "") {
      setLoadding(true);
      await loginUser(userName, password)
        .then((res: any) => {
          if (res?.msg === "Success") {
            window.localStorage.setItem("tokenku99", res.access_token);
            window.location.href = "/";
          } else {
            toast.error(res?.msg);
          }
        })
        .finally(() => {
          setLoadding(false);
        });
    } else {
      swal(
        "Đăng nhập",
        "Tên đăng nhập và mật khẩu không được để trống",
        "error"
      );
    }
  };

  // Signup handler
  const signup = async () => {
    if (userName !== "" && password !== "" && phone !== "") {
      setLoadding(true);
      await signupUser(name, userName, password, phone)
        .then((res: any) => {
          if (res?.msg === "Success") {
            toast.success("Tạo tài khoản thành công");
            setActiveTab(0);
          } else {
            toast.error(res?.msg);
          }
        })
        .finally(() => {
          setLoadding(false);
        });
    } else {
      swal("Đăng ký", "Phải điền đầy đủ hết các trường", "error");
    }
  };

  return (
    <Dialog
      fullWidth
      open={props.open}
      maxWidth="md"
      scroll="body"
      onClose={props.onClose}
      TransitionComponent={Transition}
      sx={{
        "& .MuiPaper-root": {
          width: { xs: "90%", sm: "95%" },
          height: { xs: "auto", sm: "auto" },
          borderRadius: 4,
          background: "none",
          overflow: "hidden",
        },
      }}
    >
      {loadding ? (
        <SimpleBackdrop />
      ) : (
        <Box sx={{ p: 1, position: "relative" }}>
          <IconButton
            size="small"
            onClick={props.onClose}
            sx={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
              color: "white",
            }}
          >
            {/* Add your close icon here */}
          </IconButton>
          <div className="auth-container">
            <div className="auth-box">
              <div className="auth-tabs">
                <button
                  className={activeTab === 0 ? "active" : ""}
                  onClick={() => setActiveTab(0)}
                >
                  Đăng nhập
                </button>
                <button
                  className={activeTab === 1 ? "active" : ""}
                  onClick={() => setActiveTab(1)}
                >
                  Đăng ký
                </button>
              </div>

              {activeTab === 0 ? (
                <div className="form-content">
                  <label>Tên đăng nhập</label>
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={userName}
                    onChange={handleUserName}
                  />

                  <label>Mật khẩu</label>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={handlePassword}
                    />
                    <span onClick={toggleShowPassword}>
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>

                  <div className="forgot">Quên mật khẩu?</div>
                  {/* <button
                    className={`submit-btn ${
                      userName && password ? "active" : ""
                    }`}
                    onClick={login}
                  >
                    Đăng nhập
                  </button> */}
                  <button
                    onClick={login}
                    style={{
                      display: "flex",
                      backgroundImage:
                        "url(/images/bg-btn.png), conic-gradient(from 0deg at 50% 50%, #085cff 0deg, #2692e0 89.73deg, #263be0 180.18deg, #085cff 1turn)",
                      color: "white",
                      borderRadius: "20px",
                      textTransform: "none",
                      fontSize: "14px",
                      width: "100%",
                      height: "38px",
                      border: "none",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    Đăng nhập
                  </button>
                </div>
              ) : (
                <div className="form-content">
                  <label>Tên đăng nhập</label>
                  <input
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    value={userName}
                    onChange={handleUserName}
                  />

                  <label>Họ và tên</label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={name}
                    onChange={handleName}
                  />

                  <label>Mật khẩu</label>
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={handlePassword}
                    />
                    <span onClick={toggleShowPassword}>
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>

                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={handlePhone}
                  />

                  

                  <div className="terms">
                    <input type="checkbox" defaultChecked />
                    <span>
                      Tôi xác nhận rằng tôi đã trên 18 tuổi và đồng ý với các{" "}
                      <b>Điều kiện & Điều khoản</b>.
                    </span>
                  </div>

                  <button
                    onClick={signup}
                    style={{
                      display: "flex",
                      backgroundImage:
                        "url(/images/bg-btn.png), conic-gradient(from 0deg at 50% 50%, #085cff 0deg, #2692e0 89.73deg, #263be0 180.18deg, #085cff 1turn)",
                      color: "white",
                      borderRadius: "20px",
                      textTransform: "none",
                      fontSize: "14px",
                      width: "100%",
                      height: "38px",
                      border: "none",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>
          </div>
        </Box>
      )}
    </Dialog>
  );
};

export default DialogLogin;
