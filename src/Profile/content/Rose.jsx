import React, { useState, useEffect , memo} from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

const DemoBar = () => {
  const data = [
    {
      label: 'Mon.',
      type: 'TV show',
      value: 2800,
    },
    {
      label: 'Mon.',
      type: 'film,movie',
      value: 2260,
    },
    {
      label: 'Tues.',
      type: 'TV show',
      value: 1800,
    },
    {
      label: 'Tues.',
      type: 'film,movie',
      value: 1300,
    },
    {
      label: 'Wed.',
      type: 'TV show',
      value: 950,
    },
    {
      label: 'Wed.',
      type: 'film,movie',
      value: 900,
    },
    {
      label: 'Thur.',
      type: 'TV show',
      value: 500,
    },
    {
      label: 'Thur.',
      type: 'film,movie',
      value: 390,
    },
    {
      label: 'Fri.',
      type: 'TV show',
      value: 170,
    },
    {
      label: 'Fri.',
      type: 'film,movie',
      value: 100,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'value',
    yField: 'label',
    seriesField: 'type',
    dodgePadding: 4,
    intervalPadding: 20,
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },{
          type: 'interval-hide-overlap',
        },{
          type: 'adjust-color',
        },
      ],
    },
  };
  return <Bar {...config} />;
};

export default memo(DemoBar)