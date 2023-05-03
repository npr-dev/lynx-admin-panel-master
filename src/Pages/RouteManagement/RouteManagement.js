import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Tables

import List from './List';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions';
import RouteDetails from './RouteDetails';
import RouteAdd from './RouteAdd';
import { Switch } from '@material-ui/core';
import RouteEdit from './RouteEdit';

const RouteManagement = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Tables */}
                    {/* <Switch> */}
                    <Route exact path={`${match.url}/list`} component={List} />
                    <Route exact path={`${match.url}/add`} component={RouteAdd} />
                    <Route exact path={`${match.url}/edit/:id`} component={RouteEdit} />
                    <Route exact path={`${match.url}/route/:id`} component={RouteDetails} />
                    {/* </Switch> */}
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    </Fragment>
);

export default RouteManagement;