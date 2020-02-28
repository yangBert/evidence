import React from 'react';
import { Card, Descriptions, Button } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';

function Detail(props) {
  if (props.location.state.record) {
    var {
      appID,
      id,
      fileHash,
      fileName,
      fileSize,
      time
    } = props.location.state.record;
  }
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="证据详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="账号">{appID}</Descriptions.Item>
              <Descriptions.Item label="文件名">{fileName}</Descriptions.Item>
              <Descriptions.Item label="文件大小">{fileSize + "kb"}</Descriptions.Item>
              <Descriptions.Item label="最后登录时间">{$$.getHours(time)}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="存证ID">{id}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="文件摘要值">{fileHash}</Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
        <div className={styles.bottom}>
          <Button
            type="primary"
            className={styles.back}
            onClick={() => props.history.goBack()}
            size="large">返回</Button>
        </div>
      </div>
    </div>
  )
}

export default Detail;