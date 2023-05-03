import React, { useState } from "react";
import { Spinner, FormFeedback } from "reactstrap";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as utils from "../../../common/utils";
import { useSelector } from "react-redux";
// import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";
import { login } from "../../../store/actions/authAction";
import firebase from './../../../config/firebase'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="">
        Lynx Admin
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Art_Img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
  alreadyVerified: {
    justifyContent: "flex-end",
    // backgroundColor:'red',
    textAlign: "right",
  },
}));

function LoginBoxed(props) {
  const user = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const _onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }

  function onSignupPassword() {
    props.history.push({
      pathname: "/pages/signup-email-boxed",
    });
  }
  function validateField(fieldName, value) {
    switch (fieldName) {
      case "email":
        let emailValid = state.email === "" ? false : stateIsEmailValid;
        emailValid = utils.isEmailValid(value);
        setStateIsEmailValid(emailValid);
        validateForm();
        break;

      case "password":
        let passwordValid = utils.isPasswordValid(value);
        setStateIsPasswordValid(passwordValid);
        validateForm();
        break;

      default:
        break;
    }
  }
  function validateForm() {
    let emailValid = false,
      passwordValid = false;
    emailValid = utils.isEmailValid(state.email);
    passwordValid = utils.isPasswordValid(state.password);
    setStateIsFormValid(emailValid && passwordValid);
  }

  function onClickForgotPassword() {
    props.history.push({
      pathname: "/pages/forget-password-email",
    });
  }
  function onSignupPassword() {
    props.history.push({
      pathname: "/pages/wizard",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // const messaging = firebase.messaging()

    // Notification.requestPermission()
    //   .then(permission => {
    //     console.log(permission)
    //     return messaging.getToken()
    //   })
    //   .then(token => {
        const LOGIN_DATA = {
          email: state.email,
          password: state.password,
          FCMtoken: " "
        };

        console.log("LOGIN_DATA", LOGIN_DATA);

        setStateLoader(true);
        props.login(
          LOGIN_DATA,
          () => {
            props.history.push({
              pathname: "/dashboards",
              // state: { email:state.email }
            });
          },
          () => setStateLoader(false)
        );
      // })

  };

  const onLogin = async () => {
    // console.log("LOGIN_DATA", state)
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.login(state));
    //   props.history.push({
    //     pathname: "/dashboards",
    //   });
    // } catch (error) {
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    //   setStateLoader(false);
    //   setState({ email: "", password: "" });
    // }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5" className={`${classes.title}`}>
            <b>Lynx Admin</b>
          </Typography>

          <Typography variant="h5"></Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LogIn
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              error={!stateIsEmailValid}
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              id="exampleEmail"
              placeholder="Email here..."
              value={state.email}
              helperText={stateIsEmailValid ? "" : utils.Constants.emailError}
              onChange={_onChange}
              onBlur={onBlurHandler}
              invalid={!stateIsEmailValid}
              valid={state.email ? stateIsEmailValid : false}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!stateIsPasswordValid}
              label="Password"
              type="password"
              helperText={
                stateIsPasswordValid ? "" : utils.Constants.passwordError
              }
              id="password"
              autoComplete="current-password"
              type="password"
              name="password"
              placeholder="Password here..."
              value={state.password}
              onChange={_onChange}
              onBlur={onBlurHandler}
              invalid={!stateIsPasswordValid}
              valid={state.password ? stateIsPasswordValid : false}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={stateLoader || !state.email || state.password.length <= 7}
            >
              {stateLoader ? (
                <div style={{ width: "130px" }}>
                  <Spinner
                    style={{ width: "20px", height: "20px" }}
                    color="light"
                  />
                </div>
              ) : (
                "Login to Dashboard"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onClickForgotPassword}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs srt className={classes.alreadyVerified}>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onSignupPassword}
                >
                  Don't have an account?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>{/* <Copyright /> */}</Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // showAlert: (message) => dispatch(onSnackbar(message)),
    login: (LOGIN_DATA, navigate, stopLoader) =>
      dispatch(login(LOGIN_DATA, navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBoxed);
