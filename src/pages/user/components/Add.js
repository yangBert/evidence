import React, { Component } from 'react';
import { Spin, message, Card, Tabs } from 'antd';
import { connect } from 'react-redux';
import styles from '../css/add.module.css';
import Account from './Account';
import UKey from './UKey';
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class Add extends Component {
  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="新增用户" bordered={false}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="UKEY用户" key="1" className={styles.tabpane}>
                  <UKey />
                </TabPane>
                <TabPane tab="账号密码用户" key="2" className={styles.tabpane}>
                  <Account />
                </TabPane>
              </Tabs>
            </Card>
          </div >
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  spinning: state.user.spinning,
})

export default connect(mapState, null)(Add);