import * as React from "react";
import { Modal, Card, Tooltip, Button, Row, Col } from "antd";
import "./schedule.scss";
import { CarryOutOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Context } from "../../utils/context";
import {
  convertScheduleResultToString,
  convertScheduleStatusToString,
  userRole,
} from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  acceptSchedule,
  getScheduleByDoctorId,
  rejectSchedule,
  resetLoadAcceptScheduleStatus,
  resetLoadRejectScheduleStatus,
} from "../../redux/reducer/scheduleSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { showNotiError, showNotiSuccess } from "../notification";
import { AcceptScheduleRequest, NotificationRequest } from "../../api";
import {
  createNotification,
  resetLoadCreateNotification,
} from "../../redux/reducer/notificationScheduleSlice";

const ScheduleModalComponent = (props: any) => {
  const listData = props.getListData(props.selectedDate);
  const dispatch = useAppDispatch();
  const scheduleState = useAppSelector((state) => state.schedule);
  const notificationState = useAppSelector(
    (state) => state.notificationSchedule
  );
  const [statusIcon, setStatusIcon] = React.useState<any>(null);

  React.useEffect(() => {
    if (listData[0]?.status === convertScheduleStatusToString(1)) {
      setStatusIcon("🟢");
    } else if (listData[0]?.status === convertScheduleStatusToString(2)) {
      setStatusIcon("⏳");
    } else setStatusIcon("🔴");
  }, [listData]);

  React.useEffect(() => {
    if (scheduleState.loadAcceptScheduleStatus === ApiLoadingStatus.Success) {
      showNotiSuccess("Bạn đã chấp nhận lịch khám thành công");
      dispatch(resetLoadAcceptScheduleStatus());
      dispatch(getScheduleByDoctorId());
    }
    if (
      scheduleState.loadAcceptScheduleStatus === ApiLoadingStatus.Failed &&
      scheduleState.errorMessage
    ) {
      showNotiError(scheduleState.errorMessage);
      dispatch(resetLoadAcceptScheduleStatus());
    }
  }, [scheduleState.loadAcceptScheduleStatus]);

  React.useEffect(() => {
    if (scheduleState.loadRejectScheduleStatus === ApiLoadingStatus.Success) {
      showNotiSuccess("Bạn đã hủy lịch khám thành công");
      dispatch(resetLoadRejectScheduleStatus());
      dispatch(getScheduleByDoctorId());
    }
    if (
      scheduleState.loadRejectScheduleStatus === ApiLoadingStatus.Failed &&
      scheduleState.errorMessage
    ) {
      showNotiError(scheduleState.errorMessage);
      dispatch(resetLoadRejectScheduleStatus());
    }
  }, [scheduleState.loadRejectScheduleStatus]);

  React.useEffect(() => {
    if (notificationState.loadCreateNotification === ApiLoadingStatus.Success) {
      dispatch(resetLoadCreateNotification());
    }
    if (
      notificationState.loadCreateNotification === ApiLoadingStatus.Failed &&
      notificationState.errorMessage
    ) {
      showNotiError(notificationState.errorMessage);
      dispatch(resetLoadCreateNotification());
    }
  }, [notificationState.loadCreateNotification]);

  return (
    <Modal
      title={props.title}
      open={props.isOpen}
      onCancel={props.onClose}
      footer={null}
    >
      {listData.length > 0 ? (
        listData.map(
          (
            item: {
              type: any;
              schedule_id: string;
              schedule_type: any;
              doctor_id: string;
              patient_id: string;
              doctor: string;
              patient: string;
              session_string: any;
              status: string;
              result: string;
              schedule_start_time: number;
              start_time: string;
              end_time: string;
            },
            index: any
          ) => (
            <Card
              key={index}
              className="card-filter"
              actions={[
                <Tooltip title="Xem chẩn đoán">
                  <EyeOutlined
                    key="show"
                    onClick={() =>
                      props.showDiagnosis(
                        item.schedule_id,
                        item.doctor,
                        item.patient,
                        item.start_time,
                        item.end_time
                      )
                    }
                  />
                </Tooltip>,
                ...(Context.role === userRole.doctor
                  ? [
                      <Tooltip title="Cập nhật chẩn đoán" key="edit">
                        <EditOutlined
                          onClick={() =>
                            props.addDiagnosis(
                              props.selectedDate,
                              item.schedule_id,
                              item.patient_id,
                              item.patient,
                              item.start_time,
                              item.end_time
                            )
                          }
                        />
                      </Tooltip>,
                    ]
                  : []),
                ...(Context.role === userRole.doctor && item.type === 2
                  ? [
                      <Tooltip title="Phê duyệt lịch khám" key="accept">
                        <CarryOutOutlined
                          onClick={() => {
                            Modal.confirm({
                              title: "Phê duyệt lịch khám",
                              content:
                                "Bạn có muốn chấp nhận lịch khám này không?",
                              footer: (_, { CancelBtn }) => (
                                <>
                                  <CancelBtn />
                                  <Button
                                    key="not-accept"
                                    onClick={() => {
                                      dispatch(
                                        rejectSchedule(item.schedule_id)
                                      );
                                      dispatch(
                                        createNotification({
                                          patient_id: item.patient_id,
                                          schedule_start_time:
                                            item.schedule_start_time,
                                          status: 3,
                                        } as NotificationRequest)
                                      );
                                      Modal.destroyAll();
                                    }}
                                  >
                                    Không
                                  </Button>
                                  <Button
                                    key="accept"
                                    type="primary"
                                    onClick={() => {
                                      dispatch(
                                        acceptSchedule({
                                          schedule_id: item.schedule_id,
                                        } as AcceptScheduleRequest)
                                      );
                                      dispatch(
                                        createNotification({
                                          patient_id: item.patient_id,
                                          schedule_start_time:
                                            item.schedule_start_time,
                                          status: 1,
                                        } as NotificationRequest)
                                      );
                                      Modal.destroyAll();
                                    }}
                                  >
                                    Có
                                  </Button>
                                </>
                              ),
                            });
                          }}
                        ></CarryOutOutlined>
                      </Tooltip>,
                    ]
                  : []),
              ]}
            >
              <div className="event-details">
                {Object.entries(item).map(([key, value]) => {
                  if (key === "result") {
                    return (
                      <Row key={key} className="event-row">
                        <Col span={10} className="event-label">
                          {value !== 2 ? "🎯 Kết quả lịch hẹn:" : ""}
                        </Col>
                        <Col span={14} className="event-value">
                          {value !== 2
                            ? convertScheduleResultToString(value)
                            : ""}
                        </Col>
                      </Row>
                    );
                  }

                  if (
                    ["session_string", "schedule_type", "status"].includes(key)
                  ) {
                    return (
                      <Row key={key} className="event-row">
                        <Col span={10} className="event-label">
                          {key === "session_string" && "⏰ Thời gian lịch hẹn:"}
                          {key === "schedule_type" && "📋 Loại lịch hẹn:"}
                          {key === "status" &&
                            `${statusIcon} Trạng thái lịch hẹn:`}
                        </Col>
                        <Col span={14} className="event-value">
                          {value}
                        </Col>
                      </Row>
                    );
                  }

                  if (
                    (Context.role === userRole.admin ||
                      Context.role === userRole.patient) &&
                    key === "doctor"
                  ) {
                    return (
                      <Row key={key} className="event-row">
                        <Col span={10} className="event-label">
                          👨‍⚕️ Bác sĩ:
                        </Col>
                        <Col span={14} className="event-value">
                          {value}
                        </Col>
                      </Row>
                    );
                  }

                  if (
                    (Context.role === userRole.admin ||
                      Context.role === userRole.doctor) &&
                    key === "patient"
                  ) {
                    return (
                      <Row key={key} className="event-row">
                        <Col span={10} className="event-label">
                          🛌 Bệnh nhân:
                        </Col>
                        <Col span={14} className="event-value">
                          {value}
                        </Col>
                      </Row>
                    );
                  }
                })}
              </div>
            </Card>
          )
        )
      ) : (
        <div>Không có lịch hẹn</div>
      )}
    </Modal>
  );
};

export const ScheduleModal = ScheduleModalComponent;
