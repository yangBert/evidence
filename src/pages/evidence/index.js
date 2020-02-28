import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import SearchForm from './components/SearchForm';
import styles from './css/UserList.module.css';

import $$ from 'static/js/base';
import Oper from './components/Operation';

const columns = [
  { title: '应用appkey', dataIndex: 'appID', key: 'appID', align: 'center' },
  { title: '存证ID', dataIndex: 'id', key: 'id', align: 'center' },
  {
    title: '创建时间', dataIndex: 'time', key: 'time', align: 'center',
    render: createdAt => (
      <span>{createdAt && $$.getHours(createdAt)}</span>
    )
  },
  {
    title: '文件大小', dataIndex: 'fileSize', key: 'fileSize', align: 'center',
    render: fileSize => (
      <span>{fileSize ? fileSize + "KB" : ""}</span>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    render: (text, record) => <Oper text={text} record={record} />,
  },
];

class List extends Component {
  componentDidMount() {
    this.sendFn(1, 10)
  }

  paginationChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  paginationShowSizeChange = (pageNo, pageSize) => {
    this.sendFn(pageNo, pageSize)
  }

  sendFn(pageNo, pageSize) {
    //const params = this.props.params
    const data = { pageNo, pageSize }
    this.props.querylist({ props: this.props, data });
  }

  render() {
    const list = this.props.list
    const pagination = {
      ...this.props.pagination,
      onChange: this.paginationChange,
      onShowSizeChange: this.paginationShowSizeChange,
    }

    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <SearchForm />
          <Table
            bordered
            columns={columns}
            dataSource={list}
            rowKey={(record, index) => index}
            size="small"
            pagination={pagination}
            rowClassName={styles.table}
          />
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  list: state.evidence.list,
  pagination: state.evidence.pagination,
  spinning: state.evidence.spinning,
  params: state.evidence.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);