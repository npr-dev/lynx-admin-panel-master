import { actionTypes, apiCreator } from "../common";

export const getNotification = (body) => dispatch => {
  return apiCreator(
    { method: "POST", endPoint: `auth/getAllNotifications`, body },
    actionTypes.GET_NOTIFICATION,
    dispatch
  );
};