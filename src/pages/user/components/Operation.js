import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/user/add",
          state: { editRecord: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>
    </div >
  )
}

const mapDispatch = dispatch => ({
  // updateState: req => {
  //   const action = creators.updateStateAction(req);
  //   dispatch(action);
  // },
})

export default withRouter(connect(null, mapDispatch)(Oper));
