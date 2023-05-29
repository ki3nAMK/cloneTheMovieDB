import React, { useState, useEffect , memo} from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const DemoPie = () => {
  const data = [
    {
      type: 'Action',
      value: 27,
    },
    {
      type: 'Adventure',
      value: 25,
    },
    {
      type: 'Animation',
      value: 18,
    },
    {
      type: 'Comedy',
      value: 15,
    },
    {
      type: 'Crime',
      value: 10,
    },
    {
      type: 'Documentary',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    startAngle: Math.PI,
    endAngle: Math.PI * 1.5,
    label: {
      type: 'inner',
      offset: '-8%',
      content: '{name}',
      style: {
        fontSize: 18,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    pieStyle: {
      lineWidth: 0,
    },
  };
  return <Pie {...config} />;
};



export default memo(DemoPie) ;