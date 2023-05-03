import React, { useState } from "react";
import { Spinner, FormGroup, FormFeedback, Col, Row, Label, } from "reactstrap";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import InputAdornment from '@material-ui/core/InputAdornment';
// import SchoolIcon from '@material-ui/icons/School';
// import CreateIcon from '@material-ui/icons/Create';
// import PersonIcon from '@material-ui/icons/Person';
// import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
// import LocationCityIcon from '@material-ui/icons/LocationCity';
// import HomeIcon from '@material-ui/icons/Home';
// import PhoneInput from 'react-phone-input-2'
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch } from "react-redux";
import * as utils from "../../../common/utils";
import { useSelector } from "react-redux";
import { authActions } from "../../../store/actions";
import Art_Img from "../../../assets/img/login-bg.jpg";
import { setProfileInformation } from "../../../store/actions/authAction"
// import ReactPhoneInput from 'react-phone-input-material-ui';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

// import SignupEmailBoxed from "../SignUpEmail";

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
        width: "100%",
        overflowY: "auto",
        // marginTop:"75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center"
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
        // margin: theme.spacing(8, 4),
        margin: "15px 12px",
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
        marginBottom: "-30px",

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
    margin: {
        margin: "16px 31px",
        // width:"39%"
    },
    field: {
        margin: '10px 0',
        // border:"20px solid black"
    },
    countryList: {
        ...theme.typography.body1,
    },
}));

