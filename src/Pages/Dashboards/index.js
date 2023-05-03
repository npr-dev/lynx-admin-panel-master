import React, { Fragment } from "react";
import { Route } from "react-router-dom";

// DASHBOARDS

import AnalyticsDashboard from "./Analytics/Analytics";

// Layout

import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";

// Theme Options
import ThemeOptions from "../../Layout/ThemeOptions/";

const Dashboards = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner" >
          <Route path={`${match.url}`} component={AnalyticsDashboard} />
        </div>
      </div>
    </div>
  </Fragment>
);

export default Dashboards;
