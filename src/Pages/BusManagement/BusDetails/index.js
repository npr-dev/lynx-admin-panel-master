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
} from 'reactstrap';

import './BusDetails.scss';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';
import AssignStudent from './../AssignStudentModal/AssignStudent';
import {
  fetchBus,
  fetchBusStudents,
  fetchUnassignedStudents,
  unassignStudent,
} from '../../../store/actions/busAction';
import { connect } from 'react-redux';

const BusDetails = (props) => {
  const {
    fetchBus,
    fetchBusStudents,
    busId,
    busData,
    students,
    unassignStudent,
    removeStudent,
  } = props;
  const studentsData = [];

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      // filter: textFilter()
    },
    {
      dataField: 'locality',
      text: 'Locality',
      sort: true,
    },
    {
      dataField: 'busNo',
      text: 'Bus No.',
      sort: true,
    },
    {
      dataField: 'dob',
      text: 'DOB',
      sort: true,
    },
    {
      dataField: 'actions',
      isDummyField: true,
      text: 'Actions',
      formatter: (cellContent, row) => {
        return (
          <div className='text-center'>
            <button
              className='delete-button'
              onClick={() => {
                deleteButton(row);
              }}
            >
              <i className='lnr-cross' />
            </button>
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'asc',
    },
  ];

  const deleteButton = (row) => {
    unassignStudent({ busId, studentId: row._id }, () => removeStudent(row));
  };

  useEffect(() => {
    fetchBus({ id: busId });
    fetchBusStudents({ id: busId });
    return () => {};
  }, []);

  useEffect(() => {
    console.log('student count', busData.studentCount);
  }, [busData]);

  students &&
    students.map((student) => {
      studentsData.push({
        id: student.studentId,
        name: student.name,
        locality: student.town,
        busNo: busData ? busData.busNo : null,
        dob: student.dob,
        _id: student._id,
      });
    });

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
              {busData ? (
                <CardBody>
                  <div className='card-header-info'>
                    <div className='info'>
                      <div className='title'>Bus No. {busData.busNo}</div>
                      <div className='info-items'>
                        <div className='item'>
                          Driver:
                          <span>
                            {busData.driverId ? busData.driverId.name : '---'}
                          </span>
                        </div>
                        <div className='item'>
                          VIN:
                          <span>{busData.vinNumber}</span>
                        </div>
                        <div className='item'>
                          Students:
                          <span>{busData.studentCount}</span>
                        </div>
                      </div>
                    </div>
                    <div className='action'>
                      <div>
                        {console.log(
                          'assign student button disabled',
                          busData.studentCount >=
                            parseInt(busData.studentCapacity)
                        )}
                        <AssignStudent
                          disabled={
                            busData.studentCount >=
                            parseInt(busData.studentCapacity)
                          }
                          busId={busId}
                          history={props.history}
                        />
                      </div>
                      <Link className='close-button' to='/busManagement/list'>
                        <i className='lnr-cross-circle'> </i>
                      </Link>
                    </div>
                  </div>
                  <div className='table-responsive table-children'>
                    <BootstrapTable
                      bootstrap4
                      keyField='_id'
                      data={studentsData}
                      columns={columns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                    ></BootstrapTable>
                  </div>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('single bus data', state.bus.singleBus);
  return {
    busId: ownProps.match.params.id,
    busData: state.bus.singleBus,
    students: state.bus.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBus: (busId) => dispatch(fetchBus(busId)),
    unassignStudent: (studentData, removeStudent) =>
      dispatch(unassignStudent(studentData, removeStudent)),
    removeStudent: (studentId) =>
      dispatch({ type: 'REMOVE_STUDENT', payload: studentId }),
    fetchBusStudents: (busId) => dispatch(fetchBusStudents(busId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusDetails);
