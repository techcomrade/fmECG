import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Col, Form, DatePicker, Input } from "antd";
import { getCurrentTimeToString } from "../../utils/dateUtils";
import dayjs from 'dayjs';

const ModalComponent = (props, ref) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [column, setColum] = useState([]);

  const handleChangeInput = (para, value) => {
    let preState = { ...data};
    preState[para] = value;
    setData({ ...preState });
};
    const handleSubmit = () => {
        props?.submitFunction(data);
        setIsOpen(false);
    }
  useImperativeHandle(ref, () => ({
    open: (data, colum) => {
      setIsOpen(true);
      setData(data);
      setColum(colum);
    },
  }));
  return (
    <Modal
      title={props.title}
      open={isOpen}
      okText="Lưu"
      okType="primary"
      onOk={handleSubmit}
      cancelText="Hủy bỏ"
      onCancel={() => {
        setData([]);
        setIsOpen(false);
      }}
    >
      <br />
      {column.map((column) => (
        <Col span={22} key={column.title}>
          <Form.Item label={column.title}>
            {column.type === "text" && (
              <Input
                name={column.dataIndex}
                value={data ? data[column.dataIndex]: ""}
                onChange={(e) =>
                  handleChangeInput(column.dataIndex, e.target.value)
                }
              />
            )}
            {column.type === "date" && (
              <DatePicker
                format={"DD/MM/YYYY"}
                name={column.dataIndex}
                // value={data ? dayjs(data[column.dataIndex], "DD/MM/YYYY"): dayjs()}
                defaultValue={dayjs()}
                onChange={(date, dateString) =>
                  {
                    console.log();
                    handleChangeInput(column.dataIndex, dateString)
                  }
                }
              />
            )}
          </Form.Item>
        </Col>
      ))}
    </Modal>
  );
};

export const ModalControlData = forwardRef(ModalComponent);