// import { TextField } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {Button,  Modal, Spinner, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, Container } from 'reactstrap';
import { useSelector, useDispatch, connect } from "react-redux";
import * as utils from "../../../common/utils";
import Button1 from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
// import { updateNewEmail } from "../../../store/actions"
import { updateNewEmail } from "../../../store/actions/authAction"

import Art_Img from "../../../assets/img/login-bg.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    justifyContent: "center"
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
    width: "100%",
    // textAlign:"center",
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
  alreadyVerified: {
    justifyContent: 'flex-end',
    // backgroundColor:'red',
    textAlign: 'right'
  }
}));
function ModalExample(props) {
  const user = useSelector((state) => state);
  const [modal, setModal] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [state, setState] = useState({ newPassword: "" });
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
  const [stateIsFormValid, setStateIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false)
  const loggedInEmail = props.loggedInEmail
  // console.log("UPDATE OLD EMAIL", loggedInEmail)

  const _onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }

  console.log("MODAL PROPS", props)

  function validateField(fieldName, value) {
    switch (fieldName) {
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

    passwordValid = utils.isPasswordValid(state.password);
    setStateIsFormValid(passwordValid);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setStateLoader(true);

    const UPDATE_EMAIL_DATA = {
      oldEmail: loggedInEmail,
      newEmail: props.email,
      password: state.newPassword
    };

    console.log("UPDATE_EMAIL_DATA", UPDATE_EMAIL_DATA)
    console.log("UPDATE_EMAIL_DATA", props.email)

    props.updateEmailData(UPDATE_EMAIL_DATA.newEmail)

    props.updateNewEmail(UPDATE_EMAIL_DATA, () => {
      props.history.push({
        pathname: "/accountManagement/change-OTP-boxed",
        email: props.email
      });
    }, () => setStateLoader(false));
  };

  const onConfirmPassword = async () => {
    // const UPDATE_EMAIL_DATA = {
    //   email: props.email,
    //   password: state.newPassword
    // };
    // console.log("CONFIRM_ADD_ADMIN_PASSWORD", UPDATE_EMAIL_DATA)
    // try {
    //   // props.handleSubmit()
    //   setStateLoader(true);
    //   const result = await dispatch(authActions.updatePassword(state));
    //   // props.history.push({
    //   //   pathname: "/dashboards",
    //   // });
    // } catch (error) {
    //   if (error.response) {
    //     utils._toast(error.response.data.responseMessage, "error");
    //   } else {
    //     utils._toast("Netwrok Error", "error");
    //   }
    //   setStateLoader(false);
    //   setState({ newPassword: "" });
    // }

  };


  const toggle = () => {
    setModal(!modal)
    // this.setState({
    //     modal: !this.state.modal
    // });
  }


  return (

    // <span className=>
    <div className="mb-2 mr-2">

      <Button color="primary" style={{ width: "100%" }} onClick={toggle}>{props.buttonVal}</Button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false} >
              <Container style={{ width: 'fit-content' }}>



                <CardTitle style={{ textAlign: "center" }}> PASSWORD</CardTitle>
                <form className={classes.form} noValidate>

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={!stateIsPasswordValid}
                    label="Enter Current Password"
                    type="password"
                    helperText={
                      stateIsPasswordValid ? "" : utils.Constants.passwordError
                    }
                    id="password"
                    autoComplete="current-password"
                    type="password"
                    name="newPassword"
                    placeholder="New Password here..."
                    value={state.password}
                    onChange={_onChange}
                    onBlur={onBlurHandler}
                    invalid={!stateIsPasswordValid}
                    valid={state.password ? stateIsPasswordValid : false}
                  />

                  <Button1
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                    disabled={!state.newPassword  ||stateLoader}

                  >
                    {stateLoader ? (
                      <div style={{ width: "130px" }}>
                        <Spinner
                          style={{ width: "20px", height: "20px" }}
                          color="light"
                        />
                      </div>
                    ) : (
                        "CONFIRM PASSWORD"
                      )}
                  </Button1>


                </form>

              </Container>

            </ReactCSSTransitionGroup>
          </Fragment>
        </ModalBody>
        {/* <ModalFooter>
                    <Button color="link" onClick={toggle}>No I want to go back</Button>
                    <Button color="primary" onClick={toggle}>Confirm</Button>{' '}
                  </ModalFooter> */}
      </Modal>
    </div>
    // </span>
  );
}


// console.log("MODAL BOOOL",this.props.modalbool)
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
    // signUpDataEmail:(emailData)=>dispatch({type:"SIGNUPEMAILDATA",payload:emailData}),
    updateEmailData: (emailData) => dispatch({ type: "UPDATE_EMAIL_DATA", payload: emailData }),

    updateNewEmail: (FORGETPASSWORD_EMAIL_DATA, navigate, stopLoader) => dispatch(updateNewEmail(FORGETPASSWORD_EMAIL_DATA, navigate, stopLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);

