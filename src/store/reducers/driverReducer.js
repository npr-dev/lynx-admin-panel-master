import { actionTypes } from "../common/types";

const initialState = {
  driver: [],
  driver_loading: true,
  unassignedDriver: [],
  driverHistory: [],
};

export const driverReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_DRIVER:
      return {
        ...state,
        driver: [...state.driver, payload.result],
      };

    case actionTypes.ADD_MULTIPLE_DRIVERS:
      return {
        ...state,
        driver: [...state.driver, ...payload.result],
      };

    case "SET_EMPTY_DRIVER":
      return {
        ...state,
        driver: [],
        driver_loading: true,
      };

    case actionTypes.EDIT_DRIVER:
      return {
        ...state,
        // driver: payload.result,
      };

    case actionTypes.FETCH_ALL_DRIVERS:
      return {
        ...state,
        driver: payload.result,
        driver_loading: false,
      };

    case actionTypes.FETCH_UNASSIGNED_DRIVERS:
      console.log("inside reducer FETCH_UNASSIGNED_DRIVERS", payload.result);
      return {
        ...state,
        unassignedDriver: payload.result,
      };

    case actionTypes.FETCH_DRIVER_HISTORY:
      return {
        ...state,
        driverHistory: payload.result,
      };

    case actionTypes.DELETE_DRIVER:
      return {
        ...state,
      };

    case actionTypes.REMOVE_DRIVER:
      const newDriver = state.driver.filter((driver) => driver._id !== payload);
      return {
        ...state,
        driver: newDriver,
      };

    default:
      return state;
  }
};
