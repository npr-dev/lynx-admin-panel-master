import { actionTypes } from "../common/types";

const initialState = {
  school: [],
};

export const schoolReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.EDIT_SCHOOL:
      console.log("school edited")
      return {
        ...state,
        // school: payload.result,
      };


    case actionTypes.FETCH_ALL_PACKAGES:
      return {
        ...state,
        packages: payload.result,
      };

    default:
      return state;
  }
};
