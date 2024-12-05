import * as React from "react";
import "./home.scss";
import { Card, Row, Col, Typography } from "antd";

import EChart from "../../components/Chart/EChart";
import LineChart from "../../components/Chart/LineChart";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getStatistic } from "../../redux/reducer/statisticSlice";
import { StatisticResponse } from "../../api";
import { ApiLoadingStatus } from "../../utils/loadingStatus";

const profile = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
      fill="#fff"
    />
    <path
      d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
      fill="#fff"
    />
    <path
      d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
      fill="#fff"
    />
    <path
      d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
      fill="#fff"
    />
  </svg>,
];
const heart = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
      fill="#fff"
    />
  </svg>,
];
const cart = [
  <svg
    width="22"
    height="22"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
      fill="#fff"
    />
  </svg>,
];

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { Title } = Typography;
  const { t } = useTranslation();
  const [count, setCount] = React.useState<any>([]);
  const dataState = useAppSelector((state) => state.statistic);
  const [statistic, setStatistic] = React.useState<StatisticResponse>(
    {} as StatisticResponse
  );
  const [dataArray, setDataArray] = React.useState<any>([]);
  const [userArray, setUserArray] = React.useState<any>([]);
  const [recordArray, setRecordArray] = React.useState<any>([]);

  const countData = (array: any[], type: string) => {
    let result: number = 0;

    for (const item of array) {
      result += item[type];
    }
    return result;
  };

  const dataThisMonth = (array: any, type: string): number => {
    const currentMonth = new Date().getMonth() + 1;
    for (const item of array) {
      if (item.month === currentMonth) return item[type];
    }
    return 0;
  };

  const calculatePercentage = (
    array: any[],
    currentMonth: number,
    countField: string
  ) => {
    let length: number = array.length;
    for (let i = 0; i < length; i++) {
      if (array[i].month === currentMonth) {
        if (array[i][countField] > 0 && !array[i - 1]) {
          return "+100%";
        }
        if (array[i - 1] && array[i - 1][countField] !== array[i][countField]) {
          let result = Math.floor(
            ((array[i][countField] - array[i - 1][countField]) * 100) /
              array[i - 1][countField]
          );
          return result > 0 ? `+${result}%` : `${result}%`;
        }
        return "";
      }
      if (array[i].month === currentMonth - 1 && !array[i + 1]) {
        return "-100%";
      }
    }
  };

  const getPersent = (title: string) => {
    const currentMonth = new Date().getMonth() + 1;
    if (title === "doctors") {
      if (Array.isArray(statistic.doctor_array)) {
        return calculatePercentage(
          statistic.doctor_array,
          currentMonth,
          "doctor_count"
        );
      }
    }

    if (title === "patients") {
      if (Array.isArray(statistic.patient_array)) {
        return calculatePercentage(
          statistic.patient_array,
          currentMonth,
          "patient_count"
        );
      }
    }

    if (title === "devices") {
      if (Array.isArray(statistic.device_array)) {
        return calculatePercentage(
          statistic.device_array,
          currentMonth,
          "device_count"
        );
      }
    }

    if (title === "records") {
      if (Array.isArray(statistic.record_array)) {
        return calculatePercentage(
          statistic.record_array,
          currentMonth,
          "record_count"
        );
      }
    }
  };

  React.useEffect(() => {
    dispatch(getStatistic());
  }, []);

  React.useEffect(() => {
    if (dataState.loadGetStatistic === ApiLoadingStatus.Success) {
      console.log(dataState.statistic);
      setStatistic(dataState.statistic);

      let records = dataState.statistic.record_array;
      let recordsResult = new Array(12).fill(0);
      for (let i = 0; i < 11; i++) {
        if (records[i])
          recordsResult[records[i].month - 1] = records[i].record_count;
      }
      setRecordArray([
        {
          name: "Số bản ghi",
          data: recordsResult,
          offsetY: 0,
        },
      ]);

      let doctorsData = new Array();
      let doctors = dataState.statistic.doctor_array;
      let doctorsResult = new Array(12).fill(0);
      for (let i = 0; i < 11; i++) {
        if (doctors[i])
          doctorsResult[doctors[i].month - 1] = doctors[i].doctor_count;
      }
      for (let i = 0; i <= 11; i++) {
        let totalDoctors = doctorsResult[i];
        for (let j = 0; j < i; j++) {
          totalDoctors = totalDoctors + doctorsResult[j];
        }
        doctorsData.push(totalDoctors);
      }

      let patientsData = new Array();
      let patients = dataState.statistic.patient_array;
      let patientsResult = new Array(12).fill(0);
      for (let i = 0; i < 11; i++) {
        if (patients[i])
          patientsResult[patients[i].month - 1] = patients[i].patient_count;
      }
      for (let i = 0; i <= 11; i++) {
        let totalPatients = patientsResult[i];
        for (let j = 0; j < i; j++) {
          totalPatients = totalPatients + patientsResult[j];
        }
        patientsData.push(totalPatients);
      }

      setUserArray([
        {
          name: "Bác sĩ",
          data: doctorsData,
          color: "#00D1B2",
        },
        {
          name: "Bệnh nhân",
          data: patientsData,
          color: "#FFA500",
        },
      ]);

      setDataArray([
        {
          Title: countData(dataState.statistic.patient_array, "patient_count"),
          user: "Bệnh nhân",
        },
        {
          Title: countData(dataState.statistic.doctor_array, "doctor_count"),
          user: "Bác sĩ",
        },
        {
          Title: countData(dataState.statistic.device_array, "device_count"),
          user: "Thiết bị",
        },
        {
          Title: countData(dataState.statistic.record_array, "record_count"),
          user: "Bản ghi",
        },
      ]);
    }
  }, [dataState.loadGetStatistic]);

  React.useEffect(() => {
    if (dataState.loadGetStatistic === ApiLoadingStatus.Success) {
      const updatedCount = [
        {
          today: "Bác sĩ",
          title: Array.isArray(statistic.doctor_array)
            ? dataThisMonth(statistic.doctor_array, "doctor_count")
            : 0,
          persent: getPersent("doctors"),
          icon: profile,
          bnb: getPersent("doctors")?.startsWith("-") ? "redtext" : "bnb2",
        },
        {
          today: "Bệnh nhân",
          title: Array.isArray(statistic.patient_array)
            ? dataThisMonth(statistic.patient_array, "patient_count")
            : 0,
          persent: getPersent("patients"),
          icon: profile,
          bnb: getPersent("patients")?.startsWith("-") ? "redtext" : "bnb2",
        },
        {
          today: "Số thiết bị",
          title: Array.isArray(statistic.device_array)
            ? dataThisMonth(statistic.device_array, "device_count")
            : 0,
          persent: getPersent("devices"),
          icon: heart,
          bnb: getPersent("devices")?.startsWith("-") ? "redtext" : "bnb2",
        },
        {
          today: "Số bản ghi",
          title: Array.isArray(statistic.record_array)
            ? dataThisMonth(statistic.record_array, "record_count")
            : 0,
          persent: getPersent("records"),
          icon: cart,
          bnb: getPersent("records")?.startsWith("-") ? "redtext" : "bnb2",
        },
      ];
      setCount(updatedCount);
    }
  }, [dataState, t]);

  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c: any, index: any) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <EChart userArray={userArray} dataArray={dataArray} />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart recordArray={recordArray} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
