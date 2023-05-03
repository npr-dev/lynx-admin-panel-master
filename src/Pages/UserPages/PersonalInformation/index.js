import React, { useEffect, useState } from "react";
// import React from "react";
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
// import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as utils from "../../../common/utils";
import { useSelector } from "react-redux";
import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";
import { connect } from 'react-redux';
import { signupEmail } from "../../../store/actions/authAction";
import PhoneInput from 'react-phone-input-2'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         AfricanArt.International
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Art_Img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "Dancing Script",
    cursor: "pointer",
  },
}));

function PersonalInformation(props) {
  const classes = useStyles();

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
      },
    };

    console.log("schoolData", schoolData);
    editSchool(schoolData, () => updateSchool(schoolData),
      () => setLoading(false),
      () => setEditing(false),
      () => forceUpdate());
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant="h5" className={`${classes.title}`}>
            <b>Lynx Admin</b>
          </Typography>

          <Typography variant="h5"></Typography>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            PERSONAL INFORMATION
          </Typography>
          <form className={classes.form} noValidate>
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
                      disabled={!editing}
                      value={email.value}
                      onChange={handleEmailChange}
                      placeholder="Enter Email"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      disabled
                      value={password.value}
                    />
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



            <Box mt={5}>
              {/* <Copyright /> */}
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    // open: state.layoutReducer.snackbarState,
    // message: state.layoutReducer.snackbarMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
    // showAlert: (message) => dispatch(onSnackbar(message)),
    signUpDataEmail: (emailData) => dispatch({ type: "SIGNUPEMAILDATA", payload: emailData }),
    signupEmail: (SIGNUPEMAIL_DATA, navigate, stopLoader) => dispatch(signupEmail(SIGNUPEMAIL_DATA, navigate, stopLoader))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
