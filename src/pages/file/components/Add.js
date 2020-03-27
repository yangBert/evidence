import React, { Component } from 'react';
import { Spin, Button, Card } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';

class Add extends Component {
  state = {
    file: null
  }
  save() {
    const data = new FormData()
    data.append("fileUpload", this.state.file)
    this.props.save({ data, props: this.props })
  }

  fileChange(target) {
    console.log("file", target.files[0])
    this.setState({ file: target.files[0] })
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="新增文件" bordered={false}>
              <input type="file" onChange={e => this.fileChange(e.target)} />
            </Card>
          </div >

          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.formbtn}
              onClick={() => this.save()}
              loading={this.props.saveLoading}
            >开始上传</Button>
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.props.history.goBack()}
            >返回列表</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  spinning: state.user.spinning,
  saveLoading: state.user.saveLoading,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Add);