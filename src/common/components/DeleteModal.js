import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, Row, Col } from "reactstrap";
import Delete from "./../../assets/img/delete.png";

const DeleteModal = (props) => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <span className="d-inline-block mr-2">
      <button className="icon-button" onClick={toggle}>
        <i className="lnr-trash" />
      </button>
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalBody>
          <div className="modal-img">
            <img src={Delete} alt="" />
          </div>
          <div className="card-header-info">
            <div className="info" style={{ width: "100%" }}>
              <div className="title text-center">Delete {props.name}?</div>
            </div>
          </div>
          <Row>
            <Col xs="12">
              <p className="text-center">
                Do you want to delete {props.name}? This cannot be undone.
                {props.isParent
                  ? ` All students associated with ${props.name} will need to be reassigned.`
                  : null}
              </p>
            </Col>
            <Col xs="12" className="text-center mt-4">
              <Button
                disabled={loading}
                color="secondary"
                className="mx-1"
                onClick={toggle}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                className="mx-1"
                onClick={() => {
                  setLoading(true);
                  props.deleteFunction();
                }}
                disabled={loading}
              >
                Delete
              </Button>
              {/* </>
              ) : null} */}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </span>
  );
};

export default DeleteModal;
