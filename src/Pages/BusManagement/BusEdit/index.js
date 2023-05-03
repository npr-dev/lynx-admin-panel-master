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

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search } from '../../../Layout/ActionCenter';
import './BusEdit.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBus, editBus } from '../../../store/actions/busAction';
import { fetchUnassignedDrivers } from '../../../store/actions/driverAction';
import Multiselect from "multiselect-react-dropdown";


const BusEdit = (props) => {
  const {
    fetchUnassignedDrivers,
    schoolId,
    busId,
    reduxDrivers,
    editBus,
    buses,
    setEmptyBus,
    routes
  } = props;
  console.log('EDIT BUS', props);
  const history = useHistory();
  let currentBus = [];
  let bus = {};

  const [drivers, setDrivers] = useState([]);

  const [driverArray, setdriverArray] = useState([]);

  const [nannyArray, setNannyArray] = useState([]);

  const [loading, setLoading] = useState(false);

  const [busNo, setBusNo] = useState({
    value: '',
  });
  const [seatingCapacity, setSeatingCapacity] = useState({
    value: '',
  });
  const [vinNo, setVinNo] = useState({
    value: '',
  });
  const [driver, setDriver] = useState({
    value: '',
  });
  const [nanny, setNanny] = useState({
    value: '',
  });
  const [deviceId, setDeviceId] = useState({
    value: '',
  });

  // const [route, setRoute] = useState({
  //   value: '',
  // });

  var [SelectedRoutes,setSelectedRoutes] =useState([])

  const [make, setMake] = useState({
    value: '',
  });
  const [model, setModel] = useState({
    value: '',
  });
  const [licenseNo, setLicenseNo] = useState({
    value: '',
  });

  const [insuranceNo, setInsuranceNo] = useState({
    value: '',
  });

  useEffect(() => {
    console.log("useEffect 3333")
    currentBus = buses.filter((bus) => {
      return bus._id === busId;
    });

    // fetchUnassignedDrivers({ id: schoolId }, () => {
    //   if (currentBus[0].driverId)
    //     setDrivers([currentBus[0].driverId, ...reduxDrivers])
    //   else
    //     setDrivers([...reduxDrivers])
    // });

    console.log("currentBus",currentBus)

    if (currentBus[0].driverId) {
      console.log('LAURA', currentBus[0].driverId);
      // setDrivers([currentBus[0].driverId]);
      setdriverArray([currentBus[0].driverId]);
      setDriver({
        value: currentBus[0].driverId,
      });
    }

    if (currentBus[0].nannyId) {
      console.log('LAURA', currentBus[0].driverId);
      // setDrivers([currentBus[0].driverId]);
      setNannyArray([currentBus[0].nannyId]);
      setNanny({
        value: currentBus[0].nannyId,
      });
    }

    bus = currentBus[0];
    console.log("bus----",bus)

    setBusNo({
      value: bus.busNo,
    });
    setDeviceId({
      value: bus.deviceId,
    });
    setSeatingCapacity({
      value: bus.studentCapacity,
    });
    setVinNo({
      value: bus.vinNumber,
    });
    setModel({
      value: bus.model,
    });
    setMake({
      value: bus.make,
    });
    setLicenseNo({
      value: bus.licenseNo,
    });
    setInsuranceNo({
      value: bus.insuranceNo,      
    });
    setSelectedRoutes([...bus.routes])
    // return () => { };
  }, [reduxDrivers]);

  useEffect(() => {
    fetchUnassignedDrivers({ id: schoolId }, () => {});
  }, [])


  useEffect(() => {
    console.log("useEffect 4444")
    console.log('use effect run',reduxDrivers);
    // getUnassignedDrivers();
    structureData();
  }, [reduxDrivers]);
  // }, [getUnassignedDrivers]);

  const getUnassignedDrivers = async () => {
    // , () => {
      
    // if (currentBus[0].driverId) {
    //   // reduxDrivers
    //   console.log('IF COND 1', reduxDrivers);
    //   setDrivers([currentBus[0].driverId, ...data]);
    // } else {
    //   console.log('IF COND 2', reduxDrivers);
    //   setDrivers([...data]);
    // }

    // console.log('DATA====', data);
  };

  const structureData = async () => {
    // const data = await fetchUnassignedDrivers({ id: schoolId });
    const filteredDriversArray = reduxDrivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "driver";
    });
    console.log("drivers filter in bus add", filteredDriversArray);

    // setdriverArray(filteredDriversArray);
    console.log("drivers array in bus add", driverArray);

    const filteredNannyArray = reduxDrivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "nanny";
    });
    console.log("Nanny filter in bus add", filteredNannyArray);

    // setNannyArray(filteredNannyArray);
    console.log("nannies array in bus add", nannyArray);

    if (currentBus[0] && currentBus[0].driverId) {
      // reduxDrivers
      console.log('IF COND 1', reduxDrivers);
      setdriverArray([currentBus[0].driverId, ...filteredDriversArray]);
    }
    else {
      setdriverArray(filteredDriversArray);
    }
    if (currentBus[0] && currentBus[0].nannyId) {
      // reduxDrivers
      console.log('IF COND 1', reduxDrivers);
      setNannyArray([currentBus[0].nannyId, ...filteredNannyArray]);
    }
    else {
      setNannyArray(filteredNannyArray);
      }


  };



  const handlemultiSelector = (e) => {
    console.log("e array",e)
    SelectedRoutes = e.map((item) => item._id)
    // SelectedRoutes = e.map((item) => ({id:item._id,routeName:item.routeName}))
    console.log("selectedRoutes",SelectedRoutes)
  }
  const handleDeviceIdChange = (e) => {
    e.preventDefault();
    setDeviceId({
      ...deviceId,
      value: e.target.value,
    });
  };

  const handleBusNoChange = (e) => {
    e.preventDefault();
    setBusNo({
      ...busNo,
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

  const handleDriverChange = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      setDriver({
        value: e.target.value,
      });
    } else {
      setDriver({ value: '' });
    }
  };

  const handleNannyChange = (e) => {
    e.preventDefault();
    if (e.target.value.length > 0) {
      setNanny({
        value: e.target.value,
      });
    } else {
      setNanny({ value: '' });
    }
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const busData = {
      id: busId,
      bus: {
        schoolId: schoolId,
        busNo: busNo.value,
        studentCapacity: seatingCapacity.value,
        vinNumber: vinNo.value,
        deviceId:deviceId.value,
        // driverId: driver.value ? driver.value : bus.driverId,
        // nannyId: nanny.value ? nanny.value : bus.nannyId,
        driverId: driver.value ? driver.value : null,
        nannyId: nanny.value ? nanny.value : null,
        deleted: false,
        // currentStatus: driver.value ? true : false,
        currentStatus: driver.value || nanny.value ? true : false,
        make: make.value,
        model: model.value,
        licenseNo: licenseNo.value,
        insuranceNo: insuranceNo.value,
        routes: SelectedRoutes,
        currentlyAssignedDriver: driver.value ? true : false,
        currentlyAssignedNanny: nanny.value ? true : false
      },
    };

    console.log('bus data===', busData);

    editBus(
      busData,
      () => {
        // setTimeout(() => {
        history.push('/busManagement/list');
        // }, 2000)
      },
      () => setLoading(false)
    );

    console.log('DRIVER DATA INDEX', busData);
    setEmptyBus();
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
                <div className='card-header-info'>
                  <div className='info'>
                    <div className='title'>Edit Bus Details</div>
                  </div>
                  <div className='action'>
                    <Link className='close-button' to='/busManagement/list'>
                      <i className='lnr-cross-circle'> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='busNo'>Bus Number</Label>
                        <Input
                          name='busNo'
                          id='busNo'
                          value={busNo.value}
                          onChange={handleBusNoChange}
                          placeholder='Enter Bus No.'
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
                    <Col md='6'>
                      <FormGroup>
                        <Label for='capacity'>Seating Capacity</Label>
                        <Input
                          type='number'
                          name='capacity'
                          id='capacity'
                          value={seatingCapacity.value}
                          onChange={handleSeatingCapacityChange}
                          placeholder='Enter Seating Capacity'
                          required
                          maxLength="5"
                        />
                        <FormFeedback>
                          Seating Capacity cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='vin'>VIN Number</Label>
                        <Input
                          name='vin'
                          id='vin'
                          value={vinNo.value}
                          onChange={handleVinNoChange}
                          placeholder='Enter VIN No.'
                          required
                          maxLength="50"
                        />
                        <FormFeedback>VIN Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='driver'>Assign Driver (Optional)</Label>
                        <Input
                          type='select'
                          name='driver'
                          id='driver'
                          onChange={handleDriverChange}
                          value={driver.value}
                          // key={Math.floor(Math.random() * 99999)}
                        >
                          <option selected disabled value=''>
                            Assign Driver
                          </option>
                          {driverArray && driverArray.length > 0 ? (
                            driverArray.map((driver) => {
                              console.log('DROP DOWND DRIVER LIST', driver);
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
                            position: 'absolute',
                            top: 38,
                            right: 38,
                          }}
                          className=''
                          color='secondary'
                          type='button'
                          onClick={() =>
                            setDriver({
                              value: '',
                            })
                          }
                        >
                          {/* <i className="lnr-cross btn-icon-wrapper"> </i> */}
                          <i className='lnr-cross-circle'> </i>
                        </span>
                      ) : null}
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='nanny'>Assign Nanny (Optional)</Label>
                        <Input
                          type='select'
                          name='nanny'
                          id='nanny'
                          onChange={handleNannyChange}
                          value={nanny.value}
                          key={Math.floor(Math.random() * 99999)}
                        >
                          <option selected disabled value=''>
                            Assign Nanny
                          </option>
                          {nannyArray && nannyArray.length > 0 ? (
                            nannyArray.map((nanny) => {
                              console.log('DROP DOWND DRIVER LIST', nanny);
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
                            position: 'absolute',
                            top: 38,
                            right: 38,
                          }}
                          className=''
                          color='secondary'
                          type='button'
                          onClick={() =>
                            setNanny({
                              value: '',
                            })
                          }
                        >
                          {/* <i className="lnr-cross btn-icon-wrapper"> </i> */}
                          <i className='lnr-cross-circle'> </i>
                        </span>
                      ) : null}
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='make'>Make</Label>
                        <Input
                          type='text'
                          name='make'
                          id='make'
                          value={make.value}
                          onChange={handleMakeChange}
                          placeholder='Enter Make'
                          maxLength="50"
                        />
                        <FormFeedback>
                          Make cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='model'>Model</Label>
                        <Input
                          type='text'
                          name='model'
                          id='model'
                          value={model.value}
                          onChange={handleModelChange}
                          placeholder='Enter Model'
                          maxLength="50"
                        />
                        <FormFeedback>
                          Model cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='License'>License Number</Label>
                        <Input
                          type='text'
                          name='License'
                          id='License'
                          value={licenseNo.value}
                          onChange={handleLicNoChange}
                          placeholder='Enter License No.'
                          maxLength="50"
                        />
                        <FormFeedback>License Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='insurance'>Insurance Number</Label>
                        <Input
                          type='text'
                          name='insurance'
                          id='insurance'
                          value={insuranceNo.value}
                          onChange={handleInsNoChange}
                          placeholder='Enter Insurance No.'
                          maxLength="50"
                        />
                        <FormFeedback>Insurance Number cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    {/* <Col md='6'>
                      <FormGroup>
                        <Label for='route'>Assign Route (Optional)</Label>
                        <Input
                          type='select'
                          name='route'
                          id='route'
                          onChange={handleRouteChange}
                          value={route.value}
                        >
                          <option selected disabled value=''>
                            Assign Route
                          </option>
                        </Input>
                      </FormGroup>
                      {route.value ? (
                        <span
                          style={{
                            position: 'absolute',
                            top: 38,
                            right: 38,
                          }}
                          className=''
                          color='secondary'
                          type='button'
                          onClick={() =>
                            setRoute({
                              value: '',
                            })
                          }
                        >
                          <i className='lnr-cross-circle'> </i>
                        </span>
                      ) : null}
                    </Col> */}

                    <Col md={6}>
                      <Label for="route">Assign Route (Optional)</Label>
                      <Multiselect
                        displayValue="routeName"
                        selectedValues={SelectedRoutes}
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
                  <Button color='primary' className='mt-1' disabled={loading}>
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
    busId: ownProps.match.params.id,
    reduxDrivers: state.driver.unassignedDriver,
    buses: state.bus.bus,
    routes: state.route.route
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editBus: (busData, navigate, stopLoader) =>
      dispatch(editBus(busData, navigate, stopLoader)),
    fetchUnassignedDrivers: (schoolId) =>
      dispatch(fetchUnassignedDrivers(schoolId)),
    setEmptyBus: () => dispatch({ type: 'SET_EMPTY_BUS', payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusEdit);
