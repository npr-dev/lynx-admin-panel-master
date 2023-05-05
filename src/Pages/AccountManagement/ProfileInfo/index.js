import React, { Fragment, useEffect, useState } from "react";
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
  Input,
  Label,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import TextField from "@material-ui/core/TextField";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Search } from "../../../Layout/ActionCenter";
import "./ProfileInfo.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { editSchool } from "../../../store/actions/schoolAction";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import CreateIcon from '@material-ui/icons/Create';
import InputAdornment from '@material-ui/core/InputAdornment';
import MyGoogleMap from "../../../common/components/LocationPicker/MyGoogleMap";


const ProfileInfo = (props) => {
  const forceUpdate = useState()[1].bind(null, {})

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);

  const { editSchool, schoolId, school, updateSchool } = props;

  const [name, setName] = useState({
    value: school.name,
  });
  const [regNo, setRegNo] = useState({
    value: school.regNo,
  });
  const [email, setEmail] = useState({
    value: school.email,
  });
  const [password, setPassword] = useState({
    value: "*********",
  });
  const [contact, setContact] = useState({
    value: school.contact,
  });
  const [owner, setOwner] = useState({
    value: school.ownerName,
  });
  const [ownerContact, setOwnerContact] = useState({
    value: school.ownerContact,
  });
  const [street, setStreet] = useState({
    value: school.street,
  });
  const [town, setTown] = useState({
    value: school.town,
  });
  const [address, setAddress] = useState({
    value: school.address,
  });
  const [location, setLocation] = useState({
    address: school.location && school.location.address ? school.location.address : '--',
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    console.log("school", school)
  }, [school])

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail({
      ...email,
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
  const handleOwnerChange = (e) => {
    e.preventDefault();
    setOwner({
      ...owner,
      value: e.target.value,
    });
  };
  const handleOwnerContactChange = (e) => {
    // e.preventDefault();
    setOwnerContact({
      ...ownerContact,
      value: e,
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
      ...address,
      value: e.target.value,
    });
  };

  const handleLocationChange = (loc) => {
    console.log("loc",loc)
    setLocation({
      ...location,
      ...loc
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true)

    const schoolData = {
      id: schoolId,
      school: {
        email: email.value.toLowerCase(),
        contact: contact.value,
        ownerName: owner.value,
        ownerContact: ownerContact.value,
        town: town.value,
        street: street.value,
        address: address.value,
        currentPackage: school.currentPackage,
        startsOn: school.startsOn,
        endsOn: school.endsOn,
        studentCount: school.studentCount,
        location: { ...location }
      },
    };

    console.log("schoolData", schoolData);
    editSchool(schoolData, () => updateSchool(schoolData), () => setLoading(false), () => setEditing(false), () => forceUpdate());
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
                    <div className="title">Profile Information</div>
                  </div>
                  {!editing ? (
                    <div className="action">
                      <button
                        className="close-button"
                        onClick={() => {
                          setEditing(true);
                        }}
                      >
                        <i className="lnr-pencil"> </i>
                      </button>
                    </div>
                  ) : null}
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="name">School Name</Label>
                        <Input
                          name="name"
                          id="name"
                          disabled
                          value={name.value}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CreateIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="registeration">Registeration Number</Label>
                        <Input
                          name="registeration"
                          id="registeration"
                          disabled
                          value={regNo.value}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="email">Email</Label>

                        <Input
                          type="email"
                          name="email"
                          id="email"
                          disabled={editing}
                          variant="outlined"
                          value={email.value}
                          onChange={handleEmailChange}
                          placeholder="Enter Email"
                          required

                        />
                        <Link to="/accountManagement/ChangeEmail" style={{ display: editing ? "none" : "inline-block", position: "absolute", top: "37px", right: " 30px" }} color="inherit">
                          Change
                        </Link>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="accountManagementpassword">Password</Label>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          disabled={editing}
                          value={password.value}
                        />
                        <Link to="/accountManagement/ChangePassword" style={{ display: editing ? "none" : "inline-block", position: "absolute", top: "37px", right: " 30px" }} color="inherit">
                          Change
                        </Link>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="owner">Owner</Label>
                        <Input
                          name="owner"
                          id="owner"
                          disabled={!editing}
                          placeholder="Enter Owner"
                          value={owner.value}
                          onChange={handleOwnerChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="ownerContact">Owner's Contact Number</Label>
                        {/* <Input
                          name="ownerContact"
                          id="ownerContact"
                          disabled={!editing}
                          placeholder="Enter Owner's Contact Number"
                          value={ownerContact.value}
                          onChange={handleOwnerContactChange}
                          type="number"
                        /> */}
                        <PhoneInput
                          inputProps={{
                            name: "ownerContact",
                            required: true
                          }}
                          id="ownerContact"
                          country={"om"}
                          disabled={!editing}
                          placeholder="Enter Owner's Contact Number"
                          value={ownerContact.value}
                          onChange={handleOwnerContactChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="contact">Contact Number</Label>
                        {/* <Input
                          name="contact"
                          id="contact"
                          disabled={!editing}
                          placeholder="Enter Contact Number"
                          value={contact.value}
                          onChange={handleContactChange}
                          type="number"
                        /> */}
                        <PhoneInput
                          inputProps={{
                            name: "contact",
                            required: true
                          }}
                          id="contact"
                          country={"om"}
                          disabled={!editing}
                          placeholder="Enter Contact Number"
                          value={contact.value}
                          onChange={handleContactChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="street">Street</Label>
                        <Input
                          name="street"
                          id="street"
                          disabled={!editing}
                          placeholder="Enter Street"
                          value={street.value}
                          onChange={handleStreetChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="town">Town</Label>
                        <Input
                          name="town"
                          id="town"
                          disabled={!editing}
                          placeholder="Enter Town"
                          value={town.value}
                          onChange={handleTownChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="address">City</Label>
                        <Input
                          name="address"
                          id="address"
                          disabled={!editing}
                          placeholder="Enter City"
                          value={address.value}
                          onChange={handleAddressChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <Label for="location">Location</Label>
                      <div className="locationDiv">
                        <Label>{location.address}</Label>
                      </div>
                    </Col>
                    {editing && <Col md="12">
                      <Label>Search Location</Label>
                      <div className="main-wrapper">
                        <MyGoogleMap handleLocationChange={handleLocationChange} />
                      </div>
                    </Col>}
                  </Row>
                  {editing ? (
                    <div>
                      <Button
                        color="secondary"
                        className="mr-2 mt-1"
                        onClick={() => {
                          setEditing(false);
                          forceUpdate()
                        }}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                      <Button color="primary" className="mt-1" disabled={loading}>
                        Submit
                      </Button>
                    </div>
                  ) : null}
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
  console.log("current state", state)

  return {
    schoolId: state.auth.user.result.userExist._id,
    school: state.auth.user.result.userExist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSchool: (schoolData, update, stopLoading, stopEditing, error) => dispatch(editSchool(schoolData, update, stopLoading, stopEditing, error)),
    updateSchool: (schoolData) => dispatch({ type: "UPDATE_SCHOOL", payload: schoolData }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileInfo);
