import React, { useState, useEffect } from "react";
import "./ChatSidebar.css";
import { IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import ChatList from "../ChatList/ChatList";
import firebase from "./../../../config/firebase";
import { useSelector } from "react-redux";
import { Button, Modal, ModalBody, Row, Col, Input } from "reactstrap";
import BroadcastModal from "../BroadcastModal/BroadcastModal";

const ChatSidebar = ({ setchatId }) => {
  const user = useSelector((state) => state.auth.user.result.userExist);

  const [chatUsers, setchatUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    fetchDataFromFirebase();
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const handleMessageInputChange = (e) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  };

  const fetchDataFromFirebase = async () => {
    await firebase
      .firestore()
      .collection("users")
      .where("schoolId", "==", user._id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setchatUsers((currentArray) => [
            ...currentArray,
            { id: doc.id, data: doc.data() },
          ]);
        });
      });
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
    <div className="sidebar">
      <div className="sidebar_header">
        <h5 style={{ padding: 10 }}>Chats</h5>
        <div className="sidebar_headerRight">
          <IconButton onClick={toggle}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <p style={{marginBottom:0,fontSize:13,fontWeight:'bold'}}>Send To All</p>
              <ChatIcon />
            </div>
          </IconButton>
        </div>
      </div>

      {/* <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="type here" type="text" />
        </div>
      </div> */}

      <div className="sidebar_chats">
        {chatUsers.map((chatUser) => {
          return (
            <ChatList
              key={chatUser.id}
              id={chatUser.id}
              name={chatUser.data.name}
              email={chatUser.data.email}
              setchatId={setchatId}
            />
          );
        })}
      </div>
      <BroadcastModal modal={modal} toggle={toggle}/>
      {/* <span className="d-inline-block mr-2">
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
      </span> */}
    </div>
  );
};

export default ChatSidebar;
