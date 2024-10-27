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
          (item: { type: string; session: any }, index: any) => (
            <div key={index}>
              <Badge
                status={item.type as BadgeProps["status"]}
                text={item.session}
              />
              <div className="event-details">
                {Object.entries(item).map(([key, value]) => {
                  if (key !== "type" && key !== "time" && key !== "session")
                    return <div>{value}</div>;
                })}
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
