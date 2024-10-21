import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { checkDateTypeKey } from "../../utils/arrayUtils";
import { convertTimeToDate } from "../../utils/dateUtils";
import { DrawerSide } from "../../components/Drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { getDeviceById, loadStatus } from "../../redux/reducer/deviceSlice";
import { Divider, Table } from "antd";
import { convertDeviceStatusToString } from "../../constants";
import { useTranslation } from "react-i18next";

const DeviceDetailComponent = (props, ref) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [idSelect, setIdSelect] = useState("");
  const { t } = useTranslation();

  const { deviceData, loadDeviceDataStatus } = useSelector(
    (state) => state.device
  );
  const handleConnectionData = (data) => {
    if (data) {
      return data.map((item, index) => {
        return { ...item, delay: index % 2 === 0 ? "2ms" : "1ms" };
      });
    }
  };
  const handleData = (data) => {
    const deviceData = {
      ...data,
      status: convertDeviceStatusToString(data.status),
      connection: handleConnectionData(data.connection),
    };

    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        deviceData[key] = convertTimeToDate(data[key]);
      }
    });

    return deviceData;
  };

  useImperativeHandle(ref, () => ({
    open: (id) => {
      setIsOpen(true);
      if (id !== idSelect) {
        setIdSelect(id);
        dispatch(getDeviceById(id));
      }
    },
  }));

  useEffect(() => {
    if (loadDeviceDataStatus === loadStatus.Success) {
      const rawData = deviceData.metadata;
      setData(handleData(rawData));
    }
  }, [loadDeviceDataStatus]);

  const labelsInfo = {
    device_name: t("column.device-name"),
    device_type: t("column.device-type"),
    frequency: t("column.frequency"),
    storage: t("column.storage"),
    connection: t("column.connection"),
    recordCount: t("label.record-count"),
    status: t("column.status"),
    start_date: t("column.date-started")
  };

  const frequencyColumns = [
    {
      title: t("label.device-info"),
      dataIndex: "information",
      key: "information",
    },
    {
      title: t("label.sampling-frequency"),
      dataIndex: "value",
      key: "value",
    },
    {
      title: t("label.sensor"),
      dataIndex: "detail_name",
      key: "detail_name",
    },
  ];

  const storageColumns = [
    {
      title: t("label.device-info"),
      dataIndex: "information",
      key: "information",
    },
    {
      title: t("label.capacity"),
      dataIndex: "value",
      key: "value",
    },
    {
      title: t("column.storage"),
      dataIndex: "detail_name",
      key: "detail_name",
    },
  ];
  const connectionColumns = [
    {
      title: "Tần số kết nối (Hz)",
      dataIndex: "value",
      key: "value",
    },
    {
      title: t("column.connection"),
      dataIndex: "detail_name",
      key: "detail_name",
    },
    { 
      title: t("label.delay"), 
      dataIndex: "delay", 
      key: "delay" 
    },
    {
      title: t("label.note"),
      dataIndex: "information",
      key: "information",
    },
  ];
  const customDetail = {
    frequency: (
      <Table
        columns={frequencyColumns}
        dataSource={data.frequency}
        pagination={false}
      />
    ),
    storage: (
      <Table
        columns={storageColumns}
        dataSource={data.storage}
        pagination={false}
      />
    ),
    connection: (
      <Table
        columns={connectionColumns}
        dataSource={data.connection}
        pagination={false}
      />
    ),
  };

  const customData = (
    <>
      <p className="site-description-item-profile-p">Thông tin cụ thể</p>
      <p className="site-description-item-profile-wrapper">
        {data?.information}
      </p>
      <Divider />
    </>
  );

  return (
    <>
      <DrawerSide
        closed={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Thông tin thiết bị"
        data={data}
        labels={labelsInfo}
        customData={customData}
        customDetail={customDetail}
      />
    </>
  );
};

export const DeviceDetail = forwardRef(DeviceDetailComponent);
