import React, { Component } from 'react';
import { Input, Button, message, Select, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';
import { withRouter } from 'react-router-dom';

const { Option } = Select;

class Account extends Component {

  save() {
    let { name, password, rePassword } = this.props;
    let type = this.props.userType
    console.log(name, password, rePassword, type)
    name = $$.trim(name)
    password = $$.trim(password)
    rePassword = $$.trim(rePassword)

    if (name === "") {
      message.error('请输入用户名');
      return
    } else if (type === "") {
      message.error('请选择用户类型');
      return
    } else if (password === "") {
      message.error('请输入密码');
      return
    } else if (rePassword === "") {
      message.error('请再次输入密码');
      return
    }
    if (password !== rePassword) {
      message.error('俩次输入的密码不一致，请重新输入！！');
      return
    }
    const data = {
      name,
      type,
      password,
    }
    this.props.save({ data, props: this.props })
  }

  render() {
    return (
      <Form className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">用户名：</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              className={styles.text}
              placeholder="请输入用户名"
              onChange={e => this.props.setName(e.target.value)}
              value={this.props.name}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">用户类型：</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={this.props.userType} style={{ width: "100%" }} onChange={value => this.props.setType(value)}>
              <Option value={9527}>请选择</Option>
              <Option value={0}>管理员</Option>
              <Option value={1}>普通操作员</Option>
            </Select>
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">请输入密码：</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              className={styles.text}
              placeholder="请输入密码"
              onChange={e => this.props.setPassword(e.target.value)}
              value={this.props.password}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">请再次输入密码：</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              className={styles.text}
              placeholder="请再次输入密码"
              onChange={e => this.props.setRePassword(e.target.value)}
              value={this.props.rePassword}
            />
          </div>
        </div>
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
      </Form>
    )
  }
}

const mapState = state => ({
  name: state.user.name,
  userType: state.user.userType,
  password: state.user.password,
  rePassword: state.user.rePassword,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  setName: value => {
    const action = creators.setNameAction(value);
    dispatch(action);
  },
  setType: value => {
    const action = creators.setTypeAction(value);
    dispatch(action);
  },
  setPassword: value => {
    const action = creators.setPasswordAction(value);
    dispatch(action);
  },
  setRePassword: value => {
    const action = creators.setRePasswordAction(value);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(Account));