import React, { Fragment, useEffect, useState } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
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

import "./BusAdd.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addBus } from "../../../store/actions/busAction";
import { fetchUnassignedDrivers } from "../../../store/actions/driverAction";
import { actionTypes } from "../../../store/common/types";
import Multiselect from "multiselect-react-dropdown";

const BusAdd = (props) => {

  const {
    fetchUnassignedDrivers,
    addBus,
    schoolId,
    drivers,
    increaseBusCount,
    routes
  } = props;

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [driverArray, setdriverArray] = useState([]);
  const [nannyArray, setNannyArray] = useState([]);
  const [busNo, setBusNo] = useState({
    value: "",
  });
  const [seatingCapacity, setSeatingCapacity] = useState({
    value: "",
  });
  const [vinNo, setVinNo] = useState({
    value: "",
  });
  const [driver, setDriver] = useState({
    value: "",
  });
  const [nanny, setNanny] = useState({
    value: "",
  });
  const [deviceId, setDeviceId] = useState({
    value: '',
  });

  // const [route, setRoute] = useState({
  //   value: "",
  // });

  const [make, setMake] = useState({
    value: "",
  });
  const [model, setModel] = useState({
    value: "",
  });
  const [licenseNo, setLicenseNo] = useState({
    value: "",
  });

  const [insuranceNo, setInsuranceNo] = useState({
    value: "",
  });
  useEffect(() => {
    fetchUnassignedDrivers({ id: schoolId }, () => {});
    return () => {};
  }, [])

  useEffect(() => {
    console.log("drivers list",drivers)
    structureData();
  }, [drivers]);


  const structureData = () => {
    const filteredDriversArray = drivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "driver";
    });
    console.log("drivers filter in bus add", filteredDriversArray);

    setdriverArray(filteredDriversArray);
    console.log("drivers array in bus add", driverArray);

    const filteredNannyArray = drivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "nanny";
    });
    console.log("Nanny filter in bus add", filteredNannyArray);

    setNannyArray(filteredNannyArray);
    console.log("nannies array in bus add", nannyArray);
  };
  // useEffect(() => {
  //   console.log("loading", loading)
  // }, [loading])

  var selectedRoutes =[]

  const handlemultiSelector = (e) => {
    console.log("e array",e)
    selectedRoutes = e.map((item) => item._id)
    console.log("selectedRoutes",selectedRoutes)
  }

  const handleBusNoChange = (e) => {
    e.preventDefault();
    setBusNo({
      ...busNo,
      value: e.target.value,
    });
  };

  const handleDeviceIdChange = (e) => {
    e.preventDefault();
    setDeviceId({
      ...deviceId,
      value: e.target.value,
    });
  };
  const handleSeatingCapacityChange = (e) => {
    e.preventDefault();
    setSeatingCapacity({
      ...seatingCapacity,
      value: e.target.value,
    });
  };
  const handleVinNoChange = (e) => {
    e.preventDefault();
    setVinNo({
      ...vinNo,
      value: e.target.value,
    });
  };

  const handleLicNoChange = (e) => {
    e.preventDefault();
    setLicenseNo({
      ...licenseNo,
      value: e.target.value,
    });
  };
  const handleInsNoChange = (e) => {
    e.preventDefault();
    setInsuranceNo({
      ...insuranceNo,
      value: e.target.value,
    });
  };

  const handleDriverChange = (e) => {
    e.preventDefault();
    setDriver({
      value: e.target.value,
    });
  };

  const handleNannyChange = (e) => {
    e.preventDefault();
    setNanny({
      value: e.target.value,
    });
  };

  // const handleRouteChange = (e) => {
  //   e.preventDefault();
  //   setRoute({
  //     value: e.target.value,
  //   });
  // };

  const handleMakeChange = (e) => {
    e.preventDefault();
    setMake({
      ...make,
      value: e.target.value,
    });
  };
  const handleModelChange = (e) => {
    e.preventDefault();
    setModel({
      ...model,
      value: e.target.value,
    });
  };

  const maxLengthCheck = (object) => {
    console.log("INPUTY");
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const busData = {
      schoolId: schoolId,
      deviceId:deviceId.value,
      busNo: busNo.value,
      studentCapacity: seatingCapacity.value,
      vinNumber: vinNo.value,
      driverId: driver.value ? driver.value : null,
      nannyId: nanny.value ? nanny.value : null,
      deleted: false,
      currentStatus: driver.value || nanny.value ? true : false,
      studentsCount: 0,
      make: make.value,
      model: model.value,
      licenseNo: licenseNo.value,
      insuranceNo: insuranceNo.value,
      routes: selectedRoutes,
      currentlyAssignedDriver: driver.value ? true : false,
      currentlyAssignedNanny: nanny.value ? true : false
    };
    console.log("busData",busData)
    addBus(
      busData,
      () => {
        history.push("/busManagement/list");
        increaseBusCount();
      },
      () => setLoading(false)
    );
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
                <div className="card-header-info">
                  <div className="info">
                    <div className="title">Add Bus Details</div>
                  </div>
                  <div className="action">
                    <Link className="close-button" to="/busManagement/list">
                      <i className="lnr-cross-circle"> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="busNo">Bus Number</Label>
                        <Input
                          name="busNo"
                          id="busNo"
                          value={busNo.value}
                          onChange={handleBusNoChange}
                          placeholder="Enter Bus No."
                          required
                          maxLength="50"
                        />
                        <FormFeedback>Bus Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='deviceId'>Device ID</Label>
                        <Input
                          name='deviceId'
                          id='deviceId'
                          placeholder='Enter Device ID Number'
                          value={deviceId.value}
                          onChange={handleDeviceIdChange}
                          // required
                          // maxLength='20'
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="capacity">Seating Capacity</Label>
                        <Input
                          type="number"
                          name="capacity"
                          id="capacity"
                          value={seatingCapacity.value}
                          onChange={handleSeatingCapacityChange}
                          placeholder="Enter Seating Capacity"
                          required
                          maxLength="5"
                          onInput={maxLengthCheck}
                        />
                        <FormFeedback>
                          Seating Capacity cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="vin">VIN Number</Label>
                        <Input
                          name="vin"
                          id="vin"
                          value={vinNo.value}
                          onChange={handleVinNoChange}
                          placeholder="Enter VIN No."
                          required
                          maxLength="50"
                        />
                        <FormFeedback>VIN Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="driver">Assign Driver (Optional)</Label>
                        <Input
                          type="select"
                          name="driver"
                          id="driver"
                          onChange={handleDriverChange}
                          value={driver.value}
                        >
                          <option selected disabled value="">
                            Assign Driver
                          </option>
                          {driverArray && driverArray.length > 0 ? (
                            driverArray.map((driver) => {
                              return (
                                <option value={driver._id} key={driver._id}>
                                  {driver.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled> No Drivers Available </option>
                          )}
                        </Input>
                      </FormGroup>

                      {driver.value ? (
                        <span
                          style={{
                            position: "absolute",
                            top: 38,
                            right: 38,
                          }}
                          className=""
                          color="secondary"
                          type="button"
                          onClick={() =>
                            setDriver({
                              value: "",
                            })
                          }
                        >
                          {/* <i className="lnr-cross btn-icon-wrapper"> </i> */}
                          <i className="lnr-cross-circle"> </i>
                        </span>
                      ) : null}
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="nanny">Assign Nanny (Optional)</Label>
                        <Input
                          type="select"
                          name="nanny"
                          id="nanny"
                          onChange={handleNannyChange}
                          value={nanny.value}
                        >
                          <option selected disabled value="">
                            Assign Nanny
                          </option>
                          {nannyArray && nannyArray.length > 0 ? (
                            nannyArray.map((nanny) => {
                              return (
                                <option value={nanny._id} key={nanny._id}>
                                  {nanny.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled> No Nannies Available </option>
                          )}
                        </Input>
                      </FormGroup>

                      {nanny.value ? (
                        <span
                          style={{
                            position: "absolute",
                            top: 38,
                            right: 38,
                          }}
                          className=""
                          color="secondary"
                          type="button"
                          onClick={() =>
                            setNanny({
                              value: "",
                            })
                          }
                        >
                          {/* <i className="lnr-cross btn-icon-wrapper"> </i> */}
                          <i className="lnr-cross-circle"> </i>
                        </span>
                      ) : null}
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="make">Make</Label>
                        <Input
                          type="text"
                          name="make"
                          id="make"
                          value={make.value}
                          onChange={handleMakeChange}
                          placeholder="Enter Make"
                          maxLength="50"
                        />
                        <FormFeedback>Make cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="model">Model</Label>
                        <Input
                          type="text"
                          name="model"
                          id="model"
                          value={model.value}
                          onChange={handleModelChange}
                          placeholder="Enter Model"
                          maxLength="50"
                        />
                        <FormFeedback>Model cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="License">License Number</Label>
                        <Input
                          type="text"
                          name="License"
                          id="License"
                          value={licenseNo.value}
                          onChange={handleLicNoChange}
                          placeholder="Enter License No."
                          maxLength="50"
                        />
                        <FormFeedback>
                          License Number cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="insurance">Insurance Number</Label>
                        <Input
                          type="text"
                          name="insurance"
                          id="insurance"
                          value={insuranceNo.value}
                          onChange={handleInsNoChange}
                          placeholder="Enter Insurance No."
                          maxLength="50"
                        />
                        <FormFeedback>
                          Insurance Number cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    {/* <Col md="6">
                      <FormGroup>
                        <Label for="route">Assign Route (Optional)</Label>
                        <Input
                          type="select"
                          name="route"
                          id="route"
                          onChange={handleRouteChange}
                          value={route.value}
                        >
                          <option selected disabled value="">
                            Assign Route
                          </option>
                        </Input>
                      </FormGroup>
                      {route.value ? (
                        <span
                          style={{
                            position: "absolute",
                            top: 38,
                            right: 38,
                          }}
                          className=""
                          color="secondary"
                          type="button"
                          onClick={() =>
                            setRoute({
                              value: "",
                            })
                          }
                        >
                          <i className="lnr-cross-circle"> </i>
                        </span>
                      ) : null}
                    </Col> */}

                    <Col md={6}>
                      <Label for="route">Assign Route (Optional)</Label>
                      <Multiselect
                        displayValue="routeName"
                        // onSelect={function noRefCheck(e,s) {console.log("selected routes",e,s)}}
                        onSelect={function noRefCheck(e) {handlemultiSelector(e)}}
                        onRemove={function noRefCheck(e) {handlemultiSelector(e)}}
                        options={routes}
                        placeholder="Select Routes"
                        style={{chips:{background:'#555CD8'}}}
                      />
                    </Col>
                  </Row>
                  <Link className='close-button' to='/busManagement/list'>
                    <Button color='secondary' className='mr-2 mt-1'>
                      Cancel
                    </Button>
                  </Link>
                  <Button color="primary" className="mt-1" disabled={loading}>
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
    drivers: state.driver.unassignedDriver,
    routes: state.route.route
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBus: (busData, navigate, stopLoader) =>
      dispatch(addBus(busData, navigate, stopLoader)),
    fetchUnassignedDrivers: (schoolId, addDrivers) =>
      dispatch(fetchUnassignedDrivers(schoolId, addDrivers)),
    increaseBusCount: () => dispatch({ type: actionTypes.INCREASE_BUS_COUNT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusAdd);
