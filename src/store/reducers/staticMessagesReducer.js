import { actionTypes } from '../common/types';

const initialState = {
  staticMessages: [],
  staticMessages_loading: true,
};

export const staticMessagesReducer = (state = initialState, { type, payload }) => {
  console.log('type, payload', type, payload);
  switch (type) {
    case actionTypes.ADD_STATIC_MESSAGE:
      return {
        ...state,
        staticMessages: [...state.staticMessages, payload.result],
        staticMessages_loading: false,
      };

    case 'SET_EMPTY_STATIC_MESSAGES':
      return {
        ...state,
        staticMessages: [],
        staticMessages_loading: true,
      };

    case actionTypes.EDIT_STATIC_MESSAGE:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_STATIC_MESSAGES:
      return {
        ...state,
        staticMessages: payload.result,
        staticMessages_loading: false,
      };

    case actionTypes.DELETE_STATIC_MESSAGE:
      return {
        ...state,
      };

    case actionTypes.REMOVE_STATIC_MESSAGE:
      const newStaticMessages = state.staticMessages.filter((StaticMessage) => StaticMessage._id !== payload);
      return {
        ...state,
        staticMessages: newStaticMessages,
      };

    default:
      return state;
  }
};
