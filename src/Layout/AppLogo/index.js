import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Hamburger from "react-hamburgers";
import AppMobileMenu from "../AppMobileMenu";
import { setEnableClosedSidebar } from "../../store/reducers/ThemeOptions";
import { Link } from "react-router-dom";
import Buspect_logo from '../../assets/img/Buspect-logo.png'


class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false,
    };
  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false,
  };

  render() {
    let { enableClosedSidebar, schoolName } = this.props;

    return (
      <Fragment>
        <div className="app-header__logo">
          {!enableClosedSidebar && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Link to="" style={{display:'flex',flexDirection:'row'}}>
                <img
                  src={Buspect_logo}
                  style={{
                    width: "44px",
                    height: "44px",
                  }}
                  className="rounded-circle"
                />
                <p className="school-name"  style={{color:"#5667D8", fontFamily: "Dancing Script", marginLeft: 15 }} >
                  <b>Buspect</b>
                </p>
              </Link>
            </div>
          )}
          <div className="header__pane ml-auto">
            <div onClick={this.toggleEnableClosedSidebar}>
              <Hamburger
                active={enableClosedSidebar}
                type="elastic"
                onClick={() => this.setState({ active: !this.state.active })}
              />
            </div>
          </div>
        </div>
        <AppMobileMenu />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("react state", state)
  return {
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    schoolName: state.auth.user.result.userExist.name,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setEnableClosedSidebar: (enable) => dispatch(setEnableClosedSidebar(enable)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLogo);
