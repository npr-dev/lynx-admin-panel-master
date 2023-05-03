import { actionTypes } from "../common/types";

const initialState = {
  allArts: [],
  generalArts: [],
  masterPieceArts: [],
  auctionArts: [],
  artSearchList: [],
  reserveArts: [],
  tradeArts: []
};

export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_ALL_ARTS:
      return {
        ...state,
        allArts: payload.result
      };
    case actionTypes.GET_GENERAL_ARTS:
      return {
        ...state,
        generalArts: payload.result
      };

    case actionTypes.GET_AUCTION_ARTS:
      return {
        ...state,
        auctionArts: payload.result
      };

    case actionTypes.GET_MASTERPIECE_ARTS:
      return {
        ...state,
        masterPieceArts: payload.result
      };

    case actionTypes.GET_RESERVE_ARTS:
      return {
        ...state,
        reserveArts: payload.result
      };

    case actionTypes.GET_TRADES:
      return {
        ...state,
        tradeArts: payload.result
      };

    case actionTypes.EDIT_PRODUCT:
      return {
        ...state
      };

    case actionTypes.DELETE_PRODUCT:
      return {
        ...state
      };

    case actionTypes.GET_ALL_PRODUCTS_LIST_FOT_SEARCH:
      let productsNameListForSearch = [];
      for (let i = 0; i < payload.result.length; i++) {
        productsNameListForSearch.push({
          key: payload.result[i]._id,
          value: payload.result[i].title
        });
      }

      return {
        ...state,
        artSearchList: productsNameListForSearch
      };

    default:
      return state;
  }
};
