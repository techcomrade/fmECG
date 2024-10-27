import * as React from "react";
import { Modal, Badge } from "antd";
import type { BadgeProps } from "antd";
import "./schedule.scss";

const ScheduleModalComponent = (props: any) => {
  const listData = props.getListData(props.selectedDate);

  return (
    <Modal
      title={props.title}
      open={props.isOpen}
      onCancel={props.onClose}
      footer={null}
    >
      {listData.length > 0 ? (
        listData.map(
          (item: { type: string; time: any; patient: any }, index: any) => (
            <div key={index}>
              <Badge
                status={item.type as BadgeProps["status"]}
                text={item.time}
              />
              <div className="event-details">
                <div>{item.patient}</div>
              </div>
            </div>
          )
        )
      ) : (
        <div>Không có lịch khám</div>
      )}
    </Modal>
  );
};

export const ScheduleModal = ScheduleModalComponent;
