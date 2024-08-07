import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import "./dataTable.scss";
import { addKeyElement } from "../../utils/arrayUtils";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const { confirm } = Modal;

const DataTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [editButton, setEditButtton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [chartButton, setChartButton] = useState(false);
  const [selectedState, setSelectedRowKeys] = useState([]);
  const { t, i18n } = useTranslation();
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
      // Check hide or show edit and delete button
      if (props.editButton) setEditButtton(selectedRowKeys.length === 1);
      if (props.deleteButton) setDeleteButton(selectedRowKeys.length === 1);
      if (props.chartButton) setChartButton(selectedRowKeys.length === 1);
      props.updateSelectedData?.(selectedRowKeys);
    }
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
        console.log(id);
        props?.deleteFunction(id);
      },
      onCancel() {},
    });
  };

  return (
    <>
      <h2>{props.name} test devops</h2>
      {props?.customData}
      <div className="list-btn-actions">
        {props.addButton && (
          <Button icon={<PlusOutlined />} onClick={() => props?.addFunction()}>
            {t("button.add")}
          </Button>
        )}
        {props.addDeviceButton ? (
          <Button icon={<MobileOutlined />} onClick={() => navigate("/device")}>
            {t("button.add-device")}
          </Button>
        ) : (
          ""
        )}
        { props.editButton && (
          <Button
            icon={<EditOutlined />}
            disabled = {!editButton}
            className="edit-btn"
            onClick={() => props?.editFunction(selectedState[0])}
          > 
            {t("button.edit")}
          </Button>
        )}
        {props.deleteButton && (
          <Button
            icon={<DeleteOutlined />}
            disabled = {!deleteButton}
            className="delete-btn"
            onClick={() => deleteFunction(selectedState[0])}
          >
            {t("button.delete")}
          </Button>
        )}
        {props?.customButton}
        { props.chartButton && (
          <Button
            disabled ={!chartButton}
            onClick={() => props?.openChart()}
          >
            {t("button.graph")}
          </Button>
        )}
      </div>
      <Table
        rowSelection={{
          type: props.hasCheckBox,
          ...rowSelection,
        }}
        loading = {props.loading}
        bordered
        columns={props.column.filter(item => !item.hidden)}
        dataSource={tableData}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => props?.handleOpenDrawer?.(record?.id), // click row
          };
        }}      
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

export default DataTable;
