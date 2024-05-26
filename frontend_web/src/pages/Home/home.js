import './home.scss';
import { Card, Statistic, Row, Col } from 'antd';
import { DatabaseOutlined, UserOutlined, MobileOutlined } from '@ant-design/icons';

import { useEffect, useState, useRef } from 'react';
import { getStatistic } from '../../redux/reducer/statisticSlice';
import { httpGetData } from '../../api/common.api';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.statistic);
    const [dropdownData, setDropData] = useState([]);

    useEffect(() => {
        dispatch(getStatistic(dataState));
        const getOptionData = async() => {
            const statisticData = await httpGetData("/statistic");
            setDropData({
                statistic: statisticData.metadata
            }); 
        }
        getOptionData();
    }, []);

  return (
    <>
      <h2 style={{ textAlign: 'center', marginTop: '0' }}>Welcome to the website</h2>
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card
            className="card-hover"
            style={{
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Statistic
              title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Total Records</span>}
              value={dropdownData.statistic?.record_count}
              valueStyle={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<DatabaseOutlined style={{ fontSize: '24px', marginRight: '8px' }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="card-hover"
            style={{
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Statistic
              title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Users</span>}
              value={dropdownData.statistic?.user_count}
              valueStyle={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<UserOutlined style={{ fontSize: '24px', marginRight: '8px' }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="card-hover"
            style={{
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Statistic
              title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>Devices</span>}
              value={dropdownData.statistic?.device_count}
              valueStyle={{ color: '#000000', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<MobileOutlined style={{ fontSize: '24px', marginRight: '8px' }} />}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;