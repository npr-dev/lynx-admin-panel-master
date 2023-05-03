import React, { Fragment, useEffect } from 'react';
import { Loader as Load } from 'react-loaders'
import { authActions } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Loader = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.logout());
    props.history.push({
      pathname: "/pages/login"
    });
    return () => { }
  }, [])

  return (
    <Fragment>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Load type="line-scale" />
      </div>
    </Fragment>
  )
}

export default withRouter(Loader);