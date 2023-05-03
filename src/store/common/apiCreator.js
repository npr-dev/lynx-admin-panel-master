import { actionCreator } from '../common';
import axios from 'axios';
import * as utils from '../../common/utils';
export const serverURL = process.env.REACT_APP_SERVER_URL;
// export const serverURL = "http://localhost:4000";
// export const cloudinaryUrl = "https://api.cloudinary.com/v1_1/xord-pvt-ltd/image/upload"
// export const uploadPreset = "j3plnemu"

const optionsCretor = (props) => {
  return {
    header: localStorage.getItem('token')
      ? {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
      : {},
    method: props.method,
    url: `${serverURL}${props.endPoint}`,
    data: props.body || {},
  };
};

export const apiCreator = async (props, type, dispatch, state) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(optionsCretor(props));

      console.log('response --> ', response);
      let { result } = response.data;
      console.log('response status ==>', response.status);
      if (response.status >= 300) {
        console.log('errrorrr');
        throw new Error(response);
      } else {
        result = response.data;
        console.log('api response -->', result);
        if (type === 'LOGIN') {
          utils._toast('ACCOUNT SUCCESFULLY LOGGED IN', 'success');
        }
        if (type === 'SIGNUP') {
          utils._toast('EMAIL VERIFIED', 'success');
        }
        if (type === 'SIGNUP_OTP') {
          console.log('SIGN UP OTP API CREATOR');
          utils._toast('OTP VERIFIED', 'success');
        }
        if (type === 'SIGNUP_PASSWORD') {
          utils._toast('Password set succesfully', 'success');
        }
        if (type === 'FORGET_NEW_PASSWORD') {
          utils._toast('New Password set succesfully', 'success');
        }
        if (type === 'UPDATE_NEW_EMAIL') {
          utils._toast('Password Verified', 'success');
        }
        if (type === 'UPDATE_EMAIL_OTP') {
          utils._toast('Email Updated Successfully', 'success');
        }
        if (type === 'UPDATE_NEW_PASSWORD') {
          utils._toast('Password updated succesfully', 'success');
        }
        if (type === 'SET_PROFILE_INFO') {
          utils._toast('PROFILE COMPLETED', 'success');
        }
        if (type === 'ADD_BUS') {
          utils._toast('Bus Added', 'success');
        }
        if (type === 'DELETE_BUS') {
          utils._toast('Bus Deleted', 'success');
        }
        if (type === 'ASSIGN_STUDENT') {
          utils._toast('Student Assigned', 'success');
        }
        if (type === 'UNASSIGN_STUDENT') {
          utils._toast('Student Removed', 'success');
        }
        if (type === 'EDIT_BUS') {
          utils._toast('Bus Updated', 'success');
        }
        if (type === 'ADD_ROUTE') {
          utils._toast('Route Added', 'success');
        }
        if (type === 'DELETE_ROUTE') {
          utils._toast('Route Deleted', 'success');
        }
        if (type === 'EDIT_ROUTE') {
          utils._toast('Route Updated', 'success');
        }
        if (type === 'ADD_DRIVER') {
          utils._toast('Driver Added', 'success');
        }
        if (type === 'DELETE_DRIVER') {
          utils._toast('Driver Deleted', 'success');
        }
        if (type === 'EDIT_DRIVER') {
          utils._toast('Driver Updated', 'success');
        }
        if (type === 'ADD_PARENT') {
          utils._toast('Parent Added', 'success');
        }
        if (type === 'EDIT_PARENT') {
          utils._toast('Parent Updated', 'success');
        }
        if (type === 'DELETE_PARENT') {
          utils._toast('Parent Deleted', 'success');
        }
        if (type === 'REVOKE_REGISTERATION') {
          utils._toast("Parent's Registeration Revoked", 'success');
        }
        if (type === 'ADD_STUDENT') {
          utils._toast('Student Added', 'success');
        }
        if (type === 'DELETE_STUDENT') {
          utils._toast('Student Deleted', 'success');
        }
        if (type === 'EDIT_STUDENT') {
          utils._toast('Student Updated', 'success');
        }
        if (type === 'ADD_MULTIPLE_STUDENTS') {
          utils._toast('Multiple Students Added', 'success');
        }
        if (type === 'SET_STUDENT_IMAGE') {
          utils._toast("Student's Image Uploaded", 'success');
        }
        if (type === 'SET_MULTIPLE_STUDENT_IMAGE') {
          utils._toast("Multiple Students' Images Uploaded", 'success');
        }
        if (type) {
          dispatch(actionCreator(type, { result: result, state: state }));
        }
        resolve(result);
      }
    } catch (err) {
      console.log('error occured', err);
      // if (err === "Error: Network Error")
      //   utils._toast("Network Error, please check your internet connection", "error");
      reject(err);
      throw err;
    }
  });
};
