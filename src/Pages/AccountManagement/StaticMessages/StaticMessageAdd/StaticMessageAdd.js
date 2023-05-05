import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';

import './StaticMessageAdd.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStaticMessage } from '../../../../store/actions/staticMessagesAction';

const StaticMessageAdd = (props) => {
  const {
    addStaticMessage,
    schoolId,
  } = props;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    value: '',
  });

  // useEffect(() => {
  //   console.log("loading", loading)
  // }, [loading])

  const handleMessageChange = (e) => {
    e.preventDefault();
    setMessage({
      ...message,
      value: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const staticMessageData = {
        schoolId: schoolId,
        message: message.value,
    };

    console.log('staticMessageData===', staticMessageData);

    addStaticMessage(
        staticMessageData,
      () => {
        // setTimeout(() => {
        history.push('/accountManagement/staticMessages');
        // }, 2000)
      },
      () => setLoading(false)
    );
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
                <div className='card-header-info'>
                  <div className='info'>
                    <div className='title'>Add Static Message</div>
                  </div>
                  <div className='action'>
                    <Link className='close-button' to='/accountManagement/staticMessages'>
                      <i className='lnr-cross-circle'> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>                  
                    <Col md='12'>
                      <FormGroup>
                        <Label for='staticMessage'>Static Message</Label>
                        <Input
                          type='text'
                          name='staticMessage'
                          id='staticMessage'
                          value={message.value}
                          onChange={handleMessageChange}
                          placeholder='Enter Static Message'
                          required
                        />
                        <FormFeedback>
                        Static Message cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                  </Row>
                  <Button color='primary' className='mt-1' disabled={loading}>
                    Submit
                  </Button>
                </Form>
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
    schoolId: state.auth.user.result.userExist._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addStaticMessage: (staticMessageData, navigate, stopLoader) =>
      dispatch(addStaticMessage(staticMessageData, navigate, stopLoader)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticMessageAdd);
