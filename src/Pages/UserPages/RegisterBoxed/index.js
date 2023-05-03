import React, { Fragment, useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Input,
  FormFeedback,
  Spinner
} from "reactstrap";
import { useDispatch } from "react-redux";

//import css module
import "react-flags-select/css/react-flags-select.css";

// import "react-phone-input-2/dist/style.css";

import { authActions } from "../../../store/actions";
import * as utils from "../../../common/utils";

const RegisterBoxed = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [stateLoader, setStateLoader] = useState(false);
  const [passwordrepState, setPasswordRepState] = useState("");

  const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
  const [stateIsAdminNameValid, setStateIsVendorNameValid] = useState(true);
  const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);

  const [stateIsPasswordrepValid, setStateIsPasswordrepValid] = useState(true);

  const [stateIsFormValid, setStateIsFormValid] = useState(false);

  const _onChange = event => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    validateForm();
  });


  const _onChangePasswordRep = event => {
    setPasswordRepState(event.target.value);
  };

  function onBlurHandler(event) {
    const { name, value } = event.target;
    validateField(name, value);
  }

  function onBlurPasswordRepeatHandler(event) {
    validateField("passwordrep", event.target.value);
  }

  function validateField(fieldName, value) {
    switch (fieldName) {
      case "name":
        let nameValid = utils.isValueExist(value);
        setStateIsVendorNameValid(nameValid);
        validateForm();
        break;

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

      case "passwordrep":
        let passwordrepValid = utils.isPasswordRepeatValid(
          value,
          state.password
        );
        setStateIsPasswordrepValid(passwordrepValid);
        validateForm();
        break;

      default:
        break;
    }
  }

  function validateForm() {
    let nameValid = false,
      emailValid = false,
      passwordrepValid = false,
      passwordValid = false;

    nameValid = utils.isValueExist(state.name);
    emailValid = utils.isEmailValid(state.email);
    passwordValid = utils.isPasswordValid(state.password);
    passwordrepValid = utils.isPasswordRepeatValid(
      passwordrepState,
      state.password
    );
    setStateIsFormValid(
      nameValid &&
      emailValid &&
      passwordValid &&
      passwordrepValid
    );
  }

  function setStateToEmpty() {
    setState(prevState => ({
      ...prevState,
      name: "",
      email: "",
      password: ""
    }));
    setPasswordRepState("");
  }

  function onClickForgotPassword() {
    props.history.push({
      pathname: "/dashboard/analytics"
    });
  }

  const onSignUp = async () => {
    try {
      setStateLoader(true);
      doSignup()
    } catch (error) {
      setStateToEmpty();
      setStateLoader(false);
      utils._toast(
        "Somthing went Wrong! this account details already exits try another one",
        "error"
      );
    }
  };

  async function doSignup() {
    try {
      const signupResult = await dispatch(authActions.signup(state));
      if (signupResult) {
        setStateToEmpty();
        setStateLoader(false);
        props.history.push({
          pathname: "/dashboard/analytics"
        });
      }
    } catch (error) {
      setStateLoader(false);
      setStateToEmpty();
      utils._toast(
        "Somthing went Wrong! this email details already exits try another one",
        "error"
      );
    }
  }

  return (
    <Fragment>
      <div className="bg-premium-dark">
        <div className="d-flex justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            <div
              style={{
                display: "flex",
                marginTop: "30px",
                justifyContent: "center"
              }}
            >
              <p style={{ fontSize: "40px", fontWeight: "bold" }}>
                African Art
                </p>
            </div>

            <div className="modal-dialog w-100">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="modal-title">
                    <h4 className="mt-2">
                      <div>Welcome,</div>
                      <span>
                        It only takes a{" "}
                        <span className="text-success">few seconds</span> to
                        create your account
                      </span>
                    </h4>
                  </div>
                  <Row className="divider" />
                  <Row form>
                    <Col md={12}>
                      <FormGroup>
                        <Input
                          type="text"
                          name="name"
                          id="exampleName"
                          placeholder="Admin Name here..."
                          value={state.name}
                          onBlur={onBlurHandler}
                          onChange={_onChange}
                          invalid={!stateIsAdminNameValid}
                          valid={state.name ? stateIsAdminNameValid : false}
                        />
                        {!stateIsAdminNameValid && (
                          <FormFeedback>
                            Admin Name is required...
                          </FormFeedback>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="email"
                          name="email"
                          id="exampleEmail"
                          placeholder="Email here..."
                          value={state.email}
                          onChange={_onChange}
                          onBlur={onBlurHandler}
                          invalid={!stateIsEmailValid}
                          valid={state.email ? stateIsEmailValid : false}
                        />
                        {!stateIsEmailValid && (
                          <FormFeedback>Invalid email address...</FormFeedback>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="Password here..."
                          value={state.password}
                          onBlur={onBlurHandler}
                          onChange={_onChange}
                          invalid={!stateIsPasswordValid}
                          valid={state.password ? stateIsPasswordValid : false}
                        />
                        {!stateIsPasswordValid && (
                          <FormFeedback>
                            {utils.Constants.passwordError}
                          </FormFeedback>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="password"
                          name="passwordrep"
                          id="examplePasswordRep"
                          placeholder="Repeat Password here..."
                          value={passwordrepState}
                          onBlur={onBlurPasswordRepeatHandler}
                          onChange={_onChangePasswordRep}
                          invalid={!stateIsPasswordrepValid}
                          valid={
                            passwordrepState ? stateIsPasswordrepValid : false
                          }
                        />
                        {!stateIsPasswordrepValid && (
                          <FormFeedback>
                            Password and repeat password must be same...
                          </FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="divider" />
                  <h6 className="mb-0">
                    Already have an account?{" "}
                    <a href="/#" className="text-primary">
                      Sign in
                    </a>{" "}
                    |{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={onClickForgotPassword}
                    >
                      Forgot Password
                    </span>
                  </h6>
                </div>
                <div className="modal-footer d-block text-center">
                  <Button
                    color="primary"
                    className="btn-wide btn-pill btn-shadow btn-hover-shine"
                    size="lg"
                    disabled={!stateIsFormValid}
                    onClick={onSignUp}
                  >
                    {stateLoader ? (
                      <div style={{ width: "130px" }}>
                        <Spinner
                          style={{ width: "25px", height: "25px" }}
                          color="light"
                        />
                      </div>
                    ) : (
                        "Create Account"
                      )}
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterBoxed;
