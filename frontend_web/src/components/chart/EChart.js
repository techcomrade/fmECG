import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import './chart.scss'
import { useTranslation } from "react-i18next";
function EChart() {
  const { Title, Paragraph } = Typography;
  const { t, i18n } = useTranslation();
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
        <Title level={5}>{t("homepage.number-of-users-are-using")}</Title>
        {/* <Paragraph className="lastweek">
          than last week <span className="bnb2">+30%</span>
        </Paragraph> */}
        <Paragraph className="lastweek">
            {t("homepage.paragraph")}
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
