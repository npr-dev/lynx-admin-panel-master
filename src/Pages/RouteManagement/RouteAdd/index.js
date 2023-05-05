import React, { Fragment, useEffect, useState } from "react";
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import "./RouteAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addRoute } from "../../../store/actions/routeAction";
import { fetchStudents } from "../../../store/actions/studentAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCross, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const RouteAdd = (props) => {
  const { addRoute, schoolId, students, fetchStudents } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [pickUprouteName, setPickUprouteName] = useState({
    value: "",
  });
  const [dropOffRouteName, setDropOffRouteName] = useState({
    value: "",
  });
  // const [from, setFrom] = useState({
  //   value: '',
  // });
  // const [to, setTo] = useState({
  //   value: '',
  // });
  const [routeType, setRouteType] = useState({
    value: "pickUp",
  });

  const [pickUpStops, setPickUpStops] = useState([
    {
      student: "",
      time: "",
    },
  ]);

  const [dropOffStops, setDropOffStops] = useState([
    {
      student: "",
      time: "",
    },
  ]);

  const routeTypes = [
    {
      name: "Pick Up",
      value: "pickUp",
    },
    {
      name: "Drop Off",
      value: "dropOff",
    },
    {
      name: "Both",
      value: "both",
    },
  ];

  useEffect(() => {
    fetchStudents({ id: schoolId });
  }, []);

  const handlePickUpStopsChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const listOfPickUpStops = [...pickUpStops];
    listOfPickUpStops[index][name] = value;
    setPickUpStops(listOfPickUpStops);
  };

  const handleAddPickUpStop = () => {
    setPickUpStops([...pickUpStops, { student: "", time: "" }]);
  };

  const handleRemovePickUpStop = (index) => {
    const list = [...pickUpStops];
    list.splice(index, 1);
    setPickUpStops(list);
  };

  const handleDropOffStopsChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const listOfStops = [...dropOffStops];
    listOfStops[index][name] = value;
    setDropOffStops(listOfStops);
  };

  const handleAddDropOffStop = () => {
    setDropOffStops([...dropOffStops, { student: "", time: "" }]);
  };

  const handleRemoveDropOffStop = (index) => {
    const list = [...dropOffStops];
    list.splice(index, 1);
    setDropOffStops(list);
  };

  const handlePickUpRouteNameChange = (e) => {
    e.preventDefault();
    setPickUprouteName({
      ...pickUprouteName,
      value: e.target.value,
    });
  };

  const handleDropOffRouteNameChange = (e) => {
    e.preventDefault();
    setDropOffRouteName({
      ...dropOffRouteName,
      value: e.target.value,
    });
  };
  // const handleFromChange = (e) => {
  //   e.preventDefault();
  //   setFrom({
  //     ...from,
  //     value: e.target.value,
  //   });
  // };
  // const handleToChange = (e) => {
  //   e.preventDefault();
  //   setTo({
  //     ...to,
  //     value: e.target.value,
  //   });
  // };

  const handleRouteType = (e) => {
    e.preventDefault();
    setRouteType({
      ...routeType,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (routeType.value == "pickUp" || routeType.value == "both") {
      const pickUpRouteData = {
        schoolId: schoolId,
        routeName: pickUprouteName.value,
        stops: pickUpStops,
        routeType:'Pick Up',
        // from: from.value,
        // to: to.value,
        deleted: false,
      };

      console.log("pick up route data===", pickUpRouteData);

      addRoute(
        pickUpRouteData,
        () => {
          // setTimeout(() => {
          history.push("/routeManagement/list");
          // }, 2000)
        },
        () => setLoading(false)
      );
    }

    if (routeType.value == "dropOff" || routeType.value == "both") {
      const dropOffRouteData = {
        schoolId: schoolId,
        routeName: dropOffRouteName.value,
        stops: dropOffStops,
        routeType:'Drop Off',
        // from: from.value,
        // to: to.value,
        deleted: false,
      };

      console.log("pick up route data===", dropOffRouteData);

      addRoute(
        dropOffRouteData,
        () => {
          // setTimeout(() => {
          history.push("/routeManagement/list");
          // }, 2000)
        },
        () => setLoading(false)
      );
    }
  };

  return (
    <Fragment>
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
                <Row>
                  <Col md="9">
                    <div className="card-header-info">
                      <div className="info">
                        <div className="title">Add Route Details</div>
                      </div>
                      <div className="action">
                        <Link
                          className="close-button"
                          to="/routeManagement/list"
                        >
                          <i className="lnr-cross-circle"> </i>
                        </Link>
                      </div>
                    </div>
                  </Col>

                  <Col md="3">
                    <Input
                      type="select"
                      name="routeType"
                      id="routeType"
                      value={routeType.value}
                      onChange={handleRouteType}
                    >
                      {routeTypes && routeTypes.length > 0 ? (
                        routeTypes.map((type) => {
                          return (
                            <option value={type.value} key={type.value}>
                              {type.name}
                            </option>
                          );
                        })
                      ) : (
                        <option disabled>No Classes Available</option>
                      )}
                    </Input>
                  </Col>
                </Row>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    {(routeType.value == "pickUp" ||
                      routeType.value == "both") && (
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <Label style={{ fontSize: 20, marginBottom: 20 }}>
                              Pick Up Route
                            </Label>
                            <FormGroup>
                              <Label
                                for="pickUprouteName"
                                className="customTitle"
                              >
                                Route Name
                              </Label>
                              <Input
                                type="text"
                                name="pickUprouteName"
                                id="pickUprouteName"
                                value={pickUprouteName.value}
                                onChange={handlePickUpRouteNameChange}
                                placeholder="Enter Route Name"
                                required
                                maxLength="50"
                              />
                              <FormFeedback>
                                Route Name cannot be empty
                              </FormFeedback>
                            </FormGroup>
                          </Col>
                          {pickUpStops.map((item, i) => {
                            return (
                              <Fragment key={i}>
                                <Col md="12">
                                  <div
                                    style={{ marginBottom: 8 }}
                                    className="card-header-info"
                                  >
                                    <div className="info">
                                      <div className="customTitle">Stop</div>
                                    </div>
                                  </div>
                                </Col>

                                <Col md="7">
                                  <FormGroup>
                                    <Input
                                      type="select"
                                      name="student"
                                      id="student"
                                      onChange={(e) =>
                                        handlePickUpStopsChange(e, i)
                                      }
                                      value={item.student.name}
                                    >
                                      <option selected disabled value="">
                                        Select Name
                                      </option>
                                      {students && students.length > 0 ? (
                                        students.map((student) => {
                                          return (
                                            <option
                                              value={student._id}
                                              key={student._id}
                                            >
                                              {student.name}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option disabled>
                                          {" "}
                                          No Students Available{" "}
                                        </option>
                                      )}
                                    </Input>
                                  </FormGroup>
                                </Col>

                                <Col md="3">
                                  <FormGroup>
                                    <Input
                                      type="time"
                                      name="time"
                                      id="time"
                                      value={item.time}
                                      onChange={(e) =>
                                        handlePickUpStopsChange(e, i)
                                      }
                                      placeholder="Enter Time"
                                      required
                                      maxLength="50"
                                    />
                                    <FormFeedback>
                                      Time cannot be empty
                                    </FormFeedback>
                                  </FormGroup>
                                </Col>

                                <Col md="1">
                                  <Button
                                    // style={{ width: "100%" }}
                                    color="secondary"
                                    onClick={() => handleRemovePickUpStop(i)}
                                  >
                                     <FontAwesomeIcon icon={faTimes} />
                                  </Button>
                                </Col>
                              </Fragment>
                            );
                          })}
                          {/* <div style={{ marginTop: 20 }}>
                            {JSON.stringify(pickUpStops)}
                          </div> */}
                        </Row>

                        <Row>
                          <Col md="2">
                            <Button
                              // style={{ width: "100%" }}
                              color="secondary"
                              onClick={handleAddPickUpStop}
                            >
                               <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    )}

                    {(routeType.value == "dropOff" ||
                      routeType.value == "both") && (
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <Label style={{ fontSize: 20, marginBottom: 20 }}>
                              Drop Off Route
                            </Label>
                            <FormGroup>
                              <Label
                                for="dropOffRouteName"
                                className="customTitle"
                              >
                                Route Name
                              </Label>
                              <Input
                                type="text"
                                name="dropOffRouteName"
                                id="dropOffRouteName"
                                value={dropOffRouteName.value}
                                onChange={handleDropOffRouteNameChange}
                                placeholder="Enter Route Name"
                                required
                                maxLength="50"
                              />
                              <FormFeedback>
                                Route Name cannot be empty
                              </FormFeedback>
                            </FormGroup>
                          </Col>

                          {dropOffStops.map((item, i) => {
                            return (
                              <Fragment key={i}>
                                <Col md="12">
                                  <div
                                    style={{ marginBottom: 8 }}
                                    className="card-header-info"
                                  >
                                    <div className="info">
                                      <div className="customTitle">Stop</div>
                                    </div>
                                  </div>
                                </Col>

                                <Col md="7">
                                  <FormGroup>
                                    <Input
                                      type="select"
                                      name="student"
                                      id="student"
                                      onChange={(e) =>
                                        handleDropOffStopsChange(e, i)
                                      }
                                      value={item.student.name}
                                    >
                                      <option selected disabled value="">
                                        Select Name
                                      </option>
                                      {students && students.length > 0 ? (
                                        students.map((student) => {
                                          return (
                                            <option
                                              value={student._id}
                                              key={student._id}
                                            >
                                              {student.name}
                                            </option>
                                          );
                                        })
                                      ) : (
                                        <option disabled>
                                          {" "}
                                          No Students Available{" "}
                                        </option>
                                      )}
                                    </Input>
                                  </FormGroup>
                                </Col>

                                <Col md="3">
                                  <FormGroup>
                                    <Input
                                      type="time"
                                      name="time"
                                      id="time"
                                      value={item.time}
                                      onChange={(e) =>
                                        handleDropOffStopsChange(e, i)
                                      }
                                      placeholder="Enter Time"
                                      required
                                      maxLength="50"
                                    />
                                    <FormFeedback>
                                      Time cannot be empty
                                    </FormFeedback>
                                  </FormGroup>
                                </Col>

                                <Col md="2">
                                  <Button
                                    // style={{ width: "100%" }}
                                    color="secondary"
                                    onClick={() => handleRemoveDropOffStop(i)}
                                  >
                                    <FontAwesomeIcon icon={faTimes} />
                                  </Button>
                                </Col>
                              </Fragment>
                            );
                          })}
                          {/* <div style={{ marginTop: 20 }}>
                            {JSON.stringify(dropOffStops)}
                          </div> */}
                        </Row>

                        <Row>
                          <Col md="2">
                            <Button
                              // style={{ width: "100%" }}
                              color="secondary"
                              onClick={handleAddDropOffStop}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    )}

                    {/* <Col md="6">
                      <FormGroup>
                        <Label for="stop">Route Stop</Label>
                        <Input
                          type="text"
                          name="stop"
                          id="stop"
                          value={from.value}
                          onChange={handleFromChange}
                          placeholder="Enter Route Origin"
                          required
                          maxLength="50"
                        />
                        <FormFeedback>
                          Route Origin cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col> */}

                    {/* <Col md='6'>
                      <FormGroup>
                        <Label for='from'>Route Origin</Label>
                        <Input
                          type='text'
                          name='from'
                          id='from'
                          value={from.value}
                          onChange={handleFromChange}
                          placeholder='Enter Route Origin'
                          required
                          maxLength="50"
                        />
                        <FormFeedback>
                          Route Origin cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col> */}

                    {/* <Col md='6'>
                      <FormGroup>
                        <Label for='to'>Route Destination</Label>
                        <Input
                          type='text'
                          name='to'
                          id='to'
                          value={to.value}
                          onChange={handleToChange}
                          placeholder='Enter Route Destination'
                          required
                          maxLength="50"
                        />
                        <FormFeedback>
                          Route Destination cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col> */}
                  </Row>
                  <Link className="close-button" to="/routeManagement/list">
                    <Button color="secondary" className="mr-2 mt-4">
                      Cancel
                    </Button>
                  </Link>
                  <Button color="primary" className="mt-4" disabled={loading}>
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    students: state.student.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
    addRoute: (routeData, navigate, stopLoader) =>
      dispatch(addRoute(routeData, navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteAdd);
