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
import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";
import { signupEmail } from "../../../store/actions/authAction"
import Modal from "../Modal";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "20vh",
    // width:"300vh",
    justifyContent: "center",
    marginTop: "75px"
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
    // margin: theme.spacing(15, 4),
    margin: "51px 15px",
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
    // marginTop: theme.spacing(1),
    marginTop: "24px",
    marginBottom: "-24px"
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
function ChangeEmail(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = useState({ email: "" });
  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [stateLoader, setStateLoader] = useState(false);
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  // console.log("CHANGE EMAIK PROPS", props)
  function _onChange(event) {
    const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    const { value } = event.target;
    const emailValidation = regex.test(value)
    setState({ email: value });
    console.log(emailValidation)
    if (emailValidation) {
      setShowModal(true)
    }
    else {
      setShowModal(false)
    }
  }
  function _onBlur(event) {
    const { value } = event.target;
    let emailValid = utils.isEmailValid(value);
    setStateIsEmailValid(Boolean(emailValid));
    setStateIsFormValid(Boolean(emailValid));
  }


  function onSignIn() {
    // props.history.push({
    //   pathname: "/pages/login-boxed",
    // });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const FORGETPASSWORD_EMAIL_DATA = {
      email: state.email,
      status:"Forgot"
    };

    props.updateEmailData(FORGETPASSWORD_EMAIL_DATA)

    console.log("FIGOT PASSWORD EMAIL DATA", FORGETPASSWORD_EMAIL_DATA)
    props.signupEmail(FORGETPASSWORD_EMAIL_DATA, () => {
      props.history.push({
        pathname: "/pages/forget-password-OTP",
        // state: { email:state.email }
      });
    }, () => setLoading(false));
  };
  async function onForgotPassword() {
    // try {
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.forgotPassword(state));
    //   setState({ email: "" });
    //   if (result) {
    //     props.history.push({
    //       pathname: "/pages/verify-code-boxed",
    //       state: result,
    //     });
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    //   setStateLoader(false);
    //   utils._toast(error.message, "error");
    //   setState({ email: "" });
    // }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5" className={`${classes.title}`}>
            <b>Lynx Admin</b>
          </Typography>

          <Typography component="h1" variant="h5">
            UPDATE EMAIL
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
              placeholder="Enter New Email here..."
              value={state.email}
              helperText={stateIsEmailValid ? "" : utils.Constants.emailError}
              onChange={_onChange}
              onBlur={_onBlur}
              invalid={!stateIsEmailValid}
              valid={state.email ? stateIsEmailValid : false}
            />
            {/* <Button
              fullWidth
              variant="contained"
              color="primary" 
              className={classes.submit}
              onClick={handleSubmit} > */}
            {stateLoader ? (
              <div style={{ width: "130px" }}>
                <Spinner
                  style={{ width: "20px", height: "20px" }}
                  color="light"
                />
              </div>
            ) : (
                showModal && <div style={{ textAlign: "center", justifyContent: "center", width: "102%", marginTop: "12px" }}>
                  <Modal buttonVal={"UPDATE EMAIL"} email={state.email} history={props.history} />

                </div>

              )}
            {/* </Button> */}
            <Grid container>
              {/* <Grid item xs>
                <Link
                  style={{ cursor: "pointer" }}
                  variant="body2"
                  onClick={onSignIn}
                >
                  Sign in existing account
                </Link>
              </Grid> */}
            </Grid>
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
  return {
    loggedInEmail: state.auth.user.result.userExist.email

    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // showAlert: (message) => dispatch(onSnackbar(message)),
    updateEmailData: (emailData) => dispatch({ type: "UPDATE_EMAIL_DATA", payload: emailData }),
    signupEmail: (FORGETPASSWORD_EMAIL_DATA, navigate, stopLoader) => dispatch(signupEmail(FORGETPASSWORD_EMAIL_DATA, navigate, stopLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
