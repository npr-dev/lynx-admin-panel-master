import React, { Fragment, useState, useEffect } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
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
  InputGroup,
  InputGroupAddon,
  FormText,
} from 'reactstrap';
import * as utils from '../../../common/utils';
import Multiselect from "multiselect-react-dropdown";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search } from '../../../Layout/ActionCenter';
import './StudentAdd.scss';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
// import DatePicker from "react-datepicker";
import DatePicker from 'react-datepicker';
// import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import UploadBulk from '../UploadBulkModal/UploadBulk';
import { addStudent } from '../../../store/actions/studentAction';
import { connect } from 'react-redux';
import { fetchParents } from '../../../store/actions/parentAction';
import {} from '../../../store/actions/schoolAction';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { actionTypes } from '../../../store/common/types';
import MyGoogleMap from '../../../common/components/LocationPicker/MyGoogleMap';
import "../../../common/components/LocationPicker/LocationPicker.css";

const StudentAdd = (props) => {
  const { schoolId, addStudent, parents, increaseStudentCount } = props;
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  // student details
  const [name, setName] = useState({
    value: '',
  });
  const [rfid, setRfid] = useState({
    value: '',
  });
  const [rollNo, setRollNo] = useState({
    value: '',
  });
  const [date, setDate] = useState({
    value: new Date(),
  });
  const [grade, setGrade] = useState({
    value: '',
  });
  const [street, setStreet] = useState({
    value: '',
  });
  const [town, setTown] = useState({
    value: '',
  });
  const [address, setAddress] = useState({
    value: '',
  });
  const [regNo, setRegNo] = useState({
    value: '',
  });
  const [parentId, setParentId] = useState({
    value: '',
  });

  //student medical record
  const [bloodGroup, setBloodGroup] = useState({
    value: '',
  });
  const [insuranceId, setInsuranceId] = useState({
    value: '',
  });
  const [medicalInstructions, setMedicalInstructions] = useState({
    value: '',
  });
  const [location, setLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });


  // const [busId, setBusId] = useState({
  //   value: "",
  // });

  // parent details
  const [parentName, setParentName] = useState({
    value: '',
  });
  const [contact, setContact] = useState({
    value: '',
  });
  const [email, setEmail] = useState({
    value: '',
  });

  useEffect(() => {
    props.fetchParents({ id: schoolId });
  }, []);

  // details handle methods
  var selectedGuardians =[]

  const handlemultiSelector = (e) => {
    console.log("e array",e)
    selectedGuardians = e.map((item) => item._id)
    console.log("selectedGuardians",selectedGuardians)
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setName({
      ...name,
      value: e.target.value,
    });
  };
  const handleRFIDChange = (e) => {
    e.preventDefault();
    setRfid({
      ...rfid,
      value: e.target.value,
    });
  };
  const handleRollNoChange = (e) => {
    e.preventDefault();
    setRollNo({
      ...rollNo,
      value: e.target.value,
    });
  };
  const handleDateChange = (date) => {
    setDate({
      value: date,
    });
  };
  const handleGradeChange = (e) => {
    e.preventDefault();
    setGrade({
      ...grade,
      value: e.target.value,
    });
  };

  const handleLocationChange = (loc) => {
    setLocation({
      ...location,
      ...loc
    });
  };
  const handleStreetChange = (e) => {
    e.preventDefault();
    setStreet({
      ...street,
      value: e.target.value,
    });
  };
  const handleTownChange = (e) => {
    e.preventDefault();
    setTown({
      ...town,
      value: e.target.value,
    });
  };
  const handleAddressChange = (e) => {
    e.preventDefault();
    setAddress({
      ...street,
      value: e.target.value,
    });
  };
  const handleRegNoChange = (e) => {
    e.preventDefault();
    setRegNo({
      ...regNo,
      value: e.target.value,
    });
  };
  const handleParentIdChange = (e) => {
    e.preventDefault();
    setParentId({
      ...parentId,
      value: e.target.value,
    });
  };
  // const handleBusChange = (e) => {
  //   e.preventDefault();
  //   setBusId({
  //     value: e.target.value,
  //   });
  // };

  // medical record handle methods
  const handleBloodGroupChange = (e) => {
    e.preventDefault();
    setBloodGroup({
      ...bloodGroup,
      value: e.target.value,
    });
  };
  const handleInsuranceIdChange = (e) => {
    e.preventDefault();
    setInsuranceId({
      ...insuranceId,
      value: e.target.value,
    });
  };
  const handleMedicalInstructionsChange = (e) => {
    e.preventDefault();
    setMedicalInstructions({
      ...medicalInstructions,
      value: e.target.value,
    });
  };

  // parent info handlers
  const handleParentNameChange = (e) => {
    e.preventDefault();
    setParentName({
      ...parentName,
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

  // submitting student form
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // if (!validate()) {
    //   return;
    // }

    // console.log('sending', date.value._d);

    const studentData = {
      student: {
        schoolId: schoolId,
        name: name.value,
        RFID: rfid.value,
        studentId: rollNo.value,
        dob: date.value && `${date.value.getDate()}-${date.value.getMonth() +
          1}-${date.value.getFullYear()}`,
        class: grade.value,
        street: street.value,
        town: town.value,
        address: address.value,
        registrationNo: regNo.value,
        bloodGroup: bloodGroup.value,
        insuranceId:insuranceId.value,
        medicalInstructions:medicalInstructions.value,
        parentId: parentId.value ? parentId.value : null,
        pictures: '',
        busId: null,
        deleted: false,
        recognized: false,
        assigned: false,
        encoding: [],
        location:{...location},
        guardians: selectedGuardians
      },
      parentDetails: !parentId.value
        ? {
            name: parentName.value,
            email: email.value.toLowerCase(),
            contact: contact.value,
          }
        : null,
    };

    console.log('aaaa', props.studentCount, props.slots);

    if (props.studentCount + 1 <= props.slots) {
      addStudent(
        studentData,
        () => {
          increaseStudentCount();
          history.push('/studentManagement/list');
        },
        () => setLoading(false)
      );
    } else {
      utils._toast('You have reached your limit, buy more slots', 'error');
      setLoading(false);
    }
    // addStudent(
    //   studentData,
    //   () => {
    //     history.push("/studentManagement/list");
    //   },
    //   () => setLoading(false)
    // );

    // addStudent(studentData);
    // history.push("/studentManagement/list");
  };

  const bloodGroups = [
    {
      name: 'AB+',
      value: 'AB+',
    },
    {
      name: 'AB-',
      value: 'AB-',
    },
    {
      name: 'A+',
      value: 'A+',
    },
    {
      name: 'B+',
      value: 'B+',
    },
    {
      name: 'O+',
      value: 'O+',
    },
    {
      name: 'A-',
      value: 'A-',
    },
    {
      name: 'B-',
      value: 'B-',
    },
    {
      name: 'O-',
      value: 'O-',
    },
  ]

  const classes = [
    {
      name: 'KG1',
      value: 'KG1',
    },
    {
      name: 'KG2',
      value: 'KG2',
    },
    {
      name: 'I',
      value: 1,
    },
    {
      name: 'II',
      value: 2,
    },
    {
      name: 'III',
      value: 3,
    },
    {
      name: 'IV',
      value: 4,
    },
    {
      name: 'V',
      value: 5,
    },
    {
      name: 'VI',
      value: 6,
    },
    {
      name: 'VII',
      value: 7,
    },
    {
      name: 'VIII',
      value: 8,
    },
    {
      name: 'IX',
      value: 9,
    },
    {
      name: 'X',
      value: 10,
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
                    <div className='title'>Add Student</div>
                  </div>
                  <div className='action'>
                    <Link className='close-button' to='/studentManagement/list'>
                      <i className='lnr-cross-circle'> </i>
                    </Link>
                  </div>
                </div>
                {/* <div className="text-center">
                  <UploadBulk />
                </div>
                <div className="separator">OR</div>
                <div className="card-header-info">
                  <div className="info">
                    <div className="title">Add Single Student Details</div>
                  </div>
                </div> */}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='name'>Full Name</Label>
                        <Input
                          name='name'
                          id='name'
                          placeholder='Enter Full Name'
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='rfid'>RFID Number</Label>
                        <Input
                          name='rfid'
                          id='rfid'
                          placeholder='Enter RFID Number'
                          value={rfid.value}
                          onChange={handleRFIDChange}
                          // required
                          // maxLength='20'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='name'>Roll Number</Label>
                        <Input
                          name='rollNo'
                          id='rollNo'
                          placeholder='Enter Roll Number'
                          value={rollNo.value}
                          onChange={handleRollNoChange}
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <Label for='dob'>Date of Birth</Label>
                      <InputGroup>
                        <InputGroupAddon addonType='prepend'>
                          <div className='input-group-text'>
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </div>
                        </InputGroupAddon>
                        <DatePicker
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          className='form-control'
                          selected={date.value}
                          onChange={handleDateChange}
                          dateFormat='dd-MM-yyyy'
                          maxDate={new Date()}
                          value={date.value}
                        />
                      </InputGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='class'>Class</Label>
                        <Input
                          type='select'
                          name='class'
                          id='class'
                          value={grade.value}
                          onChange={handleGradeChange}
                          required
                        >
                          <option selected disabled value=''>
                            Select Class
                          </option>
                          {classes && classes.length > 0 ? (
                            classes.map((grade) => {
                              return (
                                <option value={grade.value} key={grade.value}>
                                  {grade.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled>No Classes Available</option>
                          )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='name'>Street</Label>
                        <Input
                          name='street'
                          id='street'
                          placeholder='Enter Street'
                          value={street.value}
                          onChange={handleStreetChange}
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='name'>Town</Label>
                        <Input
                          name='town'
                          id='town'
                          placeholder='Enter Town'
                          value={town.value}
                          onChange={handleTownChange}
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='address'>City</Label>
                        <Input
                          name='address'
                          id='address'
                          placeholder='Enter City'
                          value={address.value}
                          onChange={handleAddressChange}
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>

                    <Col md='6'>
                      <FormGroup>
                        <Label for='regNo'>Registration Number</Label>
                        <Input
                          name='regNo'
                          id='regNo'
                          placeholder='Enter Registration Number'
                          value={regNo.value}
                          onChange={handleRegNoChange}
                          maxLength='20'
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label for="location">Location</Label>
                      <div className="locationDiv">
                        <Label>{location.address}</Label>
                      </div>
                    </Col>
                    <Col md="12">
                      <Label>Search Location</Label>
                      <div className="main-wrapper">
                        <MyGoogleMap handleLocationChange={handleLocationChange}/>
                      </div>
                    </Col>
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
                        style={{resize:'none'}}
                        ></textarea>
                      </FormGroup>
                    </Col>
                  </Row>

                  <div className='card-header-info mt-4'>
                    <div className='info'>
                      <div className='title'>Parent Data</div>
                    </div>
                  </div>

                  <Row>
                    <Col md='6'>
                      <FormGroup>
                        <Label for='parent'>
                          Assign (If Parent Already registered)
                        </Label>
                        <Input
                          type='select'
                          name='parent'
                          id='parent'
                          value={parentId.value}
                          onChange={handleParentIdChange}
                        >
                          <option selected disabled value=''>
                            Select Student's Parent / Guardian
                          </option>
                          {parents && parents.length > 0 ? (
                            parents.map((parent) => {
                              return (
                                <option value={parent._id} key={parent._id}>
                                  {parent.name}
                                </option>
                              );
                            })
                          ) : (
                            <option disabled>
                              No Parents Available, Add Manually
                            </option>
                          )}
                        </Input>
                      </FormGroup>
                      {parentId.value ? (
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
                            setParentId({
                              value: '',
                            })
                          }
                        >
                          <i className='lnr-cross-circle'> </i>
                        </span>
                      ) : null}
                    </Col>
                  </Row>
                  {!parentId.value ? (
                    <>
                      <div className='separator'>OR</div>
                      <Row>
                        <Col md='6'>
                          <FormGroup>
                            <Label for='parentName'>Full Name</Label>
                            <Input
                              name='parentName'
                              id='parentName'
                              placeholder='Enter Full Name'
                              value={parentName.value}
                              onChange={handleParentNameChange}
                              required={!parentId.value}
                              maxLength="50"
                            />
                          </FormGroup>
                        </Col>
                        <Col md='6'>
                          <FormGroup>
                            <Label for='contact'>Contact Number</Label>
                            <PhoneInput
                              name='contact'
                              id='contact'
                              country={"om"}
                              placeholder='Enter Contact Number'
                              value={contact.value}
                              onChange={(phone) => handleContactChange(phone)}
                              required={!parentId.value}
                            />
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
                              required={!parentId.value}
                              maxLength="50"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  ) : null}

                  <div className='card-header-info mt-4'>
                    <div className='info'>
                      <div className='title'>Guardians Data</div>
                    </div>
                  </div>

                  <Row>
                    <Col md={6}>
                      <Label for="guardian">Assign Guardians (Optional)</Label>
                      <Multiselect
                        displayValue="name" 
                        // onSelect={function noRefCheck(e,s) {console.log("selected routes",e,s)}}
                        onSelect={function noRefCheck(e) {handlemultiSelector(e)}}
                        onRemove={function noRefCheck(e) {handlemultiSelector(e)}}
                        // options={parents}
                        options={parents.filter((parent)=> parentId.value !== parent._id)}
                        placeholder="Select Guardians"
                        style={{chips:{background:'#555CD8'}}}
                      />
                       <FormText color="muted">
                          Please add guardian from parent section if you don't
                          find the desired guardian in the list.
                        </FormText>
                    </Col>
                  </Row>

                  <Link className='close-button' to='/studentManagement/list'>
                    <Button color='secondary' className='mr-2 mt-4'>
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    color='primary'
                    className='mt-4'
                    disabled={
                      loading ||
                      !name.value ||
                      !grade.value
                    }
                  >
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
    parents: state.parent.parent,
    slots: state.auth.user.result.userExist.slots,
    studentCount: state.auth.user.result.studentCount,

    // buses: state.bus.bus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (studentData, navigate, stopLoader) =>
      dispatch(addStudent(studentData, navigate, stopLoader)),
    fetchParents: (schoolId) => dispatch(fetchParents(schoolId)),
    increaseStudentCount: () =>
      dispatch({ type: actionTypes.INCREASE_STUDENT_COUNT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAdd);
