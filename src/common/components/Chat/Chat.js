import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import firebase from "./../../../config/firebase";

const Chat = ({ chatId }) => {
  const [messgaeInput, setmessgaeInput] = useState("");
  const [personName, setpersonName] = useState("");
  const [messages, setmessages] = useState([]);
  const user = useSelector((state) => state.auth.user.result.userExist);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (chatId) {
      firebase
        .firestore()
        .collection("users")
        .doc(chatId)
        .onSnapshot((querySnapshot) => {
          setpersonName(querySnapshot.data().name);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(chatId)
        .collection("messages")
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!!messgaeInput) {
      firebase
        .firestore()
        .collection("users")
        .doc(chatId)
        .collection("messages")
        .add({
          message: messgaeInput,
          name: user.name,
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        });
      setmessgaeInput("");
    }
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <div className="chat_headerInfo">
          <h6>{personName}</h6>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${message.name === user.name &&
              "chat_reciever"}`}
          >
            {message.message}
            {/* <span className="chat_timeStamp">
              {message.data.timestamp}
            </span> */}
            <p
              style={{
                padding: 3,
                fontSize: 9,
                fontWeight: "normal",
                textAlign: message.name === user.name ? "right" : "left",
              }}
            >
              {Intl.DateTimeFormat("en-US", {
                // year: 'numeric',
                // month: '2-digit',
                // day: '2-digit',
                hour: "2-digit",
                minute: "2-digit",
                // second: '2-digit',
              }).format(message.createdAt.seconds * 1000)}
            </p>
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat_footer">
        <form>
          <input
            value={messgaeInput}
            placeholder="type a message"
            type="text"
            onChange={(e) => setmessgaeInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
