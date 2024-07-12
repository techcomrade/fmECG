import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import "./chart.scss";
import { useTranslation } from "react-i18next";

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>{t("homepage.number-of-new-recordings")}</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+20%</span>
          </Paragraph> */}
        </div>
        {/* <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>
        </div> */}
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"600px"}
      />
    </>
  );
}

export default LineChart;
