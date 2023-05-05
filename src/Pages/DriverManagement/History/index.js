import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
    Row, Col,
    Card, CardBody,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search, Filter } from '../../../Layout/ActionCenter';
import './History.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDriverHistory } from '../../../store/actions/driverAction';



const columns = [
    {
        dataField: 'busNo',
        text: 'Bus',
        sort: true
    },
    {
        dataField: 'vin',
        text: 'VIN',
        sort: true,
        // filter: textFilter()
    },
    {
        dataField: 'from',
        text: 'From',
        sort: true,
    },
    {
        dataField: 'to',
        text: 'To',
        sort: true,
    },

];

const defaultSortedHistory = [{
    dataField: 'vin',
    order: 'asc'
}];



const History = (props) => {

    const { driverId, history, fetchDriverHistory } = props;
    const [driverHistoryArray, setdriverHistoryArray] = useState([])

    useEffect(() => {
        onStart()
        return () => {
        }
    }, [])

    const onStart = () => {
        fetchDriverHistory({ id: driverId })
        const remappedHistory = !!history.length && history.map(hist => {
            return {
                busNo: hist.busId.busNo,
                vin: hist.busId.vinNumber,
                to: hist.to,
                from: hist.from,
                _id: hist._id
            }
        })
        setdriverHistoryArray(remappedHistory)
    }


    return (
        <Fragment>
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                {
                                    driverHistoryArray.length > 0
                                        ? <div>
                                            <div className="card-header-info">
                                                <div className="info">
                                                    <div className="title">Driver's History</div>
                                                </div>
                                                <div className="action">
                                                    <Link className="close-button" to="/driverManagement/list">
                                                        <i className="lnr-cross-circle"> </i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="table-responsive table-driver">
                                                <BootstrapTable
                                                    bootstrap4
                                                    keyField="_id"
                                                    data={driverHistoryArray}
                                                    columns={columns}
                                                    filter={filterFactory()}
                                                    defaultSorted={defaultSortedHistory}
                                                />
                                            </div>
                                        </div>
                                        : <div className="no-content">No Drivers History Present</div>
                                }
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        driverId: ownProps.match.params.id,
        history: state.driver.driverHistory,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDriverHistory: driverId => dispatch(fetchDriverHistory(driverId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
