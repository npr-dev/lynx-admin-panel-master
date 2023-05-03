import { actionTypes } from '../common/types';

const initialState = {
  billingHistory: [],
};

export const billingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_BILLING_HISTORY:
      return {
        ...state,
        billingHistory: payload.result,
      };

    default:
      return state;
  }
};
