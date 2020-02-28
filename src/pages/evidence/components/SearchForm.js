import React, { useState, useEffect } from 'react';
import { Button, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [startTimeString, setStartTimeString] = useState(null)
  const [endTimeString, setEndTimeString] = useState(null)

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      startTimeString,
      endTimeString,
    })
  }, [
    startTimeString,
    endTimeString,
    changeSearchParams
  ]);


  function search() {
    const data = {
      startTime: props.params.startTimeString,
      endTime: props.params.endTimeString,
    }
    console.log("data=====>", data.startTime, data.endTime)
    props.querylist({ props, data });
  }

  function onChange(date, dateString) {
    console.log(date, dateString);
    setStartTimeString(dateString[0])
    setEndTimeString(dateString[1])
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">日期:</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                style={{ "width": "100%" }}
                //showTime
                onChange={onChange}
              />
            </div>
          </div>&nbsp;&nbsp;
          <Button onClick={() => search()} type="primary">
            <Icon type="search" />查询
          </Button>&nbsp;&nbsp;
          <Link to="/evidence/add">
            <Button
              type="primary"
              className={styles.addButton}
            ><Icon type="plus" />新增</Button>
          </Link>
        </div>

      </div>
    </div >
  )
}

const mapState = state => ({
  params: state.evidence.params,
  spinning: state.evidence.spinning,
})

const mapDispatch = dispatch => ({

  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
