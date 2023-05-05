import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import * as utils from '../../../common/utils';
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
  Input,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Link } from 'react-router-dom';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search } from '../../../Layout/ActionCenter';
import './BillingInfo.scss';
import { connect } from 'react-redux';
import { fetchPackages } from '../../../store/actions/schoolAction';
import {
  slots,
  createCustomer,
  updateSubscription,
} from '../../../store/actions/authAction';

import Plan from './Plan';
import Minimal from './minimal';

const BillingInfo = (props) => {
  const { school, fetchPackages, packages } = props;
  const [openModal, setOpenModal] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [slots, setSlots] = useState('Buy more slots');
  const [totalSlots, setTotalSlots] = useState(0);
  const [totalReduceSlots, setTotalReduceSlots] = useState(0);

  const [addSlots, setAddSlots] = useState(false);
  const [numOfStds, setNumOfStds] = useState(20);
  const [plan, setPlan] = useState({
    name:
      props.slotsCount <= 500
        ? 'basic'
        : props.slotsCount <= 700
        ? 'standard'
        : 'premium',
    amount: props.slotsCount <= 500 ? 2 : props.slotsCount <= 700 ? 1.5 : 1.0,
  });
  const [message, setMessage] = useState()

  const updateNumber = (e) => {
    console.log("GAYAN")
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setMessage( e.target.value)
   }
    // const val = e.target.value;
    // // If the current value passes the validity test then apply that to state
    // if (e.target.validity.valid) setMessage( e.target.value);
    // // If the current val is just the negation sign, or it's been provided an empty string,
    // // then apply that value to state - we still have to validate this input before processing
    // // it to some other component or data structure, but it frees up our input the way a user
    // // would expect to interact with this component
    // else if (val === '' || val === '-')
    //  setMessage(val);
  }
 const onKeyPress=(event)=> {
   console.log("KEY")
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
   }
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPackages();

    return () => {};
  }, []);
  const toggle = () => setOpenModal(!openModal);
  const closeModal = () => setOpenModal(false);
  const emptySlots = () => {
    setTotalSlots(0);
  };
  const increaseSlots = async (mode) => {
    setLoading(true);
    // await props.slotsAction(props.schoolId, mode, totalSlots);

    if (!props.stripeCustomerId) {
      try {
        // await props.createCustomer(props.schoolEmail);
        setOpenModal(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await props.updateSubscription(
          props.subscriptionId,
          props.stripeCustomerId,
          totalSlots + props.slotsCount
        );
        emptySlots();
      } catch (error) {}
      utils._toast('Slots increased succesfully', 'success');
    }
    setLoading(false);
    // setTotalSlots(0);
  };

  const decreaseSlots = async (mode, totalSlots) => {
    setLoading(true);
    try {
      await props.updateSubscription(
        props.subscriptionId,
        props.stripeCustomerId,
        props.slotsCount - totalReduceSlots
      );
      utils._toast('Slots reduced succesfully', 'success');
      setTotalReduceSlots(0);
      setLoading(false);
    } catch (error) {}
    // console.log(totalSlots);
    // setLoading(true);
    // const res = await props.slotsAction(props.schoolId, mode, totalSlots);
    // console.log(res);

    // utils._toast('Slots reduced succesfully', 'success');
  };

  // const maxLengthCheck = (object) => {
  //     console.log("INPUTY")
  //     if (object.target.value.length > object.target.maxLength) {
  //       object.target.value = object.target.value.slice(0, object.target.maxLength)
  //     }
  //   }

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
        <Modal isOpen={openModal}>
          <ModalHeader>Payment Information</ModalHeader>
          <ModalBody>
            <Minimal
              custId={props.stripeCustomerId}
              totalSlots={totalSlots}
              closeModal={closeModal}
              emptySlots={emptySlots}
            />
          </ModalBody>
        </Modal>

        <Row>
          <Col className='billing-info' md='12'>
            <Plan id={props.schoolId} />

            <Row>
              <Col md='9'>
                <div className='card-header-info'>
                  <div className='info'>
                    <div className='title'>Subscription</div>
                  </div>
                </div>
                <Card>
                  <CardBody className='text-center'>
                    <div className='pricing-plan'>
                      {addSlots ? (
                        <div className='tab mt-2'>
                          <div
                            onClick={() => setSlots('Buy more slots')}
                            className='tab-item'
                            style={{
                              color: slots === 'Buy more slots' && 'white',
                              backgroundColor:
                                slots === 'Buy more slots' && '#545cd8',
                            }}
                          >
                            Buy more slots
                          </div>
                          <div
                            onClick={() => setSlots('Reduce slots')}
                            className='tab-item'
                            style={{
                              color: slots === 'Reduce slots' && 'white',
                              backgroundColor:
                                slots === 'Reduce slots' && '#545cd8',
                            }}
                          >
                            Reduce Slots
                          </div>
                        </div>
                      ) : (
                        <div className='sub-text'>
                          <p>
                            Choose a monthly plan. The number of student slots
                            you want per month. You can always come here to
                            upgrade or downgrade your plan at any time of the
                            month.
                          </p>
                        </div>
                      )}

                      <div className='value'>
                        {addSlots
                          ? slots === 'Buy more slots'
                            ? 'How many slots you want to add?'
                            : props.studentCount === props.slotsCount
                            ? 'No Empty slots found'
                            : 'How many slots you want to remove?'
                          : 'No.of slots'}
                      </div>

                      <div className='num mb-4'>
                        {addSlots ? (
                          slots === 'Buy more slots' ? (
                            <div>
                              <Input
                                placeholder='0'
                                min={1}
                                type='number'
                                step='1'
                                // value={totalSlots}
                                onChange={updateNumber}
                                onKeyPress={onKeyPress}
                                pattern="^-?[0-9]\d*\.?\d*$"
                                onKeyDown={(e) => {
                                  console.log('===', e.keyCode);
                                  return false;
                                }}
                                onInput={(e) => {
                                  // console.log(e);
                                  // setTotalSlots(+e.target.value);
                                  if (
                                    e.target.value.length > e.target.maxLength
                                  ) {
                                    e.target.value = e.target.value.slice(
                                      0,
                                      e.target.maxLength
                                    );
                                  } else if (e.target.value === 'e') {
                                    e.target.value = e.target.value.slice(
                                      0,
                                      e.target.maxLength
                                    );
                                  } else {
                                    setTotalSlots(+e.target.value);
                                  }
                                }}
                                maxLength='4'
                              />
                            </div>
                          ) : (
                            <div>
                              <Input
                                placeholder='0'
                                min={1}
                                max={props.slotsCount}
                                type='number'
                                // value={totalReduceSlots}
                                step='1'
                                onChange={(e) => {
                                  setTotalReduceSlots(+e.target.value);
                                }}
                                disabled={
                                  props.studentCount === props.slotsCount
                                }
                              />
                            </div>
                          )
                        ) : (
                          <Input
                            // value={addSlots ? '0' : props.slotsCount}
                            // min={props.slotsCount}
                            // max={props.slotsCount}
                            value={props.slotsCount}
                            disabled
                            // name='disabled'
                          />
                        )}
                      </div>

                      {addSlots &&
                        (slots === 'Buy more slots' ? (
                          <div className='price-para'>
                            <div className='price'>
                              Total:{' '}
                              <span className='slots'>
                                {props.slotsCount + totalSlots} Slots
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className='price-para'>
                            <div className='price'>
                              Slots left after removal:{' '}
                              <span className='slots'>
                                {props.slotsCount - totalReduceSlots < 0
                                  ? 0
                                  : props.slotsCount - totalReduceSlots}{' '}
                                Slots
                              </span>
                            </div>
                          </div>
                        ))}

                      {addSlots ? (
                        slots === 'Buy more slots' && (
                          <div className='cost mb-2'>
                            <div className='price'>
                              $
                              {(
                                (totalSlots + props.slotsCount <= 500
                                  ? 2
                                  : totalSlots <= 700
                                  ? 1.5
                                  : 1.0) *
                                (props.slotsCount + totalSlots)
                              ).toFixed(2)}
                            </div>
                            per month
                          </div>
                        )
                      ) : (
                        <div className='cost mb-2'>
                          <div className='price'>
                            ${(plan.amount * props.slotsCount).toFixed(2)}
                          </div>
                          per month
                        </div>
                      )}

                      <div className='mb-4'>
                        $
                        {totalSlots + props.slotsCount <= 500
                          ? 2
                          : totalSlots + props.slotsCount <= 700
                          ? 1.5
                          : 1.0}
                        /students as per{' '}
                        {totalSlots + props.slotsCount <= 500
                          ? 'Basic'
                          : totalSlots + props.slotsCount <= 700
                          ? 'standard'
                          : 'premium'}{' '}
                        plan
                      </div>
                      {addSlots ? (
                        slots === 'Buy more slots' ? (
                          loading ? (
                            <Spinner
                              style={{ width: '20px', height: '20px' }}
                              color='dark'
                            />
                          ) : (
                            <div>
                              <Button
                                className='btn-wide mb-2'
                                color='primary'
                                onClick={() => setAddSlots(false)}
                                style={{ marginRight: 20 }}
                              >
                                Cancel
                              </Button>
                              <Button
                                className='btn-wide mb-2'
                                color='primary'
                                onClick={() => increaseSlots('increase')}
                                disabled={totalSlots === 0}
                              >
                                Upgrade
                              </Button>
                            </div>
                          )
                        ) : loading ? (
                          <Spinner
                            style={{ width: '20px', height: '20px' }}
                            color='dark'
                          />
                        ) : (
                          <div>
                            <Button
                              className='btn-wide mb-2'
                              color='primary'
                              onClick={() => setAddSlots(false)}
                              style={{ marginRight: 20 }}
                            >
                              Cancel
                            </Button>
                            <Button
                              className='btn-wide mb-2'
                              color='primary'
                              onClick={() =>
                                decreaseSlots('decrease', totalReduceSlots)
                              }
                              disabled={
                                props.studentCount === props.slotsCount ||
                                totalReduceSlots === 0 ||
                                totalReduceSlots > props.slotsCount ||
                                totalReduceSlots >
                                  props.slotsCount - props.studentCount
                              }
                            >
                              Confirm
                            </Button>
                          </div>
                        )
                      ) : (
                        <Button
                          className='btn-wide mb-2'
                          color='primary'
                          onClick={() => setAddSlots(true)}
                        >
                          Buy now
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md='3'>
                <div className='card-header-info'>
                  <div className='info'>
                    <div className='title'>Plans</div>
                  </div>
                </div>
                <div className='plans'>
                  <div className='mb-2'>
                    <Card className='pointer'>
                      <CardBody className='text-center pricing-plan card-content'>
                        <h6
                          className='bold'
                          style={{
                            color:
                              totalSlots + props.slotsCount <= 500 && '#545cd8',
                          }}
                        >
                          Basic
                        </h6>
                        <div className='mb-1'>Upto 500 students</div>
                        <div className='cost'>
                          <div className='price-amount'>$2.00</div>
                        </div>
                        <p>per student</p>
                      </CardBody>
                    </Card>
                  </div>
                  <div className='mb-2'>
                    <Card className='pointer'>
                      <CardBody className='text-center pricing-plan card-content'>
                        <h6
                          className='bold'
                          style={{
                            color:
                              totalSlots + props.slotsCount > 500 &&
                              totalSlots + props.slotsCount <= 700 &&
                              '#545cd8',
                          }}
                        >
                          Standard
                        </h6>
                        <div className='mb-1'>Upto 700 students</div>
                        <div className='cost'>
                          <div className='price-amount'>$1.50</div>
                        </div>
                        <p>per student</p>
                      </CardBody>
                    </Card>
                  </div>
                  <div className='mb-2'>
                    <Card className='pointer'>
                      <CardBody className='text-center pricing-plan card-content'>
                        <h6
                          className='bold'
                          style={{
                            color:
                              totalSlots + props.slotsCount > 700 && '#545cd8',
                          }}
                        >
                          Premium
                        </h6>
                        <div className='mb-1'>More than 700 students</div>
                        <div className='cost'>
                          <div className='price-amount'>$1.00</div>
                        </div>
                        <p>per student</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>

            {/*
            <Row>
              {packages &&
                packages.map((pkg) => {
                  return (
                    <Col md='4'>
                      <Card>
                        <CardBody className='text-center'>
                          <div className='pricing-plan'>
                            <div className='title'>{pkg.title}</div>
                            <div className='value'>{pkg.detail} </div>
                            <div className='cost'>
                              <div className='price'>${pkg.rate}</div>
                              per student
                            </div>
                            <Button
                              className='btn-wide mb-2'
                              size='lg'
                              color='primary'
                            >
                              Upgrade
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })}
            </Row> */}
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    studentCount: state.auth.user.result.studentCount,
    slotsCount: state.auth.user.result.userExist.slots,
    schoolEmail: state.auth.user.result.userExist.email,
    schoolId: state.auth.user.result.userExist._id,
    packages: state.school.packages,
    stripeCustomerId: state.auth.user.result.userExist.stripeCustomerId,
    subscriptionId: state.auth.user.result.userExist.subscriptionId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPackages: () => dispatch(fetchPackages()),
    slotsAction: (schoolId, mode, totalSlots) =>
      dispatch(slots(schoolId, mode, totalSlots)),
    createCustomer: (email) => dispatch(createCustomer(email)),
    updateSubscription: (subId, custId, quantity) =>
      dispatch(updateSubscription(subId, custId, quantity)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingInfo);
