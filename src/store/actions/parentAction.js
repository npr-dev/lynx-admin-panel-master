import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from "../../common/utils";
import firebase from "./../../config/firebase";

export const fetchParents = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "parent/all", body: body },
      actionTypes.FETCH_ALL_PARENTS,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const fetchChildren = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "students/children", body: body },
      actionTypes.FETCH_PARENT_CHILDREN,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const deleteParent = (body, remove) => async (dispatch) => {
  console.log("deleteParent body",body)
  let response;
  try {
    response = await apiCreator(
      { method: "DELETE", endPoint: "parent", body: body },
      actionTypes.DELETE_PARENT,
      dispatch
    );
    if (response) {
      // firebase
      //   .firestore()
      //   .collection("users")
      //   .where("email", "==", body.email)
      //   .delete()
      //   .then(() => {
      //     console.log("Document successfully deleted!");
      //   })
      //   .catch((error) => {
      //     console.error("Error removing document: ", error);
      //   });

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

export const revokeRegisteration = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "parent/revoke", body: body },
      actionTypes.REVOKE_REGISTERATION,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const editParent = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "parent", body: body },
      actionTypes.EDIT_PARENT,
      dispatch
    );
  console.log("response",response)

    if (response) {
      var docFound = firebase
        .firestore()
        .collection("users")
        .where("name", "==", body.parent.name);
      docFound.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref
            .update({"email":body.parent.email})
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

export const addParent = (body, navigate, stopLoader) => async (
  dispatch,
  getState
) => {
  console.log("parent action", body);
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "parent", body: body },
      actionTypes.ADD_PARENT,
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
  return response;
};

export const addMultipleParents = (body) => async (dispatch) => {
  console.log("body",body)
  let response;
  try {
    response = await apiCreator(
      { method: "POST", endPoint: "parent/multiple", body: body },
      actionTypes.ADD_MULTIPLE_PARENTS,
      dispatch
    );
    console.log("response",response)
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
  }
  catch (err) {
    console.log("err.response.data.error",err.response.data.error)
    console.log("err.response",err.response)
    console.log("err.message",err.message)
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};
