import React from "react";
import { Card, Descriptions, Button } from "antd";
import styles from "../css/detail.module.css";
import $$ from "static/js/base";

function Detail(props) {
  const {
    id,
    fileName,
    userName,
    time,
    fileSize,
    fileID
  } = props.location.state.record;
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="文件编码">
                {id}
              </Descriptions.Item>
              <Descriptions.Item label="文件名称">
                {fileName}
              </Descriptions.Item>
              <Descriptions.Item label="上传人">
                {userName}
              </Descriptions.Item>
              <Descriptions.Item label="上传时间">
                {time && $$.getHours(time)}
              </Descriptions.Item>
              <Descriptions.Item label="文件大小">
                {fileSize}KB
              </Descriptions.Item>
              <Descriptions.Item label="文件下载编码">
                {fileID}
              </Descriptions.Item>

            </Descriptions>
          </Card>
        </div>
        <div className={styles.bottom}>
          <Button
            type="primary"
            className={styles.back}
            onClick={() => props.history.goBack()}
            size="large"
          >
            返回
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
