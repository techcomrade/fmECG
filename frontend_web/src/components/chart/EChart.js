import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import './chart.scss'
function EChart() {
  const { Title, Paragraph } = Typography;

  const items = [
    {
      Title: "12",
      user: "Users",
    },
    {
      Title: "1m",
      user: "Clicks",
    },
    {
      Title: "3",
      user: "Devices",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
          width="400px"
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Số lượng người dùng đang hoạt động</Title>
        {/* <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph> */}
        <Paragraph className="lastweek">
          Tổng hợp số lượng người dùng bao gồm bệnh nhân và bác sĩ và thời gian bắt đầu sủ dụng hệ thống
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
