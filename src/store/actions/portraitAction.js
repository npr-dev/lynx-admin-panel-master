import { actionTypes, apiCreator } from "../common";

export const getPortraitOrders = (body) => (dispatch) => {
  //console.log("portrait  selling ashdsads", body);
  return apiCreator(
    {
      method: "GET",
      endPoint: `/portrait_orders?page=${body.page}&&status=${body.status}`,
    },
    actionTypes.GET_PORTRAIT_ORDERS,
    dispatch
  );
};

export const getPortraitRequestOrders = (body) => (dispatch) => {
  //console.log("calling request body");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/portrait_orders?page=${body.page}&&status=${body.status}`,
    },
    actionTypes.GET_PORTRAIT_REQUEST_ORDERS,
    dispatch
  );
};

export const tracking = (id, body) => (dispatch) => {
  //console.log("calls tracking portrait", id);
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/portrait_orders/tracking/${id}`,
      body: {
        tracking: body,
      },
    },
    null,
    dispatch
  );
};

export const onApproved = (id, status) => (dispatch) => {
  //console.log("calling request body", id);
  return apiCreator(
    {
      method: "PUT",
      endPoint: `/portrait_orders/${id}?status=${status}`,
    },
    actionTypes.Approved_PORTRAIT_ORDERS,
    dispatch
  );
};
