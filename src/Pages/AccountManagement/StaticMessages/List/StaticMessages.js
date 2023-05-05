import React, { Fragment, useEffect, useState } from 'react';
import { CSSTransitionGroup as ReactCSSTransitionGroup } from 'react-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from 'reactstrap';
import { Loader as Load } from 'react-loaders';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, {
  Search as NewSearch,
} from 'react-bootstrap-table2-toolkit';

import PageTitle from '../../../../Layout/AppMain/PageTitle';
import ActionCenter from '../../../../Layout/ActionCenter/ActionCenter';
import { Count, Search } from '../../../../Layout/ActionCenter';
import './StaticMessages.scss';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import DeleteModal from '../../../../common/components/DeleteModal';
import { actionTypes } from '../../../../store/common/types';
import { deleteStaticMessage, fetchStaticMessages } from '../../../../store/actions/staticMessagesAction';

const { SearchBar } = NewSearch;

const StaticMessages = (props) => {
  const {
    schoolId,
    fetchStaticMessages,
    staticMessages,
    deleteStaticMessage,
    setEmptyStaticMessage,
    loader,
    removeStaticMessage,
  } = props;

  const history = useHistory();
  const [staticMessagesArray, setStaticMessagesArray] = useState([]);
  const forceUpdate = useState()[1].bind(null, {});
  const [loading, setLoading] = useState(true);
  const [staticMessage, setstaticMessage] = useState('');
  const [searchStaticMessage, setSearchStaticMessage] = useState([]);
  const [initial, setInitial] = useState(true);
  const schoolPaymentStatusCheck = props.schoolPaymentStatus.subscriptionId
    ? true
    : false;
//   const searchHandler = (e) => {
//     const { value } = e.target;
//     setrouteName(value);
//     const filteredArray = routeArray.filter((item) => {
//       return (
//         item.routeName.substring(0, value.length).toLowerCase() ===
//         value.toLowerCase()
//       );
//     });
//     setSearchRoutes(filteredArray);
//   };

  useEffect(() => {
    setTimeout(() => {
      setLoading(loader);
    }, 1000);
  }, [loader]);

  const columns = [
    {
      dataField: 'staticMessages',
      text: 'Static Messages',
      sort: true,
    },
    {
      dataField: 'actions',
      isDummyField: true,
      align: 'center',
      text: 'Actions',
      formatter: (cellContent, row) => {
        return (
          <div className='text-center'>
            <button
              className='icon-button'
              onClick={() => {
                editButton(row);
              }}
            >
              <i className='lnr-pencil' />
            </button>
            <DeleteModal
              className='delete-modal'
              name={`this static message`}
              deleteFunction={() => {
                deleteButton(row);
              }}
            />
          </div>
        );
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'desc',
    },
  ];

  useEffect(() => {
      console.log("useEffect")
    structureData();
    // }
    if (initial) {
      onStart();
      setInitial(false);
    }
  }, [staticMessages]);

  const onStart = () => {
    console.log("Onstart")
    fetchStaticMessages({ schoolId });
  };

  const structureData = () => {
    const remappedStaticMessages = staticMessages.map((staticMessage) => {
      return {
        staticMessages: staticMessage.message,
        _id: staticMessage._id,
      };
    });
    console.log('remapped staticMessage --> ', remappedStaticMessages);
    setStaticMessagesArray(remappedStaticMessages);
  };

  const editButton = (row) => {
    // //console.log("edit -->", row._id)
    history.push(`/accountManagement/edit/${row._id}`);
  };

  const deleteButton = (row) => {
    deleteStaticMessage({ id: row._id }, () => {
      removeStaticMessage(row._id);
    });
  };

  console.log('table data state --> ', staticMessagesArray);
  const dataToShow = staticMessage ? searchStaticMessage : staticMessagesArray;
  return (
    <Fragment>
      {/* {
                !loading
                    ? <> */}
      <ActionCenter>
        <div>
          <Count count={loading ? '0' : dataToShow.length} />
        </div>
        <div>
          {/* <AddButton /> */}
          <div>
            <Link
              className='router-link'
              to={schoolPaymentStatusCheck ? '/accountManagement/add' : '#'}
            >
              <Button
                className='mr-2 btn-icon action-btn'
                color='primary'
                disabled={!schoolPaymentStatusCheck}
              >
                <i className='pe-7s-plus btn-icon-wrapper'> </i>
                Add Static Message
              </Button>
            </Link>
          </div>
          <div style={{ width: dataToShow.length > 0 ? 240 : 0 }}>
            {/* <Search value={busNo} onChange={searchHandler} placeholder="Search Bus by number" /> */}
          </div>
        </div>
      </ActionCenter>

      <ReactCSSTransitionGroup
        component='div'
        transitionName='TabsAnimation'
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row>
          <Col md='12'>
            <Card className='main-card mb-3'>
              <CardBody>
                {loader || loading ? (
                  <div style={{ textAlign: 'center' }}>
                    <Load type='ball-pulse' />
                  </div>
                ) : dataToShow.length > 0 ? (
                  <div className='table-responsive table-bus'>
                    <ToolkitProvider
                      bootstrap4
                      keyField='_id'
                      data={dataToShow}
                      columns={columns}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                      search
                    >
                      {(props) => (
                        <div>
                          {/* <h3>Input something at below input field:</h3> */}
                          <SearchBar {...props.searchProps} />
                          {/* <hr /> */}
                          <BootstrapTable {...props.baseProps} />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                ) : (
                  <div className='no-content'>No Static Messages Present</div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ReactCSSTransitionGroup>
      {/* </>
                    : <h4 style={{ textAlign: "center", padding: 100 }}>Loading...</h4>
            } */}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    auth: state.auth,
    schoolPaymentStatus: state.auth.user.result.userExist,
    schoolId: state.auth.user.result.userExist._id,
    staticMessages: state.staticMessages.staticMessages,
    loader: state.staticMessages.staticMessages_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStaticMessages: (schoolId) => dispatch(fetchStaticMessages(schoolId)),
    deleteStaticMessage: (staticMessageId, removeStaticMessage) => dispatch(deleteStaticMessage(staticMessageId, removeStaticMessage)),
    setEmptyStaticMessage: () => dispatch({ type: 'SET_EMPTY_STATIC_MESSAGE', payload: [] }),
    removeStaticMessage: (staticMessageId) => dispatch({ type: 'REMOVE_STATIC_MESSAGE', payload: staticMessageId }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StaticMessages);
