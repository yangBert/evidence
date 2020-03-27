import React, { useState } from 'react';
import { Form, Button, Card, message, Tag, Divider, Input } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import stylesdetail from '../css/detail.module.css';
const { TextArea } = Input;

function Sig(props) {
  const [pdf, setPdf] = useState(null)
  function save() {
    if (pdf.size >= 50 * 1024 * 1024) {
      message.error('pdf文件大小不能大于50M');
      return
    }

    const data = new FormData();
    data.append("pdf", pdf);
    props.verSave({
      props,
      data
    })
  }

  return (
    <div className={styles.pageContet}>
      <div className="pageContentColor">
        <Card title="PDF验签" bordered={false}>
          <Form className={`${styles.form} clearfix`}>
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
        {
          props.results.map((item, index) => (
            <div key={index}>
              <Divider />
              <Card title="验签结果" bordered={false}>
                <div style={{ paddingLeft: "5%" }}>


                  {
                    item.reason ?
                      <div className={stylesdetail.itemrow}>
                        <p>摘要值：</p>
                        <div>
                          {item.reason}
                        </div>
                      </div> : ""
                  }
                  {
                    item.cerB64 ?
                      <div className={stylesdetail.itemrow}>
                        <p>base64：</p>
                        <div>
                          <TextArea
                            style={{ width: "50%" }}
                            rows={5}
                            value={item.cerB64}
                          />
                        </div>
                      </div> : ""
                  }
                  {
                    item.signingTime ?
                      <div className={stylesdetail.itemrow}>
                        <p>签名时间：</p>
                        <div>
                          {item.signingTime}
                        </div>
                      </div> : ""
                  }
                  {
                    item.modified ?
                      <div className={stylesdetail.itemrow}>
                        <p>修改时间：</p>
                        <div>
                          {item.modified}
                        </div>
                      </div> : ""
                  }
                  {
                    item.certificate_valid_at_signing_time ?
                      <div className={stylesdetail.itemrow}>
                        <p>签名证书是否有效：</p>
                        <div>
                          {item.certificate_valid_at_signing_time ? <Tag color="green">有效</Tag> : <Tag color="red">无效</Tag>}
                        </div>
                      </div> : ""
                  }
                  <div className={stylesdetail.itemrow}>
                    <p>验证结果：</p>
                    <div>
                      {item.verfy ? <Tag color="green">成功</Tag> : <Tag color="red">失败</Tag>}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))
        }

      </div >

      <div className={styles.formButton}>
        <Button
          type="primary"
          size="large"
          className={styles.formbtn}
          onClick={() => save()}
          loading={props.sigSaveLoading}
        >开始验签</Button>
        <Button
          size="large"
          type="primary"
          className={styles.formbtn}
          onClick={() => props.history.goBack()}
        >返回列表</Button>
      </div>
    </div >
  )
}

const mapState = state => ({
  sigSaveLoading: state.pdf.sigSaveLoading,
  results: state.pdf.results,
})

const mapDispatch = dispatch => ({
  verSave: req => {
    const action = creators.verSaveAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Sig);