import React, { Fragment } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import { connect } from "react-redux";
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/img/avatar.png";
import { authActions } from "../../../store/actions";

function UserBox(props) {
  const dispatch = useDispatch();
  const schoolData = useSelector(state => state.auth.user);
  const user = schoolData.result.userExist;
  console.log('user', user)

  function onLogout() {
    // dispatch(authActions.logout());
    // props.history.push({
    //   pathname: "/pages/login"
    // });
    props.history.push({
      pathname: "/loading"
    })
  }

  function renderProfileImage() {
    if (user.img) {
      return (
        <Image
          cloudName="sar-com"
          publicId={user.img}
          style={{
            width: "44px",
            height: "44px"
          }}
          className="rounded-circle"
          responsive
        >
          <Transformation
            gravity="faces"
            radius="5"
          />
        </Image>
      );
    }
    return null;
  }

  return (
    <Fragment>
      <div className="header-btn-lg pr-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0">
                  {renderProfileImage()}
                  <img
                    width={42}
                    className="rounded-circle"
                    src={avatar1}
                    alt=""
                  />
                  <FontAwesomeIcon
                    className="ml-2 opacity-8"
                    icon={faAngleDown}
                  />
                </DropdownToggle>
                <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                  {/* <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-info"> */}
                  <div
                    className="menu-header-image opacity-2"
                    style={{
                      backgroundImage: "url(" + city3 + ")"
                    }}
                  />
                  <div className="menu-header-content text-left" style={{ padding: 10 }}>
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left mr-3">
                          {renderProfileImage()}
                          <img width={42} className="rounded-circle" src={avatar1}
                            alt="" />
                        </div>
                        <div className="widget-content-left">
                          <div className="widget-heading">{user.name}</div>
                          {/* <div className="widget-subheading opacity-8">
                            {user.name ? user.name : user.name.substr(0, user.email.indexOf("@"))}
                          </div> */}
                        </div>
                        <div className="widget-content-right mr-2">
                          <Button
                            className="btn-pill btn-shadow btn-shine"
                            color="focus"
                            onClick={onLogout}
                          >
                            Logout
                              </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* </div>
                  </div> */}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
            <div className="widget-content-left  ml-3 header-user-info">
              <div className="widget-heading">{user.name}</div>
              <div className="widget-subheading">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withRouter(UserBox);
