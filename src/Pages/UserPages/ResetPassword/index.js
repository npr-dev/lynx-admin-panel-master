// import React, { Fragment, useState } from "react";
// import {
//   Col,
//   Row,
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   FormFeedback,
//   Spinner
// } from "reactstrap";
// import { useDispatch } from "react-redux";
// // Layout
// import { authActions } from "../../../store/actions";
// import * as utils from "../../../common/utils";

// function ForgotPasswordBoxed(props) {
//   const dispatch = useDispatch();
//   const [stateLoader, setStateLoader] = useState(false);
//   const [state, setState] = useState({ password: "", passwordRepeat: "" });
//   const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
//   const [stateIsPasswordRepeatValid, setStateIsPasswordRepeatValid] = useState(
//     true
//   );
//   const [stateIsFormValid, setStateIsFormValid] = useState(false);

//   function _onChange(event) {
//     const { name, value } = event.target;
//     setState(prevState => ({ ...prevState, [name]: value }));
//   }

//   function _onBlur(event) {
//     const { name, value } = event.target;
//     if (name == "password") {
//       let passwordValid = utils.isPasswordValid(value);
//       setStateIsPasswordValid(passwordValid);
//       setStateIsFormValid(
//         passwordValid &&
//           stateIsPasswordRepeatValid &&
//           Boolean(state.password) &&
//           Boolean(state.passwordRepeat)
//       );
//     }
//     if (name === "passwordRepeat") {
//       let isPasswordRepeatValid = utils.isPasswordRepeatValid(
//         value,
//         state.password
//       );
//       setStateIsPasswordRepeatValid(isPasswordRepeatValid);
//       setStateIsFormValid(
//         stateIsPasswordValid &&
//           isPasswordRepeatValid &&
//           Boolean(state.password) &&
//           Boolean(state.passwordRepeat)
//       );
//     }
//   }

//   async function onResetPassword() {
//     try {
//       setStateLoader(true);
//       const result = await dispatch(
//         authActions.resetPassword({
//           body: { password: state.password }
//         })
//       );
//       if (result) {
//         setStateLoader(false);
//         props.history.push({
//           pathname: "/pages/login"
//         });
//       } else {
//         setStateLoader(false);
//         utils._toast("Something went wrong in forgot password!", "error");
//       }
//     } catch (error) {
//       setStateLoader(false);
//       utils._toast("Something went wrong in forgot password!", "error");
//     }
//   }

//   const routerState = props.location.state;
//   return (
//     <Fragment>
//       <div className="h-100 bg-plum-plate bg-animation">
//         <div className="d-flex h-100 justify-content-center align-items-center">
//           <Col md="6" className="mx-auto app-login-box">
//             <div className="modal-dialog w-100">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <div className="h5 modal-title">
//                     Reset your Password?
//                   </div>
//                 </div>
//                 <div className="modal-body">
//                   <div>
//                     <Form>
//                       <Row form>
//                         <Col md={12}>
//                           <FormGroup>
//                             <Label for="examplePassword">New Password</Label>
//                             <Input
//                               type="password"
//                               name="password"
//                               id="examplePassword"
//                               placeholder="New Password here..."
//                               value={state.password}
//                               onChange={_onChange}
//                               onBlur={_onBlur}
//                               invalid={!stateIsPasswordValid}
//                             />
//                             {!stateIsPasswordValid && (
//                               <FormFeedback>
//                                 {utils.Constants.passwordError}
//                               </FormFeedback>
//                             )}
//                           </FormGroup>
//                           <FormGroup>
//                             <Label for="examplePasswordRepeat">
//                               Re-Enter New Password
//                             </Label>
//                             <Input
//                               type="password"
//                               name="passwordRepeat"
//                               id="examplePasswordRepeat"
//                               placeholder="Re-Enter New Password here..."
//                               value={state.passwordRepeat}
//                               onChange={_onChange}
//                               onBlur={_onBlur}
//                               invalid={!stateIsPasswordRepeatValid}
//                             />
//                             {!stateIsPasswordRepeatValid && (
//                               <FormFeedback>
//                                 Re-Enter Password must be same as above...
//                               </FormFeedback>
//                             )}
//                           </FormGroup>
//                         </Col>
//                       </Row>
//                     </Form>
//                   </div>
//                 </div>
//                 <div className="modal-footer clearfix">
//                   <div className="float-right">
//                     <Button
//                       color="primary"
//                       disabled={!stateIsFormValid}
//                       size="lg"
//                       onClick={onResetPassword}
//                     >
//                       {stateLoader ? (
//                         <div style={{ width: "130px" }}>
//                           <Spinner
//                             style={{ width: "20px", height: "20px" }}
//                             color="light"
//                           />
//                         </div>
//                       ) : (
//                         "Reset Password"
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </div>
//       </div>
//     </Fragment>
//   );
// }

import React, { useState } from "react";
import {
  Spinner,
  FormFeedback,
  Col,
  Form,
  Row,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
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
import * as utils from "../../../common/utils";
import { useSelector } from "react-redux";
import Art_Img from "../../../assets/img/login-bg.jpg";
const axios = require("axios");

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
    margin: theme.spacing(20, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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

export default function VerifyCodeBoxed(props) {
  const classes = useStyles();
  const [state, setState] = useState({ password: "", confirmPassword: "" });
  const [stateLoader, setStateLoader] = useState(false);
  const [match, setStateMatch] = useState(false);
  const [validation, setStateValid] = useState(false);
  const token = useSelector((state) => state.auth.token);

  function _onChange(event) {
    const { value, name } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  async function onSubmit() {
    try {
      const { confirmPassword, password } = state;
      let passwordValid = utils.isPasswordValid(password);
      if (passwordValid == false || passwordValid == null) {
        //console.log("bot valids");
        setStateValid(true);
        return;
      }
      setStateValid(false);
      //console.log("check it", passwordValid);
      if (confirmPassword != password) {
        setStateMatch(true);
        return;
      }
      setStateMatch(false);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      setStateLoader(true);
      const result = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/admin/resetPassword",
        // "http://localhost:4000" + "/admin/resetPassword",

        { password: password },
        config
      );
      setStateLoader(false);
      utils._toast("password reset successfully", "success");
      props.history.push({
        pathname: "/pages/login",
      });
    } catch (error) {
      setState({ password: "", confirmPassword: "" });
      if (error.response) {
        utils._toast(error.response.data.responseMessage, "error");
      } else {
        //console.log("toasdt", error);
        // utils._toast("Netwrok Error", "error");
      }
      setStateLoader(false);
      setState({ code: "" });
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5" className={`${classes.title}`}>
            <b>Lynx Admin admin</b>
          </Typography>
          <Typography component="h1" variant="h5">
            Admin Panel
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              helperText={utils.Constants.passwordError}
              type="password"
              error={validation}
              name="password"
              placeholder="password here..."
              value={state.password}
              onChange={_onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              error={match}
              helperText={match && "Confirm Password Not match"}
              placeholder="password here..."
              value={state.confirmPassword}
              onChange={_onChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              {stateLoader ? (
                <div style={{ width: "130px" }}>
                  <Spinner
                    style={{ width: "20px", height: "20px" }}
                    color="light"
                  />
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
