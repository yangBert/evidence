import React, { useState } from 'react';
import { Select, Input, Form, Button, Card, InputNumber, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';

const { Option } = Select;
const { TextArea } = Input;

function Sig(props) {
  const [pdf, setPdf] = useState(null)
  const [userType, setUserType] = useState("")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [hash, setHash] = useState("")
  const [page, setPage] = useState("")
  const [CN, setCN] = useState("")
  const [OU, setOU] = useState("")
  const [S, setS] = useState("")
  const [O, setO] = useState("")
  const [L, setL] = useState("")

  function save() {
    if (userType === "") {
      message.error('请选择用户类型');
      return
    } else if (x === "") {
      message.error('请输入x坐标');
      return
    } else if (y === "") {
      message.error('请输入y坐标');
      return
    } else if (page === "") {
      message.error('请输入页数');
      return
    } else if ($$.trim(CN) === "") {
      message.error('请输入CN名称');
      return
    } else if (pdf === null) {
      message.error('请选择pdf文件');
      return
    } else if (pdf.size >= 50 * 1024 * 1024) {
      message.error('pdf文件大小不能大于50M');
      return
    }

    const data = new FormData();
    let tag = {
      Dn: {
        CN,
        OU,
        S,
        O,
        L
      },
      userType,
      x,
      y,
      page,
      hash
    };
    tag = JSON.stringify(tag);
    data.append("pdf", pdf);
    data.append("tag", tag);
    console.log("tag", tag)
    props.sigSave({
      props,
      data
    });
  }

  return (
    <div className={styles.pageContet}>
      <div className="pageContentColor">
        <Card title="PDF签章" bordered={false}>
          <Form className={`${styles.form} clearfix`}>

            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">
                <span className={styles.must}>*</span>
                用户类型：
              </label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={userType}
                  style={{ width: "100%" }}
                  onChange={value => setUserType(value)}
                >
                  <Option value={9527}>请选择</Option>
                  <Option value={0}>管理员</Option>
                  <Option value={1}>普通操作员</Option>
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">
                <span className={styles.must}>*</span>
                X坐标：
              </label>
              <div className={`${styles.inline} pullLeft`}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                  step={5}
                  className={styles.text}
                  placeholder="请输入X坐标"
                  onChange={value => setX(value)}
                  value={x}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">
                <span className={styles.must}>*</span>
                Y坐标：
                </label>
              <div className={`${styles.inline} pullLeft`}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                  step={5}
                  className={styles.text}
                  placeholder="请输入Y坐标"
                  onChange={value => setY(value)}
                  value={y}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">
                <span className={styles.must}>*</span>
                第几页：
              </label>
              <div className={`${styles.inline} pullLeft`}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                  step={5}
                  className={styles.text}
                  placeholder="请输入Y坐标"
                  onChange={value => setPage(value)}
                  value={page}
                />
              </div>
            </div>

            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">
                <span className={styles.must}>*</span>
                CN名称：
              </label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  className={styles.text}
                  placeholder="请输入CN名称"
                  onChange={e => setCN(e.target.value)}
                  value={CN}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">部门：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  className={styles.text}
                  placeholder="请输入部门"
                  onChange={e => setOU(e.target.value)}
                  value={OU}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">机构：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  className={styles.text}
                  placeholder="请输入机构"
                  onChange={e => setO(e.target.value)}
                  value={O}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">省份：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  className={styles.text}
                  placeholder="请输入省"
                  onChange={e => setS(e.target.value)}
                  value={S}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">城市：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  className={styles.text}
                  placeholder="请输入城市"
                  onChange={e => setL(e.target.value)}
                  value={L}
                />
              </div>
            </div>

            <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">hash值：</label>
              <div className={`${styles.inline} pullLeft`}>
                <TextArea
                  rows={2}
                  placeholder="hash值"
                  onChange={e => setHash(e.target.value)}
                  value={hash}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">
                <span className={styles.must}>*</span>
                上传pdf：
                </label>
              <div className={`${styles.inline} pullLeft`}>
                <input accept=".pdf" type="file" onChange={e => setPdf(e.target.files[0])} />
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
          onClick={() => save()}
          loading={props.sigSaveLoading}
        >开始签章</Button>
        <Button
          size="large"
          type="primary"
          className={styles.formbtn}
          onClick={() => props.history.goBack()}
        >返回列表</Button>
      </div>
    </div>
  )
}

const mapState = state => ({
  sigSaveLoading: state.pdf.sigSaveLoading,
})

const mapDispatch = dispatch => ({
  sigSave: req => {
    const action = creators.sigSaveAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Sig);