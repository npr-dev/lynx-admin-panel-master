import { actionTypes, apiCreator, actionCreator } from '../common';
import * as utils from '../../common/utils';

export const addRoute = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'route', body: body },
      actionTypes.ADD_ROUTE,
      dispatch
    );

    console.log('added route', body);
    console.log('response of added route', response);

    navigate();
  } catch (err) {
    stopLoader();
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }

  return response;
};

export const fetchRoutes = (body) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'route/all', body: body },
      actionTypes.FETCH_ALL_ROUTES,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const deleteRoute = (body, remove) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'DELETE', endPoint: 'route', body: body },
      actionTypes.DELETE_ROUTE,
      dispatch
    );
    remove();
  } catch (err) {
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const editRoute = (body, navigate, stopLoader) => async (dispatch) => {
  console.log('EDIT ROUTE ACTION', body);
  let response;
  try {
    response = await apiCreator(
      { method: 'PATCH', endPoint: 'route', body },
      actionTypes.EDIT_ROUTE,
      dispatch
    );

    navigate();
  } catch (err) {
    stopLoader();
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }

  return response;
};
