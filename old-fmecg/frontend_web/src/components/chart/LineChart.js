// LineChart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistic, loadStatus } from '../../redux/reducer/statisticSlice';
import ReactApexChart from 'react-apexcharts';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';

function LineChart() {
  const dispatch = useDispatch();
  const { data, loadDataStatus } = useSelector((state) => state.statistic);
  const { Title } = Typography;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  const lineChart = {
    series: [
      {
        name: 'Record Count',
        data: data.countNewRecordInMonth?.map((record) => record.record_count) || [],
      },
    ],
    options: {
      chart: {
        width: '100%',
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 600,
            colors: ['#8c8c8c'],
          },
        },
      },
      xaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 600,
            colors: ['#8c8c8c'],
          },
        },
        categories: data.countNewRecordInMonth?.map((record) => `Month ${record.month}`) || [],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>{t('homepage.number-of-new-recordings')}</Title>
        </div>
      </div>
      {loadDataStatus === loadStatus.Loading ? (
        <p>Loading...</p>
      ) : (
        <ReactApexChart
          className="full-width"
          options={lineChart.options}
          series={lineChart.series}
          type="area"
          height={350}
          width={'600px'}
        />
      )}
    </>
  );
}

export default LineChart;
