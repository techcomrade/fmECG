import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Slider } from "antd";
import LineChart from "../LineChart/LineChart";
import { useTranslation } from "react-i18next";
import { SliderSingleProps } from "antd/lib";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setSamples } from "../../redux/reducer/recordSlice";

interface DataPoint {
  value: number;
  warning: number;
}

interface ChartData {
  data: DataPoint[];
}

interface RawData {
  PPG: ChartData;
  PCG: ChartData;
  ECG: ChartData;
  frequency: number;
}

const ModalChartComponent = (props: any, ref: any) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const recordState = useAppSelector((state) => state.record);
  const { t } = useTranslation();

  React.useImperativeHandle(ref, () => ({
    open: (id: string) => {
      setIsOpen(true);
    },
  }));

  const generateFakeData = (): RawData => {
    const frequency = 100;
    const points = 1000;

    const generateRandomArray = (): DataPoint[] =>
      Array.from({ length: points }, () => {
        const value = Math.random() * 2 - 1;
        return {
          value: parseFloat(value.toFixed(2)),
          warning: Math.random() > 0.95 ? 1 : 0,
        };
      });

    return {
      PPG: { data: generateRandomArray().slice(0, recordState.samples) },
      PCG: { data: generateRandomArray().slice(0, recordState.samples) },
      ECG: { data: generateRandomArray().slice(0, recordState.samples) },
      frequency,
    };
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const fakeData = generateFakeData();
        setData(fakeData);
      }, 500);
    }
  }, [isOpen, recordState.samples]);

  const handleCancel = () => {
    setIsOpen(false);
    setData(null);
  };
  const marks: SliderSingleProps["marks"] = {
    100: "100",
    200: "200",
    300: "300",
    400: "400",
    500: "500",
    600: "600",
    700: "700",
    800: "800",
    900: "900",
    1000: "1000",
  };

  return (
    <Modal
      title={props.title}
      open={isOpen}
      onCancel={handleCancel}
      width={1000}
      centered
      footer={null}
    >
      <LineChart rawData={data} />
      <Row gutter={3}>
        <Col span={7} style={{ marginTop: "10px" }}>
          Điều chỉnh số lượng mẫu hiển thị:
        </Col>
        <Col span={17} style={{ marginTop: "6px" }}>
          <Slider
            marks={marks}
            step={100}
            defaultValue={100}
            min={100}
            max={1000}
            onChange={(value) => dispatch(setSamples(value))}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export const ModalChart = React.forwardRef(ModalChartComponent);
