import { actionTypes, apiCreator } from "../common";

export const getDashboardOrders = () => dispatch => {
  //console.log('get dashboard ataw')
  return apiCreator(
    { method: "GET", endPoint: `/dashboard/orders` },
    actionTypes.GET_DASHBOARD_ORDERS,
    dispatch
  );
};