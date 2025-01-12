import * as React from "react";
import { Modal, Card, Tooltip, Button, Row, Col, Input } from "antd";
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
  createScheduleByDoctor,
  getScheduleByDoctorId,
  rejectSchedule,
  resetLoadAcceptScheduleStatus,
  resetLoadRejectScheduleStatus,
} from "../../redux/reducer/scheduleSlice";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import { showNotiError, showNotiSuccess } from "../notification";
import {
  AcceptScheduleRequest,
  DiagnosisRequest,
  NotificationRequest,
} from "../../api";
import {
  createNotification,
  resetLoadCreateNotification,
} from "../../redux/reducer/notificationScheduleSlice";
import { ModalAddDiagnosis } from "./ModalAddDiagnosis";
import { ModalShowDiagnosis } from "./ModalShowDiagnosis";
import {
  createDiagnosis,
  resetLoadCreateDiagnosisStatus,
  resetLoadUpdateDiagnosisByScheduleIdStatus,
  updateDiagnosisByScheduleId,
} from "../../redux/reducer/diagnosisSlice";

type AddDiagnosis = {
  open: (data: any[], columns: any[]) => void;
};

type ShowDiagnosis = {
  open: (data: any[]) => void;
};

const ScheduleModalComponent = (props: any) => {
  const listData = props.getListData(props.selectedDate);
  const dispatch = useAppDispatch();
  const scheduleState = useAppSelector((state) => state.schedule);
  const diagnosisState = useAppSelector((state) => state.diagnosis);
  const notificationState = useAppSelector(
    (state) => state.notificationSchedule
  );
  const [statusIcon, setStatusIcon] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({});
  const [reason, setReason] = React.useState<string>("");
  const modalAddDiagnosisRef = React.useRef<AddDiagnosis>(null);
  const modalShowRef = React.useRef<ShowDiagnosis>(null);

  const handleSubmitDiagnosisFunction = (data: any, type: string) => {
    if (type === "add") {
      dispatch(
        createDiagnosis({
          schedule_id: data.schedule_id,
          information: data.information,
        } as DiagnosisRequest)
      );
      if (
        data.schedule_start_time !== null &&
        data.schedule_start_time !== undefined
      ) {
        dispatch(createScheduleByDoctor(data));
        dispatch(
          createNotification({
            ...data,
            status: 4,
          } as NotificationRequest)
        );
      }
      dispatch(getScheduleByDoctorId());
    }
    if (type === "update") {
      dispatch(updateDiagnosisByScheduleId(data));
    }
  };

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
    if (diagnosisState.loadCreateDiagnosisStatus === ApiLoadingStatus.Success) {
      dispatch(resetLoadCreateDiagnosisStatus());
      showNotiSuccess("Bạn đã tạo chẩn đoán thành công");
    }
    if (
      diagnosisState.loadCreateDiagnosisStatus === ApiLoadingStatus.Failed &&
      diagnosisState.errorMessage
    ) {
      dispatch(resetLoadCreateDiagnosisStatus());
      showNotiError(diagnosisState.errorMessage);
    }
  }, [diagnosisState.loadCreateDiagnosisStatus]);

  React.useEffect(() => {
    if (
      diagnosisState.loadUpdateDiagnosisByScheduleIdStatus ===
      ApiLoadingStatus.Success
    ) {
      dispatch(resetLoadUpdateDiagnosisByScheduleIdStatus());
      showNotiSuccess("Bạn đã chỉnh sửa chẩn đoán thành công");
    }
    if (
      diagnosisState.loadUpdateDiagnosisByScheduleIdStatus ===
        ApiLoadingStatus.Failed &&
      diagnosisState.errorMessage
    ) {
      dispatch(resetLoadUpdateDiagnosisByScheduleIdStatus());
      showNotiError(diagnosisState.errorMessage);
    }
  }, [diagnosisState.loadGetDiagnosisByScheduleIdStatus]);

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
    <>
      <Modal
        width={"420px"}
        title="Lí do từ chối lịch"
        open={isOpen}
        onOk={() => {
          if (!reason.trim()) {
            return alert("Vui lòng nhập lý do trước khi gửi!");
          }
          dispatch(rejectSchedule(data.schedule_id));
          dispatch(
            createNotification({
              patient_id: data.patient_id,
              schedule_start_time: data.schedule_start_time,
              status: 3,
              reject_reason: reason,
            } as NotificationRequest)
          );
          setIsOpen(false);
        }}
        okText="Lưu"
        onCancel={() => setIsOpen(false)}
      >
        <Input
          placeholder="Nhập lí do bạn muốn từ chối lịch"
          style={{ marginTop: "10px" }}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></Input>
      </Modal>
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
                [key: string]: any;
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
                        modalShowRef.current?.open({
                          schedule_id: item.schedule_id,
                          doctor: item.doctor,
                          patient: item.patient,
                          start_time: item.start_time,
                          end_time: item.end_time,
                        } as any)
                      }
                    />
                  </Tooltip>,
                  ...(Context.role === userRole.doctor
                    ? [
                        <Tooltip title="Cập nhật chẩn đoán" key="edit">
                          <EditOutlined
                            onClick={() =>
                              modalAddDiagnosisRef.current?.open(
                                {
                                  selected_date: props.selectedDate,
                                  schedule_id: item.schedule_id,
                                  patient_id: item.patient_id,
                                  patient: item.patient,
                                  start_time: item.start_time,
                                  end_time: item.end_time,
                                } as any,
                                props.columns
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
                                        setIsOpen(true);
                                        setData({
                                          schedule_id: item.schedule_id,
                                          patient_id: item.patient_id,
                                          schedule_start_time:
                                            item.schedule_start_time,
                                        });
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
                      ["session_string", "schedule_type", "status"].includes(
                        key
                      )
                    ) {
                      return (
                        <Row key={key} className="event-row">
                          <Col span={10} className="event-label">
                            {key === "session_string" &&
                              "⏰ Thời gian lịch hẹn:"}
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
      <ModalAddDiagnosis
        ref={modalAddDiagnosisRef}
        title="Chẩn đoán của bác sĩ"
        submitFunction={(data: any, type: any) =>
          handleSubmitDiagnosisFunction(data, type)
        }
      ></ModalAddDiagnosis>
      <ModalShowDiagnosis
        ref={modalShowRef}
        title="Xem chẩn đoán"
      ></ModalShowDiagnosis>
    </>
  );
};

export const ScheduleModal = ScheduleModalComponent;
