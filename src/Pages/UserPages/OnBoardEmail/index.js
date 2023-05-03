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
import { useSelector } from "react-redux";
import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";
import { connect } from 'react-redux';
import { signupEmail } from "../../../store/actions/authAction";
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
    height: "calc(100vh - 16px)",
    width:"100%",
    // marginTop:"75px",
    display:"flex",
    alignItems:"center",
    justifyContent: "center",
    alignItems:"center"
    // alignContent:"center",
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
    // margin: theme.spacing(8, 4),
    margin:"15px 12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",


  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginBottom:"-30px",
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

function OnboardEmailBoxed(props) {

  const user = useSelector((state) => state);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false)
  const _onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }
  console.log("ON BOARD ", props)
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
  console.log("SIGNUP EMAIL", state.email)
  function onClickForgotPassword() {
    props.history.push({
      pathname: "/pages/login",

    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStateLoader(true);

    const SIGNUPEMAIL_DATA = {
      email:state.email,
      status:"Signup"
    //  password:state.password
    };
console.log("SIGNUP EMAIL",SIGNUPEMAIL_DATA)
    props.signUpDataEmail(SIGNUPEMAIL_DATA)

    props.signupEmail(SIGNUPEMAIL_DATA, () => {
      props.handleNext()
      // props.history.push({
      //   pathname: "/pages/wizard",
      //   // state: { email:state.email }
      // });
    }, () => setStateLoader(false));
  };

  const onSignupEmail = async () => {

    // console.log("SignupEmail_DATA", state)

    // props.history.push({
    //   pathname: "/pages/signup-OTP-boxed",
    //   state: { email:state.email }
    // });
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.signupEmail(state));

    // } catch (error) {
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    //   setStateLoader(false);
    //   setState({ email: "" });
    // }
  };

  return (
    <div className={classes.root}>

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
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
            SIGN UP
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
            {/* <TextField
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
            /> */}
            {/* <TextField
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
              name="Confirm password"
              placeholder="Confirm Password here..."
              value={state.password}
              onChange={_onChange}
              onBlur={onBlurHandler}
              invalid={!stateIsPasswordValid}
              valid={state.password ? stateIsPasswordValid : false}
            /> */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={stateLoader || !state.email}
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
                "Verify"
                )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onClickForgotPassword}
                >
                  Already Verified?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              {/* <Copyright /> */}
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
</div>
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
    signUpDataEmail: (emailData) => dispatch({ type: "SIGNUPEMAILDATA", payload: emailData }),
    signupEmail: (SIGNUPEMAIL_DATA, navigate, stopLoader) => dispatch(signupEmail(SIGNUPEMAIL_DATA, navigate, stopLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardEmailBoxed);
