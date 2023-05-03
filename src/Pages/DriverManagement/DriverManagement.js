import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Tables

import List from './List';
import History from './History';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions';
import DriverAdd from './DriverAdd';
import DriverEdit from './DriverEdit';

const DriverManagement = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Tables */}
                    <Route path={`${match.url}/list`} component={List} />
                    <Route path={`${match.url}/add`} component={DriverAdd} />
                    <Route path={`${match.url}/edit/:id`} component={DriverEdit} />
                    <Route path={`${match.url}/history/:id`} component={History} />
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    </Fragment>
);

export default DriverManagement;