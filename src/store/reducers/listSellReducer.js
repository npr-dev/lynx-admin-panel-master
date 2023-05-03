import { actionTypes } from "../common/types";

const initialState = {
  approvedOrders: [],
  requestOrders: [],
};

export const listSellReducer = (state = initialState, { type, payload }) => {
  //console.log("view type here", type, payload);
  switch (type) {
    case actionTypes.GET_LISTING_APPROVED_ORDERS:
      return {
        ...state,
        approvedOrders: payload.result,
      };

    case actionTypes.GET_LISTING_REQUEST_ORDERS:
      return {
        ...state,
        requestOrders: payload.result,
      };

    default:
      return state;
  }
};
