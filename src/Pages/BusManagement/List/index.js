import React, { Fragment, useEffect, useState } from 'react';
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
  CardHeader,
  Collapse,
} from "reactstrap";
import { Loader as Load } from 'react-loaders';

import BootstrapTable from 'react-bootstrap-table-next';
import Dropzone from "react-dropzone";
import xlsxParser from "xlsx-parse-json";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {
  Search as NewSearch,
} from 'react-bootstrap-table2-toolkit';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search } from '../../../Layout/ActionCenter';
import './List.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBuses, deleteBus,addMultipleBuses } from '../../../store/actions/busAction';
import more from '../../../assets/utils/images/more.png';
import DeleteModal from './../../../common/components/DeleteModal';
import { actionTypes } from '../../../store/common/types';
import { ExportCSV } from "../../../common/components/ExportCSV/ExportCSV";
import PdfReportGenerator from '../../../common/components/PdfReportGenerator/PdfReportGenerator';


const { SearchBar } = NewSearch;
const fileDownload = require("js-file-download");
const template = ["bus No(required)", "Student Capacity(required)", "VIN Number(required)","Make","Model","License Number","Insurance Number",];

const List = (props) => {
  const {
    schoolId,
    fetchBuses,
    buses,
    deleteBus,
    setEmptyBus,
    loader,
    removeBus,
    addMultipleBuses,
    deleteBusCount,
  } = props;
  const history = useHistory();
  const [busArray, setbusArray] = useState([]);
  const [busArrayReport, setbusArrayReport] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [localBuses, setlocalBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busNo, setBusNo] = useState('');
  const [searchBuses, setSearchBuses] = useState([]);
  const [initial, setInitial] = useState(true);
  const [modal, setModal] = useState(false);
  const [files, setFiles] = useState([]);
  // const schoolPaymentStatusCheck = props.schoolPaymentStatus.subscriptionId
  //   ? true
  //   : false;
  const schoolPaymentStatusCheck =true;
  const searchHandler = (e) => {
    const { value } = e.target;
    setBusNo(value);
    const filteredArray = busArray.filter((item) => {
      return (
        item.busNo.substring(0, value.length).toLowerCase() ===
        value.toLowerCase()
      );
    });
    setSearchBuses(filteredArray);
  };

  // useEffect(() => {
  //     console.log("hello world");
  //     onStart()
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const columns = [
    {
      dataField: 'busNo',
      text: 'Bus No',
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: 'driver',
      text: 'Driver',
      sort: true,
    },
    {
      dataField: 'nanny',
      text: 'Nanny',
      sort: true,
    },
    // {
    //     dataField: 'contact',
    //     text: 'Contact',
    //     sort: true,
    // },
    {
      dataField: 'seats',
      text: 'Seats',
      sort: true,
    },
    {
      dataField: 'vin',
      text: 'VIN',
      sort: true,
    },
    // {
    //   dataField: 'students',
    //   text: 'Students',
    //   sort: true,
    // },
    {
      dataField: 'actions',
      isDummyField: true,
      align: 'center',
      text: 'Actions',
      formatter: (cellContent, row) => {
        return (
          // <div>
          //     <div className="d-block w-100">
          //         <UncontrolledButtonDropdown>
          //             <DropdownToggle className="btn-icon btn-icon-only btn btn-link" color="link">
          //                 <img src={more} height="20px" />
          //             </DropdownToggle>
          //             <DropdownMenu right className="rm-pointers dropdown-menu-hover-link">
          //                 {/* <DropdownItem header>Header</DropdownItem> */}
          //                 <DropdownItem onClick={() => {
          //                     showBus(row)
          //                 }}>
          //                     <i className="dropdown-icon lnr-eye"> </i>
          //                     <span>View</span>
          //                 </DropdownItem>
          //                 <DropdownItem onClick={() => {
          //                     editButton(row)
          //                 }}>
          //                     <i className="dropdown-icon lnr-pencil"> </i>
          //                     <span>Edit</span>
          //                 </DropdownItem>
          //                 <DropdownItem onClick={() => {
          //                     deleteButton(row)
          //                 }}>
          //                     <i className="dropdown-icon lnr-trash"> </i>
          //                     <span>Delete</span>
          //                 </DropdownItem>
          //             </DropdownMenu>
          //         </UncontrolledButtonDropdown>
          //     </div>
          // </div>
          <div className='text-center'>
            {/* <button
              className='icon-button'
              onClick={() => {
                showBus(row);
              }}
            >
              <i className='lnr-eye' />
            </button> */}
            <button
              className='icon-button'
              onClick={() => {
                editButton(row);
              }}
            >
              <i className='lnr-pencil' />
            </button>
            <DeleteModal
              className='delete-modal'
              name={`Bus No. ${row.busNo}`}
              deleteFunction={() => {
                deleteButton(row);
              }}
            />
            {/* <button className="icon-button" onClick={() => { deleteButton(row) }}>
                            <i className="lnr-trash" />
                        </button> */}
          </div>
        );
      },
    },
    // {
    //     dataField: 'actions',
    //     isDummyField: true,
    //     text: 'Actions',
    //     formatter: (cellContent, row) => {
    //         return (
    //             <div className="text-center">
    //                 <button className="delete-button" onClick={() => { deleteButton(row) }}>
    //                     <i className="lnr-cross" />
    //                 </button>
    //             </div>
    //         );
    //     }
    // },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'desc',
    },
  ];

  useEffect(() => {
    console.log('buses updated', buses);
    // if (!localBuses.length && localBuses.length !== buses.length) {
    setlocalBuses(buses);
    structureData();
    // }
    if (initial) {
      onStart();
      setInitial(false);
    }
  }, [buses]);

  const onStart = () => {
    fetchBuses({ id: schoolId });
  };

  const structureData = () => {
    const remappedBus = buses.map((bus) => {
      return {
        busNo: bus.busNo,
        driver:
          bus.driverId && bus.currentlyAssignedDriver ? bus.driverId.name : '---',
        nanny:
          bus.nannyId && bus.currentlyAssignedNanny ? bus.nannyId.name : '---',
        contact: bus.driverId ? bus.driverId.contact : '---',
        students: bus.studentCount ? bus.studentCount : 0,
        seats: bus.studentCapacity,
        vin: bus.vinNumber,
        _id: bus._id,
      };
    });
    
    const remappedBusReport = buses.map((bus) => {
      return {
        Bus_No: bus.busNo ? bus.busNo : '---',
        Seating_Capacity: bus.studentCapacity ? bus.studentCapacity : '---',
        VIN_Number : bus.vinNumber ? bus.vinNumber : '---',
        Assigned_Driver:  bus.driverId && bus.currentlyAssignedDriver ? bus.driverId.name : '---',
        Assigned_Nanny: bus.nannyId && bus.currentlyAssignedNanny ? bus.nannyId.name : '---',
        Make: bus.make ? bus.make : '---',
        Model : bus.model ? bus.model : '---',
        License_Number:bus.licenseNo ? bus.licenseNo : '---',
        Insurance_Number: bus.insuranceNo ? bus.insuranceNo : '---',
      };
    });
    console.log('remapped buses --> ', remappedBus);
    setbusArray(remappedBus);
    setbusArrayReport(remappedBusReport)
  };

  const editButton = (row) => {
    // //console.log("edit -->", row._id)
    history.push(`/busManagement/edit/${row._id}`);
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
    let buses = [];
    const formattedBus = [];
    await xlsxParser.onFileSelection(files[0]).then((data) => {
      console.log("file data", data);
      buses = data;
    });
    const file = buses.in || buses.Sheet1 || buses.template;
    console.log("file", file);
    for (const bus of file) {
      if(bus["bus No(required)"] && bus["Student Capacity(required)"] && bus["VIN Number(required)"] && parseInt(bus["Student Capacity(required)"]))
     {
      formattedBus.push({
        schoolId,
        busNo: bus["bus No(required)"],
        studentCapacity: bus["Student Capacity(required)"],
        vinNumber: bus["VIN Number(required)"],
        deleted: false,
        registered:false,
        busId:null,
        nannyId:null,
        currentStatus:false,
        studentsCount:0,
        make:bus["Make"],
        model:bus["Model"],
        licenseNo:bus["License Number"],
        insuranceNo:bus["Insurance Number"],
        currentlyAssignedDriver:false,
        currentlyAssignedNanny:false
      })
     }
    }

    console.log("formattedBus", formattedBus);

    addMultipleBuses(formattedBus);
    toggle();
    //console.log(formattedParent)
  };

  const filesList = files.map((file) => (
    <ListGroupItem style={{ overflow: "hidden" }} key={file.name}>
      {file.name} - {file.size} bytes
    </ListGroupItem>
  ));

  const deleteButton = (row) => {
    console.log('remove student', { id: row._id });
    deleteBus({ id: row._id }, () => {
      removeBus(row._id);
      deleteBusCount();
    });
  };

  const showBus = (row) => {
    //console.log("show -->", row._id)
    history.push(`/busManagement/bus/${row._id}`);
  };

  //console.log(document.querySelectorAll(".app-main__inner")[0].innerWidth)
  console.log('table data state --> ', busArray);
  const dataToShow = busNo ? searchBuses : busArray;
  return (
    <Fragment>
      {/* {
                !loading
                    ? <> */}
      <ActionCenter>
        <div>
          <Count count={loading ? '0' : dataToShow.length} />
        </div>
        <div>
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
                Add Bus
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-hover-primary">
                <Link className="router-link" to="/busManagement/add">
                  <DropdownItem disabled={!schoolPaymentStatusCheck}>
                    Add Single Bus
                  </DropdownItem>
                </Link>
                <DropdownItem>
                  {/* <UploadBulk /> */}
                  <span onClick={toggle}>Upload Multiple Buses Data</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <ExportCSV csvData={busArrayReport} fileName={"Buses-Report"} />
            <Button
            style={{padding: '0.5rem'}}
            className="mr-2 btn-icon action-btn"
            color="primary"
            disabled={!schoolPaymentStatusCheck}
            onClick={() => PdfReportGenerator(busArrayReport,["Bus No","Seating Capacity","VIN Number","Assigned Driver","Assigned Nanny","Make","Model","License Number","Insurance Number"],"Buses-Pdf-Report")}
          >
            Export PDF File
          </Button>
          </div>

          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search value={busNo} onChange={searchHandler} placeholder="Search Bus by number" /> */}
          </div>
        </div>
      </ActionCenter>

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
                {loader || loading ? (
                  <div style={{ textAlign: 'center' }}>
                    <Load type='ball-pulse' />
                  </div>
                ) : dataToShow.length > 0 ? (
                  <div className='table-responsive table-bus'>
                    <ToolkitProvider
                      bootstrap4
                      keyField='_id'
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
                  <div className='no-content'>No Buses Present</div>
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
              <div className="title">Add Multiple Buses</div>
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
                          Buses
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
      {/* </>
                    : <h4 style={{ textAlign: "center", padding: 100 }}>Loading...</h4>
            } */}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.auth,
    schoolPaymentStatus: state.auth.user.result.userExist,
    schoolId: state.auth.user.result.userExist._id,
    buses: state.bus.bus,
    loader: state.bus.bus_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBuses: (schoolId) => dispatch(fetchBuses(schoolId)),
    deleteBus: (busId, removeBus) => dispatch(deleteBus(busId, removeBus)),
    setEmptyBus: () => dispatch({ type: 'SET_EMPTY_BUS', payload: [] }),
    removeBus: (busId) => dispatch({ type: 'REMOVE_BUS', payload: busId }),
    deleteBusCount: () => dispatch({ type: actionTypes.DECREASE_BUS_COUNT }),
    addMultipleBuses: (buses) => dispatch(addMultipleBuses(buses)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
