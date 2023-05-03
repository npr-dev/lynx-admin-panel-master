import { actionTypes, apiCreator, actionCreator } from '../common';
import * as utils from '../../common/utils';

export const fetchHistory = (body, error) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      {
        method: 'POST',
        endPoint: 'billing/all',
        body: {
          schoolId: body,
        },
      },
      actionTypes.FETCH_BILLING_HISTORY,
      dispatch
    );
    console.log(response);
  } catch (err) {
    console.log(err.message);
  }

  return response;
};
