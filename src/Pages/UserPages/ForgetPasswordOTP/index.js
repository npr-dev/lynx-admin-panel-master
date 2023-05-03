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
import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";
import { signupOTP } from "../../../store/actions/authAction";

// import SignupEmailBoxed from "../SignUpEmail";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         AfricanArt.International
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

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
}));
 function OnboardOTPBoxed(props) {
  const user = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({OTPpin: "" });
  // const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsOTPpinValid, setStateIsOTPpinValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false)
  console.log("SIGN UP OTPP PROPS",props.signupEmail.email)
  const loggedemail=props.signupEmail.email

  const _onChange = (event) => {
    const { name, value } = event.target;
    console.log("CONSOLE",name,value)
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }

  // function countryToFlag(isoCode) {
  //   return typeof String.fromCodePoint !== "undefined"
  //     ? isoCode
  //         .toUpperCase()
  //         .replace(/./g, (char) =>
  //           String.fromCodePoint(char.charCodeAt(0) + 127397)
  //         )
  //     : isoCode;
  // }

  function validateField(fieldName, value) {
    switch (fieldName) {
      // case "email":
      //   let emailValid = state.email === "" ? false : stateIsEmailValid;
      //   emailValid = utils.isEmailValid(value);
      //   setStateIsEmailValid(emailValid);
      //   validateForm();
      //   break;

      case "OTPpin":
        let passwordValid = utils.isOTPpinValid(value);
        setStateIsOTPpinValid(passwordValid);
        validateForm();
        break;

      default:
        break;
    }
  }
  function validateForm() {
    let emailValid = false,
      OTPpin = false;
    // emailValid = utils.isEmailValid(state.email);
    OTPpin = utils.isOTPpinValid(state.OTPpin);
    setStateIsFormValid(OTPpin);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStateLoader(true);

    const SIGNUPOTP_DATA = {
     email:loggedemail,
    OTPcode:state.OTPpin
    };
    
    console.log("SIGN UP OTP INDEX",SIGNUPOTP_DATA)

    props.signupOTP(SIGNUPOTP_DATA, () => {
      props.history.push({
        pathname: "/pages/forget-new-password-boxed",
        // state: { email:loggedemail }
      });
    }, () => setStateLoader(false));
  };


  const signupOTP = async () => {
  
    // console.log("SIGNUP_OTP_DATA", state)
    // props.history.push({
    //       pathname: "/pages/signup-password-boxed",
    //     });
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.signupOTP(state));
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
    //   setState({OTPpin: "" });
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
            FORGET PASSWORD OTP
          </Typography>
          <form className={classes.form} noValidate>
            {/* <TextField
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
            /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!stateIsOTPpinValid}
              label="OTP Code"
              type="text"
              helperText={
                stateIsOTPpinValid ? "" : utils.Constants.OTPpinError
              }
              id="password"
              autoComplete="current-password"
              type="text"
              name="OTPpin"
              placeholder="Enter 6 digits OTP"
              value={state.OTPpin}
              onChange={_onChange}
              onBlur={onBlurHandler}
              invalid={!stateIsOTPpinValid}
              valid={state.OTPpin ? stateIsOTPpinValid : false}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={stateLoader  || state.OTPpin.length!== 6}
              className={classes.submit}
              onClick={handleSubmit}
            >
              {stateLoader ? (
                <div style={{ width: "130px" }}>
                  <Spinner
                    style={{ width: "20px", height: "20px" }}
                    color="light"
                  />
                </div>
              ) : (
                "Confirm"
              )}
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onClickForgotPassword}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onSignupPassword}
                >
                  Already Verified?
                </Link>
              </Grid>
            </Grid> */}
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  console.log("SIGN UP OTP STATE",state)
  return {
    signupEmail:state.auth.signupEmailData
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // showAlert: (message) => dispatch(onSnackbar(message)),
    signupOTP: (SIGNUPOTP_DATA,navigate,stopLoader) => dispatch(signupOTP(SIGNUPOTP_DATA,navigate,stopLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardOTPBoxed);
