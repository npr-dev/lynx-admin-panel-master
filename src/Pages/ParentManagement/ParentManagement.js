import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
// Tables

import List from './List';
import Children from './Children'

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions';
import ParentEdit from './ParentEdit';
import ParentAdd from './ParentAdd';

const ParentManagement = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Tables */}
                    <Route path={`${match.url}/list`} component={List} />
                    <Route path={`${match.url}/edit/:id`} component={ParentEdit} />
                    <Route path={`${match.url}/add`} component={ParentAdd} />
                    <Route path={`${match.url}/children/:id`} component={Children} />
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    </Fragment>
);

export default ParentManagement;