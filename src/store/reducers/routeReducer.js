import { actionTypes } from '../common/types';

const initialState = {
  route: [],
  route_loading: true,
};

export const routeReducer = (state = initialState, { type, payload }) => {
  console.log('type, payload', type, payload);
  switch (type) {
    case actionTypes.ADD_ROUTE:
      console.log('new route', payload);
      console.log('old routes', state);
      return {
        ...state,
        route: [...state.route, payload.result],
        route_loading: false,
      };

    case 'SET_EMPTY_ROUTE':
      return {
        ...state,
        route: [],
        route_loading: true,
      };

    case actionTypes.EDIT_ROUTE:
      return {
        ...state,
        // bus: payload.result,
      };

    case actionTypes.FETCH_ALL_ROUTES:
      return {
        ...state,
        route: payload.result,
        route_loading: false,
      };

    case actionTypes.DELETE_ROUTE:
      return {
        ...state,
        // bus: payload.result
      };

    case actionTypes.REMOVE_ROUTE:
      const newRoutes = state.route.filter((route) => route._id !== payload);
      return {
        ...state,
        route: newRoutes,
      };

    default:
      return state;
  }
};
