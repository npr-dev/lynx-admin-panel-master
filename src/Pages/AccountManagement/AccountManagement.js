import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Tables

import List from './BillingInfo';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

// Theme Options
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail"
import ThemeOptions from '../../Layout/ThemeOptions';
import ProfileInfo from './ProfileInfo';
import BillingInfo from './BillingInfo';
import UpdateOTP from './UpdateOTP';
import StaticMessages from './StaticMessages/List/StaticMessages';
import StaticMessageAdd from './StaticMessages/StaticMessageAdd/StaticMessageAdd';
import StaticMessageEdit from './StaticMessages/StaticMessageEdit/StaticMessageEdit';

const AccountManagement = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Tables */}
                    <Route path={`${match.url}/profile`} component={ProfileInfo} />
                    <Route path={`${match.url}/billing`} component={BillingInfo} />
                    <Route exact path={`${match.url}/ChangePassword`} component={ChangePassword} />
                    <Route exact path={`${match.url}/ChangeEmail`} component={ChangeEmail} />
                    <Route path={`${match.url}/change-OTP-boxed`} component={UpdateOTP} />
                    <Route path={`${match.url}/staticMessages`} component={StaticMessages} />
                    <Route exact path={`${match.url}/add`} component={StaticMessageAdd} />
                    <Route exact path={`${match.url}/edit/:id`} component={StaticMessageEdit}/>
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    </Fragment>
);

export default AccountManagement;