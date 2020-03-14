import React from 'react';
import { Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import * as requestURL from 'static/js/requestURL';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
      ><a href={requestURL.evidenceGetFile + "/" + props.record.fileID} download={props.record.fileID}>下载</a></Button>
      <Link
        to={{
          pathname: "/file/detail",
          state: { record: props.record }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >详情</Button>
      </Link>
    </div >
  )
}

export default withRouter(Oper);
