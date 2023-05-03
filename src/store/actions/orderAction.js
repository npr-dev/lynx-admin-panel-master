import { actionTypes, apiCreator } from "../common";

export const getAllOrders = (order) => (dispatch) => {
  //console.log("get all order scall");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/orders?page=${order.page}&&status=${order.action}`,
    },
    actionTypes.GET_ALL_ORDERS,
    dispatch
  );
};

export const getPortraitOrders = (index) => (dispatch) => {
  //console.log("calling portraing in order action ohoo", index);
  return apiCreator(
    {
      method: "GET",
      endPoint: `/portrait_orders?page=${index.page}`,
    },
    actionTypes.GET_PORTRAIT_ORDERS,
    dispatch
  );
};

export const getListingOrders = (index) => (dispatch) => {
  //console.log("calling portraing in order action ohoo", index);
  return apiCreator(
    {
      method: "GET",
      endPoint: `/list_sell?page=${index.page}`,
    },
    actionTypes.GET_LISTING_ORDERS,
    dispatch
  );
};

export const getPendingOrders = (order) => (dispatch) => {
  //console.log("calls pending orders 5522");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/orders?page=${order.page}&&status=${order.action}`,
    },
    actionTypes.GET_PENDING_ORDERS,
    dispatch
  );
};

export const approvedOrder = (id, action) => (dispatch) => {
  //console.log("calls pending orders2", action);
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/orders/${id}?action=${action}`,
    },
    actionTypes.SUCCESS,
    dispatch
  );
};

export const tracking = (id, body) => (dispatch) => {
  //console.log("calls tracking orders2", id);
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/orders/tracking/${id}`,
      body: {
        tracking: body,
      },
    },
    null,
    dispatch
  );
};

export const setCharges = (body) => (dispatch) => {
  //console.log("calls pending charges");
  return apiCreator(
    {
      method: "POST",
      endPoint: `/charges`,
      body,
    },
    actionTypes.SET_CHARGES,
    dispatch
  );
};

export const getCharges = () => (dispatch) => {
  //console.log("calls pending getcharges");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/charges`,
    },
    actionTypes.GET_CHARGES,
    dispatch
  );
};
