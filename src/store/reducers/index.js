import { actionTypes } from '../common';

import { combineReducers } from 'redux';
// reducers
import { themeOptionsReducer } from './ThemeOptions';
import { authReducer } from './authReducer';
import { busReducer } from './busReducer';
import { driverReducer } from './driverReducer';
import { parentReducer } from './parentReducer';
import { schoolReducer } from './schoolReducer';
import { studentReducer } from './studentReducer';

import { dashboardReducer } from './dashboardReducer';

import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';
import { portraitReducer } from './portraitReducer';
import { listSellReducer } from './listSellReducer';
import { notificationReducer } from './notificationReducer';
import { billingReducer } from './billingReducer';
import { routeReducer } from './routeReducer';
import { staticMessagesReducer } from './staticMessagesReducer';

const appReducer = combineReducers({
  ThemeOptions: themeOptionsReducer,
  auth: authReducer,
  bus: busReducer,
  driver: driverReducer,
  parent: parentReducer,
  school: schoolReducer,
  student: studentReducer,
  dashboard: dashboardReducer,
  product: productReducer,
  order: orderReducer,
  portrait: portraitReducer,
  listSell: listSellReducer,
  notification: notificationReducer,
  billing: billingReducer,
  route: routeReducer,
  staticMessages: staticMessagesReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
