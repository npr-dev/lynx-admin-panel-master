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
import './HistoryDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudentHistory } from '../../../store/actions/studentAction';
import moment from 'moment';

const HistoryDetails = (props) => {
  const { studentId, history, fetchStudentHistory } = props;
  console.log('STUDNRT HISTRIT ARRR', props);
  console.log('STUDNRT HISTRIT ARRR 2', props.history);
  const [historia, setHistoria] = useState();
  const [studenHistoryArray, setstudenHistoryArray] = useState([]);
  const [schoolCount, setSchoolCount] = useState('');
  const [date, setDate] = useState({
    value: new Date(),
  });
  const columns = [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
    },
    {
      dataField: 'busNo',
      text: 'Bus No',
      sort: true,
      align: 'center',
      // filter: textFilter()
    },
    {
      dataField: 'checkIn',
      text: 'Check In',
      isDummyField: false,
      formatter: (cellContent, row) => {
        return (
          <div className='history-column'>
            <div className='d-block w-100 text-center'>
              <span className='badge badge-success'>
                {row.checkIn1
                  ? moment(row.checkIn1)
                      .local()
                      .format('LT')
                  : null}
              </span>
            </div>
            <div className='d-block w-100 text-center'>
              <span className='badge badge-success'>
                {row.checkIn2
                  ? moment(row.checkIn2)
                      .local()
                      .format('LT')
                  : null}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      dataField: 'checkInAt',
      text: 'At',
      isDummyField: false,
      formatter: (cellContent, row) => {
        return (
          <div className='history-column'>
            <div className='d-block w-100 text-center'>
              {row.checkIn1Position}
            </div>
            <div className='d-block w-100 text-center'>
              {row.checkIn2Position}
            </div>
          </div>
        );
      },
    },
    {
      dataField: 'checkOut',
      text: 'Check Out',
      isDummyField: false,
      formatter: (cellContent, row) => {
        return (
          <div className='history-column'>
            <div className='d-block w-100 text-center'>
              <span className='badge badge-warning'>
                {row.checkOut1
                  ? moment(row.checkOut1)
                      .local()
                      .format('LT')
                  : null}
              </span>
            </div>
            <div className='d-block w-100 text-center'>
              <span className='badge badge-warning'>
                {row.checkOut2
                  ? moment(row.checkOut2)
                      .local()
                      .format('LT')
                  : null}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      dataField: 'checkOutAt',
      text: 'At',
      isDummyField: false,
      formatter: (cellContent, row) => {
        return (
          <div className='history-column'>
            <div className='d-block w-100 text-center'>
              {row.checkOut1Position}
            </div>
            <div className='d-block w-100 text-center'>
              {row.checkOut2Position}
            </div>
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'busNo',
      order: 'asc',
    },
  ];

  const handleChange = (date) => {
    console.log('date====', moment(date).format('MMMM D YYYY'));
    const formattedDate = moment(date).format('MMMM D YYYY');
    const filteredHistories =
      props.history &&
      props.history.filter((stHistory) => {
        console.log(stHistory.date);
        return stHistory.date === formattedDate;
      });
    console.log('FFF', filteredHistories);

    setstudenHistoryArray(filteredHistories);
    setDate({
      value: date,
    });
  };

  useEffect(() => {
    console.log('use effect run');
    // (async () => {
    //     const res =  await fetchStudentHistory({ id: studentId });
    //     setSchoolCount(res)
    //     console.log("1",schoolCount)
    //     const remappedHistory = history && history.map(hist => {
    //         return {
    //             date: hist.date,
    //             busNo: hist.busNo,
    //             checkIn1: hist.checkIn1,
    //             checkIn1Position: hist.checkIn1Position,
    //             checkIn2: hist.checkIn2,
    //             checkIn2Position: hist.checkIn2Position,
    //             checkOut1: hist.checkOut1,
    //             checkOut1Position: hist.checkOut1Position,
    //             checkOut2: hist.checkOut2,
    //             checkOut2Position: hist.checkOut2Position,
    //         }
    //     })
    //     setstudenHistoryArray(remappedHistory)
    //   })()
    // onStart()
    // console.log("2")
    fetchStudentHistory({ id: studentId });
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      let remappedHistory =
        history &&
        history.map((hist) => {
          console.log('JAZBAT', hist);
          return {
            date: hist.date,
            busNo: hist.studentId.busNo,
            checkIn1: hist.checkIn1,
            checkIn1Position: hist.checkIn1Position,
            checkIn2: hist.checkIn2,
            checkIn2Position: hist.checkIn2Position,
            checkOut1: hist.checkOut1,
            checkOut1Position: hist.checkOut1Position,
            checkOut2: hist.checkOut2,
            checkOut2Position: hist.checkOut2Position,
          };
        });
      console.log('STUDENT MAP HSI', remappedHistory);
      setstudenHistoryArray(remappedHistory);
    }
  }, [history]);

  const onStart = () => {
    // fetchStudentHistory({ id: studentId })
    // if(props.history.length > 0 )
    // {
    //     const remappedHistory = history && history.map(hist => {
    //         return {
    //             date: hist.date,
    //             busNo: hist.busNo,
    //             checkIn1: hist.checkIn1,
    //             checkIn1Position: hist.checkIn1Position,
    //             checkIn2: hist.checkIn2,
    //             checkIn2Position: hist.checkIn2Position,
    //             checkOut1: hist.checkOut1,
    //             checkOut1Position: hist.checkOut1Position,
    //             checkOut2: hist.checkOut2,
    //             checkOut2Position: hist.checkOut2Position,
    //         }
    //     })
    //     console.log("STUDENT MAP HSI",remappedHistory)
    //     setstudenHistoryArray(remappedHistory)
    // }
    // else
    // {
    //     setHistoria("HELO")
    // }
  };

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
              <CardBody>
                <div>
                  <div className='card-header-info'>
                    <div className='info'>
                      <div className='title'>
                        {history && history.length > 0 && history[0].studentId
                          ? history[0].studentId.name
                          : 'Student'}
                        's History
                      </div>
                    </div>
                    <div className='action'>
                      <InputGroup className='mr-3 w-auto'>
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
                      <Link
                        className='close-button'
                        to='/studentManagement/list'
                      >
                        <i className='lnr-cross-circle'> </i>
                      </Link>
                    </div>
                  </div>
                  {studenHistoryArray && studenHistoryArray.length > 0 ? (
                    <div className='table-responsive table-history'>
                      <BootstrapTable
                        bootstrap4
                        keyField='date'
                        data={studenHistoryArray}
                        columns={columns}
                        filter={filterFactory()}
                        defaultSorted={defaultSorted}
                      />
                    </div>
                  ) : (
                    <div className='no-content'>No History Present</div>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  console.log('MILAY', state);
  return {
    studentId: ownProps.match.params.id,
    history: state.student.studentHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudentHistory: (studentId) =>
      dispatch(fetchStudentHistory(studentId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetails);
