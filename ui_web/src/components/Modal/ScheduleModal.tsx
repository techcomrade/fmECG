import * as React from "react";
import { Modal, Card, Tooltip, Button } from "antd";
import "./schedule.scss";
import { CarryOutOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Context } from "../../utils/context";
import { userRole } from "../../constants";
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
import { AcceptScheduleRequest } from "../../api";

const ScheduleModalComponent = (props: any) => {
  const listData = props.getListData(props.selectedDate);
  const dispatch = useAppDispatch();
  const scheduleState = useAppSelector((state) => state.schedule);

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
              patient_id: string;
              doctor: string;
              patient: string;
              session_string: any;
              status: string;
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
                      <Tooltip title="Tạo chẩn đoán" key="edit">
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
                      <Tooltip title="Chấp nhận lịch khám" key="accept">
                        <CarryOutOutlined
                          onClick={() => {
                            Modal.confirm({
                              title: "Chấp nhận lịch khám",
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
                  if (
                    key == "session_string" ||
                    key == "schedule_type" ||
                    key == "status"
                  )
                    return <div key={key}>{value}</div>;
                  if (
                    (Context.role === userRole.admin ||
                      Context.role === userRole.patient) &&
                    key == "doctor"
                  )
                    return <div key={key}>Bác sĩ: {value}</div>;
                  if (
                    (Context.role === userRole.admin ||
                      Context.role === userRole.doctor) &&
                    key == "patient"
                  )
                    return <div key={key}>Bệnh nhân: {value}</div>;
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
