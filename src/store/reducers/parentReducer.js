import { actionTypes } from "../common/types";

const initialState = {
  parent: [],
  children: [],
  parent_loading: true,
};

export const parentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case actionTypes.ADD_PARENT:
    //   return {
    //     ...state,
    //     parent: payload.result,
    //   };

    case actionTypes.ADD_PARENT:
      return {
        ...state,
        parent: [...state.parent, payload.result],
      };

    case actionTypes.ADD_MULTIPLE_PARENTS:
      return {
        ...state,
        parent: [...state.parent, ...payload.result],
      };

    case actionTypes.EDIT_PARENT:
      return {
        ...state,
        // parent: payload.result,
      };

    case "SET_EMPTY_PARENT":
      return {
        ...state,
        parent: [],
        parent_loading: true,
      };

    case actionTypes.FETCH_ALL_PARENTS:
      return {
        ...state,
        parent: payload.result,
        parent_loading: false,
      };

    case actionTypes.FETCH_PARENT_CHILDREN:
      return {
        ...state,
        children: payload.result,
      };

    case actionTypes.DELETE_PARENT:
      return {
        ...state,
      };

    case actionTypes.REMOVE_PARENT:
      const newParent = state.parent.filter((parent) => parent._id !== payload);
      return {
        ...state,
        parent: newParent,
      };

    case actionTypes.REVOKE_REGISTERATION:
      console.log("revoke payload", payload.result._id);
      const parentToUpdate = state.parent.findIndex(
        (parent) => parent._id === payload.result._id
      );
      const updatedParent = state.parent;
      updatedParent[parentToUpdate].registered = false;
      console.log("updated parent ==>", updatedParent);
      return {
        ...state,
        parent: updatedParent,
      };

    default:
      return state;
  }
};
