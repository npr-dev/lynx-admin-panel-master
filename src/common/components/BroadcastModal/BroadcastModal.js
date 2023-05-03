import React,{useState} from "react";
import { Button, Modal, ModalBody, Row, Col, Input } from "reactstrap";
import firebase from "./../../../config/firebase";
import { useSelector } from "react-redux";



function BroadcastModal({modal,toggle,}) {

  const [messageInput, setMessageInput] = useState("");
  const user = useSelector((state) => state.auth.user.result.userExist);


  const handleMessageInputChange = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  const sendDataToFirebase = async () => {
    if (messageInput != "") {
      toggle();
      const events = await firebase.firestore().collection("users");
      events.get().then((querySnapshot) => {
        querySnapshot.docs.map((doc) => {
          console.log("doc", doc);
          firebase
            .firestore()
            .collection("users")
            .doc(doc.id)
            .collection("messages")
            .add({
              message: messageInput,
              name: user.name,
              createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            });
          setMessageInput("");
        });
      });
    }
  };
  return (
    <span className="d-inline-block mr-2">
      <Modal isOpen={modal} toggle={toggle} className="delete-modal">
        <ModalBody>
          <div className="card-header-info">
            <div className="info" style={{ width: "100%" }}>
              <div className="title text-center">Write Your Message Here</div>
            </div>
          </div>
          <Row>
            <Col xs="12">
              <Input
                type="text"
                placeholder="Message..."
                value={messageInput.value}
                onChange={handleMessageInputChange}
              />
            </Col>
            <Col xs="12" className="text-center mt-4">
              <Button color="secondary" className="mx-1" onClick={toggle}>
                Cancel
              </Button>
              <Button
                color="success"
                className="mx-1"
                onClick={sendDataToFirebase}
              >
                Send To All
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </span>
  );
}

export default BroadcastModal;