function OnBoardPersonal(props) {
    const user = useSelector((state) => state);
    const classes = useStyles();
    const dispatch = useDispatch();
    const [stateLoader, setStateLoader] = useState(false);
    // const [state, setState] = useState({ password: "" });
    const [state, setState] = useState({
        SchoolName: "", RegistrationNumber: "",
        OwnerName: "", OwnerContactNo: "", ContactNo: "", Street: "", Town: "", City: "", Slots: 0,
        currentPackageName: "Basic"
    });
    const [OwnerContactNo, setOwnerContactNo] = useState({
        value: "",
    });
    const [ContactNo, setContactNo] = useState({
        value: "",
    });
    const [error, setError] = useState({})
    const [stateIsEmailValid, setStateIsEmailValid] = useState(true);
    const [stateIsPasswordValid, setStateIsPasswordValid] = useState(true);
    const [stateIsFormValid, setStateIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false)
    const loggedemail = props.signupEmail.email
    console.log("SET PERSONAL INFO PROPS", loggedemail)
    const { value, defaultCountry } = props;

    const _onChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    function onBlurHandler(event) {
        const { name, value } = event.target;
        validateField(name, value);
    }

    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== "undefined"
            ? isoCode
                .toUpperCase()
                .replace(/./g, (char) =>
                    String.fromCodePoint(char.charCodeAt(0) + 127397)
                )
            : isoCode;
    }
    const handleContactChange = (e, info) => {
        if (info === 'owner') {

            // e.preventDefault();
            setOwnerContactNo({
                ...OwnerContactNo,
                value: e,
            });
        } else {

            setContactNo({
                ...ContactNo,
                value: e,
            });
        }
    };

    function validateField(fieldName, value) {
        switch (fieldName) {
            // case "email":
            //   let emailValid = state.email === "" ? false : stateIsEmailValid;
            //   emailValid = utils.isEmailValid(value);
            //   setStateIsEmailValid(emailValid);
            //   validateForm();
            //   break;

            case "password":
                let passwordValid = utils.isPasswordValid(value);
                setStateIsPasswordValid(passwordValid);
                validateForm();
                break;

            default:
                break;
        }
    }
    function validateForm() {
        let emailValid = false,
            passwordValid = false;
        // emailValid = utils.isEmailValid(state.email);
        passwordValid = utils.isPasswordValid(state.password);
        setStateIsFormValid(passwordValid);
    }

    // function onClickForgotPassword() {
    //   props.history.push({
    //     pathname: "/pages/forgot-password-boxed",
    //   });
    // }
    // function onSignupPassword() {
    //   props.history.push({
    //     pathname: "/pages/signup-email-boxed",
    //   });
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        setStateLoader(true);
        // const date = new Date();

        const PERSONAL_INFORMATION_DATA = {

            email: loggedemail,
            school: {
                regNo: state.RegistrationNumber,
                name: state.SchoolName,
                contact: ContactNo.value,
                ownerName: state.OwnerName,
                ownerContact: OwnerContactNo.value,
                town: state.Town,
                street: state.Street,
                address: state.City,
                slots: state.Slots,
                currentPackageName: state.currentPackageName,
                createdAt: Date.now()
            }

        };

        console.log("PERSONAL INFORMATION INDEX", PERSONAL_INFORMATION_DATA)

        props.setProfileInformation(PERSONAL_INFORMATION_DATA, () => {
            props.handleNext()
            // props.history.push({
            //     pathname: "/pages/login",
            // });
        }, () => setStateLoader(false));
    };

    const onLogin = async () => {

        // console.log("SIGNUP_PASSWORD_DATA", state)
        // try {
        //   setStateLoader(true);
        //   const result = await dispatch(authActions.signupPassword(state));
        //   props.history.push({
        //     pathname: "/dashboards",
        //   });
        // } catch (error) {
        //   if (error.response) {
        //     utils._toast(error.response.data.responseMessage, "error");
        //   } else {
        //     utils._toast("Netwrok Error", "error");
        //   }
        //   setStateLoader(false);
        //   setState({ password: "" });
        // }
    };

    return (
        <div style={{ justifyContent: "center" }}>

            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
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
                            PROFILE INFORMATION
                        </Typography>
                        <Grid>

                            <form className={classes.form} noValidate>
                                <Row>

                                    <Col style={{ margin: 10 }}>
                                        {/* <div> */}


                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            name="SchoolName"
                                            id="SchoolName"
                                            // className={classes.margin}
                                            id="input-with-icon-textfield"
                                            label="School Name"
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <SchoolIcon />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        />

                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            name="RegistrationNumber"
                                            margin="normal"
                                            // className={classes.margin}
                                            id="input-with-icon-textfield"
                                            label="Registration Number"
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <CreateIcon />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        />
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            name="OwnerName"
                                            // className={classes.margin}
                                            id="input-with-icon-textfield"
                                            label="Owner Name"
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <PersonIcon />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        />


                                        <PhoneInput
                                            // margin="normal"
                                            // variant="outlined"
                                            // containerStyle={{backgroundColor:"red"}}
                                            fullWidth
                                            inputStyle={{ width: "100%", height: 56, margin: "16px 0px 10px 0px" }}
                                            InputProps={{
                                                name: "OwnerContactNo",
                                                required: true
                                            }}
                                            id="OwnerContactNo"
                                            placeholder="Enter Owner Contact Number"
                                            // country={"om"}
                                            // value={"92"}
                                            onChange={phone => handleContactChange(phone, 'owner')}
                                            required
                                        />
                                        {/* <FormFeedback>Contact cannot be empty</FormFeedback>
                                            </FormGroup> */}

                                        {/* </div> */}
                                    </Col>
                                    <Col style={{ margin: 10 }}>
                                        {/* <div> */}

                                        {/* <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            name="ContactNo"
                                            // className={classes.margin}
                                            id="input-with-icon-textfield"
                                            label="Contact Number"
                               
                                        /> */}
                                        {/* <ReactPhoneInput
                                        //   containerStyle="outlined"
                                            margin="normal"
                                            variant="outlined"
                                            value={value}
                                            defaultcountry={"om"}
                                            // onChange={onChange}
                                            inputClass={classes.field}
                                            dropdownClass={classes.countryList}
                                            component={TextField}
                                        /> */}
                                        <PhoneInput
                                            // margin="normal"
                                            // variant="outlined"
                                            // containerStyle={{backgroundColor:"red"}}
                                            fullWidth
                                            inputStyle={{ width: "100%", height: 56, margin: "15px 0px 7px 0px" }}

                                            // style={{width:120}}
                                            InputProps={{
                                                name: "ContactNo",
                                                required: true
                                            }}
                                            id="ContactNo"
                                            // country={"om"}
                                            placeholder="Enter Contact Number"
                                            // value={"92"}
                                            onChange={phone => handleContactChange(phone)}
                                            required
                                        />

                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            // className={classes.margin}
                                            name="Street"
                                            id="input-with-icon-textfield"
                                            label="Street"
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <HomeIcon />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        />
                                        <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            // className={classes.margin}
                                            name="Town"
                                            id="input-with-icon-textfield"
                                            label="Town"
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <HomeIcon />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        />     <TextField
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            onChange={_onChange}
                                            name="City"
                                            // className={classes.margin}
                                            id="input-with-icon-textfield"
                                            label="City"
                                        // InputProps={{
                                        //     startAdornment: (
                                        //         <InputAdornment position="start">
                                        //             <LocationCityIcon />
                                        //         </InputAdornment>
                                        //     ),
                                        // }}
                                        />
                                        {/* </div> */}
                                    </Col>
                                </Row>

                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={
                                        !state.SchoolName || !state.RegistrationNumber ||
                                        !state.OwnerName ||
                                        OwnerContactNo.value.length <= 7
                                        || ContactNo.value.length <= 7
                                        // !state.Street || !state.Town || !state.City || !stateLoader
                                    }
                                    variant="contained"

                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    {stateLoader ? (
                                        <div style={{ width: "130px" }}>
                                            <Spinner
                                                style={{ width: "20px", height: "20px" }}
                                                color="light"
                                            />
                                        </div>
                                    ) : (
                                        "CONTINUE"
                                    )}
                                </Button>
                                {/* <Grid container>
              <Grid item xs>
              <Link
              style={{ cursor: "pointer" }}
              variant="body2"
              onClick={onClickForgotPassword}
              >
              Forgot password?
              </Link>
              </Grid>
              <Grid item xs>
              <Link
              style={{ cursor: "pointer" }}
              variant="body2"
              onClick={onSignupPassword}
              >
              Already Verified?
              </Link>
              </Grid>
            </Grid> */}
                                <Box mt={5}>
                                    {/* <Copyright /> */}
                                </Box>
                            </form>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
const mapStateToProps = (state) => {
    console.log("PEROSANL INFO STATE", state)
    return {
        signupEmail: state.auth.signupEmailData
        // open: state.layoutReducer.snackbarState,
        // message: state.layoutReducer.snackbarMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // toggleAuth: (data) => dispatch(toggleAuthActionCreator(data)),
        // showAlert: (message) => dispatch(onSnackbar(message)),

        setProfileInformation: (SIGNUP_PASSWORD_DATA, navigate, stopLoader) => dispatch(setProfileInformation(SIGNUP_PASSWORD_DATA, navigate, stopLoader))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnBoardPersonal);
