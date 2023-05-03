import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../../store/actions";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
  Col,
} from "reactstrap";

import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";
import "./Analytics.css";
import io from "socket.io-client";

import { fetchHistory } from "../../../store/actions/billingAction";
import { getTotalCountOfCollections } from "../../../store/actions/authAction";
import { Doughnut } from "react-chartjs-2";
import Map from "../../../common/components/Map/Map";
import BroadcastModal from "../../../common/components/BroadcastModal/BroadcastModal";
import { Link } from "react-router-dom";
import { fetchBuses } from "../../../store/actions/busAction";

const Analytics = (props) => {
  const { getTotalCountOfCollections } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const reduxNotificationState = useSelector((state) => state.notification);
  const schoolId = useSelector((state) => state.auth.user.result.userExist._id);
  const school = useSelector((state) => state.auth.user.result.userExist);
  const buses = useSelector((state) => state.bus.bus);
  const [notifications, setStateNotifications] = useState([]);
  const [history, setHistory] = useState([]);
  const [busesLocationArray, setbusesLocationArray] = useState([]);
  const [onBoardStudents, setOnBoardStudents] = useState(0);
  const [location, setLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });
  let socket = null;
  let busIds = [];
  const [socketConnection, setSocketConnection] = useState(false);
  

  const data = {
    labels: ["Cars", "Trains", "Airplanes"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#8dace7", "#71deb9", "#ef869e"],
        hoverBackgroundColor: ["#7097e1", "#4dd6a7", "#eb6886"],
      },
    ],
  };

  const columns = [
    {
      dataField: "date",
      text: "Date",
    },
    {
      dataField: "due",
      text: "Slots",
    },
    {
      dataField: "package",
      text: "Package",
    },
    {
      dataField: "paid",
      text: "Amount Paid",
    },
  ];

  const serverURL = process.env.REACT_APP_SERVER_URL;
  // const serverURL = "http://localhost:4000";

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    props.fetchBuses({ id: schoolId });
  }, []);


  useEffect(() => {
    console.log("schoolId", schoolId, buses);

    buses.forEach((bus) => {
      console.log("bus", bus);
      busIds.push(bus._id);
    });

    if (socket == null && buses.length > 0) {
      console.log("socket", socket);
      socket = io(serverURL, {
        // socket = io('https://www.lynx-systems.tk/', {
        transports: ["websocket"],
        transports: ['polling'],
        jsonp: false,
        reconnection: false,
      });
    }

    socket && socket.on('connect', function() {
      console.log('connect socket.connected', socket.connected);
      setSocketConnection(socket.connected)
    });    
    socket && socket.on('disconnect', function() {
      console.log('disconnect socket.connected', socket.connected);
      setSocketConnection(socket.connected)
    });  

    console.log("socket", socket);

    socket && socket.emit("fetchAttendanceFromServer", {
      schoolId: schoolId,
    });

    socket && socket.on("returnAttendanceFromServer", (data) => {
      console.log('dataReturnAttendanceFromServer', data);
      setOnBoardStudents(data)
    });

    console.log("data --> ", {
      schoolId: schoolId,
      busId: busIds,
    });

    socket && socket.emit("sendBusesDataToServer", {
      schoolId: schoolId,
      busId: busIds,
    });

    socket && socket.on("getBusesLocationFromServer", (data) => {
      console.log('data', data);
      setbusesLocationArray(data);
      // for (let key in data) {
      //   console.log('data[key]', data[key]);
      //   setLocation({
      //     lat: data[key].location.coords.latitude,
      //     lng: data[key].location.coords.longitude,
      //     bus: data[key].busNo,
      //   });
      // }
    });
  }, [buses]);

  const showHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.post(serverURL + "billing/all", {
        schoolId: props.schoolId,
      });

      // await props.fetchHistory(props.id);
      const historyArr = [];
      res.data.result.map((bil) => {
        historyArr.push({
          date: moment(bil.date).format("MMMM Do, YYYY"),
          due: bil.slots,
          package: bil.currentPackageName,
          paid: "$" + bil.amount,
        });

        setHistory(historyArr);
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getTotalCountOfCollections({ id: props.schoolId });
    showHistory();
    getNotification();
  }, []);

  async function getNotification() {
    setStateNotifications(reduxNotificationState.notification);
    const result = await dispatch(
      notificationAction.getNotification({ schoolId: props.schoolId })
    );
    //console.log("view notfications result==>", result)
    setStateNotifications(result);
  }

  const handleLocationChange = (loc) => {
    setLocation({
      ...location,
      ...loc,
    });
  };

  return (
    <Fragment>
      <Row>
        <Col md="9">
          <Row>
            <Col md="3">
              <div className="card mb-3 widget-chart">
                <div className=" mb-3 widget-chart widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div className="widget-numbers fsize-3 total-number-text Buses-color">
                          Buses
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-subheading">Total</div>

                  <div className="widget-content">
                    <div className="icon-wrapper rounded-circle Buses-circle-color">
                      <div className="icon-wrapper-bg" />
                      <i className="pe-7s-car text-dark" />
                    </div>
                    <div className="widget-content-outer">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left pr-2 fsize-1">
                          <div className="widget-numbers fsize-4 total-number-text">
                            {props.totalBuses}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="card mb-3 widget-chart">
                <div className=" mb-3 widget-chart widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div className="widget-numbers fsize-3 total-number-text Drivers-color">
                          Drivers
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-subheading">Total</div>

                  <div className="widget-content">
                    <div className="icon-wrapper rounded-circle Drivers-circle-color">
                      <div className="icon-wrapper-bg" />
                      <i className="pe-7s-users text-dark" />
                    </div>
                    <div className="widget-content-outer">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left pr-2 fsize-1">
                          <div className="widget-numbers fsize-4 total-number-text">
                            {props.totalDrivers}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="card mb-3 widget-chart">
                <div className=" mb-3 widget-chart widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div className="widget-numbers fsize-3 total-number-text Parents-color">
                          Parents
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-subheading">Total</div>

                  <div className="widget-content">
                    <div className="icon-wrapper rounded-circle Parents-circle-color">
                      <div className="icon-wrapper-bg" />
                      <i className="pe-7s-users text-dark" />
                    </div>
                    <div className="widget-content-outer">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left pr-2 fsize-1">
                          <div className="widget-numbers fsize-4 total-number-text">
                            {props.totalParents}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="card mb-3 widget-chart">
                <div className=" mb-3 widget-chart widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div className="widget-numbers fsize-3 total-number-text Nannies-color">
                          Nannies
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-subheading">Total</div>

                  <div className="widget-content">
                    <div className="icon-wrapper rounded-circle Nannies-circle-color">
                      <div className="icon-wrapper-bg" />
                      <i className="pe-7s-user-female text-dark" />
                    </div>
                    <div className="widget-content-outer">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left pr-2 fsize-1">
                          <div className="widget-numbers fsize-4 total-number-text">
                            {props.totalNannies}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <div className="col-lg-12">
              <Card className="main-card mb-3 mt-3">
                <div className="main-wrapper-dashborad">
                  {/* <MyGoogleMap
                    isDashboard={true}
                    handleLocationChange={handleLocationChange}
                  /> */}
                  <Map school={school} busesLocationArray={busesLocationArray} />
                </div>
              </Card>
            </div>
          </Row>
          <Row>
            <div className="col-lg-12">
              <Card className="main-card mb-3 mt-3">
                <CardBody>
                  <CardTitle>
                    <div className="title">Notification</div>
                  </CardTitle>
                  <ListGroup className="scroll">
                    {notifications &&
                      notifications.map((item) => {
                        return (
                          <ListGroupItem>
                            <ListGroupItemHeading className="timeline-title">
                              {item.notificationType}
                            </ListGroupItemHeading>
                            <ListGroupItemText>{item.body}</ListGroupItemText>
                          </ListGroupItem>
                        );
                      })}
                  </ListGroup>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Col>
        <Col md="3">
          <Col md="12">
            <div className="card mb-3 widget-chart">
              <div className=" mb-3 widget-chart widget-chart2 text-left ">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left pr-2 fsize-1">
                      <div className="widget-numbers fsize-3 total-number-text Routes-color">
                        Routes
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-subheading">Total</div>

                <div className="widget-content">
                  <div className="icon-wrapper rounded-circle Routes-circle-color">
                    <div className="icon-wrapper-bg" />
                    <i className="pe-7s-way text-dark" />
                  </div>
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div className="widget-numbers fsize-4 total-number-text">
                          {busesLocationArray.length}/{props.totalRoutes}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col md="12">
            <div className="card mb-3 widget-chart">
              <div className=" mb-3 widget-chart widget-chart2 text-left ">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left pr-2 fsize-1">
                      <div className="widget-numbers fsize-3 total-number-text Students-color">
                        Students
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget-subheading">Total</div>

                <div className="widget-content">
                  <div className="icon-wrapper rounded-circle Students-circle-color">
                    <div className="icon-wrapper-bg" />
                    <i className="pe-7s-study text-dark" />
                  </div>
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div className="widget-numbers fsize-4 total-number-text">
                          {onBoardStudents}/{props.totalStudents}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* <Col md="12">
            <div className="card mb-3 widget-chart">
              <div className=" mb-3 widget-chart widget-chart2 text-left ">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left pr-2 fsize-1">
                      <div className="widget-numbers fsize-3 total-number-text Routes-color">
                        Students Travel
                      </div>
                    </div>
                  </div>
                </div>
                <Doughnut
                  data={data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                  }}
                />
              </div>
            </div>
          </Col> */}

          <Col className="mb-3" md="12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="m-3 widget-chart2 text-left ">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left pr-2 fsize-1">
                      <div className="widget-numbers fsize-3 total-number-text">
                        Chat
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card m-2" style={{ borderRadius: "1rem" }}>
                <div className="chat-div widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div
                          className="widget-content"
                          onClick={() => setModal(true)}
                        >
                          <div
                            className="mr-2 icon-wrapper rounded-circle"
                            style={{
                              width: 45,
                              height: 45,
                              backgroundColor: "#2863FF",
                            }}
                          >
                            <div className="icon-wrapper-bg" />
                            <i
                              className="pe-7s-signal"
                              style={{ color: "white" }}
                            />
                          </div>
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left pr-2 fsize-1">
                                <div
                                  className="widget-numbers fsize-2 total-number-text"
                                  style={{ fontWeight: "normal" }}
                                >
                                  Broadcast
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card m-2" style={{ borderRadius: "1rem" }}>
                <div className="chat-div widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <Link
                          className="router-link"
                          to="/chats"
                        >
                          <div className="widget-content">
                            <div
                              className="mr-2 icon-wrapper rounded-circle"
                              style={{
                                width: 45,
                                height: 45,
                                backgroundColor: "#F29900",
                              }}
                            >
                              <div className="icon-wrapper-bg" />
                              <i
                                className="pe-7s-comment"
                                style={{ color: "white" }}
                              />
                            </div>
                            <div className="widget-content-outer">
                              <div className="widget-content-wrapper">
                                <div className="widget-content-left pr-2 fsize-1">
                                  <div
                                    className="widget-numbers fsize-2 total-number-text"
                                    style={{ fontWeight: "normal" }}
                                  >
                                    Direct Message
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          


          <Col md="12">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="m-3 widget-chart2 text-left ">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left pr-2 fsize-1">
                      <div className="widget-numbers fsize-2 total-number-text">
                        Socket Connection
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card m-2" style={{ borderRadius: "1rem" }}>
                <div className="chat-div widget-chart2 text-left ">
                  <div className="widget-content-outer">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left pr-2 fsize-1">
                        <div
                          className="widget-content"
                        >
                          <div
                            className="mr-2 icon-wrapper rounded-circle"
                            style={{
                              width: 45,
                              height: 45,
                              backgroundColor: socketConnection ? "green" : "red",
                            }}
                          >
                            <div className="icon-wrapper-bg" />
                            <i
                              className="fa fa-circle-thin"
                              style={{ color: "white" }}
                            />
                          </div>
                          <div className="widget-content-outer">
                            <div className="widget-content-wrapper">
                              <div className="widget-content-left pr-2 fsize-1">
                                <div
                                  className="widget-numbers fsize-2 total-number-text"
                                  style={{ fontWeight: "normal" }}
                                >
                                  {socketConnection?'Connected':'Not Connected'}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Col>
      </Row>

      {/* </Container> */}
      {modal ? <BroadcastModal modal={modal} toggle={toggle} /> : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    totalBuses: state.auth.totalCountOfCollections && state.auth.totalCountOfCollections.totalBuses,
    totalDrivers: state.auth.totalCountOfCollections && state.auth.totalCountOfCollections.totalDrivers,
    totalParents: state.auth.totalCountOfCollections && state.auth.totalCountOfCollections.totalParents,
    totalRoutes: state.auth.totalCountOfCollections && state.auth.totalCountOfCollections.totalRoutes,
    totalStudents: state.auth.totalCountOfCollections && state.auth.totalCountOfCollections.totalStudents,
    totalNannies: state.auth.totalCountOfCollections && state.auth.totalCountOfCollections.totalNannies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuses: (schoolId) => dispatch(fetchBuses(schoolId)),
    getTotalCountOfCollections: (schoolId) =>
      dispatch(getTotalCountOfCollections(schoolId)),
    fetchHistory: (schoolId) => dispatch(fetchHistory(schoolId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics);
