import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// Tables

import List from './List';

// Layout

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';

// Theme Options

import ThemeOptions from '../../Layout/ThemeOptions';
import HistoryList from './HistoryList';
import HistoryDetails from './HistoryDetails';
import StudentAdd from './StudentAdd';
import UploadPictures from './UploadPictures';
import StudentEdit from './StudentEdit';

const StudentManagement = ({ match }) => (
    <Fragment>
        <ThemeOptions />
        <AppHeader />
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Tables */}
                    <Route path={`${match.url}/list`} component={List} />
                    <Route path={`${match.url}/history/list`} component={HistoryList} />
                    <Route path={`${match.url}/add`} component={StudentAdd} />
                    <Route path={`${match.url}/edit/:id`} component={StudentEdit} />
                    <Route path={`${match.url}/upload-pictures`} component={UploadPictures} />
                    <Route path={`${match.url}/student/history/:id`} component={HistoryDetails} />
                </div>
                {/* <AppFooter /> */}
            </div>
        </div>
    </Fragment>
);

export default StudentManagement;