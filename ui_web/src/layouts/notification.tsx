import React, { useState, useEffect } from "react";
import {
  Dropdown,
  List,
  Badge,
  Typography,
  Card,
  Divider,
  Button,
  Modal,
  Form,
} from "antd";
import { BellFilled, CloseOutlined } from "@ant-design/icons";
import "./notification.scss";
import {
  deleteNotification,
  getNotificationByUserId,
  resetLoadDeleteNotification,
  resetLoadGetNotificationByUserId,
  resetLoadUpdateSeenStatus,
  updateSeenStatus,
} from "../redux/reducer/notificationScheduleSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { ApiLoadingStatus } from "../utils/loadingStatus";
import { NotificationResponse, UpdateSeenStatusRequest } from "../api";
import { Context } from "../utils/context";
import { userRole } from "../constants";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { showNotiError } from "../components/notification";
import {
  getScheduleByDoctorId,
  getScheduleByPatientId,
  setClickedNotificationDate,
} from "../redux/reducer/scheduleSlice";
import { useNavigate } from "react-router-dom";
import { convertTimeToDateTime } from "../utils/dateUtils";
dayjs.extend(relativeTime);

const { Text } = Typography;

export const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dataState = useAppSelector((state) => state.notificationSchedule);
  const [notifications, setNotifications] = useState<NotificationResponse[]>(
    []
  );
  const getRelativeTime = (createdAt: number): any => {
    return dayjs(createdAt).fromNow();
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showReason, setShowReason] = useState<boolean>(false);
  const [data, setData] = React.useState<any>({});
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getNotificationByUserId());
  }, []);

  useEffect(() => {
    if (dataState.loadGetNotificationByUserId === ApiLoadingStatus.Success) {
      setNotifications(
        [...dataState.notification].sort(
          (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
        )
      );
      dispatch(resetLoadGetNotificationByUserId());
    }
    if (
      dataState.loadGetNotificationByUserId === ApiLoadingStatus.Failed &&
      dataState.errorMessage
    ) {
      showNotiError(dataState.errorMessage);
      dispatch(resetLoadGetNotificationByUserId());
    }
  }, [dataState.loadGetNotificationByUserId]);

  useEffect(() => {
    if (dataState.loadUpdateSeenStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadUpdateSeenStatus());
      dispatch(getNotificationByUserId());
    }
    if (
      dataState.loadUpdateSeenStatus === ApiLoadingStatus.Failed &&
      dataState.errorMessage
    ) {
      showNotiError(dataState.errorMessage);
      dispatch(resetLoadUpdateSeenStatus());
    }
  }, [dataState.loadUpdateSeenStatus]);

  useEffect(() => {
    if (dataState.loadDeleteNotificationStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadDeleteNotification());
      dispatch(getNotificationByUserId());
    }
    if (
      dataState.loadDeleteNotificationStatus === ApiLoadingStatus.Failed &&
      dataState.errorMessage
    ) {
      showNotiError(dataState.errorMessage);
      dispatch(resetLoadDeleteNotification());
    }
  }, [dataState.loadDeleteNotificationStatus]);

  const renderMessage = (item: NotificationResponse) => {
    const dateObj = dayjs
      .unix(item.schedule_start_time)
      .format("HH:mm DD/MM/YYYY");
    const [time, date] = dateObj.split(" ");
    if (Context.role === userRole.patient) {
      if (item.status === 0)
        return `Còn 1 tiếng nữa là đến lịch hẹn với bác sĩ ${item.doctor_name} vào ${time} ngày ${date} của bạn`;
      if (item.status === 1)
        return `Bác sĩ ${item.doctor_name} đã chấp nhận lịch hẹn vào ${time} ngày ${date} của bạn`;
      if (item.status === 2)
        return `Bạn đã thành công đặt lịch hẹn với bác sĩ ${item.doctor_name} vào ${time} ngày ${date}, vui lòng đợi bác sĩ xác nhận`;
      if (item.status === 3)
        return `Bác sĩ ${item.doctor_name} đã từ chối lịch hẹn vào ${time} ngày ${date} của bạn, nhấn để xem thông tin chi tiết`;
      if (item.status === 4)
        return `Bác sĩ ${item.doctor_name} đã tạo lịch hẹn vào ${time} ngày ${date} cho bạn`;
      return `Lịch hẹn vào ${time} ngày ${date} của bạn đã bị hủy tự động do chưa được bác sĩ xác nhận`;
    } else if (Context.role === userRole.doctor) {
      if (item.status === 0)
        return `Còn 15 phút nữa là đến lịch hẹn vào ${time} ngày ${date} của bệnh nhân ${item.patient_name}`;
      if (item.status === 1)
        return `Bạn đã chấp nhận lịch hẹn vào ${time} ngày ${date} của bệnh nhân ${item.patient_name}`;
      if (item.status === 2)
        return `Bệnh nhân ${item.patient_name} đã đặt lịch hẹn vào ${time} ngày ${date}, vui lòng xác nhận`;
      if (item.status === 3)
        return `Bạn đã từ chối lịch hẹn vào ${time} ngày ${date} của bệnh nhân ${item.patient_name}`;
      return `Bạn đã tạo lịch hẹn vào ${time} ngày ${date} cho bệnh nhân ${item.patient_name}`;
    }
  };

  const NotificationBox = () => (
    <Card
      title={
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Thông báo lịch hẹn
        </div>
      }
      style={{
        width: 360,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        color: "#000",
        borderRadius: "8px",
      }}
      bodyStyle={{
        padding: 0,
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          padding: "12px",
        }}
      >
        <List
          dataSource={notifications}
          renderItem={(item, index) => (
            <List.Item
              style={{
                padding: "12px",
                backgroundColor: item.is_seen ? "#f9f9f9" : "#e6f7ff",
                cursor: "pointer",
                transition: "background-color 0.3s, box-shadow 0.3s",
                borderRadius: "8px",
                marginBottom:
                  index === notifications.length - 1 ? "0px" : "8px",
                position: "relative",
              }}
              onClick={() => {
                if (item.status === 3 && Context.role === userRole.patient) {
                  setShowReason(true);
                  console.log(item);
                  setData({
                    doctor_name: item.doctor_name,
                    schedule_start_time: item.schedule_start_time,
                    schedule_end_time: item.schedule_start_time + 1800,
                    reject_reason: item.reject_reason,
                  });
                  setIsOpen(false);
                } else {
                  if (Context.role === userRole.doctor) {
                    dispatch(getScheduleByDoctorId());
                  }
                  if (Context.role === userRole.patient) {
                    dispatch(getScheduleByPatientId());
                  }
                  if (!item.is_seen) {
                    dispatch(
                      updateSeenStatus({
                        id: item.id,
                      } as UpdateSeenStatusRequest)
                    );
                  }
                  const selectedDate = dayjs.unix(item.schedule_start_time);
                  navigate("/schedule");
                  dispatch(setClickedNotificationDate(selectedDate));
                  setIsOpen(false);
                }
              }}
            >
              <List.Item.Meta
                title={
                  <Text
                    style={{
                      color: item.is_seen ? "#595959" : "#000",
                      fontWeight: item.is_seen ? "400" : "600",
                      fontSize: "14px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      maxWidth: "280px",
                      display: "block",
                    }}
                  >
                    {renderMessage(item)}
                  </Text>
                }
                description={
                  <Text style={{ fontSize: "12px", color: "#8c8c8c" }}>
                    {getRelativeTime(item.createdAt)}
                  </Text>
                }
              />
              <Button
                icon={<CloseOutlined />}
                size="small"
                type="text"
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  color: "#bfbfbf",
                  background: "none",
                  transition: "color 0.3s",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(deleteNotification(item.id));
                }}
              />
            </List.Item>
          )}
        />
      </div>
      <Divider style={{ margin: "0" }} />
      <div style={{ textAlign: "center", padding: "12px" }}>
        <Text style={{ color: "#8c8c8c", fontSize: "12px" }}>
          Tất cả thông báo đã hiển thị
        </Text>
      </div>
    </Card>
  );

  return (
    <>
      <Modal
        width={"400px"}
        title="Thông tin chi tiết"
        open={showReason}
        footer={null}
        onCancel={() => setShowReason(false)}
      >
        <Form form={form} labelCol={{ span: 11 }} wrapperCol={{ span: 12 }}>
          <Form.Item
            label="Bác sĩ:"
            style={{ marginBottom: "0px", marginTop: "12px" }}
          >
            <div>{data.doctor_name}</div>
          </Form.Item>
          <Form.Item label="Ngày hẹn:" style={{ marginBottom: "0px" }}>
            <div>
              {convertTimeToDateTime(data.schedule_start_time).split(" ")[1]}
            </div>
          </Form.Item>
          <Form.Item label="Ca hẹn:" style={{ marginBottom: "0px" }}>
            <div>
              Từ {convertTimeToDateTime(data.schedule_start_time).split(" ")[0]}{" "}
              đến {convertTimeToDateTime(data.schedule_end_time).split(" ")[0]}
            </div>
          </Form.Item>
          <Form.Item label="Lí do từ chối:" style={{ marginBottom: "0px" }}>
            <div>{data.reject_reason}</div>
          </Form.Item>
        </Form>
      </Modal>
      <Dropdown
        open={isOpen}
        onOpenChange={(visible) => setIsOpen(visible)}
        dropdownRender={() => <NotificationBox />}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Badge
          count={notifications.filter((n) => !n.is_seen).length}
          size="small"
          style={{
            backgroundColor: "#1890ff",
          }}
        >
          <BellFilled
            style={{
              fontSize: "25px",
              cursor: "pointer",
              color: "#ffc107",
            }}
            onClick={() => {
              setIsOpen(true);
              dispatch(getNotificationByUserId());
            }}
          />
        </Badge>
      </Dropdown>
    </>
  );
};
