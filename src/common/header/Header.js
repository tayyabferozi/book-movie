import { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import "./Header.css";
import logo from "../../assets/logo.svg";
import { Grid } from "@material-ui/core";

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email_address: "",
    password: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFormState(initialFormState);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
  };

  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    console.log(formState);

    axios
      .post(
        "/signup/",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
        formState
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div id="header">
      <img src={logo} className="logo" alt="logo" />
      <div className="actions">
        <Button variant="contained" color="primary">
          BOOK SHOW
        </Button>
        <Button variant="contained" onClick={handleClickOpen}>
          Login
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
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
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  margin="dense"
                  id="Email"
                  label="Email *"
                  type="email"
                  fullWidth
                />
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  margin="dense"
                  id="password"
                  label="Password *"
                  type="password"
                  fullWidth
                />
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
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  name="first_name"
                  value={formState.first_name}
                  margin="dense"
                  id="firstName"
                  label="First Name *"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  name="last_name"
                  value={formState.last_name}
                  margin="dense"
                  id="lastName"
                  label="Last Name *"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  name="mobile_number"
                  value={formState.mobile_number}
                  margin="dense"
                  id="mobileNumber"
                  label="Mobile Number *"
                  type="text"
                  fullWidth
                />
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  name="email_address"
                  value={formState.email_address}
                  margin="dense"
                  id="Email"
                  label="Email *"
                  type="email"
                  fullWidth
                />
                <TextField
                  onChange={inputChangeHandler}
                  autoFocus
                  name="password"
                  value={formState.password}
                  margin="dense"
                  id="password"
                  label="Password *"
                  type="password"
                  fullWidth
                />
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
          {/* <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions> */}
        </Dialog>
      </div>
    </div>
  );
};

export default Header;
