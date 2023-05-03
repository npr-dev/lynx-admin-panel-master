import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Button,
} from "reactstrap";
import { Loader as Load } from "react-loaders";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search as NewSearch,
} from "react-bootstrap-table2-toolkit";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Search } from "../../../Layout/ActionCenter";
import "./List.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchRoutes,
  deleteRoute,
  editRoute,
} from "../../../store/actions/routeAction";
import more from "../../../assets/utils/images/more.png";
import DeleteModal from "../../../common/components/DeleteModal";
import { actionTypes } from "../../../store/common/types";
import { ExportCSV } from "../../../common/components/ExportCSV/ExportCSV";
import PdfReportGenerator from "../../../common/components/PdfReportGenerator/PdfReportGenerator";

const { SearchBar } = NewSearch;

const List = (props) => {
  const {
    schoolId,
    fetchRoutes,
    routes,
    deleteRoute,
    setEmptyRoute,
    loader,
    removeRoute,
    deleteBusCount,
  } = props;

  const history = useHistory();
  const [routeArray, setrouteArray] = useState([]);
  const [routeArrayReport, setrouteArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localRoutes, setlocalRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [routeName, setrouteName] = useState("");
  const [searchRoutes, setSearchRoutes] = useState([]);
  const [initial, setInitial] = useState(true);
  // const schoolPaymentStatusCheck = props.schoolPaymentStatus.subscriptionId
  //   ? true
  //   : false;
  const schoolPaymentStatusCheck = true;
  const searchHandler = (e) => {
    const { value } = e.target;
    setrouteName(value);
    const filteredArray = routeArray.filter((item) => {
      return (
        item.routeName.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchRoutes(filteredArray);
  };

  // useEffect(() => {
  //     console.log("hello world");
  //     onStart()
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const columns = [
    {
      dataField: "routeName",
      text: "Route Name",
      sort: true,
      // filter: textFilter()
    },
    // {
    //   dataField: "from",
    //   text: "Route Origin",
    //   sort: true,
    // },
    // {
    //   dataField: "to",
    //   text: "Route Destination",
    //   sort: true,
    // },
    {
      dataField: "routeType",
      text: "Route Type",
      sort: true,
    },
    {
      dataField: "routeStops",
      text: "Route Stops",
      sort: true,
    },
    {
      dataField: "actions",
      isDummyField: true,
      align: "center",
      text: "Actions",
      formatter: (cellContent, row) => {
        return (
          <div className="text-center">
            <button
              className="icon-button"
              onClick={() => {
                editButton(row);
              }}
            >
              <i className="lnr-pencil" />
            </button>
            <DeleteModal
              className="delete-modal"
              name={`${row.routeName}`}
              deleteFunction={() => {
                deleteButton(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  useEffect(() => {
    console.log("routes updated", routes);
    // if (!localBuses.length && localBuses.length !== buses.length) {
    setlocalRoutes(routes);
    structureData();
    // }
    if (initial) {
      onStart();
      setInitial(false);
    }
  }, [routes]);

  const onStart = () => {
    fetchRoutes({ id: schoolId });
  };

  const structureData = () => {
    const remappedRoute = routes.map((route) => {
      return {
        routeName: route.routeName,
        // to: route.to,
        // from: route.from,
        routeType: route.routeType,
        routeStops: route.stops.length,
        _id: route._id,
      };
    });

    const remappedRouteReport = routes.map((route) => {
      return {
        Route_Name: route.routeName,
        // Route_Destination: route.to,
        // Route_Origin: route.from,
        Route_Type: route.routeType,
        Route_Stops: route.stops.length,
      };
    });

    console.log("remapped routes --> ", remappedRoute);
    setrouteArray(remappedRoute);
    setrouteArrayReport(remappedRouteReport);
  };

  const editButton = (row) => {
    // //console.log("edit -->", row._id)
    history.push(`/routeManagement/edit/${row._id}`);
  };

  const deleteButton = (row) => {
    deleteRoute({ id: row._id }, () => {
      removeRoute(row._id);
      deleteBusCount();
    });
  };

  console.log("table data state --> ", routeArray);
  const dataToShow = routeName ? searchRoutes : routeArray;
  return (
    <Fragment>
      {/* {
                !loading
                    ? <> */}
      <ActionCenter>
        <div>
          <Count count={loading ? "0" : dataToShow.length} />
        </div>
        <div>
          {/* <AddButton /> */}
          <div>
            <Link
              className="router-link"
              to={schoolPaymentStatusCheck ? "/routeManagement/add" : "#"}
            >
              <Button
                className="mr-2 btn-icon action-btn"
                color="primary"
                disabled={!schoolPaymentStatusCheck}
              >
                <i className="pe-7s-plus btn-icon-wrapper"> </i>
                Add Route
              </Button>
            </Link>
          </div>

          <ExportCSV csvData={routeArrayReport} fileName={"Routes-Report"} />
          <Button
            className="mr-2 btn-icon action-btn"
            color="primary"
            disabled={!schoolPaymentStatusCheck}
            onClick={() => PdfReportGenerator(routeArrayReport,['Route Name',"Route Destination","Route Origin"],"Routes Pdf Report","Routes-Pdf-Report")}
          >
            Export PDF File
          </Button>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search value={busNo} onChange={searchHandler} placeholder="Search Bus by number" /> */}
          </div>
        </div>
      </ActionCenter>

      <ReactCSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardBody>
                {loader || loading ? (
                  <div style={{ textAlign: "center" }}>
                    <Load type="ball-pulse" />
                  </div>
                ) : dataToShow.length > 0 ? (
                  <div className="table-responsive table-bus">
                    <ToolkitProvider
                      bootstrap4
                      keyField="_id"
                      data={dataToShow}
                      columns={columns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                      search
                    >
                      {(props) => (
                        <div>
                          {/* <h3>Input something at below input field:</h3> */}
                          <SearchBar {...props.searchProps} />
                          {/* <hr /> */}
                          <BootstrapTable {...props.baseProps} />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                ) : (
                  <div className="no-content">No Routes Present</div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
      {/* </>
                    : <h4 style={{ textAlign: "center", padding: 100 }}>Loading...</h4>
            } */}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.auth,
    schoolPaymentStatus: state.auth.user.result.userExist,
    schoolId: state.auth.user.result.userExist._id,
    routes: state.route.route,
    loader: state.route.route_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoutes: (schoolId) => dispatch(fetchRoutes(schoolId)),
    deleteRoute: (routeId, removeRoute) =>
      dispatch(deleteRoute(routeId, removeRoute)),
    setEmptyRoute: () => dispatch({ type: "SET_EMPTY_ROUTE", payload: [] }),
    removeRoute: (routeId) =>
      dispatch({ type: "REMOVE_ROUTE", payload: routeId }),
    deleteBusCount: () => dispatch({ type: actionTypes.DECREASE_BUS_COUNT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
