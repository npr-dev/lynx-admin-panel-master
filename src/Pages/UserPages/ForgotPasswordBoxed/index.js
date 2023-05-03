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
import { useDispatch } from "react-redux";
import * as utils from "../../../common/utils";
import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";

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
    margin: theme.spacing(15, 4),
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
    marginBottom: 40,
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
}));

export default function ForgotPasswordBoxed(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({ email: "" });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [stateLoader, setStateLoader] = useState(false);

  function _onChange(event) {
    const { value } = event.target;
    setState({ email: value });
  }
  function _onBlur(event) {
    const { value } = event.target;
    let emailValid = utils.isEmailValid(value);
    setStateIsEmailValid(Boolean(emailValid));
    setStateIsFormValid(Boolean(emailValid));
  }

  function onSignIn() {
    props.history.push({
      pathname: "/pages/login",
    });
  }

  async function onForgotPassword() {
    try {
      setStateLoader(true);
      const result = await dispatch(authActions.forgotPassword(state));
      setState({ email: "" });
      //console.log("check results here", result);
      if (result) {
        props.history.push({
          pathname: "/pages/verify-code",
          state: result,
        });
      }
    } catch (error) {
      if (error.response) {
        utils._toast(error.response.data.responseMessage, "error");
      } else {
        // utils._toast("Netwrok Error", "error");
      }
      setStateLoader(false);
      utils._toast(error.message, "error");
      setState({ email: "" });
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5" className={`${classes.title}`}>
            <b>Lynx Admin Admin</b>
          </Typography>
          <Typography component="h1" variant="h5">
            Forgot your Password?
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
              onBlur={_onBlur}
              invalid={!stateIsEmailValid}
              valid={state.email ? stateIsEmailValid : false}
            />
            <Button
              fullWidth
              variant="contained"
              disabled={stateLoader}
              color="primary"
              className={classes.submit}
              onClick={onForgotPassword}
            >
              {stateLoader ? (
                <div style={{ width: "130px" }}>
                  <Spinner
                    style={{ width: "20px", height: "20px" }}
                    color="light"
                  />
                </div>
              ) : (
                  "Forget Password"
                )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onSignIn}
                >
                  Sign in existing account
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
