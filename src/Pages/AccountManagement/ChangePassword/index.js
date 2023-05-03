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
import { updateNewPassword } from "../../../store/actions/authAction"

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
        height: "20vh",
        // width:"300vh",
        justifyContent: "center",
        marginTop: "50px"
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
        margin: "25px 16px",
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
        marginBottom: "-40px",
        marginTop: "10px"
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

function ChangePassword(props) {

    const user = useSelector((state) => state);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [stateLoader, setStateLoader] = useState(false);
    const [state, setState] = useState({ oldPassword: "", password: "", confirmpassword: "" });
    const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
    const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
    const [stateIsFormValid, setStateIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false)
    const loggedInEmail = props.loggedInEmail
    console.log("SIGN UP PASSWORD PROPS", loggedInEmail)

    const _onChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    function onBlurHandler(event) {
        const { name, value } = event.target;
        validateField(name, value);
    }

    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== "undefined"
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) =>
                    String.fromCodePoint(char.charCodeAt(0) + 127397)
                )
            : isoCode;
    }

    function validateField(fieldName, value) {
        switch (fieldName) {
            // case "email":
            //   let emailValid = state.email === "" ? false : stateIsEmailValid;
            //   emailValid = utils.isEmailValid(value);
            //   setStateIsEmailValid(emailValid);
            //   validateForm();
            //   break;

            case "password":
                let passwordValid = utils.isPasswordValid(value);
                setStateIsPasswordValid(passwordValid);
                validateForm();
                break;

            default:
                break;
        }
    }
    //   console.log("CHANGE PASSWORD EMAIL", school)

    function validateForm() {
        let emailValid = false,
            passwordValid = false;
        // emailValid = utils.isEmailValid(state.email);
        passwordValid = utils.isPasswordValid(state.password);
        setStateIsFormValid(passwordValid);
    }

    // function onClickForgotPassword() {
    //   props.history.push({
    //     pathname: "/pages/forgot-password-boxed",
    //   });
    // }
    // function onSignupPassword() {
    //   props.history.push({
    //     pathname: "/pages/signup-email-boxed",
    //   });
    // }
    const handleSubmit = (e) => {
        // const FORGET_NEW_PASSWORD_DATA = {
        //     //   email:loggedemail,
        //       password:state.password,
        //       confirmpassword:state.confirmpassword
        //     };

        if (state.password === state.confirmpassword) {

            e.preventDefault();
            setStateLoader(true);

            const FORGET_NEW_PASSWORD_DATA = {
                password: state.oldPassword,
                email: loggedInEmail,
                newPassword: state.password,
                //   confirmpassword:state.confirmpassword
            };
            console.log("UPDATE NEW PASSWORD INDEX", FORGET_NEW_PASSWORD_DATA)


            props.updateNewPassword(FORGET_NEW_PASSWORD_DATA, () => {
                props.history.push({
                    pathname: "/accountManagement/profile",
                });
            }, () => setStateLoader(false));
        }
        else {
            utils._toast("Password not matched")

        }
    };

    const onLogin = async () => {

        // console.log("FORGET_NEW_PASSWORD_DATA", state)
        // try {
        //   setStateLoader(true);
        //   const result = await dispatch(authActions.signupPassword(state));
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
        //   setState({ password: "" });
        // }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography variant="h5" className={`${classes.title}`}>
                        <b>Lynx Admin</b>
                    </Typography>

                    <Typography variant="h5"></Typography>
                    {/* <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar> */}
                    <Typography component="h1" variant="h5" style={{ margin: "30px" }}>
                        UPDATE PASSWORD
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
                            error={!stateIsPasswordValid}
                            label="Old Password"
                            type="password"
                            helperText={
                                stateIsPasswordValid ? "" : utils.Constants.passwordError
                            }
                            id="old password"
                            autoComplete="current-password"
                            type="password"
                            name="oldPassword"
                            placeholder="Password here..."
                            value={state.oldPassword}
                            onChange={_onChange}
                            onBlur={onBlurHandler}
                            invalid={!stateIsPasswordValid}
                            valid={state.password ? stateIsPasswordValid : false}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={!stateIsPasswordValid}
                            label="New Password"
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            error={!stateIsPasswordValid}
                            label="Confirm New Password"
                            type="password"
                            helperText={
                                stateIsPasswordValid ? "" : utils.Constants.passwordError
                            }
                            id="confirmpassword"
                            autoComplete="current-password"
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password here..."
                            value={state.confirmpassword}
                            onChange={_onChange}
                            onBlur={onBlurHandler}
                            invalid={!stateIsPasswordValid}
                            valid={state.password ? stateIsPasswordValid : false}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!state.password || !state.confirmpassword || stateLoader}
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
                                    "UPDATE PASSWORD"
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
                        <Box mt={5}>
                            {/* <Copyright /> */}
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = (state) => {
    console.log("UPDATE PASSWORD STATE", state)
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

        updateNewPassword: (FORGET_NEW_PASSWORD_DATA, navigate, stopLoader) => dispatch(updateNewPassword(FORGET_NEW_PASSWORD_DATA, navigate, stopLoader))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
