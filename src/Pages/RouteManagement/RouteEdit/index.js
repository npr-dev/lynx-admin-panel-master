import React, { Fragment, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

import './RouteEdit.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRoute, editRoute } from '../../../store/actions/routeAction';
import { fetchStudents } from "../../../store/actions/studentAction";

const RouteEdit = (props) => {
  const {
    schoolId,
    routeId,
    editRoute,
    routes,
    setEmptyRoute,
    students, 
    fetchStudents
  } = props;
  console.log('EDIT ROUTE', props);
  const history = useHistory();
  let currentRoute = [];
  let route = {};

  const [loading, setLoading] = useState(false);

  const [routeName, setRouteName] = useState({
    value: "",
  });
  // const [from, setFrom] = useState({
  //   value: '',
  // });
  // const [to, setTo] = useState({
  //   value: '',
  // });

  const [routeType, setRouteType] = useState({
    value: "",
  });

  const [stops, setStops] = useState([
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
  ];

  useEffect(() => {
    console.log("Stops",stops)
  },[stops])

  useEffect(() => {
    fetchStudents({ id: schoolId });
    currentRoute = routes.filter((route) => {
      return route._id === routeId;
    });

    route = currentRoute[0];
    console.log("route",route)

    setRouteName({
      value: route.routeName,
    });

    setRouteType({
      value: route.routeType
    })

    setStops([...route.stops])
    // setFrom({
    //   value: route.from,
    // });
    // setTo({
    //   value: route.to,
    // });
  }, []);

  const handleStopsChange = (e, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const listOfPickUpStops = [...stops];
    listOfPickUpStops[index][name] = value;
    setStops(listOfPickUpStops);
  };

  const handleAddStop = () => {
    setStops([...stops, { student: "", time: "" }]);
  };

  const handleRemoveStop = (index) => {
    const list = [...stops];
    list.splice(index, 1);
    setStops(list);
  };


  const handleRouteNameChange = (e) => {
    e.preventDefault();
    setRouteName({
      ...routeName,
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


      const RouteData = {
        id: routeId,
       route:{
        routeName: routeName.value,
        stops: stops,
        routeType:routeType.value,
        // from: from.value,
        // to: to.value,
        deleted: false,
       }
      };

      console.log("pick up route data===", RouteData);

    editRoute(
      RouteData,
      () => {
        // setTimeout(() => {
        history.push('/routeManagement/list');
        // }, 2000)
      },
      () => setLoading(false)
    );

    // console.log('DRIVER DATA INDEX', routeData);
    setEmptyRoute();
  };

  return (
    <Fragment>
      <ReactCSSTransitionGroup
        component='div'
        transitionName='TabsAnimation'
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col md='12'>
            <Card className='main-card mb-3'>
              <CardBody>
              <Row>
                  <Col md="9">
                    <div className="card-header-info">
                      <div className="info">
                        <div className="title">Edit Route Details</div>
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
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <Label style={{ fontSize: 20, marginBottom: 20 }}>
                              Route
                            </Label>
                            <FormGroup>
                              <Label
                                for="routeName"
                                className="customTitle"
                              >
                                Route Name
                              </Label>
                              <Input
                                type="text"
                                name="routeName"
                                id="routeName"
                                value={routeName.value}
                                onChange={handleRouteNameChange}
                                placeholder="Enter Route Name"
                                required
                                maxLength="50"
                              />
                              <FormFeedback>
                                Route Name cannot be empty
                              </FormFeedback>
                            </FormGroup>
                          </Col>
                          {stops.map((item, i) => {
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

                                <Col md="5">
                                  <FormGroup>
                                    <Input
                                      type="select"
                                      name="student"
                                      id="student"
                                      onChange={(e) =>
                                        handleStopsChange(e, i)
                                      }
                                      value={item.student}
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
                                        handleStopsChange(e, i)
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
                                    style={{ width: "100%" }}
                                    color="secondary"
                                    onClick={() => handleRemoveStop(i)}
                                  >
                                    Remove
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
                              style={{ width: "100%" }}
                              color="secondary"
                              onClick={handleAddStop}
                            >
                              Add
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    

                    {/* {(routeType.value == "dropOff" ||
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

                                <Col md="5">
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
                                    style={{ width: "100%" }}
                                    color="secondary"
                                    onClick={() => handleRemoveDropOffStop(i)}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Fragment>
                            );
                          })}
                          {/* <div style={{ marginTop: 20 }}>
                            {JSON.stringify(dropOffStops)}
                          </div> */}
                        {/* </Row>

                        <Row>
                          <Col md="2">
                            <Button
                              style={{ width: "100%" }}
                              color="secondary"
                              onClick={handleAddDropOffStop}
                            >
                              Add
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    )} */} 




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
                  <Link className='close-button' to='/routeManagement/list'>
                    <Button color='secondary' className='mr-2 mt-4'>
                      Cancel
                    </Button>
                  </Link>
                  <Button color='primary' className='mt-4' disabled={loading}>
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

const mapStateToProps = (state, ownProps) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    routeId: ownProps.match.params.id,
    routes: state.route.route,
    students: state.student.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
    editRoute: (routeData, navigate, stopLoader) =>
      dispatch(editRoute(routeData, navigate, stopLoader)),
    setEmptyRoute: () => dispatch({ type: 'SET_EMPTY_ROUTE', payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteEdit);
