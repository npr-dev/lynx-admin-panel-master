import React, { Fragment, useEffect } from "react";
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
  Modal,
  ModalBody,
  ListGroupItem,
  ListGroup,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Loader as Load } from "react-loaders";
import ToolkitProvider, {
  Search as NewSearch,
} from "react-bootstrap-table2-toolkit";

import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Filter, Search, AddButton } from "../../../Layout/ActionCenter";
import "./List.scss";
import { Link, useHistory } from "react-router-dom";
import ImagePreview from "../ImagePreviewModal/ImagePreview";
import { connect } from "react-redux";
import {
  fetchStudents,
  deleteStudent,
  addMultipleStudents,
} from "../../../store/actions/studentAction";
import { Avatar } from "./../../../assets/img/avatar.png";
import { useState } from "react";
import more from "../../../assets/utils/images/more.png";
// import UploadBulk from "../UploadBulkModal/UploadBulk";
import Dropzone from "react-dropzone";
import xlsxParser from "xlsx-parse-json";
import DeleteModal from "../../../common/components/DeleteModal";
import { actionTypes } from "../../../store/common/types";
import { ExportCSV } from "../../../common/components/ExportCSV/ExportCSV";
import PdfReportGenerator from "../../../common/components/PdfReportGenerator/PdfReportGenerator";

const { SearchBar } = NewSearch;
const fileDownload = require("js-file-download");
const template = [
  "Name(required)",
  "Roll No",
  "Registration No",
  "Date of Birth",
  "Class(required)",
  "Street",
  "Town",
  "Address",
  "Parent Name",
  "Parent Email(required)",
  "Parent Phone Number(required)",
];

