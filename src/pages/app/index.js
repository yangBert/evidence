import React, { Component } from 'react';
import { Table, Spin, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from './store/creators';
import Add from './components/Add';
import styles from './css/UserList.module.css';
import $$ from 'static/js/base';
import Oper from './components/Operation';

const columns = [
  { title: '应用appkey', dataIndex: 'appID', key: 'appID', align: 'center' },

  {
    title: '应用密钥', dataIndex: 'key', key: 'key', align: 'center'
  },
  {
    title: '创建时间', dataIndex: 'time', key: 'time', align: 'center',
    render: time => (
      <span>{time && $$.getHours(time)}</span>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
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
          <Add />
          {/* <SearchForm /> */}
          <div className={styles.buttonForm}>
            <Button
              type="primary"
              className={styles.addButton}
              onClick={() => this.props.changeModal(true)}
            ><Icon type="plus" />新增</Button>
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
  list: state.app.list,
  pagination: state.app.pagination,
  spinning: state.app.spinning,
  params: state.app.params,
  visible: state.app.visible,
})

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeModal: req => {
    const action = creators.changeModalAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(List);