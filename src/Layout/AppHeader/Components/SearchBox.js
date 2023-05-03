import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Alert, { AlertTitle } from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '500px',
    '& > * + *': {
      marginTop: theme.spacing(2),

    },
    backgroundColor: "brown",
    display: "flex",
    justifyContent: "flex-end"
  },
  alert: {
    backgroundColor: "purple",

  }
}));
const SearchBox = (props) => {
  const classes = useStyles();
  const packageName = props.auth.currentPackageName;
  console.log("APPP HEADER PROPS", packageName)
  // const subscriptionStatusCheck = subscriptionStatus && subscriptionStatus.length > 0;

  const schoolPaymentStatusCheck = props.auth.subscriptionId ? true : false
  console.log("APPP HEADER PROPS  2", schoolPaymentStatusCheck)

  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "55%",
          marginTop: "-24px",
          zIndex: 4,
          color: "#5f6769"
        }}
      >
        <div style={{ justifyContent: "space-between" }}>

          {schoolPaymentStatusCheck ?
            null
            //   <Collapse in={open}>
            //     <Alert
            //       action={
            //         <IconButton
            //           aria-label="close"
            //           color="inherit"
            //           size="small"
            //           onClick={() => {
            //             setOpen(false);
            //           }}
            //         >
            //           <CloseIcon fontSize="inherit" />
            //         </IconButton>
            //       }
            //     >
            //     You have succesfully susbcribed to {packageName} package
            //  </Alert>
            //   </Collapse>
            :
            <Alert severity="error">Subscribe to a payment package before using service!</Alert>

          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("APP HEADEr", state)
  return {
    auth: state.auth.user.result.userExist,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
    // deleteStudent: (studentId, removeStudent) =>
    //   dispatch(deleteStudent(studentId, removeStudent)),
    // setEmptyStudent: () => dispatch({ type: "SET_EMPTY_STUDENT", payload: [] }),
    // removeStudent: (studentId) =>
    //   dispatch({ type: "REMOVE_STUDENT", payload: studentId }),
    // addMultipleStudents: (students) => dispatch(addMultipleStudents(students)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);

// export default SearchBox