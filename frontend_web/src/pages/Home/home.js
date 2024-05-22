import React from 'react';
import { Card, Row, Col } from 'antd';
import { UserOutlined, MobileOutlined, DatabaseOutlined } from '@ant-design/icons';
import './home.scss';
import { useSelector } from 'react-redux';

const Home = () => {
  const { deviceCount } = useSelector(state => state.homeData);
  return (
    <div className="home-page">
      <h2 className="page-title">Welcome to the website</h2>
      <div className="statistics-boxes">
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <div className="icon-container">
                <UserOutlined className="icon" />
              </div>
              <h3> { deviceCount } </h3>
              <p>Users</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <div className="icon-container">
                <MobileOutlined className="icon" />
              </div>
              <h3>1,234</h3>
              <p>Devices</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <div className="icon-container">
                <DatabaseOutlined className="icon" />
              </div>
              <h3>9,876</h3>
              <p>Records</p>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;