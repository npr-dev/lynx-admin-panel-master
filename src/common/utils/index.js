import * as reusableCode from "./reusableCode";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export { reusableCode };

export const _toast = (message, type) =>
    toast(message, {
      transition: Bounce,
      closeButton: true,
      autoClose: 3000,
      position: "bottom-center",
      type: type,
    });

export const isEmailValid = (email) => {
  let emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  return Boolean(emailValid);
};

export const isValueExist = (value) => {
  return Boolean(value);
};

export const isVerifyCodeValid = (value) => {
  return value.length >= 4 && value.length <= 6;
};

export const isPer = (value) => {
  return value.length >= 4 && value.length <= 6;
};

export const isOTPpinValid = (OTPpin) => {
  return (
    OTPpin.length == 6 &&
    OTPpin.match(/^\d+$/)
  );
};

export const isImageValid = (imgArray) => {
  return imgArray.length > 0;
};

export const isContactNumberValid = (number) => {
  return number.length >= 10;
};

export const isPasswordValid = (password) => {
  //console.log("check here password get", password);
  return (
    password.length > 5
    // &&
    // password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
  );
};

export const isPasswordRepeatValid = (passwordRepeat, password) => {
  return isPasswordValid(passwordRepeat) && passwordRepeat === password;
};

export const Constants = {
  emailError: "Invalid email address",
  passwordError:
    "passwords should be at least 8 characters in length.",
    OTPpinError:"Invalid OTP Code" 
};

export const Colors = {
  themeColor: "#10316b",
};
