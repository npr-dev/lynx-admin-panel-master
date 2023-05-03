import React, { Fragment, useState, useEffect } from "react";
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
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormText,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Search } from "../../../Layout/ActionCenter";
import "./StudentEdit.scss";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import UploadBulk from "../UploadBulkModal/UploadBulk";
import { addStudent, editStudent } from "../../../store/actions/studentAction";
import { connect } from "react-redux";
import { fetchParents } from "../../../store/actions/parentAction";
import MyGoogleMap from "../../../common/components/LocationPicker/MyGoogleMap";
import "../../../common/components/LocationPicker/LocationPicker.css";
import Multiselect from "multiselect-react-dropdown";
// import * as utils from './../../../common/utils'

const StudentEdit = (props) => {
  const { schoolId, editStudent, buses, studentId, students, parents } = props;
  const history = useHistory();

  const currentStudent = students.filter((student) => {
    return student._id === studentId;
  });

  const student = currentStudent[0];

  const [loading, setLoading] = useState(false);
  const [locationModal, setLocationModal] = useState(false);


  // student details
  var [SelectedGuardians,setSelectedGuardians] =useState([])
  const [studentss, setStudent] = useState({});
  const [name, setName] = useState({
    value: "",
  });
  const [rfid, setRfid] = useState({
    value: '',
  });
  const [rollNo, setRollNo] = useState({
    value: "",
  });
  const [date, setDate] = useState({
    value: "",
  });
  const [grade, setGrade] = useState({
    value: "",
  });
  const [street, setStreet] = useState({
    value: "",
  });
  const [town, setTown] = useState({
    value: "",
  });
  const [address, setAddress] = useState({
    value: "",
  });
  const [parentId, setParentId] = useState({
    value: "",
  });
  const [regNo, setRegNo] = useState({
    value: '',
  });
  const [location, setLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
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

  useEffect(() => {
    props.fetchParents({ id: schoolId });
    if(student.location)
    console.log(Object.keys(student.location).length);
    if (student.location && student.location.address != "") {
      setLocation({
        address: student.location.address,
        latitude: student.location.latitude,
        longitude: student.location.longitude,
      });
    }

    if (student) {
      if(student && student.dob)
      {
        const dobUpdate = student.dob.replace(/\//g, "-");
        const dobDate = dobUpdate.split("-");
        setDate({ value: new Date(dobDate[2], dobDate[1] - 1, dobDate[0]) });
      }
      setStudent(student);
      console.log("student", student);
      setName({ value: student.name });
      setRfid({ value: student.RFID });
      setRollNo({ value: student.studentId });
      setGrade({ value: student.class });
      setStreet({ value: student.street });
      setTown({ value: student.town });
      setAddress({ value: student.address });
      setBloodGroup({ value: student.bloodGroup ? student.bloodGroup : '' }) 
      setInsuranceId({ value: student.insuranceId ? student.insuranceId : '' })
      setMedicalInstructions({ value: student.medicalInstructions ? student.medicalInstructions : '' })
      setRegNo({ value: student.registrationNo });
      setParentId({ value: student.parentId ? student.parentId._id : null });
      setSelectedGuardians([...student.guardians])
    }
  }, [student]);

  useEffect(() => {
   console.log("SelectedGuardians",SelectedGuardians)
  }, [SelectedGuardians])

  // details handle methods
  
  const handlemultiSelector = (e) => {
    setSelectedGuardians(e)
    console.log("e array",e)
    // SelectedGuardians = e.map((item) => item._id)
    console.log("SelectedGuardians",SelectedGuardians)
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

  const handleParentIdChange = (e) => {
    e.preventDefault();
    setParentId({
      ...parentId,
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

  const handleLocationChange = (loc) => {
    setLocation({
      ...location,
      ...loc,
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


  // submitting student form
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const studentData = {
      id: studentId,
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
        parentId: parentId.value,
        pictures: studentss.pictures,
        registrationNo: regNo.value,
        busId: studentss.busId ? studentss.busId : null,
        deleted: false,
        bloodGroup: bloodGroup.value,
        insuranceId:insuranceId.value,
        medicalInstructions:medicalInstructions.value,
        location: { ...location },
        guardians: SelectedGuardians
      },
    };

    console.log("student data", studentData);

    editStudent(
      studentData,
      () => {
        history.push("/studentManagement/list");
      },
      () => setLoading(false)
    );
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
  console.log("students -->", student);
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
                    <div className="title">Edit Student Details</div>
                  </div>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Full Name</Label>
                        <Input
                          name="name"
                          id="name"
                          placeholder="Enter Full Name"
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          maxLength="50"
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
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Roll Number</Label>
                        <Input
                          name="rollNo"
                          id="rollNo"
                          placeholder="Enter Roll Number"
                          value={rollNo.value}
                          onChange={handleRollNoChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label for="dob">Date of Birth</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <div className="input-group-text">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </div>
                        </InputGroupAddon>
                        <DatePicker
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          className="form-control"
                          selected={date.value}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                          maxDate={new Date()}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="Class">Class</Label>
                        <Input
                          type="select"
                          name="Class"
                          id="Class"
                          value={grade.value}
                          onChange={handleGradeChange}
                          required
                          maxLength="50"
                        >
                          <option selected disabled value="">
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
                              <option value="" disabled>No Classes Available</option>
                            )}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Street</Label>
                        <Input
                          name="street"
                          id="street"
                          placeholder="Enter Street"
                          value={street.value}
                          onChange={handleStreetChange}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">Town</Label>
                        <Input
                          name="town"
                          id="town"
                          placeholder="Enter Town"
                          value={town.value}
                          onChange={handleTownChange}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="address">City</Label>
                        <Input
                          name="address"
                          id="address"
                          placeholder="Enter City"
                          value={address.value}
                          onChange={handleAddressChange}
                          maxLength="50"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="parent">Assign Parent</Label>
                        <Input
                          type="select"
                          name="parent"
                          id="parent"
                          value={parentId.value}
                          onChange={handleParentIdChange}
                        >
                          <option selected disabled value="">
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
                        <FormText color="muted">
                          Please add parent from parent section if you don't
                          find the desired parent in the list.
                        </FormText>
                      </FormGroup>
                      {parentId.value ? (
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
                            setParentId({
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
                      <Label for="guardian">Assign Guardians (Optional)</Label>
                      <Multiselect
                        displayValue="name"
                        selectedValues={SelectedGuardians}
                        onSelect={function noRefCheck(e) {handlemultiSelector(e)}}
                        onRemove={function noRefCheck(e) {handlemultiSelector(e)}}
                        options={parents.filter((parent)=> parentId.value !== parent._id)}
                        placeholder="Select Guardians"
                        style={{chips:{background:'#555CD8'}}}
                      />
                       <FormText color="muted">
                          Please add guardian from parent section if you don't
                          find the desired guardian in the list.
                        </FormText>
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
                    {location.address == "" && !locationModal? (
                      <Button
                        color="primary"
                        style={{
                          height: 35,
                          marginTop: "2.5%",
                          marginLeft: "2.5%",
                        }}
                        onClick={() =>
                          setLocationModal(true)
                        }
                      >
                        Set Location
                      </Button>
                    ) : (
                      [
                        locationModal? (
                          <>
                            <Col md="6">
                              <Label for="location">Location</Label>
                              <div className="locationDiv">
                                <Label>{location.address}</Label>
                              </div>
                            </Col>
                            <Col md="12">
                              <Label>Search Location</Label>
                              <div className="main-wrapper">
                                <MyGoogleMap
                                  handleLocationChange={handleLocationChange}
                                />
                              </div>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col md="6">
                              <Label for="location">Location</Label>
                              <div className="locationDiv">
                                <Label>{location.address}</Label>
                              </div>
                            </Col>
                            <Col md="12">
                              <Label>Search Location</Label>
                              <div className="main-wrapper">
                                <MyGoogleMap
                                  handleLocationChange={handleLocationChange}
                                  parentComponent="edit"
                                  // currentLocation={student ? student.location : undefined}
                                  currentLocation={
                                    student &&
                                    student.location
                                  }
                                />
                              </div>
                            </Col>
                          </>
                        ),
                      ]
                    )}
                    {/* <Col md="6">
                      <FormGroup>
                        <Label for="busNo">Assign Bus</Label>
                        <Input
                          type="select"
                          name="busNo"
                          id="busNo"
                          placeholder="Enter Town"
                          value={busId.value}
                          onChange={handleBusChange}
                        >
                          <option selected disabled value="">
                            Select Bus
                          </option>
                          {buses && buses.length > 0 ? (
                            buses.map((bus) => {
                              return (
                                <option value={bus._id} key={bus._id}>
                                  Bus No. {bus.busNo}
                                </option>
                              );
                            })
                          ) : (
                              <option disabled>No Bus Available</option>
                            )}
                        </Input>
                      </FormGroup>
                    </Col>
                   */}
                  </Row>
                  <div className='card-header-info mt-4'>
                    <div className='info'>
                      <div className='title'>Edit Medical Record</div>
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
                          placeholder='Enter Blood Group'
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
                        className="form-control" 
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
                  <Link
                    className="close-button"
                    to="/studentManagement/list"
                    disabled={loading}
                  >
                    <Button
                      color="secondary"
                      className="mr-2 mt-1"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button color="primary" className="mt-1" disabled={loading}>
                    Done
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
    studentId: ownProps.match.params.id,
    students: state.student.student,
    buses: state.bus.bus,
    parents: state.parent.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editStudent: (studentData, navigate, stopLoader) =>
      dispatch(editStudent(studentData, navigate, stopLoader)),
    fetchParents: (schoolId) => dispatch(fetchParents(schoolId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentEdit);
