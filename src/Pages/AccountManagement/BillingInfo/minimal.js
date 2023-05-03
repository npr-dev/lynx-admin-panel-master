import React, { useState } from 'react';
import * as utils from '../../../common/utils';
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useElements,
  useStripe,
  Spinner,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import dotenv from 'dotenv';
import axios from 'axios';
import { connect } from 'react-redux';

import { fetchHistory } from '../../../store/actions/billingAction';
import { updateData, createCustomer } from '../../../store/actions/authAction';

import './Payment.css';

dotenv.config();

const CheckoutForm = (props) => {
  console.log(props);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const createPaymentMethod = async (cardElement, customerId, priceId) => {
    console.log(props);
    setError(null);
    setLoading(true);
    const res = await props.createCustomer(props.schoolEmail);
    console.log(res.stripeCustomerId);

    const cardNumElement = elements.getElement(cardElement);
    console.log(cardNumElement);
    return stripe
      .createPaymentMethod({
        type: 'card',
        card: cardNumElement,
      })
      .then((result) => {
        if (result.error) {
          console.log('dd===', result.error);
          setError(result.error.message);
          setLoading(false);
        } else {
          console.log(result);
          createSubscription({
            customerId: res.stripeCustomerId,
            paymentMethodId: result.paymentMethod.id,
            quantity: props.totalSlots,
          });
        }
      });
  };

  const createSubscription = async ({
    customerId,
    paymentMethodId,
    quantity,
  }) => {
    console.log(customerId, paymentMethodId, quantity);

    try {
      const serverURL = process.env.REACT_APP_SERVER_URL;
      // const serverURL = "http://localhost:4000";
      const res = await axios.post(serverURL + '/billing/create-subscription', {
        paymentMethodId,
        customerId,
        quantity,
      });
      console.log(res.data);

      props.updateData(res.data.school);
      utils._toast('Subscription Successfully Created', 'success');
    } catch (error) {
      console.log('========>', error);
      setError(error.message);
      utils._toast(
        error.response ? error.response.data.error : error.message,
        'error'
      );
    }
    props.closeModal();
    props.emptySlots();
  };

  return (
    <form
      id='pay-form'
      onSubmit={(e) => {
        e.preventDefault();

        createPaymentMethod(
          CardNumberElement,
          props.custId,
          process.env.REACT_APP_PRODUCT_ID
        );
      }}
    >
      <CardNumberElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <CardExpiryElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <CardCvcElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />

      {error && <p style={{ color: '#fa755a' }}>{error}</p>}

      <button type='submit' disabled={!stripe || loading} id='pay'>
        Add Your Information
      </button>
    </form>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IEb5rKap8avgMficJXmErAtLLSCyUyPPSfwyZBpZRGoeAqVfDAC7dObuwHVMfmdb2RMCpttR6m9HjhBF8u7qy9e008qYxRfBM');

const App = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        custId={props.stripeCustomerId}
        totalSlots={props.totalSlots}
        closeModal={props.closeModal}
        updateData={props.updateData}
        schoolId={props.schoolId}
        createCustomer={props.createCustomer}
        schoolEmail={props.schoolEmail}
        emptySlots={props.emptySlots}
      />
    </Elements>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHistory: (schoolId) => dispatch(fetchHistory(schoolId)),
    updateData: (data) => dispatch(updateData(data)),
    createCustomer: (email) => dispatch(createCustomer(email)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
