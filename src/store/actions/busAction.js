import { actionTypes, apiCreator, actionCreator } from '../common';
import * as utils from '../../common/utils';

export const addBus = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'bus', body: body },
      actionTypes.ADD_BUS,
      dispatch
    );

    console.log('added bus', body);
    console.log('response of added bus', response);

    navigate();
  } catch (err) {
    stopLoader();
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }

  return response;
};

export const addMultipleBuses = (body) => async (dispatch) => {
  console.log("body",body)
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "bus/multiple", body: body },
      actionTypes.ADD_MULTIPLE_BUSES,
      dispatch
    );
    console.log("response",response)
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};


export const fetchBuses = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'bus/all', body: body },
      actionTypes.FETCH_ALL_BUSES,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const fetchUnassignedBuses = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'bus/unassigned', body: body },
      actionTypes.FETCH_UNASSIGNED_BUSES,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const fetchBus = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'bus/view', body: body },
      actionTypes.FETCH_SINGLE_BUS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const fetchBusStudents = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'students/students', body: body },
      actionTypes.FETCH_BUS_STUDENTS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const fetchUnassignedStudents = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'students/unassigned', body: body },
      actionTypes.FETCH_UNASSIGNED_STUDENTS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const deleteBus = (body, remove) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'DELETE', endPoint: 'bus', body: body },
      actionTypes.DELETE_BUS,
      dispatch
    );
    remove();
  } catch (err) {
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  console.log('bus actions delete action', response);
  return response;
};

export const assignStudent = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'bus/assign', body: body },
      actionTypes.ASSIGN_STUDENT,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const unassignStudent = (body, removeStudent) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'bus/unassign', body: body },
      actionTypes.UNASSIGN_STUDENT,
      dispatch
    );
    removeStudent();
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const editBus = (body, navigate, stopLoader) => async (dispatch) => {
  console.log('EDIT BUS ACTION', body);
  let response;
  try {
    response = await apiCreator(
      { method: 'PATCH', endPoint: 'bus', body },
      actionTypes.EDIT_BUS,
      dispatch
    );

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }

  return response;
};
