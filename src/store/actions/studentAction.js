import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from '../../common/utils'

export const addStudent = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "students", body: body },
      actionTypes.ADD_STUDENT,
      dispatch
    );
    navigate();
  }
  catch (err) {
    stopLoader();
    console.log(err);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response
};

export const addMultipleStudents = (body) => async (dispatch) => {
  console.log("body",body)
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "students/multiple", body: body },
      actionTypes.ADD_MULTIPLE_STUDENTS,
      dispatch
    );
    console.log("response",response)
  }
  catch (err) {
    console.log("err",err)
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchStudents = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "students/all", body: body },
      actionTypes.FETCH_ALL_STUDENTS,
      dispatch
    );
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchStudentHistory = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "students/history", body: body },
      actionTypes.FETCH_STUDENT_HISTORY,
      dispatch
    );
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const deleteStudent = (body, remove) => async (dispatch) => {

  let response
  try {
    response = await apiCreator(
      { method: "DELETE", endPoint: "students", body: body },
      actionTypes.DELETE_STUDENT,
      dispatch
    );
    remove();
  }
  catch (err) {
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response
};

export const uploadStudentImage = (body) => async (dispatch) => {
  let response;
  console.log("UPLOAD IMAGE REDUX",body)
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "students/image/single", body: body },
      actionTypes.SET_STUDENT_IMAGE,
      dispatch
      );
      console.log("UPLOAD IMAGE REDUX 02",response)
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const uploadMulitpleStudentImages = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "students/image/multiple", body: body },
      actionTypes.SET_MULTIPLE_STUDENT_IMAGE,
      dispatch
    );
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const editStudent = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "students", body: body },
      actionTypes.EDIT_STUDENT,
      dispatch
    );
    navigate();
  }
  catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response

};