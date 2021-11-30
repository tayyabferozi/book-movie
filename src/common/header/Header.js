import { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Modal from "react-modal";

import "./Header.css";
import logo from "../../assets/logo.svg";
import { Grid } from "@material-ui/core";
import isEmpty from "../scripts/is-empty";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const initialFormState = {
  first_name: "",
  last_name: "",
  mobile_number: "",
  email_address: "",
  password: "",
};

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const [formState, setFormState] = useState(initialFormState);
  const [signUpErrors, setSignUpErrors] = useState({});
  const validate = (fieldValues) => {
    // this function will check if the form values are valid
    let temp = { ...signUpErrors };

    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "required";

    if ("last_name" in fieldValues)
      temp.last_name = fieldValues.last_name ? "" : "required";

    if ("mobile_number" in fieldValues)
      temp.mobile_number = fieldValues.mobile_number ? "" : "required";

    if ("email_address" in fieldValues) {
      temp.email_address = fieldValues.email_address ? "" : "required";
      if (fieldValues.email_address)
        temp.email_address = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
          fieldValues.email_address
        )
          ? ""
          : "Email is not valid.";
    }

    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "required";

    setSignUpErrors({
      ...temp,
    });
  };

  const formIsValid = (signUp = true) => {
    // this function will check if the form values and return a boolean value
    let isValid;
    if (signUp) {
      isValid =
        !isEmpty(formState.first_name) &&
        !isEmpty(formState.last_name) &&
        !isEmpty(formState.mobile_number) &&
        !isEmpty(formState.email_address) &&
        !isEmpty(formState.password) &&
        Object.values(signUpErrors).every((x) => x === "");
    } else {
      isValid =
        formState.email_address &&
        formState.password &&
        Object.values(signUpErrors).every((x) => x === "");
    }

    return isValid;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFormState(initialFormState);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const loginSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", formState)
      .then((res) => {
        setFormState(initialFormState);
        setAlertState({
          ...alertState,
          open: true,
          severity: "success",
          message: "Logged in successfully",
        });
      })
      .catch((err) => {
        let msg = err?.response?.data?.message;

        if (!msg) {
          msg = "Something went wrong!";
        }

        setAlertState({
          ...alertState,
          open: true,
          severity: "error",
          message: msg,
        });
      });
  };

  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid()) {
      return;
    }

    axios
      .post("/signup/", formState)
      .then((res) => {
        setFormState(initialFormState);
        setAlertState({
          ...alertState,
          open: true,
          severity: "success",
          message: "Account created successfully!",
        });
      })
      .catch((err) => {
        let msg = err?.response?.data?.message;

        if (!msg) {
          msg = "Something went wrong!";
        }

        setAlertState({
          ...alertState,
          open: true,
          severity: "error",
          message: msg,
        });
      });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
    validate({ [name]: value });
  };

  return (
    <div id="header">
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
      <img src={logo} className="logo" alt="logo" />
      <div className="actions">
        {/* <Button variant="contained" color="primary">
          BOOK SHOW
        </Button> */}
        <Button variant="contained" onClick={openModal}>
          Login
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          <div>
            <Grid container justify="center">
              <Tabs
                className="tabs"
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="LOGIN" {...a11yProps(0)} />
                <Tab label="SIGNUP" {...a11yProps(1)} />
              </Tabs>
            </Grid>
            <TabPanel value={value} index={0}>
              <form onSubmit={loginSubmitHandler} className="auth">
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="login-email">Email *</InputLabel>
                    <Input
                      type="email"
                      onChange={inputChangeHandler}
                      id="login-email"
                      aria-describedby="my-helper-text"
                    />
                  </FormControl>
                </Box>
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="login-password">Password *</InputLabel>
                    <Input
                      type="password"
                      onChange={inputChangeHandler}
                      id="login-password"
                      aria-describedby="my-helper-text"
                    />
                  </FormControl>
                </Box>
                <Grid container justify="center">
                  <Box marginTop={3}>
                    <Button variant="contained" color="primary">
                      LOGIN
                    </Button>
                  </Box>
                </Grid>
              </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <form onSubmit={signUpSubmitHandler} className="auth">
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="signup-first-name">
                      First Name *
                    </InputLabel>
                    <Input
                      type="text"
                      name="first_name"
                      value={formState.first_name}
                      onChange={inputChangeHandler}
                      onBlur={inputChangeHandler}
                      id="signup-first-name"
                      aria-describedby="my-helper-text"
                      {...(signUpErrors["first_name"] && {
                        error: true,
                        helperText: signUpErrors["first_name"],
                      })}
                    />
                    <Box marginTop={1}>
                      <Typography
                        align="left"
                        variant="subtitle2"
                        color="error"
                      >
                        {signUpErrors.first_name}
                      </Typography>
                    </Box>
                  </FormControl>
                </Box>
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="signup-last-name">
                      Last Name *
                    </InputLabel>
                    <Input
                      type="text"
                      name="last_name"
                      value={formState.last_name}
                      onChange={inputChangeHandler}
                      onBlur={inputChangeHandler}
                      id="signup-last-name"
                      aria-describedby="my-helper-text"
                      {...(signUpErrors["last_name"] && {
                        error: true,
                        helperText: signUpErrors["last_name"],
                      })}
                    />
                    <Box marginTop={1}>
                      <Typography
                        align="left"
                        variant="subtitle2"
                        color="error"
                      >
                        {signUpErrors.last_name}
                      </Typography>
                    </Box>
                  </FormControl>
                </Box>
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="signup-number">
                      Mobile Number *
                    </InputLabel>
                    <Input
                      type="text"
                      name="mobile_number"
                      value={formState.mobile_number}
                      onChange={inputChangeHandler}
                      onBlur={inputChangeHandler}
                      id="signup-number"
                      aria-describedby="my-helper-text"
                      {...(signUpErrors["mobile_number"] && {
                        error: true,
                        helperText: signUpErrors["mobile_number"],
                      })}
                    />
                    <Box marginTop={1}>
                      <Typography
                        align="left"
                        variant="subtitle2"
                        color="error"
                      >
                        {signUpErrors.mobile_number}
                      </Typography>
                    </Box>
                  </FormControl>
                </Box>
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="signup-email">Email *</InputLabel>
                    <Input
                      type="text"
                      name="email_address"
                      value={formState.email_address}
                      onBlur={inputChangeHandler}
                      onChange={inputChangeHandler}
                      id="signup-email"
                      aria-describedby="my-helper-text"
                      {...(signUpErrors["email_address"] && {
                        error: true,
                        helperText: signUpErrors["email_address"],
                      })}
                    />
                    <Box marginTop={1}>
                      <Typography
                        align="left"
                        variant="subtitle2"
                        color="error"
                      >
                        {signUpErrors.email_address}
                      </Typography>
                    </Box>
                  </FormControl>
                </Box>
                <Box marginY={1}>
                  <FormControl>
                    <InputLabel htmlFor="signup-password">
                      Password *
                    </InputLabel>
                    <Input
                      type="password"
                      name="password"
                      value={formState.password}
                      onBlur={inputChangeHandler}
                      onChange={inputChangeHandler}
                      id="signup-password"
                      aria-describedby="my-helper-text"
                      {...(signUpErrors["password"] && {
                        error: true,
                        helperText: signUpErrors["password"],
                      })}
                    />
                    <Box marginTop={1}>
                      <Typography
                        align="left"
                        variant="subtitle2"
                        color="error"
                      >
                        {signUpErrors.password}
                      </Typography>
                    </Box>
                  </FormControl>
                </Box>
                <Grid container justify="center">
                  <Box marginTop={3}>
                    <Button
                      onClick={signUpSubmitHandler}
                      variant="contained"
                      color="primary"
                    >
                      SIGNUP
                    </Button>
                  </Box>
                </Grid>
              </form>
            </TabPanel>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
