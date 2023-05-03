import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import ReactSpinners from "../../assets/components/react-spinners";
import Loader from "../../Pages/Loader/Loader";

// const Campaign = lazy(() => import("../../Pages/Campaign"));
const Dashboards = lazy(() => import("../../Pages/Dashboards"));
// const Orders = lazy(() => import("../../Pages/Orders"));
// const Arts = lazy(() => import("../../Pages/Arts"));
const UserPages = lazy(() => import("../../Pages/UserPages"));
// const PortraitOrders = lazy(() => import("../../Pages/PortraitOrders"));
// const Reserves = lazy(() => import("../../Pages/Reserves"));
// const ListSellOrders = lazy(() => import("../../Pages/ListSellOrders"));
// const Auction = lazy(() => import("../../Pages/Auction"));
// const Trades = lazy(() => import("../../Pages/Trades"));
// const Settings = lazy(() => import("../../Pages/Settings"));
const BusManagement = lazy(() => import("../../Pages/BusManagement/BusManagement"));
const RouteManagement = lazy(() => import("../../Pages/RouteManagement/RouteManagement"));
const StudentManagement = lazy(() => import("../../Pages/StudentManagement/StudentManagement"));
const DriverManagement = lazy(() => import("../../Pages/DriverManagement/DriverManagement"));
const ParentManagement = lazy(() => import("../../Pages/ParentManagement/ParentManagement"));
const Chats = lazy(() => import("../../Pages/Chats/Chats"));
const AccountManagement = lazy(() => import("../../Pages/AccountManagement/AccountManagement"));

const AppMain = () => {
  const user = useSelector(state => state.auth.user);

  return (
    user.userIsLoggedIn ?
      <Fragment>
        {/* <Suspense fallback={<ReactSpinners />}>
          <Route path="/campaign" component={Campaign} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/arts" component={Arts} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/reserve" component={Reserves} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/auction" component={Auction} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/list_sell" component={ListSellOrders} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/portrait_orders" component={PortraitOrders} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/settings" component={Settings} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/order" component={Orders} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/trades" component={Trades} />
        </Suspense> */}

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/busManagement" component={BusManagement} />
        </Suspense>
        
        <Suspense fallback={<ReactSpinners />}>
          <Route path="/routeManagement" component={RouteManagement} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/studentManagement" component={StudentManagement} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/driverManagement" component={DriverManagement} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/parentManagement" component={ParentManagement} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/chats" component={Chats} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/accountManagement" component={AccountManagement} />
        </Suspense>

        <Suspense fallback={<ReactSpinners />}>
          <Route path="/dashboards" component={Dashboards} />
        </Suspense>

        <Route
          exact
          path="/loading"
          component={Loader}
        />

        <Route
          exact
          path="/"
          render={() => <Redirect to="/dashboards/analytics" />}
        />


        <ToastContainer />
      </Fragment>
      :
      <Fragment>
        <Suspense fallback={<ReactSpinners />}>
          <Route path="/pages" component={UserPages} />
        </Suspense>

        <Route
          exact
          path="/"
          render={() => <Redirect to="/pages/login" />}
        />
      </Fragment>
  );
};

export default AppMain;
