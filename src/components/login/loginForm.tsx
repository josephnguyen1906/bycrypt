// ** React Imports
import { Ref, useState, forwardRef, ReactElement, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import Fade, { FadeProps } from "@mui/material/Fade";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DialogTitle, Tabs, Tab, Skeleton } from "@mui/material";
import { loginUser, signupUser } from "@/services/User.service";
import swal from "sweetalert";
import { toast } from "react-toastify";
import LoadingComponent from "../Loading";
import { useRouter } from "next/navigation";
import SimpleBackdrop from "../Loading/LoaddingPage";
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
  const [show, setShow] = useState<boolean>(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const route = useRouter();

  //tabs handler
  const [activeTab, setActiveTab] = useState(props.activeTab);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    setActiveTab(props.activeTab);
  }, [props.activeTab]);
  const handleUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const handleName = (e: any) => {
    setName(e.target.value);
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handlePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const login = async () => {
    if (userName !== "" && password !== "") {
      setLoadding(true);
      await loginUser(userName, password)
        .then((res: any) => {
          if (res?.msg === "Success") {
            window.localStorage.setItem("tokenreddy232", res.access_token);
            window.location.href = "/";
          } else {
            toast.error(res?.msg);
          }
        })
        .finally(() => {
          setLoadding(false);
        });
    } else {
      swal("Login", "Please, username or password is not exist", "error");
    }
  };
  const signup = async () => {
    if (userName !== "" && password !== "" && email !== "" && phone !== "") {
      setLoadding(true);
      await signupUser(name, email, userName, password, phone)
        .then((res: any) => {
          if (res?.msg === "Success") {
            toast.success("Create a new account successfully");
            setActiveTab(0);
          } else {
            toast.error(res?.msg);
          }
        })
        .finally(() => {
          setLoadding(false);
        });
    } else {
      swal("Sign Up", "Please, Do not leave blank field", "error");
    }
  };
  return (
    <Card>
      <Dialog
        fullWidth
        open={props.open}
        maxWidth="md"
        scroll="body"
        onClose={props.onClose}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{
          "& .MuiPaper-root": {
            width: "380px",
            height: "480px",
            borderRadius: 4,
            backgroundColor: "#0F192F",
            overflow: "hidden",
          },
        }}
      >
        {loadding ? (
          <SimpleBackdrop />
        ) : (
          <DialogContent
            sx={{
              position: "relative",
              pb: 3,
              px: 3,
              pt: 4,
              "& input": {
                color: "white",
                backgroundColor: "#283145",
                border: "1px solid ",
                padding: "10px",
                fontSize: "14px",
              },
            }}
          >
            {/* Actual Content */}
            <IconButton
              size="small"
              onClick={() => setShow(false)}
              sx={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                color: "white",
              }}
            >
              {/* Add your close icon here */}
            </IconButton>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="tabs"
                sx={{ justifyContent: "center", alignItems: "center" }}
              >
                <Tab sx={{ color: "white" }} label="Sign In" />
                <Tab sx={{ color: "white" }} label="Sign Up Reddy232" />
              </Tabs>
            </Box>
            {activeTab === 0 && (
              <Box marginTop={5}>
                <Box sx={{ mb: 5, textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Wish you a day full of luck at Reddy232 ☘️☘️☘️
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <input
                      style={{
                        border: "none",
                        width: "93%",
                        outline: "none",
                        borderRadius: "5px",
                      }}
                      placeholder="Username"
                      type="text"
                      onChange={handleUserName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      style={{
                        border: "none",
                        width: "93%",
                        outline: "none",
                        borderRadius: "5px",
                      }}
                      placeholder="Password"
                      type="password"
                      onChange={handlePassword}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <input
                        style={{
                          borderColor: "green",
                          borderWidth: "2px",
                          borderStyle: "solid",
                          outline: "none",
                        }}
                        type="radio"
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "white", ml: 1 }}
                      >
                        Save password
                      </Typography>
                    </Box>
                    {/* <Typography
                      variant="body2"
                      sx={{ color: "#73879a", cursor: "pointer" }}
                    >
                      Forgot password?
                    </Typography> */}
                  </Grid>
                </Grid>
                <DialogActions
                  sx={{
                    justifyContent: "center",
                    pb: 3,
                    "& button": {
                      width: "312px",
                      height: "48px",
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkgreen", // Hover effect
                      },
                    },
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: "10px",
                      width: "312px",
                      height: "48px",
                      marginTop: "10px",
                    }}
                    onClick={() => login()}
                  >
                    Login
                  </Button>
                </DialogActions>
              </Box>
            )}
          </DialogContent>
        )}

        {activeTab === 1 && (
          <>
            {loadding ? (
              <SimpleBackdrop />
            ) : (
              <Box>
                <Box sx={{ mb: 3, textAlign: "center" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      marginRight: "30px",
                      marginLeft: "30px",
                      color: "white",
                    }}
                  >
                    Join Reddy232 to receive countless attractive offers 🎁🎉
                  </Typography>
                </Box>
                <Grid container spacing={3} sx={{ marginLeft: 0.05 }}>
                  <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
                    <input
                      style={{
                        border: "none",
                        width: "42%",
                        outline: "none",
                        color: "white",
                        backgroundColor: "#283145",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                      placeholder="Username"
                      type="text"
                      onChange={handleUserName}
                    />{" "}
                    <input
                      style={{
                        border: "none",
                        width: "42%",
                        outline: "none",
                        color: "white",
                        backgroundColor: "#283145",
                        borderRadius: "5px",
                        padding: "10px",
                        fontSize: "14px",
                      }}
                      placeholder="Full Name"
                      type="text"
                      onChange={handleName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      style={{
                        border: "none",
                        width: "87%",
                        outline: "none",
                        color: "white", // Input text color
                        backgroundColor: "#283145", // Input background
                        borderRadius: "5px", // Rounded input corners
                        padding: "10px", // Inner padding
                        fontSize: "14px",
                      }}
                      placeholder="Phone number"
                      type="tel"
                      onChange={handlePhone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      style={{
                        border: "none",
                        width: "87%",
                        outline: "none",
                        color: "white", // Input text color
                        backgroundColor: "#283145", // Input background
                        borderRadius: "5px", // Rounded input corners
                        padding: "10px", // Inner padding
                        fontSize: "14px",
                      }}
                      placeholder="Email"
                      type="email"
                      onChange={handleEmail}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      style={{
                        border: "none",
                        width: "87%",
                        outline: "none",
                        color: "white", // Input text color
                        backgroundColor: "#283145", // Input background
                        borderRadius: "5px", // Rounded input corners
                        padding: "10px", // Inner padding
                        fontSize: "14px",
                      }}
                      placeholder="Password"
                      type="password"
                      onChange={handlePassword}
                    />
                  </Grid>
                </Grid>
                <DialogActions
                  sx={{
                    justifyContent: "center",
                    pb: 3,
                    "& button": {
                      width: "312px",
                      height: "48px",
                      backgroundColor: "green",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "darkgreen", // Hover effect
                      },
                    },
                  }}
                >
                  <Button
                    sx={{
                      borderRadius: "10px",
                      width: "312px",
                      height: "48px",
                      marginTop: "15px",
                    }}
                    onClick={() => signup()}
                  >
                    Sign up Now!
                  </Button>
                </DialogActions>
              </Box>
            )}
          </>
        )}
      </Dialog>
    </Card>
  );
};

export default DialogLogin;
