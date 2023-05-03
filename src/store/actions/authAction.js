import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from "../../common/utils";
import firebase from "./../../config/firebase";
import { v4 as uuidv4 } from 'uuid';


export const getTotalCountOfCollections = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "auth/totalCountOfCollections", body: body },
      actionTypes.GET_TOTAL_COUNT_OF_COLLECTIONS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const updateData = (result) => async (dispatch) => {
  console.log("UPDATE DATA REDUX", result);
  dispatch({
    type: actionTypes.UPDATE_DATA,
    payload: {
      result,
    },
  });
};

export const slots = (schoolId, mode, slots) => async (dispatch) => {
  console.log("SLOTS REDUX", schoolId);
  console.log(slots);

  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "auth/updateSlots",
        body: {
          schoolId,
          action: mode,
          slots,
        },
      },
      actionTypes.INCREASE_SLOTS,
      dispatch
    );
    console.log("SLOTS RESPONSE ADDED", response);
  } catch (error) {
    console.log(error.message);
  }
  return response;
};

export const createCustomer = (email) => async (dispatch) => {
  console.log("CREATE CUSTOMER REDUX", email);

  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "billing/create-customer",
        body: {
          email,
        },
      },
      actionTypes.CREATE_CUSTOMER,
      dispatch
    );
    console.log("CREATE CUSTOMER RESPONSE ADDED", response);
  } catch (error) {
    console.log(error.message);
  }
  return response;
};

export const updateSubscription = (subId, custId, quantity) => async (
  dispatch
) => {
  console.log("Update Subscription REDUX", subId);

  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "billing/update-subscription",
        body: {
          subscriptionId: subId,
          customerId: custId,
          quantity,
        },
      },
      actionTypes.UPDATE_DATA,
      dispatch
    );
    console.log("Update Subscription RESPONSE ADDED", response);
  } catch (error) {
    console.log(error.message);
  }
  return response;
};

export const login = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("LOGIN REDUX", body);
  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "auth/login",
        body: body,
      },
      actionTypes.LOGIN,
      dispatch
    );
    console.log("LOGIN RESPONSE ADDED", response); 
    
    navigate();
    // if (response.status < 300) {
    // }
    // else {
    //   console.log("THORW ROEE")
    //   throw new Error()
    // }
  } catch (error) {
    stopLoader();
    console.log("====", error.message);
    if (error.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid Credentials", "error");
    }
  }
  return response;
};

export const signupEmail = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("SIGN UP EMAIL REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "auth/verifyEmail", body: body },
      actionTypes.SIGNUP,
      dispatch
    );
    if (response) {
      const uid=uuidv4()
      firebase.firestore().collection("users").doc(uid).set(
        {
          uid:uid,
          email:body.email,
          name:body.email.substr(0, body.email.indexOf('@')),
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    }
    console.log("SIGN UP EMAIL ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log("SIGNUP EMAIL ERROR", err.message);
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid Email", "error");
    }
  }
  return response;
};

export const signupOTP = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("SIGN UP OTP REDUX", body);
  console.log("SIGNUP OTP EMAIL", body.email);
  console.log("SIGNUP OTP CODE", body.OTPcode);

  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "auth/verifyOTP",
        body: body,
      },
      actionTypes.SIGNUP_OTP,
      dispatch
    );
    console.log("SIGNUP_OTP ADDED RESPONSE", response);
    // utils._toast("SIGNPPPPPPPPPPPPPPPPPPPPOTP", "sucess");

    navigate();
  } catch (err) {
    console.log("ERROR", err.message);
    stopLoader();
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid OTP", "error");
    }
  }
  return response;
};

export const signupPassword = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("SIGN UP PASSWORD REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "auth/setPassword", body: body },
      actionTypes.SIGNUP_PASSWORD,
      dispatch
    );
    console.log("SIGN UP PASSWORD  ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid Password", "error");
    }
  }
  return response;
};

export const signUpDataEmail = (body) => (dispatch) => {
  return actionTypes.SIGNUPEMAILDATA, dispatch;
};

export const updateEmailData = (body) => (dispatch) => {
  console.log("UPDATE EMAIL DATA REDUX", body);

  return actionTypes.UPDATE_EMAIL_DATA, dispatch;
};

export const forgetNewPassword = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("FORGET NEW PASSWORD REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "auth/setPassword", body: body },
      actionTypes.FORGET_NEW_PASSWORD,
      dispatch
    );
    console.log("FORGET NEW PASSWORD ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
    } else {
      utils._toast("Invalid Password", "error");
    }
  }
  return response;
};

export const updateNewEmail = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("UPDATE NEW EMAIL REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "auth/updateEmail", body: body },
      actionTypes.UPDATE_NEW_EMAIL,
      dispatch
    );
    console.log("UPDATE NEW EMAIL ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log("KAA", err.message);
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
    } else {
      utils._toast("Invalid Password", "error");
    }
  }
  return response;
};

export const updateNewEmailOTP = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("UPDATE EMAIL OTP REDUX", body);

  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: "auth/verifyNewEmailOTP",
        body: body,
      },
      actionTypes.UPDATE_EMAIL_OTP,
      dispatch
    );
    console.log("UPDATE EMAIL OTP ADDED RESPONSE", response);
    // utils._toast("SIGNPPPPPPPPPPPPPPPPPPPPOTP", "sucess");

    navigate();
  } catch (err) {
    console.log("ERROR", err.message);
    stopLoader();
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid OTP", "error");
    }
  }
  return response;
};

export const updateNewPassword = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("UPDATE NEW PASSWORD REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "auth/updatePassword", body: body },
      actionTypes.UPDATE_NEW_PASSWORD,
      dispatch
    );
    console.log("UPDATE NEW PASSWORD ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid Password", "error");
    }
  }
  return response;
};

export const setProfileInformation = (body, navigate, stopLoader) => async (
  dispatch
) => {
  console.log("PROFILE INFORMATION REDUX", body);
  let response;
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "auth/personalInfo", body: body },
      actionTypes.SET_PROFILE_INFO,
      dispatch
    );
    console.log("SET_PROFILE_INFO ADDED RESPONSE", response);

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid Profile Information", "error");
    }
  }
  return response;
};

// OUT OF SCOPE
export const forgotPassword = (body, navigate, stopLoader) => async (
  dispatch
) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "admin/sendCode", body: body },
      actionTypes.TOKEN,
      dispatch
    );
    navigate();
  } catch (err) {
    stopLoader();
    if (err.message == "Network Error") {
      utils._toast("Network Error", "error");
      // utils._toast(error.response.data.responseMessage, "error");
    } else {
      utils._toast("Invalid Email", "error");
    }
  }
  return response;
};

export const sendCode = (data) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: `/admin/sendCode`,
        body: { email: data.email },
      },
      null,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const verifyCode = (data) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: `/admin/verifyCode`,
        body: data.code,
      },
      null,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const resetPassword = (data) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      {
        method: "POST",
        endPoint: `/admin/passwordReset`,
        body: data.body,
      },
      null,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const logout = () => (dispatch) => {
  dispatch(actionCreator(actionTypes.LOGOUT, null));
};
