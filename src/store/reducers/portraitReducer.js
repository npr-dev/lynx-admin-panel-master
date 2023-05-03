import { actionTypes } from "../common/types";

const initialState = {
  approvedOrders: [],
  requestOrders: [],
};

export const portraitReducer = (state = initialState, { type, payload }) => {
  //console.log("watch", type, payload);
  switch (type) {
    case actionTypes.GET_PORTRAIT_ORDERS:
      //console.log("view action here", type);
      return {
        ...state,
        approvedOrders: payload.result,
      };

    case actionTypes.GET_PORTRAIT_REQUEST_ORDERS:
      //console.log("view action here", type);
      return {
        ...state,
        requestOrders: payload.result,
      };

    case actionTypes.Approved_PORTRAIT_ORDERS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
