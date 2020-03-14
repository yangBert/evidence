import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import styles from './css/UserList.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import Oper from './components/Operation';

const columns = [
  { title: '文件编码', dataIndex: 'id', key: 'id', align: 'center' },
  {
    title: '文件名称', dataIndex: 'fileName', key: 'fileName', align: 'center'
  },
  { title: '上传人', dataIndex: 'userName', key: 'userName', align: 'center' },
  {
    title: '上传时间', dataIndex: 'time', key: 'time', align: 'center',
    render: time => (
      <span>{time && $$.getHours(time)}</span>
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
          {/* <SearchForm /> */}
          <div className={styles.buttonForm}>
            <Link to="/file/add">
              <Button
                type="primary"
                className={styles.addButton}
              ><Icon type="plus" />新增文件</Button>
            </Link>
          </div>
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
  list: state.file.list,
  pagination: state.file.pagination,
  spinning: state.file.spinning,
  params: state.file.params,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);