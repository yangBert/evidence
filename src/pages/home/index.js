import React, { Component } from 'react';
import { Line, Radar, Waterfall, Pie } from '@antv/g2plot';
import styles from './style.module.css';

function plot1() {
  const data = [
    { year: '第一季度', value: 50 },
    { year: '第二季度', value: 55 },
    { year: '第三季度', value: 60 },
    { year: '第四季度', value: 90 },
  ];

  const linePlot = new Line(document.getElementById('plot1'), {
    title: {
      visible: false,
      text: '2019年统计',
    },
    description: {
      visible: true,
    },
    forceFit: true,
    padding: 'auto',
    data,
    //theme: 'dark',
    xField: 'year',
    yField: 'value',
    point: {
      visible: true,
    },
    label: {
      visible: true,
      type: 'point',
    },
  });

  linePlot.render();
}

function plot2() {
  const data = [
    {
      item: '第四季度',
      score: 90,
    },
    {
      item: '第二季度',
      score: 55,
    },
    {
      item: '第三季度',
      score: 60,
    },

    {
      item: '第一季度',
      score: 50,
    },
  ];
  const radarPlot = new Radar(document.getElementById('plot2'), {
    title: {
      visible: false,
      text: '2019年统计',
    },
    data,
    angleField: 'item',
    radiusField: 'score',
    radiusAxis: {
      gridType: 'arc',
      gridAlternateColor: 'rgba(0, 0, 0, 0.04)',
    },
    area: {
      visible: false,
    },
    point: {
      visible: true,
    },
  });
  radarPlot.render();

}

function plot3() {
  const data = [
    { type: '第一季度', money: 120 },
    { type: '第二季度', money: 900 },
    { type: '第三季度', money: 200 },
    { type: '第四季度', money: 300 },
  ];
  const waterfallPlot = new Waterfall(document.getElementById('plot3'), {
    title: {
      visible: false,
      text: '2019年统计',
    },
    forceFit: true,
    data,
    padding: 'auto',
    data,
    xField: 'type',
    yField: 'money',
    meta: {
      type: {
        alias: '类别',
      },
      money: {
        alias: '金额',
      },
    },
  });

  waterfallPlot.render();
}

function plot4() {
  const data = [
    {
      type: '第1季度',
      value: 10,
    },
    {
      type: '第2季度',
      value: 20,
    },
    {
      type: '第3季度',
      value: 40,
    },
    {
      type: '第4季度',
      value: 30,
    }
  ];

  const piePlot = new Pie(document.getElementById('plot4'), {
    forceFit: true,
    title: {
      visible: false,
      text: '2019年统计',
    },
    description: {
      visible: true,
      // text:
      //   '当把饼图label的类型设置为spider时，标签分为两组，在图表两侧拉线对齐显示。一般来说，蜘蛛布局的label更不容易相互遮挡。',

    },
    radius: 0.8,
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      visible: true,
      type: 'spider',
    },
  });

  piePlot.render();
}


class Home extends Component {

  componentDidMount() {
    plot1()
    plot2()
    plot3()
    plot4()
  }

  render() {
    return (
      <div style={{ "paddingBottom": "200px" }}>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot1"></div>
        </div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot2"></div>
        </div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot3"></div>
        </div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot4"></div>
        </div>
      </div>
    )
  }
}

export default Home;