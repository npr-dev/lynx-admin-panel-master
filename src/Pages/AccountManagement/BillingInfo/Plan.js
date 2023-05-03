import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import { fetchHistory } from '../../../store/actions/billingAction';

const Plan = (props) => {
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const toggle = () => setShowTable(!showTable);
  const products = [
    {
      id: 1,
      name: 'Hassan',
      price: 12,
    },
  ];
  const columns = [
    {
      dataField: 'date',
      text: 'Date',
    },
    {
      dataField: 'due',
      text: 'Slots',
    },
    {
      dataField: 'package',
      text: 'Package',
    },
    {
      dataField: 'paid',
      text: 'Amount Paid',
    },
  ];
  const serverURL = process.env.REACT_APP_SERVER_URL;
  // const serverURL = "http://localhost:4000";

  const showHistory = async () => {
    setShowTable(true);
    setLoading(true);
    try {
      const res = await axios.post(serverURL + '/billing/all', {
        schoolId: props.id,
      });

      // await props.fetchHistory(props.id);
      const historyArr = [];
      res.data.result.map((bil) => {
        historyArr.push({
          date: moment(bil.date).format('MMMM Do, YYYY'),
          due: bil.slots,
          package: bil.currentPackageName,
          paid: '$' + bil.amount,
        });

        setHistory(historyArr);
      });
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };
  return (
    <div>
      <Modal isOpen={showTable} toggle={toggle}>
        <ModalHeader toggle={toggle}>Payment Information</ModalHeader>
        <ModalBody>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Spinner style={{ width: '20px', height: '20px' }} color='dark' />
            </div>
          ) : (
            <BootstrapTable keyField='id' data={history} columns={columns} />
          )}
        </ModalBody>
      </Modal>
      <div className='card-header-info'>
        <div className='info'>
          <div className='title'>Your Plan</div>
        </div>
      </div>
      <Card className='main-card mb-3'>
        <CardBody>
          {props.subscriptionId ? (
            <div className='card-header-info package-info'>
              <div>
                <p>
                  Your Plan:{' '}
                  {props.slotsCount <= 500
                    ? 'Basic'
                    : props.slotsCount <= 700
                      ? 'standard'
                      : 'premium'}{' '}
                  ($
                  {props.slotsCount <= 500
                    ? 2
                    : props.slotsCount <= 700
                      ? 1.5
                      : 1.0}
                  /slot)
                </p>
                <p>
                  No.of Slots: {props.slotsCount} ({props.studentCount} Used)
                </p>
                <p>
                  Last Updated on:{' '}
                  {moment(props.currentPeriodStart).format('MMMM Do, YYYY')}
                </p>
                <p>
                  Your next payment is $
                  {props.slotsCount *
                    (props.slotsCount <= 500
                      ? 2
                      : props.slotsCount <= 700
                        ? 1.5
                        : 1.0)}{' '}
                  to be charged on{' '}
                  {moment(props.currentPeriodEnd).format('MMMM Do, YYYY')}
                </p>
              </div>
              <div>
                <div className='cost mb-4'>
                  <div className='price'>
                    $
                    {props.slotsCount *
                      (props.slotsCount <= 500
                        ? 2
                        : props.slotsCount <= 700
                          ? 1.5
                          : 1.0)}
                  </div>
                  <div className='per-month'>/month</div>
                </div>
                <div>
                  <Button
                    className='btn-wide mb-2 plan-btn'
                    color='secondary'
                    onClick={showHistory}
                  >
                    Billing History
                  </Button>
                </div>
              </div>

              {/*
                      <div className="price">
                          <div className="value">
                              ${parseInt(school.studentCount) * parseFloat(school.currentPackage.rate)}
                          </div>
                          for {school.studentCount} Students
                      </div>  */}
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p>No Subscriptions yet!</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    studentCount: state.auth.user.result.userExist.studentsCount,
    billing: state.billing.billingHistory,
    stripeCustomerId: state.auth.user.result.userExist.stripeCustomerId,
    subscriptionId: state.auth.user.result.userExist.subscriptionId,
    slotsCount: state.auth.user.result.userExist.slots,
    currentPeriodStart: state.auth.user.result.userExist.currentPeriodStart,
    currentPeriodEnd: state.auth.user.result.userExist.currentPeriodEnd,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHistory: (schoolId) => dispatch(fetchHistory(schoolId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Plan);
