import React, { useRef, useState, useEffect } from "react";
import { Table, Button, Input, Space, Modal } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MobileOutlined,
  TagOutlined,
} from "@ant-design/icons";
import "./dataTable.scss";
import { ExclamationCircleFilled } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { addKeyElement } from "../../utils/arrayUtils";

const { confirm } = Modal;

interface Props {
  role?: string;
  data: any[];
  name: string;
  loading: boolean;
  column: any[];
  addButton?: boolean;
  addFunction?: () => void;
  addDeviceButton?: boolean;
  assignButton?: boolean;
  assginFunction?: (id: any) => void;
  editButton: boolean;
  editFunction?: (id: any) => void;
  deleteButton: boolean;
  deleteFunction?: (id: any) => void;
  chartButton?: boolean;
  openChart?: () => void;
  customButton?: React.ReactNode;
  customData?: React.ReactNode;
  hasCheckBox?: "checkbox" | "radio";
  updateSelectedData?: (selectedRowKeys: any[]) => void;
  handleOpenDrawer?: (id: any) => void;
}

const DataTable = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [editButton, setEditButtton] = useState<boolean>(false);
  const [assginButton, setAssignButton] = useState<boolean>(false);
  const [deleteButton, setDeleteButton] = useState<boolean>(false);
  const [chartButton, setChartButton] = useState<boolean>(false);
  const [selectedState, setSelectedRowKeys] = useState<any[]>([]);
  const searchInput = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const rawData = props.data;
    if (rawData) {
      setTableData(addKeyElement(rawData));
    }
  }, [props.data]);

  const rowSelection = {
    selectedRowKeys: selectedState,
    onChange: (selectedRowKeys: any[]) => {
      setSelectedRowKeys(selectedRowKeys);
      if (props.editButton) setEditButtton(selectedRowKeys.length === 1);
      if (props.assignButton) setAssignButton(selectedRowKeys.length === 1);
      if (props.deleteButton) setDeleteButton(selectedRowKeys.length === 1);
      if (props.chartButton) setChartButton(selectedRowKeys.length === 1);
      props.updateSelectedData?.(selectedRowKeys);
    },
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }: FilterDropdownProps) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const deleteFunction = (id: any) => {
    confirm({
      title: "Xóa thành phần",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc muốn xóa thành phần này không",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Không",
      async onOk() {
        console.log(id);
        props.deleteFunction?.(id);
      },
      onCancel() {},
    });
  };

  const columnsWithSearch = props.column.map((col) => ({
    ...col,
    ...(col.searchable ? getColumnSearchProps(col.dataIndex) : {}),
  }));

  return (
    <>
      <h2>{props.name}</h2>
      {props?.customData}
      <div className="list-btn-actions">
        {props.addButton && (
          <Button icon={<PlusOutlined />} onClick={() => props.addFunction?.()}>
            Thêm
          </Button>
        )}
        {props.addDeviceButton ? (
          <Button icon={<MobileOutlined />} onClick={() => navigate("/device")}>
            Thêm thiết bị
          </Button>
        ) : (
          ""
        )}
        {props.editButton && (
          <Button
            icon={<EditOutlined />}
            disabled={!editButton}
            className="edit-btn"
            onClick={() => props.editFunction?.(selectedState[0])}
          >
            Sửa
          </Button>
        )}
        {props.assignButton &&  (
          <Button
            icon={<TagOutlined />}
            disabled={!assginButton}
            onClick={() => props.assginFunction?.(selectedState[0])}
          >
            Phân công thiết bị
          </Button>
        )}
        {props.deleteButton && (
          <Button
            icon={<DeleteOutlined />}
            disabled={!deleteButton}
            className="delete-btn"
            onClick={() => deleteFunction(selectedState[0])}
          >
            Xóa
          </Button>
        )}
      </div>
      <Table
        rowSelection={
          props.role
            ? {
                type: props.hasCheckBox,
                ...rowSelection,
              }
            : undefined
        }
        loading={props.loading}
        bordered
        columns={columnsWithSearch}
        dataSource={tableData}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => props.handleOpenDrawer?.(record?.id), // click row
          };
        }}
      />
    </>
  );
};

export default DataTable;
