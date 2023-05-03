import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import LoginBoxed from "./LoginBoxed/";

import RegisterBoxed from "./RegisterBoxed/";

import ForgotPasswordBoxed from "./ForgotPasswordBoxed/";
import OnboardEmailBoxed from "./OnBoardEmail"
import OnBoardOTPboxed from "./OnBoardOTPboxed"
import OnBoardPersonal from "./OnBoardPersonal"
import PersonalInformation from "./PersonalInformation"
import VerifyCode from "./VerifyCode";
import ResetPassword from "./ResetPassword";
import ForgetPasswordEmail from "./ForgetPasswordEmail";
import ForgetPasswordOTP from "./ForgetPasswordOTP";
import ForgetPasswordNewPassword from "./ForgetPasswordNewPassword";
import App from "./StepperForm/main";
import OnBoardPassword from "./OnBoardPassword";
// import main from "./Stepform/main";

const UserPages = ({ match }) => (
  < Fragment >
    <div className="app-container">
      <Route path={`${match.url}/login`} component={LoginBoxed} />
      <Route path={`${match.url}/register`} component={RegisterBoxed} />
      <Route path={`${match.url}/forgot-password`} component={ForgotPasswordBoxed} />
      <Route path={`${match.url}/verify-code`} component={VerifyCode} />
      <Route path={`${match.url}/reset-password`} component={ResetPassword} />
      <Route path={`${match.url}/onboard-email-boxed`} component={OnboardEmailBoxed} />
      <Route path={`${match.url}/onboard-OTP-boxed`} component={OnBoardOTPboxed} />
      <Route path={`${match.url}/onboard-personal-boxed`} component={OnBoardPersonal} />
      <Route path={`${match.url}/onboard-password-boxed`} component={OnBoardPassword} />
      {/* <Route path={`${match.url}/onboard-personal-info-boxed`} component={PersonalInformation} /> */}
      <Route path={`${match.url}/forget-password-email`} component={ForgetPasswordEmail} />
      <Route path={`${match.url}/forget-password-OTP`} component={ForgetPasswordOTP} />
      <Route path={`${match.url}/forget-new-password-boxed`} component={ForgetPasswordNewPassword} />
      <Route path={`${match.url}/wizard`} component={App}/>

    </div>
  </Fragment >
);

export default UserPages;
