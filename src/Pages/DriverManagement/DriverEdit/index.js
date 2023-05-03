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
import './DriverEdit.scss';
import { Link, useHistory } from 'react-router-dom';
import { addDriver, editDriver } from '../../../store/actions/driverAction';
import { connect } from 'react-redux';
import { fetchUnassignedBuses } from '../../../store/actions/busAction';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import StarRatingComponent from 'react-star-rating-component';

const DriverEdit = (props) => {
  const {
    fetchUnassignedBuses,
    editDriver,
    schoolId,
    buses: reduxBuses,
    // buses,
    driverId,
    drivers,
    setEmptyDriver,
  } = props;
  const history = useHistory();
  let currentDriver = drivers.filter((driver) => {
    return driver._id === driverId;
  });
  let driver = {};

  const [buses, setBuses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState({
    value: '',
  });
  const [contact, setContact] = useState({
    value: '',
  });
  const [email, setEmail] = useState({
    value: '',
  });
  const [bus, setBus] = useState({
    value: '',
  });
  const [type, setType] = useState({
    value: "",
  });
  const [nationalId, setNationalId] = useState({
    value: "",
  });
  const [driverLicense, setDriverLicense] = useState({
    value: "",
  });
  const [workPermit, setWorkPermit] = useState(false);
  const [employerName, setEmployerName] = useState({
    value: "",
  });
  const [employerContact, setEmployerContact] = useState({
    value: "",
  });
  const [employerEmergencyContact, setEmployerEmergencyContact] = useState({
    value: "",
  });
  const [language, setLanguage] = useState({
    value: "",
  });
  const [bloodGroup, setBloodGroup] = useState({
    value: "",
  });
  const [insuranceId, setInsuranceId] = useState({
    value: "",
  });
  const [medicalInstructions, setMedicalInstructions] = useState({
    value: "",
  });
  const [medicalEmergencyContact, setMedicalEmergencyContact] = useState({
    value: "",
  });
  const [insuranceFrom, setInsuranceFrom] = useState({
    value: "",
  });
  const [yearsOfExperience, setYearsOfExperience] = useState({
    value: "",
  });
  const [rating, setRating] = useState({
    value: 0,
  });

  const handleNameChange = (e) => {
    e.preventDefault();
    setName({
      ...name,
      value: e.target.value,
    });
  };
  const handleContactChange = (e) => {
    // e.preventDefault();
    setContact({
      ...contact,
      value: e,
    });
  };
  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail({
      ...email,
      value: e.target.value,
    });
  };

  const handleBusChange = (e) => {
    e.preventDefault();
    setBus({
      value: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    setType({
      value: e.target.value,
    });
  };

  const handleNationalIdChange = (e) => {
    e.preventDefault();
    setNationalId({
      value: e.target.value,
    });
  };

  const handleDriverLicenseChange = (e) => {
    e.preventDefault();
    setDriverLicense({
      value: e.target.value,
    });
  };

  const handleWorkPermitChange = (e) => {
    e.preventDefault();
    setWorkPermit({
      value: e.target.value,
    });
  };

  const handleEmployerNameChange = (e) => {
    e.preventDefault();
    setEmployerName({
      value: e.target.value,
    });
  };

  const handleEmployerContactChange = (e) => {
    // e.preventDefault();
    setEmployerContact({
      value: e,
    });
  };

  const handleEmployerEmergencyContactChange = (e) => {
    // e.preventDefault();
    setEmployerEmergencyContact({
      value: e,
    });
  };

  const handleLanguageChange = (e) => {
    e.preventDefault();
    setLanguage({
      value: e.target.value,
    });
  };

  const handleBloodGroupChange = (e) => {
    e.preventDefault();
    setBloodGroup({
      value: e.target.value,
    });
  };

  const handleInsuranceIdChange = (e) => {
    e.preventDefault();
    setInsuranceId({
      value: e.target.value,
    });
  };

  const handleMedicalInstructionsChange = (e) => {
    e.preventDefault();
    setMedicalInstructions({
      value: e.target.value,
    });
  };

  const handleMedicalEmergencyContactChange = (e) => {
    // e.preventDefault();
    setMedicalEmergencyContact({
      value: e,
    });
  };

  const handleInsuranceFromChange = (e) => {
    e.preventDefault();
    setInsuranceFrom({
      value: e.target.value,
    });
  };

  const handleYearsOfExperienceChange = (e) => {
    e.preventDefault();
    setYearsOfExperience({
      value: e.target.value,
    });
  };

  const handleRatingChange = (nextValue, prevValue, name) => {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    setRating({
      value: nextValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const driverData = {
      id: driverId,
      driver: {
        schoolId: schoolId,
        name: name.value,
        email: email.value.toLowerCase(),
        contact: contact.value,
        // busId: bus.value ? bus.value : driver.busId,
        busId: bus.value ? bus.value : null,
        deleted: false,
        currentStatus: bus.value ? true : false,
        currentlyAssigned: bus.value ? true : false,
        type: type.value,
        nationalId: nationalId.value,
        driverLicense: type.value == "driver" ? driverLicense.value : null,
        workPermit: workPermit.value,
        employerName: employerName.value,
        employerContact: employerContact.value,
        employerEmergencyContact: employerEmergencyContact.value,
        language: language.value,
        bloodGroup: bloodGroup.value,
        insuranceId: insuranceId.value,
        medicalInstructions: medicalInstructions.value,
        medicalEmergencyContact: medicalEmergencyContact.value,
        insuranceFrom: insuranceFrom.value,
        yearsOfExperience: yearsOfExperience.value,
        rating: rating.value,
      },
    };

    console.log('EEE', driverData);

    editDriver(
      driverData,
      () => {
        // setTimeout(() => {
        history.push('/driverManagement/list');
        // }, 2000)
      },
      () => setLoading(false)
    );

    setEmptyDriver();
    setTimeout(() => {
      history.push('/driverManagement/list');
    }, 500);
  };

  // useEffect(() => {
  //   fetchUnassignedBuses({ id: schoolId }, () => {});
  //   return () => {};
  // }, []);

  useEffect(() => {
    getUnassignedBuses();
  }, [getUnassignedBuses]);

  const getUnassignedBuses = async () => {
    const data = await fetchUnassignedBuses({ id: schoolId });
    let filteredData
    if (currentDriver[0].type == 'driver') {
      filteredData = data.filter(bus => !bus.currentlyAssignedDriver)

    } else if (currentDriver[0].type == 'nanny') {
      filteredData = data.filter(bus => !bus.currentlyAssignedNanny)

    }
    if (currentDriver[0].busId) {
      console.log('set bus run 1', [currentDriver[0].busId, ...filteredData]);
      setBuses([currentDriver[0].busId, ...filteredData]);
    } else {
      console.log('set bus run 2', [...reduxBuses]);
      setBuses([...filteredData]);
    }
  };

  useEffect(() => {
    console.log("buses", buses)
    console.log("bus", bus)
  }, [buses, bus])

  useEffect(() => {
    console.log("all buses", buses)
    console.log("all drivers", drivers)
    // currentDriver = drivers.filter((driver) => {
    //   return driver._id === driverId;
    // });
    console.log('current unassigned buses', currentDriver);

    if (currentDriver[0].busId) {
      console.log('set bus run 3', [currentDriver[0].busId]);
      setBuses([currentDriver[0].busId]);
      setBus({
        value: currentDriver[0].busId._id,
      });
    }
    console.log("all buses added", buses)


    driver = currentDriver[0];

    setName({
      value: driver.name,
    });
    setContact({
      value: driver.contact,
    });
    setEmail({
      value: driver.email,
    });
    setType({
      value: driver.type,
    })
    setNationalId({
      value: driver.nationalId,
    })
    setDriverLicense({
      value: driver.driverLicense,
    })
    setWorkPermit({
      value: driver.workPermit,
    })
    setEmployerName({
      value: driver.employerName,
    })
    setEmployerContact({
      value: driver.employerContact,
    })
    setEmployerEmergencyContact({
      value: driver.employerEmergencyContact,
    })
    setLanguage({
      value: driver.language,
    })
    setBloodGroup({
      value: driver.bloodGroup,
    })
    setInsuranceId({
      value: driver.insuranceId,
    })
    setMedicalInstructions({
      value: driver.medicalInstructions,
    })
    setMedicalEmergencyContact({
      value: driver.medicalEmergencyContact,
    })
    setInsuranceFrom({
      value: driver.insuranceFrom,
    })
    setYearsOfExperience({
      value: driver.yearsOfExperience,
    })
    setRating({
      value: driver.rating,
    })

    // return () => {
    //   setBus({ value: "" })
    // };
  }, []);

  const workPermitOptions = [
    {
      name: "Yes",
      value: true,
    },
    {
      name: "No",
      value: false,
    },
  ];
  const types = [
    {
      name: "Driver",
      value: "driver",
    },
    {
      name: "Nanny",
      value: "nanny",
    },
  ];

  const bloodGroups = [
    {
      name: "AB+",
      value: "AB+",
    },
    {
      name: "AB-",
      value: "AB-",
    },
    {
      name: "A+",
      value: "A+",
    },
    {
      name: "B+",
      value: "B+",
    },
    {
      name: "O+",
      value: "O+",
    },
    {
      name: "A-",
      value: "A-",
    },
    {
      name: "B-",
      value: "B-",
    },
    {
      name: "O-",
      value: "O-",
    },
  ];


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
                    <div className='title'>Edit Resource Details</div>
                  </div>
                  <div className='action'>
                    <Link className='close-button' to='/driverManagement/list'>
                      <i className='lnr-cross-circle'> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='name'>Full Name</Label>
                        <Input
                          name='name'
                          id='name'
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          placeholder='Enter Full Name'
                          maxLength="50"
                        />
                        <FormFeedback>Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='contact'>Contact Number</Label>
                        {/* <Input
                          name="contact"
                          id="contact"
                          placeholder="Enter Contact Number"
                          value={contact.value}
                          onChange={handleContactChange}
                          required
                          type="number"
                        /> */}
                        <PhoneInput
                          inputProps={{
                            name: 'contact',
                            required: true,
                          }}
                          id='contact'
                          country={"om"}
                          placeholder='Enter Contact Number'
                          value={contact.value}
                          onChange={(phone) => handleContactChange(phone)}
                          required
                        />
                        <FormFeedback>Contact cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input
                          type='email'
                          name='email'
                          id='email'
                          placeholder='Enter Email Address'
                          value={email.value}
                          onChange={handleEmailChange}
                          required
                          maxLength="50"
                        />
                        <FormFeedback>Email cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='busNo'>Assign Bus (Optional)</Label>
                        <Input
                          type="select"
                          name="busNo"
                          id="busNo"
                          onChange={handleBusChange}
                          value={bus.value}
                        >
                          <option selected disabled value="">
                            Assign Bus
                          </option>
                          {buses && buses.length > 0 ? (
                            buses.map((bus) => {
                              return (
                                <option value={bus._id} key={bus._id}>
                                  Bus No. {bus.busNo}
                                </option>
                              );
                            })
                          ) : <option disabled> No Buses Available </option>}
                        </Input>
                      </FormGroup>
                      {bus.value ? (
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
                            setBus({
                              value: '',
                            })
                          }
                        >
                          {/* <i className="lnr-cross btn-icon-wrapper"> </i> */}
                          <i className='lnr-cross-circle'> </i>
                        </span>
                      ) : null}
                    </Col>


                    <Col md="6">
                      <FormGroup>
                        <Label for="nationalId">National Id</Label>
                        <Input
                          name="nationalId"
                          id="nationalId"
                          value={nationalId.value}
                          onChange={handleNationalIdChange}
                          required
                          placeholder="Enter National Id"
                          maxLength="50"
                        />
                        <FormFeedback>National Id cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="workPermit">Work Permit</Label>
                        <Input
                          type="select"
                          name="workPermit"
                          id="workPermit"
                          placeholder="Do you have Work Permit ?"
                          value={workPermit.value}
                          onChange={handleWorkPermitChange}
                        >
                          <option selected disabled value="">
                            Do you have Work Permit ?
                          </option>
                          {workPermitOptions && workPermitOptions.length > 0 ? (
                            workPermitOptions.map((workPermit) => {
                              return (
                                <option
                                  value={workPermit.value}
                                  key={workPermit.value}
                                >
                                  {workPermit.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled>No Options Available</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="6">
                      <FormGroup>
                        <Label for="type">Type</Label>
                        <Input
                          type="select"
                          name="type"
                          id="type"
                          placeholder="Select Type"
                          value={type.value}
                          onChange={handleTypeChange}
                          required
                        >
                          <option selected disabled value="">
                            Select Type
                          </option>
                          {types && types.length > 0 ? (
                            types.map((type) => {
                              return (
                                <option value={type.value} key={type.value}>
                                  {type.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled>No Types Available</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>

                    {type.value == "driver" ? (
                      <>
                        <Col md="6">
                          <FormGroup>
                            <Label for="driverLicense">Driver License</Label>
                            <Input
                              name="driverLicense"
                              id="driverLicense"
                              value={driverLicense.value}
                              onChange={handleDriverLicenseChange}
                              placeholder="Enter Driver License"
                              maxLength="50"
                            />
                          </FormGroup>
                        </Col>
                      </>
                    ) : null}
                  </Row>

                  <div className='card-header-info mt-4'>
                    <div className='info'>
                      <div className='title'>Medical Record</div>
                    </div>
                  </div>

                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='bloodGroup'>Blood Group</Label>
                        <Input
                          type='select'
                          name='bloodGroup'
                          id='bloodGroup'
                          placeholder='Select Blood Group'
                          value={bloodGroup.value}
                          onChange={handleBloodGroupChange}
                        >
                          <option selected disabled value=''>
                            Select Blood Group
                          </option>
                          {bloodGroups && bloodGroups.length > 0 ? (
                            bloodGroups.map((bloodGroup) => {
                              return (
                                <option value={bloodGroup.value} key={bloodGroup.value}>
                                  {bloodGroup.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled>No Blood Groups Available</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='medicalEmergencyContact'>Medical Emergency Contact Number</Label>
                        <PhoneInput
                          inputProps={{
                            name: "medicalEmergencyContact",
                          }}
                          id="medicalEmergencyContact"
                          country={"om"}
                          placeholder="Enter Medical Emergency Contact Number"
                          value={medicalEmergencyContact.value}
                          onChange={(phone) => handleMedicalEmergencyContactChange(phone)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='insuranceId'>Insurance Id</Label>
                        <Input
                          name='insuranceId'
                          id='insuranceId'
                          placeholder='Enter Insurance Id'
                          value={insuranceId.value}
                          onChange={handleInsuranceIdChange}
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='insuranceFrom'>Insurance Company</Label>
                        <Input
                          name='insuranceFrom'
                          id='insuranceFrom'
                          placeholder='Enter Insurance Company'
                          value={insuranceFrom.value}
                          onChange={handleInsuranceFromChange}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>

                    <Col md='12'>
                      <FormGroup>
                        <Label for='medicalInstructions'>Medical Instructions (If any)</Label>
                        <textarea
                          class="form-control"
                          id="medicalInstructions"
                          rows="3"
                          placeholder='Enter Medical Instructions'
                          value={medicalInstructions.value}
                          onChange={handleMedicalInstructionsChange}
                          style={{ resize: 'none' }}
                        ></textarea>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className='card-header-info mt-4'>
                    <div className='info'>
                      <div className='title'>Work Experience Details</div>
                    </div>
                  </div>

                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='yearsOfExperience'>Years Of Experience</Label>
                        <Input
                          name='yearsOfExperience'
                          id='yearsOfExperience'
                          placeholder='Enter Years Of Experience'
                          value={yearsOfExperience.value}
                          onChange={handleYearsOfExperienceChange}
                          maxLength="5"
                        />
                      </FormGroup>
                    </Col>

                    {/* <Col md='6'>
                      <FormGroup>
                        <Label for='rating'>Rating</Label>
                        <Input
                          name='rating'
                          id='rating'
                          placeholder='Enter Rating'
                          value={rating.value}
                          onChange={handleRatingChange}
                        />
                      </FormGroup>
                    </Col> */}

                    <Col md='6'>
                      <FormGroup>
                        <Label for='rating'>Rating</Label>
                        <div style={{ fontSize: 26 }}>
                          <StarRatingComponent
                            name="app2"
                            id='rating'
                            starCount={5}
                            value={rating.value}
                            onStarClick={handleRatingChange}
                          />
                        </div>
                      </FormGroup>
                    </Col>

                  </Row>

                  <div className='card-header-info mt-4'>
                    <div className='info'>
                      <div className='title'>Employer Details</div>
                    </div>
                  </div>

                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='employerName'>Name</Label>
                        <Input
                          name='employerName'
                          id='employerName'
                          placeholder='Enter Name'
                          value={employerName.value}
                          onChange={handleEmployerNameChange}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='employerContact'>Contact Number</Label>
                        {/* <Input
                          name='employerContact'
                          id='employerContact'
                          placeholder='Enter Contact'
                          value={employerContact.value}
                          onChange={handleEmployerContactChange}
                        /> */}
                        <PhoneInput
                          inputProps={{
                            name: "employerContact",
                          }}
                          id="employerContact"
                          country={"om"}
                          placeholder="Enter Contact Number"
                          value={employerContact.value}
                          onChange={(phone) => handleEmployerContactChange(phone)}
                        />
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='employerEmergencyContact'>Emergency Contact Number</Label>
                        <PhoneInput
                          inputProps={{
                            name: "employerEmergencyContact",
                          }}
                          id="employerEmergencyContact"
                          country={"om"}
                          placeholder="Enter Emergency Contact Number"
                          value={employerEmergencyContact.value}
                          onChange={(phone) => handleEmployerEmergencyContactChange(phone)}
                        />
                      </FormGroup>
                    </Col>


                    <Col md='6'>
                      <FormGroup>
                        <Label for='language'>Language</Label>
                        <Input
                          name='language'
                          id='language'
                          placeholder='Enter Language'
                          value={language.value}
                          onChange={handleLanguageChange}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Link className='close-button' to='/driverManagement/list'>
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
    driverId: ownProps.match.params.id,
    buses: state.bus.unassignedBuses,
    drivers: state.driver.driver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editDriver: (driverData, navigate, stopLoader) =>
      dispatch(editDriver(driverData, navigate, stopLoader)),
    fetchUnassignedBuses: (schoolId) =>
      dispatch(fetchUnassignedBuses(schoolId)),
    setEmptyDriver: () => dispatch({ type: 'SET_EMPTY_BUS', payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverEdit);
