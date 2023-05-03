import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from '../../../store/common/apiCreator'
import { notificationAction } from "../../../store/actions";
import Ionicon from 'react-ionicons';
import { connect } from "react-redux";
import { Button } from 'reactstrap';

import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu
} from 'reactstrap';
import city3 from '../../../assets/utils/images/dropdown-header/city3.jpg';

import Tabs from 'react-responsive-tabs';

// Dropdown Tabs Content
import TimelineEx from './TabsContent/TimelineExample';

const HeaderDots = props => {
    const dispatch = useDispatch()
    const reduxNotificationState = useSelector(state => state.notification)
    const [notifications, setStateNotifications] = useState([]);
    const tabsContent = [
        {
            title: 'Messages',
            content: <TimelineEx data={notifications} />
        }
    ];

    function getTabs() {
        return tabsContent.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        }));
    }
    useEffect(() => {
        getNotification();
    }, []);

    async function getNotification() {
        setStateNotifications(reduxNotificationState.notification);
        const result = await dispatch(notificationAction.getNotification({ schoolId: props.schoolId}));
        //console.log("view notfications result==>", result)
        setStateNotifications(result);
    }
    let totalMessages = notifications.length

    return (
        <Fragment>
            <div className="header-dots">
                <UncontrolledDropdown>
                    <Button onClick={() => window.open('mailto:admin@mozaicweb.com') } style={{fontSize:15}} className="mr-3 btn-icon action-btn" color="primary">Help</Button>
                    <DropdownToggle className="p-0 mr-2" color="link">
                        <div className="icon-wrapper icon-wrapper-alt rounded-circle">
                            <div className="icon-wrapper-bg bg-danger" />
                            <Ionicon color="#d92550" fontSize="23px" icon="md-notifications-outline" />
                            {/* <div className="badge badge-dot badge-dot-sm badge-danger">Notifications</div> */}
                        </div>
                    </DropdownToggle>
                    <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                        <div className="dropdown-menu-header mb-0">
                            <div className="dropdown-menu-header-inner bg-deep-blue">
                                <div className="menu-header-image opacity-1"
                                    style={{
                                        backgroundImage: 'url(' + city3 + ')'
                                    }}
                                />
                                <div className="menu-header-content text-dark">
                                    <h5 className="menu-header-title">Notifications</h5>
                                    <h6 className="menu-header-subtitle">You have <b>{totalMessages}</b> messages</h6>
                                </div>
                            </div>
                        </div>
                        <Tabs tabsWrapperClass="body-tabs body-tabs-alt" transform={false} showInkBar={true}
                            items={getTabs()} />
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
      schoolId: state.auth.user.result.userExist._id,
    };
  };

export default connect(
    mapStateToProps,
  )(HeaderDots);