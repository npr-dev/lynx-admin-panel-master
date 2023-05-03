import React, { Fragment, useState, useEffect } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Filter, Search, AddButton } from '../../../Layout/ActionCenter';
import './HistoryList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { Link, useHistory } from 'react-router-dom';
import { fetchStudents } from '../../../store/actions/studentAction';
import { connect } from 'react-redux';

const HistoryList = (props) => {
  const { schoolId, fetchStudents, students } = props;
  const [studentArray, setstudentArray] = useState([]);
  const history = useHistory();

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
      dataField: 'parent',
      text: "Parent's Name",
      sort: true,
    },
    {
      dataField: 'dob',
      text: 'DOB',
      sort: true,
    },
    {
      dataField: 'history',
      isDummyField: false,
      text: '',
      formatter: (cellContent, row) => {
        return (
          <Button
            className='mr-2'
            color='primary'
            onClick={() => {
              showHistory(row);
            }}
          >
            History
          </Button>
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

  const [date, setDate] = useState({
    value: new Date(),
  });

  const handleChange = (date) => {
    setDate({
      value: date,
    });
  };

  const showHistory = (row) => {
    console.log('show --> ', row._id);
    history.push(`/studentManagement/student/history/${row._id}`);
  };

  useEffect(() => {
    console.log('ONE');
    onStart();
    console.log('two');
  }, [onStart]);

  const onStart = async () => {
    await fetchStudents({ id: schoolId });
    console.log('BBBBBBBBB', students);
    remapStudent();
  };

  const remapStudent = () => {
    const remappedStudent =
      students &&
      students.length > 0 &&
      students.map((student) => {
        console.log('BUS NJU', student);
        return {
          id: student.studentId,
          name: student.name,
          locality: student.town,
          busNo: student.busId ? student.busId.busNo : '--',
          parent: student.parentId.name,
          dob: student.dob,
          _id: student._id,
        };
      });
    setstudentArray(remappedStudent);
  };

  const filterByID = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      console.log('inside');
      const filteredStudents = studentArray.filter((std) => {
        return std.id.includes(e.target.value);
      });
      console.log(filteredStudents);
      setstudentArray(filteredStudents);
    } else {
      remapStudent();
    }
  };

  return (
    <Fragment>
      <ActionCenter>
        <div>
          <Count count={studentArray.length} />
        </div>
        <div>
          <Filter title='Filter By' />
        </div>
        <div className='actions'>
          <div>
            <InputGroup className='mr-2 w-auto'>
              <InputGroupAddon addonType='prepend'>
                <div className='input-group-text'>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
              </InputGroupAddon>
              <DatePicker
                className='form-control'
                selected={date.value}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
          <div>
            <Search placeholder='Search Student by ID' onChange={filterByID} />
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
                {/* {
                                    studentArray.length > 0
                                        ?  */}
                <div className='table-responsive table-student'>
                  <BootstrapTable
                    bootstrap4
                    keyField='_id'
                    data={studentArray}
                    columns={columns}
                    filter={filterFactory()}
                    defaultSorted={defaultSorted}
                  />
                </div>
                {/* : <div className="no-content">No Children Present</div>
                                } */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    schoolId: state.auth.user.result.userExist._id,
    students: state.student.student,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudents: (schoolId) => dispatch(fetchStudents(schoolId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryList);
