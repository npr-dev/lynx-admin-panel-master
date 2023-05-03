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
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import "./ParentEdit.scss";
import { Link, useHistory } from "react-router-dom";
import { addDriver } from "../../../store/actions/driverAction";
import { connect } from "react-redux";
import { editParent } from "../../../store/actions/parentAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import MyGoogleMap from "../../../common/components/LocationPicker/MyGoogleMap";
import "../../../common/components/LocationPicker/LocationPicker.css";

const ParentEdit = (props) => {
  const { parents, editParent, parentId, schoolId, setEmptyParent } = props;
  const history = useHistory();
  var currentParent = parents.filter((parent) => {
    return parent._id === parentId;
  });

  const [parent, setParent] = useState({});
  const [locationModal, setLocationModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState({
    value: "",
  });
  const [contact, setContact] = useState({
    value: "",
  });
  const [email, setEmail] = useState({
    value: "",
  });
  const [location, setLocation] = useState({
    address: "",
    latitude: 0,
    longitude: 0,
  });

  const [oldEmail, setOldEmail] = useState("");


  useEffect(() => {
    // currentParent = parents.filter((parent) => {
    //   return parent._id === parentId;
    // });

    console.log(Object.keys(currentParent[0].location).length);
    if (currentParent[0].location.address != "") {
      setLocation({
        address: currentParent[0].location.address,
        latitude: currentParent[0].location.latitude,
        longitude: currentParent[0].location.longitude,
      });
    }

    setParent(currentParent[0]);

    setName({
      value: currentParent[0].name,
    });
    setContact({
      value: currentParent[0].contact,
    });
    setEmail({
      value: currentParent[0].email,
    });
    setOldEmail(currentParent[0].email);
    return () => { };
  }, []);

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

  const handleLocationChange = (loc) => {
    setLocation({
      ...location,
      ...loc,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const parentData = {
      id: parentId,
      parent: {
        name: name.value,
        email: email.value.toLowerCase(),
        contact: contact.value,
        location: { ...location },
        //////// registered flag commented - will set registered to false if parent's email changes
        // registered: parent.registered
        //   ? oldEmail === email.value.toLowerCase()
        //   : false,
      },
    };

    console.log(parentData.parent.registered);

    editParent(
      parentData,
      () => {
        // setTimeout(() => {
        history.push("/parentManagement/list");
        // }, 2000)
      },
      () => setLoading(false)
    );
    setEmptyParent();
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
                    <div className="title">Edit Parent Details</div>
                  </div>
                  <div className="action">
                    <Link className="close-button" to="/parentManagement/list">
                      <i className="lnr-cross-circle"> </i>
                    </Link>
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
                          value={name.value}
                          onChange={handleNameChange}
                          required
                          placeholder="Enter Full Name"
                          maxLength="50"
                        />
                        <FormFeedback>Name cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="contact">Contact Number</Label>
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
                            name: "contact",
                            required: true,
                          }}
                          id="contact"
                          country={"om"}
                          placeholder="Enter Contact Number"
                          value={contact.value}
                          onChange={(phone) => handleContactChange(phone)}
                          required
                        />
                        <FormFeedback>Contact cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Enter Email Address"
                          value={email.value}
                          onChange={handleEmailChange}
                          required
                          maxLength="50"
                        />
                        <FormFeedback>Email cannot be empty</FormFeedback>
                      </FormGroup>
                    </Col>
                    {location.address == "" && !locationModal ? (
                      <Button
                        color="primary"
                        style={{
                          height: 35,
                          marginTop: "2.8%",
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
                        locationModal ? (
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
                                  // currentLocation={currentParent[0] ? currentParent[0].location : undefined}
                                  currentLocation={
                                    currentParent[0] &&
                                    currentParent[0].location
                                  }
                                />
                              </div>
                            </Col>
                          </>
                        ),
                      ]
                    )}
                  </Row>
                  <Link className='close-button' to='/parentManagement/list'>
                    <Button color='secondary' className='mr-2 mt-1'>
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
    parentId: ownProps.match.params.id,
    parents: state.parent.parent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editParent: (parentData, navigate, stopLoader) =>
      dispatch(editParent(parentData, navigate, stopLoader)),
    setEmptyParent: () => dispatch({ type: "SET_EMPTY_PARENT", payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentEdit);
