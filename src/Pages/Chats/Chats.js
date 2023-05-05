import React, { Fragment, useState, useEffect } from "react";

// Layout

import AppHeader from "../../Layout/AppHeader";
import AppSidebar from "../../Layout/AppSidebar";
import { useDispatch, useSelector } from "react-redux";
import firebase from "./../../config/firebase";
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
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
  CardHeader,
  Collapse,
} from "reactstrap";

// Theme Options

import ThemeOptions from "../../Layout/ThemeOptions";
import "./Chats.scss";
import ChatSidebar from "../../common/components/ChatSidebar/ChatSidebar";
import Chat from "../../common/components/Chat/Chat";

const Chats = () => {
  const [chatId, setchatId] = useState("");
  const user = useSelector((state) => state.auth.user.result.userExist);
  console.log("userss", user);




  return (
    <div>
      <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
              <div className="app">
                <ChatSidebar setchatId={setchatId}/>
                {chatId ? <Chat chatId={chatId}/> : null}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default Chats;
