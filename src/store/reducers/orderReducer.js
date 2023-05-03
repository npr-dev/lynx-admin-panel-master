import { actionTypes } from "../common/types";

const initialState = {
  allOrders: [],
  approvedOrders: [],
  requestOrders: [],
  charges: {},
};

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_ALL_ORDERS:
      return {
        ...state,
        approvedOrders: payload.result,
      };

    case actionTypes.GET_APPROVED_ORDERS:
      return {
        ...state,
        approvedOrders: payload.result,
      };

    case actionTypes.GET_PENDING_ORDERS:
      //console.log("receve pending details here bro==>", payload);
      return {
        ...state,
        requestOrders: payload.result,
      };

    case actionTypes.GET_CHARGES:
      //console.log("receve pending details here bsadro==>", payload.result);
      return {
        ...state,
        charges: payload.result,
      };

    case actionTypes.SET_CHARGES:
      return {
        ...state,
        charges: payload.result,
      };

    default:
      return state;
  }
};