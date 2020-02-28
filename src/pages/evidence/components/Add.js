import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form, Select, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import spinningAction from 'pages/common/layer/spinning';
import sm3 from 'sm3';
import tools from 'static/js/tools';

const { TextArea } = Input;
const { Option } = Select;

var hashFile = null
class Add extends Component {

  componentDidMount() {
    hashFile = document.getElementById("hash-file-hidden")
    hashFile.onchange = e => {
      const file = hashFile.files[0]
      this.props.changeFileName(file.name)
      this.props.changeFileSize(file.size)
      this.props.changePageLoading(true)
      tools.reads(file, base64url => {
        this.props.changePageLoading(false)
        this.props.changeFileHash(sm3(base64url))
      });

    }
  }

  save() {
    const { appkey, fileName, fileSize, fileHash } = this.props;
    if (appkey === "") {
      message.error('请选择appkey');
      return
    } else if (fileName === "") {
      message.error('请上传文件');
      return
    } else if (fileHash === "") {
      message.error('请上传文件');
      return
    }
    const req = {
      props: this.props,
      data: {
        appID: appkey,
        fileName,
        fileHash,
        fileSize,
      }
    }

    this.props.save(req)
  }

  handleClick() {
    hashFile.click()
  }

  fetchAppkey = value => {
    this.props.queryFetchAppkey({
      props: this.props,
      data: { appIDs: value }
    })
  };

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="新增存证信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">应用appkey：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      showSearch
                      value={this.props.appkey}
                      placeholder="应用appkey"
                      notFoundContent={this.props.fetching ? <Spin size="small" /> : null}
                      filterOption={false}
                      onSearch={this.fetchAppkey}
                      onChange={value => this.props.onChangeAppkey(value)}
                      style={{ width: '100%' }}
                    >
                      {
                        this.props.appList.map(item => (
                          <Option key={item.appID} value={item.appID}>{item.appID}</Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">选择文件：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Button onClick={this.handleClick}>
                      <input type="file" style={{ display: "none" }} id="hash-file-hidden" />
                      <Icon type="upload" /> 选择文件
                    </Button>
                  </div>
                </div>
                <div className={`${styles.formBlock} pullLeft`}><label className="pullLeft">文件摘要：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TextArea
                      className={styles.text}
                      value={this.props.fileHash}
                      onChange={e => this.props.changeFileHash(e.target.value)}
                      rows={4} />
                  </div>
                </div>
              </Form>
            </Card>
          </div >

          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.formbtn}
              onClick={() => this.save()}
              loading={this.props.saveLoading}
            >保存</Button>
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
  spinning: state.evidence.spinning,
  fileHash: state.evidence.fileHash,
  fileName: state.evidence.fileName,
  fileSize: state.evidence.fileSize,
  saveLoading: state.evidence.saveLoading,
  fetching: state.evidence.fetching,
  appkey: state.evidence.appkey,
  appList: state.evidence.appList,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  onChangeAppkey: value => {
    const action = creators.onChangeAppkeyAction(value);
    dispatch(action);
  },
  queryFetchAppkey: req => {
    const action = creators.queryFetchAppkeyAction(req);
    dispatch(action);
  },
  changeFileHash: value => {
    const action = creators.changeFileHashAction(value);
    dispatch(action);
  },
  changeFileName: value => {
    const action = creators.changeFileNameAction(value);
    dispatch(action);
  },
  changeFileSize: value => {
    const action = creators.changeFileSizeAction(value);
    dispatch(action);
  },
  changePageLoading: bl => {
    const action = spinningAction(bl)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Add);