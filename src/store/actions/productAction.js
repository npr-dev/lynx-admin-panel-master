import { actionTypes, apiCreator } from "../common";

export const addProduct = (body) => (dispatch) => {
  return apiCreator(
    { method: "POST", endPoint: "arts/add", body: body },
    actionTypes.ADD_PRODUCT,
    dispatch
  );
};

export const getAllArts = (index) => (dispatch) => {
  return apiCreator(
    {
      method: "GET",
      endPoint: `/arts?category=all&&page=${index.page}&&region=${index.region}`,
    },
    actionTypes.GET_ALL_ARTS,
    dispatch
  );
};

export const getGeneralArts = (index) => (dispatch) => {
  //console.log("view herre general arts only");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/arts?category=general&&page=${index.page}&&region=${index.region}`,
    },
    actionTypes.GET_GENERAL_ARTS,
    dispatch
  );
};

export const getAuctionArts = (index) => (dispatch) => {
  //console.log("view herre auction arts only");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/auction?page=${index.page}&&region=${index.region}`,
    },
    actionTypes.GET_AUCTION_ARTS,
    dispatch
  );
};

export const getReserveArts = (index) => (dispatch) => {
  return apiCreator(
    { method: "GET", endPoint: `/reserves?page=${index.page}` },
    actionTypes.GET_RESERVE_ARTS,
    dispatch
  );
};

export const getTradeArts = (index) => (dispatch) => {
  return apiCreator(
    { method: "GET", endPoint: `/reserves/trade?page=${index.page}` },
    actionTypes.GET_TRADES,
    dispatch
  );
};

export const getMasterPieceArts = (index) => (dispatch) => {
  //console.log("view herre auction arts only");
  return apiCreator(
    {
      method: "GET",
      endPoint: `/arts?category=masterpiece&&page=${index.page}&&region=${index.region}`,
    },
    actionTypes.GET_MASTERPIECE_ARTS,
    dispatch
  );
};

// get products list of names
export const getAllProductsListForSearch = (search) => (dispatch) => {
  //console.log("calling get all products stsate here 1221", search);
  return apiCreator(
    { method: "GET", endPoint: `/search?term=${search}` },
    actionTypes.GET_ALL_PRODUCTS_LIST_FOT_SEARCH,
    dispatch
  );
};

export const getArt = (productId) => (dispatch) => {
  return apiCreator(
    { method: "GET", endPoint: `/static/img/${productId}` },
    actionTypes.VIEW_ART,
    dispatch
  );
};

export const deleteArt = (id) => (dispatch) => {
  return apiCreator(
    { method: "DELETE", endPoint: `/arts/${id}` },
    actionTypes.GET_GENERAL_ARTS,
    dispatch
  );
};

export const deleteAuction = (id) => (dispatch) => {
  //console.log("view herre auction arts only deleting 123", id);
  return apiCreator(
    { method: "DELETE", endPoint: `/auction/${id}` },
    actionTypes.GET_AUCTION_ARTS,
    dispatch
  );
};

export const updatedArt = (id, body) => (dispatch) => {
  //console.log("view payload body here", body);
  return apiCreator(
    { method: "PUT", endPoint: `/arts/${id}`, body: body },
    actionTypes.UPDATE_ART,
    dispatch
  );
};

export const updateAuction = (id, body) => (dispatch) => {
  //console.log("view payload auction request body here", body);
  return apiCreator(
    { method: "PUT", endPoint: `/auction/update/${id}`, body: body },
    actionTypes.UPDATE_ART,
    dispatch
  );
};