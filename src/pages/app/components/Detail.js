import React from 'react';
import { Card, Descriptions, Button } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';

function Detail(props) {
  if (props.location.state.record) {
    var {
      appID,
      key,
      time
    } = props.location.state.record;
  }
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="应用详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="应用ID">{appID}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="最后登录时间">{$$.getHours(time)}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="应用密钥">{key}</Descriptions.Item>
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