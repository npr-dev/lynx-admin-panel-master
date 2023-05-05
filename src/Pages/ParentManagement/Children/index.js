import React, { Fragment, useState, useEffect } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
    Row, Col,
    Card, CardBody,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, CardHeader, Collapse
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../Layout/ActionCenter/ActionCenter';
import { Count, Search, Filter } from '../../../Layout/ActionCenter';
import './Children.scss'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchChildren } from '../../../store/actions/parentAction';
import ImagePreview from '../../StudentManagement/ImagePreviewModal/ImagePreview'




const Children = (props) => {

    const { parentId, children, fetchChildren } = props;
    const [childrenData, setChildrenData] = useState([]);
    const [initial, setInitial] = useState(true)
    const [localChildren, setLocalChildren] = useState([])

    const columns = [
        {
            dataField: "picture",
            text: "Picture",
            isDummyField: false,
            formatter: (cellContent, row) => {
                console.log('picture -->', row)
                return (
                    <ImagePreview
                        bgImage={row.picture}
                        studentId={row._id}
                        // data={{ ...row, parent: children[0].parentId.name }}
                        data={row}
                    />
                );

            },
        },
        {
            dataField: "id",
            text: "ID",
            sort: true,
        },
        {
            dataField: "name",
            text: "Name",
            sort: true,
            // filter: textFilter()
        },
        {
            dataField: "busNo",
            text: "Bus No.",
            sort: true,
        },

        {
            dataField: "status",
            isDummyField: false,
            text: "Image Status",
            formatter: (cellContent, row) => {
                return (
                    <div className="d-block w-100 text-center">
                        {row.pictures ? (
                            <span className="badge badge-success"> Uploaded</span>
                        ) : (
                                <span className="badge badge-warning"> Not Uploaded</span>
                            )}
                    </div>
                );
            },
        },
    ];


    const defaultSorted = [{
        dataField: 'name',
        order: 'asc'
    }];

    const viewButton = (row) => {
        //console.log("view -->", row._id)
    }

    const uploadButton = (row) => {
        //console.log("reupload -->", row._id)
    }


    useEffect(() => {
        console.log("children data", children)
        // if (!localChildren.length && localChildren.length !== children.length) {
        setLocalChildren(children.studentData)
        structureData()
        // }
        if (initial) {
            fetchChildren({ id: parentId })
            setInitial(false)
        }
        return () => {
        }
    }, [children])

    const structureData = () => {
        const remappedStudents = localChildren && localChildren.map(child => {
            return {
                id: child.studentId,
                name: child.name,
                locality: child.town,
                busNo: child.busId ? "Bus " + child.busId.busNo : "---",
                dob: child.dob,
                picture: child.pictures,
                _id: child._id
            }
        })
        setChildrenData(remappedStudents);
    }

    console.log("children --> ", children)


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
                        <Card>
                            <CardBody>
                                {
                                    childrenData && childrenData.length > 0
                                        ? <div>
                                            <div className="card-header-info">
                                                <div className="info">
                                                    <div className="title">{children && children[0].parentId ? children[0].parentId.name : "Parent"}'s Children</div>
                                                </div>
                                                <div className="action">
                                                    <Link className="close-button" to="/parentManagement/list">
                                                        <i className="lnr-cross-circle"> </i>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="table-responsive table-parent">
                                                <BootstrapTable
                                                    bootstrap4
                                                    keyField="_id"
                                                    data={childrenData}
                                                    columns={columns}
                                                    filter={filterFactory()}
                                                    defaultSorted={defaultSorted}
                                                />
                                            </div>
                                        </div>
                                        : <div className="no-content">No Children Present</div>

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
        parentId: ownProps.match.params.id,
        children: state.parent.children,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChildren: parentId => dispatch(fetchChildren(parentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Children);
