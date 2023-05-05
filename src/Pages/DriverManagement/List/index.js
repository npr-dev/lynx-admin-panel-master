import React, { Fragment, useEffect, useState } from "react";
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalBody,
  ListGroupItem,
  ListGroup,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  CardTitle,
  CardText,
} from "reactstrap";
import { Loader as Load } from "react-loaders";

import BootstrapTable from "react-bootstrap-table-next";
import Dropzone from "react-dropzone";
import xlsxParser from "xlsx-parse-json";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  Search as NewSearch,
} from "react-bootstrap-table2-toolkit";

import PageTitle from "../../../Layout/AppMain/PageTitle";
import ActionCenter from "../../../Layout/ActionCenter/ActionCenter";
import { Count, Search, Filter } from "../../../Layout/ActionCenter";
import "./List.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchDrivers,
  deleteDriver,
  addMultipleDrivers
} from "../../../store/actions/driverAction";
import more from "../../../assets/utils/images/more.png";
import DeleteModal from "../../../common/components/DeleteModal";
import classnames from "classnames";
// import { ExportCSV } from "../../../common/components/ExportCSV/ExportCSV";
import { CSVLink } from "react-csv";
import PdfReportGenerator from "../../../common/components/PdfReportGenerator/PdfReportGenerator";


const { SearchBar } = NewSearch;
const fileDownload = require("js-file-download");
const template = ["Name(required)", "Email(required)", "Phone Number(required)","National Id","Medical Emergency Contact Number","Insurance Id","Insurance Company","Medical Instructions (If any)","Years Of Work Experience","Employer Name","Employer Contact Number","Employer Emergency Contact Number","Language"];

