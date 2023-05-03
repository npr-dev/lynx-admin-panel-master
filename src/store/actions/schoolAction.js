import { actionTypes, apiCreator, actionCreator } from "../common";
import * as utils from '../../common/utils'

export const fetchPackages = () => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: "GET", endPoint: "package", body: {} },
      actionTypes.FETCH_ALL_PACKAGES,
      dispatch
    );
  }
  catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }
  return response;
};

export const editSchool = (body, update, stopLoader, stopEditing, error) => async (dispatch) => {
  let response
  try {
    response = await apiCreator(
      { method: "PATCH", endPoint: "auth", body: body },
      actionTypes.EDIT_SCHOOL,
      dispatch
    );
    update();
    stopLoader();
    stopEditing();
    utils._toast("Profile Updated Successfully", "success");

  }
  catch (err) {
    stopLoader();
    error();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, "error");
  }

  return response
};