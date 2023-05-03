import React, { Fragment } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PaginationComp } from "../../../assets/components/shimmerComponents";
import { Card } from "reactstrap";
import {
  productActions,
  orderActions,
  listSellActions,
  portraitActions,
} from "../../../store/actions";
class TablePagination extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      currentPage: 0,
      isFetchingProducts: false,
    };
  }

  componentDidMount = async () => {
    //console.log("recienasda  proosp", this.props);
    const { tableName, user, area } = this.props;
    //console.log("check area", area);
    let region = "";
    if (area == "African Art") {
      region = "af";
    } else {
      region = "int";
    }
    var res;
    if (tableName) {
      switch (tableName) {
        case "all":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getAllArts({
            page: 0,
            region: region,
          });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "general":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getGeneralArts({
            page: 0,
            region: region,
          });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "auction":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getAuctionArts({
            page: 0,
            region: region,
          });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });

        case "reserve":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getReserveArts({ page: 0 });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "trade":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getTradeArts({ page: 0 });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "masterpiece":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getMasterPieceArts({
            page: 0,
            region: region,
          });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "artist":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getArtist({ page: 0 });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "getArtistRequest":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getArtistRequest({ page: 0 });
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "orderList":
          this.setState({
            ...this.state,
            isFetchingProducts: true,
          });
          res = await this.props.actions.getAllOrders({
            page: 0,
            action: true,
          }); //0,1,2...
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "pendingOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getPendingOrders({
            page: 0,
            action: false,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: 0,
          });
          break;

        case "PortraitOrders":
          this.setState({
            ...this.state,
            isFetchingProducts: true,
          });
          res = await this.props.actions.getPortraitOrders({
            page: 0,
            status: true,
          }); //0,1,2...
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "PortraitRequestOrders":
          this.setState({
            ...this.state,
            isFetchingProducts: true,
          });
          res = await this.props.actions.getPortraitRequestOrders({
            page: 0,
            status: false,
          }); //0,1,2...
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "approvedOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getApprovedOrders(user._id, {
            page: 0,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: 0,
          });
          break;

        case "ApprovedListingOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getListingOrders({
            page: 0,
            status: true,
          }); //0,1,2...
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        case "RequestListingOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getListingRequestOrders({
            page: 0,
            status: false,
          }); //0,1,2...
          this.setState({
            ...this.state,
            currentPage: 0,
            isFetchingProducts: false,
          });
          break;

        default:
          break;
      }
    }
  };

  handleClick = async (e, index) => {
    e.preventDefault();
    //here index is current page no
    const { tableName, user, area } = this.props;
    let region = "int";
    //console.log("view area here", area);
    if (area == "African Art") {
      //console.log("case");
      region = "af";
    } else {
      region = "int";
    }

    var res;
    if (tableName) {
      switch (tableName) {
        case "all":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getAllArts({
            page: index,
            region: region,
          });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "artist":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getArtist({ page: index });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "getArtistRequest":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getArtistRequest({ page: index });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "general":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getGeneralArts({
            page: index,
            region: region,
          });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "auction":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getAuctionArts({
            page: index,
            region: region,
          });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "reserve":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getReserveArts({ page: index });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "trade":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getTradeArts({ page: index });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "masterpiece":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getMasterPieceArts({
            page: index,
            region: region,
          });
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "orderList":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getAllOrders({
            page: index,
            action: true,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "approvedOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getApprovedOrders(user._id, {
            page: index,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "pendingOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getPendingOrders({
            page: index,
            action: false,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "PortraitOrders":
          //console.log("=====>");
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getPortraitOrders({
            page: index,
            status: true,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "PortraitRequestOrders":
          this.setState({
            ...this.state,
            isFetchingProducts: true,
          });
          res = await this.props.actions.getPortraitRequestOrders({
            page: index,
            status: false,
          }); //0,1,2...
          this.setState({
            ...this.state,
            currentPage: index,
            isFetchingProducts: false,
          });
          break;

        case "ApprovedListingOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getListingOrders({
            page: index,
            status: true,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        case "RequestListingOrders":
          this.setState({ ...this.state, isFetchingProducts: true });
          res = await this.props.actions.getListingRequestOrders({
            page: index,
            status: false,
          }); //0,1,2...
          this.setState({
            ...this.state,
            isFetchingProducts: false,
            currentPage: index,
          });
          break;

        default:
          break;
      }
    }
  };

  renderComponent = () => {
    const { tableName, allProducts } = this.props;
    //console.log("recienasda  proosp", this.props);

    if (tableName) {
      switch (tableName) {
        case "all":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "general":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "auction":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "reserve":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "trade":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "artist":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "getArtistRequest":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "masterpiece":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "orderList":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "approvedOrders":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "pendingOrders":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "PortraitOrders":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "PortraitRequestOrders":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "ApprovedListingOrders":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();

        case "RequestListingOrders":
          return this.state.isFetchingProducts
            ? this.renderPaginationShimmer()
            : //  allProducts.length !== 0 &&
            this.renderPaginationList();
        default:
          break;
      }
    }
  };

  renderPaginationShimmer = () => (
    <Fragment>
      <Card className="w35">
        <PaginationComp />
      </Card>
      <br />
    </Fragment>
  );

  renderPaginationList = () => {
    const paginationItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { currentPage, count } = this.state;
    return (
      <React.Fragment>
        <div className="pagination-wrapper">
          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage <= 0}>
              <PaginationLink
                onClick={(e) => this.handleClick(e, currentPage - 1)}
                previous
              />
            </PaginationItem>
            {paginationItem.map((item, index) => {
              return (
                <PaginationItem active={item === currentPage + 1} key={index}>
                  <PaginationLink onClick={(e) => this.handleClick(e, index)}>
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationLink
                onClick={(e) => this.handleClick(e, currentPage + 1)}
                next
              />
            </PaginationItem>
          </Pagination>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return this.renderComponent();
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    allProducts: state.product.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        getAllArts: productActions.getAllArts,
        getGeneralArts: productActions.getGeneralArts,
        getMasterPieceArts: productActions.getMasterPieceArts,
        getAuctionArts: productActions.getAuctionArts,
        getReserveArts: productActions.getReserveArts,
        getTradeArts: productActions.getTradeArts,
        getAllOrders: orderActions.getAllOrders,
        getApprovedOrders: orderActions.getApprovedOrders,
        getPendingOrders: orderActions.getPendingOrders,
        getPortraitOrders: portraitActions.getPortraitOrders,
        getPortraitRequestOrders: portraitActions.getPortraitRequestOrders,
        getListingOrders: listSellActions.getListingOrders,
        getListingRequestOrders: listSellActions.getListingRequestOrders,
      },
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePagination);
