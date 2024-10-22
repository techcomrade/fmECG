import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { DrawerSide } from "../../components/Drawer/Drawer";
import { getDeviceById } from "../../redux/reducer/deviceSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { convertTimeToDate } from "../../utils/dateUtils";
import {
  convertDeviceTypeToString,
  convertDeviceStatusToString,
} from "../../constants";

const DeviceDetailComponent = (props: any, ref: any) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>([]);
  const [idSelect, setIdSelect] = React.useState<string>("");
  const { t } = useTranslation();
  const dataState = useAppSelector((state) => state.device);

  React.useImperativeHandle(ref, () => ({
    open: (id: string) => {
      setIsOpen(true);
      if (id !== idSelect) {
        setIdSelect(id);
        dispatch(getDeviceById(id));
      }
    },
  }));

  React.useEffect(() => {
    if (dataState.loadGetDeviceByIdStatus === ApiLoadingStatus.Success) {
      const rawData = {
        ...dataState.deviceData,
        device_type_id: convertDeviceTypeToString(dataState.deviceData.device_type_id),
        status_id: convertDeviceStatusToString(dataState.deviceData.status_id),
        start_date: convertTimeToDate(dataState.deviceData.start_date),
      };
      setData(rawData);
    }
  }, [dataState.loadGetDeviceByIdStatus]);

  const labelsInfo = {
    doctor_name: "Bác sĩ phụ trách",
    device_name: "Tên thiết bị",
    device_type_id: "Loại thiết bị",
    information: "Thông tin",
    status_id: "Trạng thái",
    start_date: "Ngày bắt đầu",
  };

  const customData = (
    <>
      <Avatar size={60} icon={<UserOutlined />} />
      <p className="site-description-item-profile-p">Thông tin cụ thể</p>
      <p className="site-description-item-profile-wrapper"></p>
      <Divider />
    </>
  );

  return (
    <>
      <DrawerSide
        closed={() => setIsOpen(false)}
        isOpen={isOpen}
        title="Thông tin chi tiết thiết bị"
        data={data}
        labels={labelsInfo}
        customData={customData}
      />
    </>
  );
};

export const DeviceDetail = React.forwardRef(DeviceDetailComponent);
