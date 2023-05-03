import { actionTypes } from "../common/types";

const initialState = {
  data: []
};

export const dashboardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_DASHBOARD_ORDERS:
      //console.log("check poayload", payload.result)
      return {
        ...state,
        data: payload.result
      }
    default:
      return state;
  }
};