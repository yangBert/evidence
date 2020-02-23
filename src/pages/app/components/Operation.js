import React from 'react';
import { Button, Switch } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { withRouter, Link } from 'react-router-dom';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
      >修改</Button>
    </div >
  )
}

const mapDispatch = dispatch => ({
  changeModal: req => {
    const action = creators.changeModalAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(null, mapDispatch)(Oper));
