import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MobileOutlined,
  FundViewOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import "./dataTable.scss";
import { addKeyElement } from "../../utils/arrayUtils";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const DataTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [editButton, setEditButtton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [chartButton, setChartButton] = useState(false);
  const [downloadButton,setDownloadButton] = useState(false);
  const [selectedState, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  // Get data
  useEffect(() => {
    const rawData = props.data;
    if (rawData) {
      setTableData(addKeyElement(rawData));
    }
  }, [props.data]);

  // Select row
  const rowSelection = {
    selectedRowKeys: selectedState,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
      // Check hide or show button
      if (props.editButton) setEditButtton(selectedRowKeys.length === 1);
      if (props.deleteButton) setDeleteButton(selectedRowKeys.length === 1);
      if (props.chartButton) setChartButton(selectedRowKeys.length === 1);
      if(props.downLoadButton) setDownloadButton(selectedRowKeys.length === 1);
      props.updateSelectedData?.(selectedRowKeys);
    },
  };

  // Delete modal
  const deleteFunction = (id) => {
    confirm({
      title: "Xóa thành phần",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xóa thành phần này không",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        props?.deleteFunction(id);
      },
      onCancel() {},
    });
  };

  return (
    <>
      <h2>{props.name}</h2>
      <div className="list-btn-actions">
        {props.addButton && (
          <Button icon={<PlusOutlined />} onClick={() => props?.addFunction()}>
            Tạo
          </Button>
        )}
        {props.addDeviceButton ? (
          <Button icon={<MobileOutlined />} onClick={() => navigate("/device")}>
            Thêm thiết bị
          </Button>
        ) : (
          ""
        )}
        {editButton && props.editButton && (
          <Button
            icon={<EditOutlined />}
            className="edit-btn"
            onClick={() => props?.editFunction(selectedState[0])}
          >
            Chỉnh sửa
          </Button>
        )}
        {deleteButton && props.deleteButton && (
          <Button
            icon={<DeleteOutlined />}
            className="delete-btn"
            onClick={() => deleteFunction(selectedState[0])}
          >
            Xóa
          </Button>
        )}
        {props?.customButton}
        {chartButton && props.chartButton && (
          <Button
            icon={<FundViewOutlined />}
            onClick={() => props?.openChart()}
          >
            Đồ thị
          </Button>
        )}
        {downloadButton && props.downLoadButton && (
          <Button
            icon={<DownloadOutlined />}
            onClick={() => props?.downloadFunction(selectedState[0])}
          >
            Tải bản ghi
          </Button>
        )}
      </div>
      <Table
        rowSelection={{
          type: props.hasCheckBox,
          ...rowSelection,
        }}
        loading={props.loading}
        bordered
        columns={props.column}
        dataSource={tableData}
      />
    </>
  );
};

// props list:
// props.data
// props.updateSelectedData
// props.name
// props.loading
// props.addButton
// props.addDeviceButton
// props.hasCheckBox
// props.column
// props.editButton
// props.deleteButton
// props?.updateSelectedData
// props?.deleteFunction
// props?.addFunction
// props?.editFunction
// props?.customButton
// props.downLoadButton
// props.downloadFunction
export default DataTable;
