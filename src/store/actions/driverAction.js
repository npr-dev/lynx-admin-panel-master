import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from "../../common/utils";
import firebase from "./../../config/firebase";

export const addDriver = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("addDriver action request body", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "driver", body: body },
      actionTypes.ADD_DRIVER,
      dispatch
    );
    if (response) {
      firebase
        .firestore()
        .collection("users")
        .add({
          ...response,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  console.log("addDriver action response", response);
  return response;
};

export const addMultipleDrivers = (body) => async (dispatch) => {
  console.log("body", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "driver/multiple", body: body },
      actionTypes.ADD_MULTIPLE_DRIVERS,
      dispatch
    );
    console.log("response", response);
    if (response) {
      response.forEach((res) => {
        firebase
        .firestore()
        .collection("users")
        .add({
          ...res,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      })
    }
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchDrivers = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "driver/all", body: body },
      actionTypes.FETCH_ALL_DRIVERS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchUnassignedDrivers = (body) => async (dispatch) => {
  console.log("inside fetch unassign drivers request", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "driver/unassigned", body: body },
      actionTypes.FETCH_UNASSIGNED_DRIVERS,
      dispatch
    );
    console.log("fetch unassign drivers response", response);
    // addDrivers();
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchDriverHistory = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "driver/history", body: body },
      actionTypes.FETCH_DRIVER_HISTORY,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const deleteDriver = (body, remove) => async (dispatch) => {
  console.log("deleteDriver body", body);
  let response;
  try {
    response = await apiCreator(
      { method: "DELETE", endPoint: "driver", body: body },
      actionTypes.DELETE_DRIVER,
      dispatch
    );
    if (response) {
      var docFound = firebase
        .firestore()
        .collection("users")
        .where("email", "==", body.email);
      docFound.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref
            .delete()
            .then(() => {
              console.log("Document successfully deleted!");
            })
            .catch((error) => {
              console.error("Error removing document: ", error);
            });
        });
      });
    }
    remove();
  } catch (err) {
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const editDriver = (body, navigate, stopLoader) => async (dispatch) => {
  console.log("editDriver body", body);
  let response;
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "driver", body: body },
      actionTypes.EDIT_DRIVER,
      dispatch
    );
    if (response) {
      var docFound = firebase
        .firestore()
        .collection("users")
        .where("name", "==", body.driver.name);
      docFound.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref
            .update({ email: body.driver.email })
            .then(() => {
              console.log("Document successfully updated!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
        });
      });
    }
    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};
