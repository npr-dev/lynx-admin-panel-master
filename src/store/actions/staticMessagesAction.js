import { actionTypes, apiCreator, actionCreator } from '../common';
import * as utils from '../../common/utils';

export const addStaticMessage = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'staticMessage', body: body },
      actionTypes.ADD_STATIC_MESSAGE,
      dispatch
    );

    console.log('added StaticMessage', body);
    console.log('response of added StaticMessage', response);

    navigate();
  } catch (err) {
    stopLoader();
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }

  return response;
};

export const fetchStaticMessages = (body) => async (dispatch) => {
    console.log("body in fetchStaticMessages action",body)
  let response;
  try {
    response = await apiCreator(
      { method: 'POST', endPoint: 'staticMessage/all', body: body },
      actionTypes.FETCH_ALL_STATIC_MESSAGES,
      dispatch
    );
  } catch (err) {
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  console.log("fetchStaticMessages response",response)
  return response;
};

export const deleteStaticMessage = (body, remove) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'DELETE', endPoint: 'staticMessage', body: body },
      actionTypes.DELETE_STATIC_MESSAGE,
      dispatch
    );
    remove();
  } catch (err) {
    console.log(err.message);
    utils._toast(err.response ? err.response.data.error : err.message, 'error');
  }
  return response;
};

export const updateStaticMessage = (body, navigate, stopLoader) => async (dispatch) => {
  let response;
  try {
    response = await apiCreator(
      { method: 'PATCH', endPoint: 'staticMessage', body },
      actionTypes.EDIT_STATIC_MESSAGE,
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