const List = (props) => {
  console.log("LIST PROPS", props.schoolPaymentStatus);

  // const schoolPaymentStatusCheck = props.schoolPaymentStatus.subscriptionId
  //   ? true
  //   : false;

  const schoolPaymentStatusCheck =true;

  // console.log("LALIT",schoolPaymentStatusCheck)
  const {
    schoolId,
    fetchStudents,
    students,
    loader,
    deleteStudent,
    setEmptyStudent,
    removeStudent,
    addMultipleStudents,
    decreaseStudentCount,
  } = props;
  const [studentArray, setstudentArray] = useState([]);
  const [studentArrayReport, setstudentArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localStudents, setlocalStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [studentID, setStudentID] = useState("");
  const [searchStudents, setSearchStudents] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);

  const searchHandler = (e) => {
    const { value } = e.target;
    setStudentID(value);
    const filteredArray = studentArray.filter((item) => {
      return (
        item.id.substring(0, value.length).toLowerCase() === value.toLowerCase()
      );
    });
    setSearchStudents(filteredArray);
  };

  // useEffect(() => {
  //   return () => {
  //     setEmptyStudent();
  //   };
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const columns = [
    {
      dataField: "picture",
      text: "",
      isDummyField: false,
      formatter: (cellContent, row) => {
        // if (row.pictures.length > 0) {
        return (
          <ImagePreview
            bgImage={row.pictures ? row.pictures : null}
            studentId={row._id}
            data={row}
          />
        );
        // } else {
        //   return <ImagePreview studentId={row._id} />;
        // }
      },
    },
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      // filter: textFilter()
    },
    // {
    //   dataField: "locality",
    //   text: "Locality",
    //   sort: true,
    // },
    {
      dataField: "parent",
      text: "Parent's Name",
      sort: true,
    },
    {
      dataField: "parentContact",
      text: "Parent's Contact",
      sort: true,
    },
    // {
    //   dataField: "busNo",
    //   text: "Bus No.",
    //   sort: true,
    // },

    // {
    //   dataField: "status",
    //   isDummyField: false,
    //   text: "Image Status",
    //   formatter: (cellContent, row) => {
    //     return (
    //       <div className="d-block w-100 text-center">
    //         {row.pictures.length > 0 ? (
    //           <span className="badge badge-success"> Uploaded</span>
    //         ) : (
    //           <span className="badge badge-warning"> Not Uploaded</span>
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      dataField: "actions",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, row) => {
        console.log("ROW", row.busNo);
        return (
          // <div>
          //   <div className="d-block w-100 text-center">
          //     <UncontrolledButtonDropdown>
          //       <DropdownToggle
          //         className="btn-icon btn-icon-only btn btn-link"
          //         color="link"
          //       >
          //         <img src={more} height="20px" />
          //       </DropdownToggle>
          //       <DropdownMenu
          //         right
          //         className="rm-pointers dropdown-menu-hover-link"
          //       >
          //         {/* <DropdownItem header>Header</DropdownItem> */}
          //         <DropdownItem
          //           onClick={() => {
          //             history.push(
          //               `/studentManagement/student/history/${row._id}`
          //             );
          //           }}
          //         >
          //           <i className="dropdown-icon lnr-calendar-full"> </i>
          //           <span>History</span>
          //         </DropdownItem>
          //         <DropdownItem
          //           onClick={() => {
          //             editButton(row);
          //           }}
          //         >
          //           <i className="dropdown-icon lnr-pencil"> </i>
          //           <span>Edit</span>
          //         </DropdownItem>
          //         <DropdownItem
          //           onClick={() => {
          //             deleteButton(row);
          //           }}
          //         >
          //           <i className="dropdown-icon lnr-trash"> </i>
          //           <span>Delete</span>
          //         </DropdownItem>
          //       </DropdownMenu>
          //     </UncontrolledButtonDropdown>
          //   </div>
          // </div>
          <div className="text-center">
            <button
              className="icon-button"
              onClick={() => {
                history.push({
                  pathname: `/studentManagement/student/history/${row._id}`,
                  // search: '?query=abc',
                  state: { busNo: row.busNo },
                });
                // history.push(`/studentManagement/student/history/${row._id}`,{
                // data:"hey"
                // });
              }}
            >
              <i className="lnr-calendar-full" />
            </button>
            <button
              className="icon-button"
              onClick={() => {
                editButton(row);
              }}
            >
              <i className="lnr-pencil" />
            </button>
            {/* <button className="icon-button" onClick={() => { deleteButton(row) }}>
              <i className="lnr-trash" />
            </button> */}
            <DeleteModal
              className="delete-modal"
              name={row.name}
              deleteFunction={() => {
                deleteButton(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  useEffect(() => {
    // if (!localStudents.length && localStudents.length !== students.length) {
    setlocalStudents(students);
    structureData();
    // }
    if (initial) {
      onStart();
      setInitial(false);
    }
    return () => {};
  }, [students]);

  const onStart = () => {
    fetchStudents({ id: schoolId });
  };

  const structureData = () => {
    const remappedStudents =
      students &&
      students.map((student) => {
        console.log("TESTEEEEEEEE", student);
        return {
          id: student.studentId ? student.sbusNotudentId : "---",
          name: student.name ? student.name : "---",
          locality: student.town ? student.town : "---",
          busNo: student.busId ? student.busId.busNo : "---",
          parent: student.parentId && student.parentId.name ? student.parentId.name : "---",
          parentContact: student.parentId && student.parentId.contact ? student.parentId.contact : "---",
          dob: student.dob ? student.dob : "---",
          pictures: student.pictures,
          _id: student._id,
        };
      });

    const remappedStudentReport =
      students &&
      students.map((student) => {
        console.log("TESTEEEEEEEE", student);
        return {
          Name: student.name ? student.name : "---",
          Roll_No: student.studentId ? student.studentId : "---",
          Birth_Date: student.dob ? student.dob : "---",
          Class: student.class ? student.class : "---",
          Street: student.street ? student.street : "---",
          Town:student.town ? student.town : "---",
          City:student.address ? student.address : "---",
          RegNo: student.registrationNo ? student.registrationNo : "---",
          Address: student.location && student.location.address ? student.location.address : "---",
          Blood_Group: student.bloodGroup ? student.bloodGroup : "---",
          InsuranceId : student.insuranceId ? student.insuranceId : "---",
          Medical_Instructions:student.medicalInstructions? student.medicalInstructions : "---",
          Parent_Name: student.parentId ? student.parentId.name : "---",
          Parent_Contact: student.parentId ? student.parentId.contact : "---",
          Parent_Email: student.parentId ? student.parentId.email : "---",
        };
      });

    setstudentArray(remappedStudents);
    setstudentArrayReport(remappedStudentReport)
  };

  const editButton = (row) => {
    // //console.log("edit -->", row._id)
    history.push(`/studentManagement/edit/${row._id}`);
  };

  const deleteButton = (row) => {
    // //console.log("delete -->", row._id);
    // const newStudent = studentArray;
    // newStudent.splice(
    //   newStudent.findIndex((elem) => {
    //     return elem._id === row._id;
    //   }),
    //   1
    // );

    //console.log(newStudent)
    // setstudentArray(newStudent);
    deleteStudent({ id: row._id }, async () => {
      removeStudent(row._id);
      decreaseStudentCount();
      // forceUpdate();
    });
  };
  const toggle = () => {
    console.log("Hello World");
    setModal(!modal);
  };

  const onDrop = (files) => {
    console.log("dropped files", files);
    setFiles(files);
    // this.setState({ files });
  };

  const onCancel = () => {
    // this.setState({
    //   files: []
    // });
    setFiles([]);
  };

  const handleUpload = async () => {
    let students = [];
    const formattedStudent = [];
    await xlsxParser.onFileSelection(files[0]).then((data) => {
      console.log("xlsxParser data", data);
      students = data;
    });
    console.log("students.in", students.in);
    console.log("students.sheet1", students.Sheet1);
    const file = students.in || students.Sheet1
    console.log("file",file)
    for (const student of file) {
      if(student["Name(required)"] && student["Class(required)"])
     {
      formattedStudent.push({
        student: {
          schoolId,
          name: student["Name(required)"],
          studentId: student["Roll No"] ? student["Roll No"] : null,
          dob: student["Date of Birth"] ? student["Date of Birth"] : null,
          class: student["Class(required)"],
          street: student["Street"] ? student["Street"] : null,
          town: student["Town"] ? student["Town"] : null,
          address: student["Address"] ? student["Address"] : null,
          registrationNo: student["Registration No"] ? student["Registration No"] : null,
          recognized: false,
          assigned: false,
          deleted: false,
          pictures: "",
          busId: null,
          location: {
            address: "",
            latitude: 0,
            longitude: 0,
          },
        },
        parentDetails: {
          name: student["Parent Name"] ? student["Parent Name"] : null,
          email: student["Parent Email(required)"] ? student["Parent Email(required)"] : null,
          contact: student["Parent Phone Number(required)"] ? student["Parent Phone Number(required)"] : null,
        },
      })
     }
    }

    console.log("formattedStudent", formattedStudent);

    addMultipleStudents(formattedStudent);
    toggle();
    //console.log(formattedStudent)
  };

  //console.log("array in table -->", studentArray)
  const dataToShow = studentID ? searchStudents : studentArray;

  const filesList = files.map((file) => (
    <ListGroupItem style={{ overflow: "hidden" }} key={file.name}>
      {file.name} - {file.size} bytes
    </ListGroupItem>
  ));

  return (
    <Fragment>
      <ActionCenter>
        <div>
          <Count count={loading ? "0" : dataToShow.length} />
        </div>
        <div>{/* <Filter data={filterList} title="Filter By" /> */}</div>
        <div className="actions">
          {/* <AddButton /> */}
          <div>
            {/* <Link
              className="router-link"
              to="/studentManagement/upload-pictures"
            >
              <Button className="mr-2 btn-icon action-btn" color="primary">
                <i className="pe-7s-upload btn-icon-wrapper"> </i>
                Add Pictures in Bulk
              </Button>
            </Link> */}
          </div>
          <div>
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                className="mr-2 add-student-dropdown"
                color="primary"
                disabled={!schoolPaymentStatusCheck}
              >
                <i
                  className="pe-7s-plus btn-icon-wrapper mr-2"
                  style={{ fontSize: 17, fontWeight: "600" }}
                >
                  {" "}
                </i>
                Add Student
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-hover-primary">
                <Link className="router-link" to="/studentManagement/add">
                  <DropdownItem disabled={!schoolPaymentStatusCheck}>
                    Add Single Student
                  </DropdownItem>
                </Link>
                <DropdownItem>
                  {/* <UploadBulk /> */}
                  <span onClick={toggle}>Upload Multiple Students Data</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <ExportCSV csvData={studentArrayReport} fileName={"Students-Report"} />
            <Button
            style={{padding: '0.5rem'}}
            className="mr-2 btn-icon action-btn"
            color="primary"
            disabled={!schoolPaymentStatusCheck}
            onClick={() => PdfReportGenerator(studentArrayReport,["Name","Roll No","Birth Date","Class","Street","Town","City","RegNo","Blood Group","InsuranceId","Medical Instructions","Parent Name","Parent Contact","Parent Email"],"Students-Pdf-Report")}
          >
            Export PDF File
          </Button>
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search
              value={studentID}
              onChange={searchHandler}
              placeholder="Search Student by ID"
            /> */}
          </div>
        </div>
      </ActionCenter>
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
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <Load type="ball-pulse" />
                  </div>
                ) : dataToShow.length > 0 ? (
                  <div className="table-responsive table-student">
                    {/* <BootstrapTable
                      bootstrap4
                      keyField="_id"
                      data={dataToShow}
                      columns={columns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                    /> */}
                    <ToolkitProvider
                      bootstrap4
                      keyField="_id"
                      data={dataToShow}
                      columns={columns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                      search
                    >
                      {(props) => (
                        <div>
                          {/* <h3>Input something at below input field:</h3> */}
                          <SearchBar {...props.searchProps} />
                          {/* <hr /> */}
                          <BootstrapTable {...props.baseProps} />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                ) : (
                  <div className="no-content">No Students Present</div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalBody>
          <div className="card-header-info">
            <div className="info">
              <div className="title">Add Multiple Students</div>
              <div className="info-items">
                <div className="item">
                  Note: Upload an excel sheet consisting or following columns in
                  sequence. Or{" "}
                  <a
                    style={{ color: "#5667D8", cursor: "pointer" }}
                    onClick={() => {
                      fileDownload(template, "template.csv");
                    }}
                  >
                    download this templete
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col md="8">
              <div className="dropzone-wrapper dropzone-wrapper-lg">
                <Dropzone onDrop={onDrop} onFileDialogCancel={onCancel}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className="dropzone-content">
                        <p>
                          Upload an excel file which contains the data of
                          students
                        </p>
                      </div>
                    </div>
                  )}
                </Dropzone>
              </div>
            </Col>
            <Col md="4">
              <b className="mb-2 d-block">Dropped Files</b>
              <ListGroup>{filesList}</ListGroup>
            </Col>
            <Col size="12" className="text-center">
              <Button
                disabled={!filesList.length}
                color="primary"
                className="mt-4"
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Col>
          </Row>
          <div className="modal-close">
            <button className="close-button" onClick={toggle}>
              <i className="lnr-cross-circle"> </i>
            </button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.auth,
    schoolPaymentStatus: state.auth.user.result.userExist,
    schoolId: state.auth.user.result.userExist._id,
    students: state.student.student,
    loader: state.student.student_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
    deleteStudent: (studentId, removeStudent) =>
      dispatch(deleteStudent(studentId, removeStudent)),
    setEmptyStudent: () => dispatch({ type: "SET_EMPTY_STUDENT", payload: [] }),
    removeStudent: (studentId) =>
      dispatch({ type: "REMOVE_STUDENT", payload: studentId }),
    addMultipleStudents: (students) => dispatch(addMultipleStudents(students)),
    decreaseStudentCount: () =>
      dispatch({ type: actionTypes.DECREASE_STUDENT_COUNT }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