const List = (props) => {
  const {
    schoolId,
    fetchDrivers,
    drivers,
    deleteDriver,
    loader,
    setEmptyDriver,
    removeDriver,
    addMultipleDrivers
  } = props;
  const history = useHistory();
  const [driversArrayReport, setdriversArrayReport] = useState([])
  const [nanniesArrayReport, setnanniesArrayReport] = useState([])
  const [allResourcesArrayReport, setallResourcesArrayReport] = useState([])
  const [driverArray, setdriverArray] = useState([]);
  const [nannyArray, setNannyArray] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localDrivers, setlocalDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState("");
  const [searchDriver, setSearchDriver] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);
  // const schoolPaymentStatusCheck = props.schoolPaymentStatus.subscriptionId
  //   ? true
  //   : false;

  const schoolPaymentStatusCheck =true;

  const [activeTab, setActiveTab] = useState("1");
  const [resourceType, setResourceType] = useState("");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const searchHandler = (e) => {
    const { value } = e.target;
    setDriver(value);
    const filteredArray = driverArray.filter((item) => {
      console.log("item in search -->", item);
      return (
        item.name.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchDriver(filteredArray);
  };

  // useEffect(() => {
  //   return () => {
  //     setEmptyDriver();
  //   };
  // }, []);

  
  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const driverColumns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "contact",
      text: "Contact",
      sort: true,
    },
    {
      dataField: "busNo",
      text: "Bus No.",
      sort: true,
    },
    {
      dataField: "actions",
      isDummyField: true,
      text: "Actions",
      formatter: (cellContent, row) => {
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
          //             showDriverHistory(row);
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
            {/* <button className="icon-button" onClick={() => { showDriverHistory(row) }}>
              <i className="lnr-calendar-full" />
            </button> */}
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
    console.log("drivers list",drivers)
    // if (!localDrivers.length && localDrivers.length !== drivers.length) {
    setlocalDrivers(drivers);
    structureData();
    // }
    if (initial) {
      onStart();
      setInitial(false);
    }
    return () => {};
  }, [drivers]);

  const onStart = () => {
    fetchDrivers({ id: schoolId });
  };

  const structureData = () => {
    const remappedResourcesReport = drivers.map((resource) => {
      return {
        Name: resource.name ? resource.name : "---",
        Email: resource.email ? resource.email : "---",
        Contact: resource.contact ? resource.contact : "---",
        Bus_No: resource.busId && resource.currentlyAssigned ? resource.busId.busNo : "---",
        National_Id: resource.nationalId ? resource.nationalId : "---",
        Work_Permit:resource.workPermit ? 'yes' : 'no',
        Type: resource.type ? resource.type: "---" ,
        License: resource.driverLicense ? resource.driverLicense : "---",
        Blood_Group : resource.bloodGroup ? resource.bloodGroup : "---",
        Medical_Emergency_Contact: resource.medicalEmergencyContact ? resource.medicalEmergencyContact: "---",
        Insurance_Id : resource.insuranceId ? resource.insuranceId : "---",
        Insurance_Company : resource.insuranceFrom ? resource.insuranceFrom : "---",
        Medical_Instructions : resource.medicalInstructions ? resource.medicalInstructions : "---",
        Years_Of_Experience : resource.yearsOfExperience ? resource.yearsOfExperience: "---",
        Rating : resource.rating ? resource.rating : "---",
        Employer_Name : resource.employerName ? resource.employerName : "---",
        Employer_Contact_Number : resource.employerContact ? resource.employerContact : "---", 
        Employer_Emergency_Contact : resource.employerEmergencyContact ? resource.employerEmergencyContact : "---",
        Language: resource.language ? resource.language : "---",
      };
    });

    setallResourcesArrayReport(remappedResourcesReport)

    const filteredDriversArray = drivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "driver";
    });
    console.log("drivers filter", filteredDriversArray);

    const remappedDrivers = filteredDriversArray.map((driver) => {
      return {
        id: driver.driverNo,
        name: driver.name,
        email: driver.email,
        contact: driver.contact,
        busNo:
          driver.busId && driver.currentlyAssigned ? driver.busId.busNo : "---",
        _id: driver._id,
      };
    });
    
    const remappedDriversReport = filteredDriversArray.map((driver) => {
      return {
        Name: driver.name ? driver.name : "---",
        Email: driver.email ? driver.email : "---",
        Contact: driver.contact ? driver.contact : "---",
        Bus_No: driver.busId && driver.currentlyAssigned ? driver.busId.busNo : "---",
        National_Id: driver.nationalId ? driver.nationalId : "---",
        Work_Permit:driver.workPermit ? 'yes' : 'no',
        Type: 'Driver',
        Driver_License: driver.driverLicense ? driver.driverLicense : "---",
        Blood_Group : driver.bloodGroup ? driver.bloodGroup : "---",
        Medical_Emergency_Contact: driver.medicalEmergencyContact ? driver.medicalEmergencyContact: "---",
        Insurance_Id : driver.insuranceId ? driver.insuranceId : "---",
        Insurance_Company : driver.insuranceFrom ? driver.insuranceFrom : "---",
        Medical_Instructions : driver.medicalInstructions ? driver.medicalInstructions : "---",
        Years_Of_Experience : driver.yearsOfExperience ? driver.yearsOfExperience: "---",
        Rating : driver.rating ? driver.rating : "---",
        Employer_Name : driver.employerName ? driver.employerName : "---",
        Employer_Contact_Number : driver.employerContact ? driver.employerContact : "---", 
        Employer_Emergency_Contact : driver.employerEmergencyContact ? driver.employerEmergencyContact : "---",
        Language: driver.language ? driver.language : "---",
      };
    });

    console.log("remapped drivers", remappedDrivers);
    setdriverArray(remappedDrivers);
    setdriversArrayReport(remappedDriversReport)
    console.log("drivers array ", driverArray);

    const filteredNannyArray = drivers.filter((item) => {
      console.log("item in drivers array -->", item);
      return item.type == "nanny";
    });
    console.log("Nanny filter", filteredNannyArray);

    const remappedNannies = filteredNannyArray.map((nanny) => {
      return {
        id: nanny.driverNo,
        name: nanny.name,
        email: nanny.email,
        contact: nanny.contact,
        busNo:
          nanny.busId && nanny.currentlyAssigned ? nanny.busId.busNo : "---",
        _id: nanny._id,
      };
    });

    const remappedNanniesReport = filteredNannyArray.map((nanny) => {
      return {
        Name: nanny.name ? nanny.name : "---",
        Email: nanny.email ? nanny.email : "---",
        Contact: nanny.contact ? nanny.contact : "---",
        Bus_No: nanny.busId && nanny.currentlyAssigned ? nanny.busId.busNo : "---",
        National_Id: nanny.nationalId ? nanny.nationalId : "---",
        Work_Permit:nanny.workPermit ? 'yes' : 'no',
        Type: 'Nanny',
        Blood_Group : nanny.bloodGroup ? nanny.bloodGroup : "---",
        Medical_Emergency_Contact: nanny.medicalEmergencyContact ? nanny.medicalEmergencyContact: "---",
        Insurance_Id : nanny.insuranceId ? nanny.insuranceId : "---",
        Insurance_Company : nanny.insuranceFrom ? nanny.insuranceFrom : "---",
        Medical_Instructions : nanny.medicalInstructions ? nanny.medicalInstructions : "---",
        Years_Of_Experience : nanny.yearsOfExperience ? nanny.yearsOfExperience: "---",
        Rating : nanny.rating ? nanny.rating : "---",
        Employer_Name : nanny.employerName ? nanny.employerName : "---",
        Employer_Contact_Number : nanny.employerContact ? nanny.employerContact : "---", 
        Employer_Emergency_Contact : nanny.employerEmergencyContact ? nanny.employerEmergencyContact : "---",
        Language: nanny.language ? nanny.language : "---",
      };
    });

    console.log("remapped nannies", remappedNannies);
    setNannyArray(remappedNannies);
    setnanniesArrayReport(remappedNanniesReport)
    console.log("nannies array ", nannyArray);
  };

  const editButton = (row) => {
    // //console.log("edit -->", row._id)
    history.push(`/driverManagement/edit/${row._id}`);
  };

  const toggleModal = () => {
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
    let drivers = [];
    const formattedDriver = [];
    await xlsxParser.onFileSelection(files[0]).then((data) => {
      console.log("xlsxParser data", data);
      drivers = data;
    });
    const file = drivers.in || drivers.Sheet1 || drivers.template;
    for (const driver of file) {
      if(driver["Name(required)"] && driver["Email(required)"] && driver["Phone Number(required)"] && parseInt(driver["Years Of Work Experience"]))
        {
          formattedDriver.push({
          schoolId,
          name: driver["Name(required)"],
          email: driver["Email(required)"],
          contact: driver["Phone Number(required)"],
          busId:null,
          deleted: false,
          registered:false,
          currentStatus:false,
          type: resourceType == 'driver' ? "driver" : 'nanny' ,
          nationalId:driver['National Id'],
          driverLicense:"",
          employerName:driver["Employer Name"],
          employerContact:driver["Employer Contact Number"],
          employerEmergencyContact:driver["Employer Emergency Contact Number"],
          language:driver["Language"],
          bloodGroup:"",
          insuranceId:driver["Insurance Id"],
          medicalInstructions:driver["Medical Instructions (If any)"],
          medicalEmergencyContact:driver["Medical Emergency Contact Number"],
          insuranceFrom:driver["Insurance Company"],
          yearsOfExperience:parseInt(driver["Years Of Work Experience"]),
          rating:0,
          currentlyAssigned:false
          })
        }
      }

    console.log("formattedDriver", formattedDriver);

    addMultipleDrivers(formattedDriver);
    toggleModal();
    setFiles([]);
    //console.log(formattedDriver)
  };

  const filesList = files.map((file) => (
    <ListGroupItem style={{ overflow: "hidden" }} key={file.name}>
      {file.name} - {file.size} bytes
    </ListGroupItem>
  ));


  const deleteButton = (row) => {
    // //console.log("delete -->", row._id);
    // const newDriver = driverArray;
    // newDriver.splice(
    //   newDriver.findIndex((elem) => {
    //     return elem._id === row._id;
    //   }),
    //   1
    // );

    // console.log(newDriver);
    // setdriverArray(newDriver);
    deleteDriver({ id: row._id, email: row.email }, () => removeDriver(row._id));
    // forceUpdate();
  };

  const showDriverHistory = (row) => {
    //console.log("show -->", row._id)
    history.push(`/driverManagement/history/${row._id}`);
  };
  const dataToShow = driver ? searchDriver : driverArray;

  return (
    <Fragment>
      <ActionCenter>
        <div>
          {activeTab === "1" ? <Count count={loading ? "0" : dataToShow.length} /> : <Count count={loading ? "0" : nannyArray.length} />}
          
        </div>
        {/* <div>
          <Filter title="Select By" />
        </div> */}
        <div className="actions">
          {/* <AddButton /> */}
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
                Add Resource
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-hover-primary">
                <Link className="router-link" to={{pathname:schoolPaymentStatusCheck ? "/driverManagement/add" : "#", aboutProps:{activeTab:activeTab}}}>
                  <DropdownItem disabled={!schoolPaymentStatusCheck}>
                    Add Single Resource
                  </DropdownItem>
                </Link>
                <DropdownItem>
                  {/* <UploadBulk /> */}
                  <span onClick={()=>{toggleModal(); setResourceType('driver')}}>Upload Multiple Drivers Data</span>
                </DropdownItem>
                <DropdownItem>
                  {/* <UploadBulk /> */}
                  <span onClick={() => {toggleModal(); setResourceType('nanny')}}>Upload Multiple Nannies Data</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            {/* <Button className="mr-2 btn-icon action-btn" color="primary">
              <i className="pe-7s-plus btn-icon-wrapper"> </i>
                Add Student
              </Button> */}
          </div>

           {/* <Export Excel /> */}
           <div>
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                className="mr-2 add-student-dropdown"
                color="primary"
                disabled={!schoolPaymentStatusCheck}
              >
                Export Excel File
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-hover-primary">
                  <CSVLink data={driversArrayReport} filename={'Drivers-Report'}>
                    <DropdownItem disabled={!schoolPaymentStatusCheck}>
                      Drivers Export
                    </DropdownItem>
                  </CSVLink>
                  <CSVLink data={nanniesArrayReport} filename={'Nannies-Report'}>
                    <DropdownItem disabled={!schoolPaymentStatusCheck}>
                      Nannies Export
                    </DropdownItem>
                  </CSVLink>
                  <CSVLink data={allResourcesArrayReport} filename={'All-Resources-Report'}>
                    <DropdownItem disabled={!schoolPaymentStatusCheck}>
                      All Resources Export
                    </DropdownItem>
                  </CSVLink>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>

           {/* <Export Pdf /> */}
           <div>
            <UncontrolledButtonDropdown>
              <DropdownToggle
                caret
                className="mr-2 add-student-dropdown"
                color="primary"
                disabled={!schoolPaymentStatusCheck}
              >
                Export PDF File
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-hover-primary">
                    <DropdownItem onClick={() => PdfReportGenerator(driversArrayReport,['Name','Email','Contact','Bus No','National Id','Work Permit','Type','Driver License','Blood Group','Medical Emergency Contact','Insurance Id','Insurance Company','Medical Instructions','Years Of Experience','Rating','Employer Name','Employer Contact Number','Employer Emergency Contact','Language'],"Drivers-Pdf-Report")} disabled={!schoolPaymentStatusCheck}>
                      Drivers Export
                    </DropdownItem>
                    <DropdownItem onClick={() => PdfReportGenerator(nanniesArrayReport,['Name','Email','Contact','Bus No','National Id','Work Permit','Type','Blood Group','Medical Emergency Contact','Insurance Id','Insurance Company','Medical Instructions','Years Of Experience','Rating','Employer Name','Employer Contact Number','Employer Emergency Contact','Language'],"Nannies-Pdf-Report")} disabled={!schoolPaymentStatusCheck}>
                      Nannies Export
                    </DropdownItem>
                    <DropdownItem onClick={() => PdfReportGenerator(allResourcesArrayReport,['Name','Email','Contact','Bus No','National Id','Work Permit','Type','License','Blood Group','Medical Emergency Contact','Insurance Id','Insurance Company','Medical Instructions','Years Of Experience','Rating','Employer Name','Employer Contact Number','Employer Emergency Contact','Language'],"All-Resources-Pdf-Report")} disabled={!schoolPaymentStatusCheck}>
                      All Resources Export
                    </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>


          {/* <div> ////////////////////////////////////////////////////
            <Link
              className="router-link"
              // to={schoolPaymentStatusCheck ? "/driverManagement/add" : "#"}
              to={{
                pathname:schoolPaymentStatusCheck ? "/driverManagement/add" : "#",
                aboutProps:{
                  activeTab:activeTab
                }
              }}
              disabled={!schoolPaymentStatusCheck}
            >
              <Button
                className="mr-2 btn-icon action-btn"
                color="primary"
                disabled={!schoolPaymentStatusCheck}
              >
                <i
                  className="pe-7s-plus btn-icon-wrapper"
                  disabled={!schoolPaymentStatusCheck}
                >
                  {" "}
                </i>
                Add Resource
              </Button>
            </Link>
          </div> */}

          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search
              value={driver}
              onChange={searchHandler}
              placeholder="Search Driver by Name"
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
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Driver
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Nanny
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      {loading ? (
                        <div style={{ textAlign: "center" }}>
                          <Load type="ball-pulse" />
                        </div>
                      ) : dataToShow.length > 0 ? (
                        <div className="table-responsive table-driver">
                          {/* <BootstrapTable
                                  bootstrap4
                                  keyField="_id"
                                  data={dataToShow}
                                  columns={driverColumns}
                                  filter={filterFactory()}
                                  defaultSorted={defaultSorted}
                                /> */}
                          <ToolkitProvider
                            bootstrap4
                            keyField="_id"
                            data={dataToShow}
                            columns={driverColumns}
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
                        <div className="no-content">No Drivers Present</div>
                      )}
                    </TabPane>
                    <TabPane tabId="2">
                      {loading ? (
                        <div style={{ textAlign: "center" }}>
                          <Load type="ball-pulse" />
                        </div>
                      ) : nannyArray.length > 0 ? (
                        <div className="table-responsive table-driver">
                          {/* <BootstrapTable
                                  bootstrap4
                                  keyField="_id"
                                  data={dataToShow}
                                  columns={driverColumns}
                                  filter={filterFactory()}
                                  defaultSorted={defaultSorted}
                                /> */}
                          <ToolkitProvider
                            bootstrap4
                            keyField="_id"
                            data={nannyArray}
                            columns={driverColumns}
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
                        <div className="no-content">No Nannies Present</div>
                      )}
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
      <Modal isOpen={modal} toggle={toggleModal} className={props.className}>
        <ModalBody>
          <div className="card-header-info">
            <div className="info">
              <div className="title">Add Multiple {resourceType == 'driver' ? "Drivers" : "Nannies"}</div>
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
                          Resources
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
            <button className="close-button" onClick={toggleModal}>
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
    drivers: state.driver.driver,
    loader: state.driver.driver_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDrivers: (schoolId) => dispatch(fetchDrivers(schoolId)),
    deleteDriver: (driverId, removeDriver) =>
      dispatch(deleteDriver(driverId, removeDriver)),
    setEmptyDriver: () => dispatch({ type: "SET_EMPTY_DRIVER", payload: [] }),
    removeDriver: (driverId) =>
      dispatch({ type: "REMOVE_DRIVER", payload: driverId }),
    addMultipleDrivers: (drivers) => dispatch(addMultipleDrivers(drivers)),
      
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
