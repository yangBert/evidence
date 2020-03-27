import React, { Component } from 'react';
import { Table, Spin, Button, Icon, Tabs, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
const { TabPane } = Tabs;
const { confirm } = Modal;
const { TextArea } = Input;

const columns = [
  { title: '用户名', dataIndex: 'name', key: 'name', align: 'center' },
  {
    title: '用户类型', dataIndex: 'type', key: 'type', align: 'center',
    render: type => (
      <span>{type === 0 ? '管理员' : '普通操作员'}</span>
    )
  },
  {
    title: '创建时间', dataIndex: 'time', key: 'time', align: 'center',
    render: time => (
      <span>{time && $$.getHours(time)}</span>
    )
  },
];
const columns2 = [
  { title: '用户名', dataIndex: 'name', key: 'name', align: 'center' },
  {
    title: '用户类型', dataIndex: 'type', key: 'type', align: 'center',
    render: type => (
      <span>{type === 0 ? '管理员' : '普通操作员'}</span>
    )
  },
  {
    title: '创建时间', dataIndex: 'notAfter', key: 'notAfter', align: 'center',
    render: notAfter => (
      <span>{notAfter && $$.getHours(notAfter)}</span>
    )
  },
  {
    title: '签名证书', dataIndex: 'certB64', key: 'certB64', align: 'center',
    render: certB64 => (
      <Button type="primary" size="small" onClick={() => showConfirm(certB64)}>签名证书</Button>
    )
  },
];

function showConfirm(certB64) {
  confirm({
    title: '签名证书',
    content: <TextArea
      style={{ width: "100%" }}
      rows={5}
      value={certB64}
    />,
    onOk() {

    },
    onCancel() { },
  });
}


class List extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
    this.sendFn2(1, 10)
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationChange2 = (pageNo, pageSize) => {
    this.sendFn2(pageNo, pageSize)
  }

  paginationShowSizeChange2 = (pageNo, pageSize) => {
    this.sendFn2(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    const data = { pageNo, pageSize }
    this.props.querylist({ props: this.props, data });
  }

  sendFn2(pageNo, pageSize) {
    const data = { pageNo, pageSize }
    this.props.querylist2({ props: this.props, data });
  }

  render() {
    const list = this.props.list
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }

    const list2 = this.props.list2
    const pagination2 = {
      ...this.props.pagination2,
      onChange: this.paginationChange2,
      onShowSizeChange: this.paginationShowSizeChange2,
    }

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          {/* <SearchForm /> */}
          <div className={styles.buttonForm}>
            <Link to="/user/add">
              <Button
                type="primary"
                className={styles.addButton}
              ><Icon type="plus" />新增</Button>
            </Link>
          </div>
          <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="UKEY用户" key="1" className={styles.tabpane}>
              <Table
                columns={columns2}
                dataSource={list2}
                rowKey={(record, index) => index}
                pagination={pagination2}
                rowClassName={styles.table}
              />
            </TabPane>
            <TabPane tab="账号密码用户" key="2" className={styles.tabpane}>
              <Table
                columns={columns}
                dataSource={list}
                rowKey={(record, index) => index}
                pagination={pagination}
                rowClassName={styles.table}
              />
            </TabPane>
          </Tabs>

        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.user.list,
  list2: state.user.list2,
  pagination: state.user.pagination,
  pagination2: state.user.pagination2,
  spinning: state.user.spinning,
  params: state.user.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  querylist2: req => {
    const action = creators.queryList2Action(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);