import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Tables

import List from './List';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions';
import BusDetails from './BusDetails';
import BusAdd from './BusAdd';
import { Switch } from '@material-ui/core';
import BusEdit from './BusEdit';

const BusManagement = ({ match }) => (
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
                    <Route exact path={`${match.url}/add`} component={BusAdd} />
                    <Route exact path={`${match.url}/edit/:id`} component={BusEdit} />
                    <Route exact path={`${match.url}/bus/:id`} component={BusDetails} />
                    {/* </Switch> */}
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    </Fragment>
);

export default BusManagement;