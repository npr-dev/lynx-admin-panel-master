import React, { Fragment } from "react";
import cx from "classnames";

import { connect } from "react-redux";

import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import HeaderLogo from "../AppLogo";

import SearchBox from "./Components/SearchBox";
import UserBox from "./Components/UserBox";

import {
  setEnableClosedSidebar
} from "../../store/reducers/ThemeOptions";

import HeaderDots from "./Components/HeaderDots";

class Header extends React.Component {
  componentDidMount = () => {
    let { user, setEnableClosedSidebar } = this.props;
  };

  render() {
    let {
      headerBackgroundColor,
      enableMobileMenuSmall,
      enableHeaderShadow,
      user
    } = this.props;
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          className={cx("app-header", headerBackgroundColor, {
            "header-shadow": enableHeaderShadow
          })}
          transitionName="HeaderAnimation"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <HeaderLogo />
          <div
            className={cx("app-header__content", {
              "header-mobile-open": enableMobileMenuSmall
            })}
          >
            {/* <div className="app-header-left">
              <SearchBox />
            </div> */}
            <div className="app-header-right">
              <HeaderDots />
              <UserBox />
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
  user: state.auth.user,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar
});

const mapDispatchToProps = dispatch => ({
  setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
