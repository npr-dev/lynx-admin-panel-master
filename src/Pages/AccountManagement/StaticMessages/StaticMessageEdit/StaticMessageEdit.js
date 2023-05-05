import React, { Fragment, useEffect, useState } from "react";
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
} from "reactstrap";

import "./StaticMessageEdit.scss";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { updateStaticMessage } from "../../../../store/actions/staticMessagesAction";

const StaticMessageEdit = (props) => {
  const {
    schoolId,
    staticMessageId,
    editStaticMessage,
    staticMessages,
    setEmptyStaticMessage,
  } = props;
  console.log("EDIT ROUTE", props);
  const history = useHistory();
  let currentStaticMessage = [];
  let staticMessage = {};

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    value: "",
  });

  useEffect(() => {
    currentStaticMessage = staticMessages.filter((staticMessage) => {
      return staticMessage._id === staticMessageId;
    });

    staticMessage = currentStaticMessage[0];

    setMessage({
      value: staticMessage.message,
    });
  }, []);

  const handleStaticMessageChange = (e) => {
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
      id: staticMessageId,
      message: message.value,
    };

    console.log("staticMessageData===", staticMessageData);

    editStaticMessage(
      staticMessageData,
      () => {
        // setTimeout(() => {
        history.push("/accountManagement/staticMessages");
        // }, 2000)
      },
      () => setLoading(false)
    );

    setEmptyStaticMessage();
  };

  return (
    <Fragment>
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
                <div className="card-header-info">
                  <div className="info">
                    <div className="title">Edit Static Message</div>
                  </div>
                  <div className="action">
                    <Link
                      className="close-button"
                      to="/accountManagement/staticMessages"
                    >
                      <i className="lnr-cross-circle"> </i>
                    </Link>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <Label for="staticMessage">Static Message</Label>
                        <Input
                          type="text"
                          name="staticMessage"
                          id="staticMessage"
                          value={message.value}
                          onChange={handleStaticMessageChange}
                          placeholder="Enter Static Message"
                          required
                        />
                        <FormFeedback>
                          Static Message cannot be empty
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" className="mt-1" disabled={loading}>
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

const mapStateToProps = (state, ownProps) => {
  return {
    schoolId: state.auth.user.result.userExist._id,
    staticMessageId: ownProps.match.params.id,
    staticMessages: state.staticMessages.staticMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editStaticMessage: (staticMessageData, navigate, stopLoader) =>
      dispatch(updateStaticMessage(staticMessageData, navigate, stopLoader)),
    setEmptyStaticMessage: () =>
      dispatch({ type: "SET_EMPTY_STATIC_MESSAGES", payload: [] }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticMessageEdit);
