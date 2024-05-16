import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import {
  createRecord,
  deleteRecord,
  getRecord,
  resetCreateDataStatus,
  resetDeleteDataStatus,
  resetUpdateDataStatus,
  updateRecord,
  loadStatus,
  resetLoadDataStatus
} from "../../redux/reducer/recordSlice";
import { convertDateToTime, convertTimeToDate } from "../../utils/dateUtils";
import { findElementById, checkDateTypeKey } from "../../utils/arrayUtils";
import { showNotiSuccess } from "../../components/Notification";
import { getLocalStorage } from "../../utils/storageUtils";
import ModalChart from "../../components/Modal/ModalChart";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { httpGetData } from "../../api/common.api";
import { ModalControlData } from "../../components/Modal/ModalControlData";

const RecordTable = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.record);
  const [selectedData, setSelectedData] = useState([]);
  const [dataTable, setData] = useState([]);
  const [openChart, setOpenChart] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [dropdownData, setDropData] = useState([]);

  const searchInput = useRef(null);
  const modalUpdateRef = useRef(null);
  const modalAddRef = useRef(null);
  const user_id = getLocalStorage("user");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>  {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? text : (
        text
      ),
  });

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      isEdit: false,
    },
    {
      title: "Tên người dùng",
      dataIndex: "user_id",
      key: "user_id",
      type: "select",
      dataSelect: dropdownData.user,
      isEdit: true,
      hidden: true
    },
    {
      title: "Tên thiết bị",
      dataIndex: "device_name",
      key: "device_name",
      isEdit: false,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "device_id",
      key: "device_id",
      type: "select",
      dataSelect: dropdownData.device,
      isEdit: true,
      hidden: true
    },
    {
      title: "Loại bản ghi",
      dataIndex: "device_type",
      key: "information",
      type: "text",
      isEdit: true,
      ...getColumnSearchProps('device_type', 'loại bản ghi'),
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
      type: "date",
      isEdit: true,
      ...getColumnSearchProps('start_time', 'ngày bắt đầu'),
    
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_time",
      key: "end_time",
      type: "date",
      isEdit: true,
      ...getColumnSearchProps('end_time', 'ngày kết thúc'),
    },
  ];

  useEffect(() => {
    dispatch(getRecord());
    const getOptionData = async() => {
      const userData = await httpGetData('/user');
      const deviceData = await httpGetData('/device');
      setDropData({
        user: userData.metadata,
        device: deviceData.metadata
      })
    }
    getOptionData();
  }, []);

  // Get data
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      const rawData = dataState.data.metadata;
      const data = rawData.map((element, index) => ({
        ...element,
        start_time: convertTimeToDate(element.start_time),
        end_time: convertTimeToDate(element.end_time),
      }));
      setData(data);
    }
    dispatch(resetLoadDataStatus());
  }, [dataState.loadDataStatus]);

  useEffect(() => {
    if (dataState.loadUpdateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã sửa thiết bị thành công");
      dispatch(getRecord());
      dispatch(resetUpdateDataStatus());
    }
  }, [dataState.loadUpdateDataStatus]);

  useEffect(() => {
    if (dataState.loadDeleteDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã xoá thiết bị thành công");
      dispatch(getRecord());
      dispatch(resetDeleteDataStatus());
    }
  }, [dataState.loadDeleteDataStatus]);

  useEffect(() => {
    if (dataState.loadCreateDataStatus === loadStatus.Success) {
      showNotiSuccess("Bạn đã thêm thiết bị thành công");
      dispatch(getRecord());
      dispatch(resetCreateDataStatus());
    }
  }, [dataState.loadCreateDataStatus]);

  const handleDeleteFunction = (id) => {
    dispatch(deleteRecord({ id: id }));
  };

  const handleEditFunction = () => {
    const userData = findElementById(dataTable, selectedData[0]);
    modalUpdateRef.current?.open(userData, columns);
  };

  const handleSubmitEditUser = (data) => {
    dispatch(updateRecord(handleData(data)));
  };

  const handleSubmitAddFunction = (data) => {
    dispatch(createRecord(handleData(data)));
  };
  
  const handleData = (data) => {
    let deviceData = data;
    Object.keys(data).forEach((key) => {
      if (checkDateTypeKey(key)) {
        deviceData[key] = convertDateToTime(data[key]);
      }
    });
    deviceData = {
      ...deviceData,
      user_id: user_id,
      data_rec_url: 'http'
    }
    return deviceData;
  };

  return (
    <>
      <DataTable
        editButton
        editFunction={handleEditFunction}
        addButton
        addFunction={() => modalAddRef.current?.open({}, columns)}
        deleteButton
        deleteFunction={handleDeleteFunction}
        name="Bảng quản lý record"
        data={dataTable}
        column={columns.filter(item => !item.hidden)}
        updateSelectedData={setSelectedData}
        loading={dataState.loadDataStatus === loadStatus.Loading}
        chartButton
        openChart={() => setOpenChart(true)}
      />
      <ModalControlData
        ref={modalUpdateRef}
        title="Sửa thông tin record"
        submitFunction={(data) => handleSubmitEditUser(data)}
      />
      <ModalControlData
        ref={modalAddRef}
        title="Thêm record mới"
        submitFunction={(data) => handleSubmitAddFunction(data)}
      />
      <ModalChart 
        isOpen={openChart}
        setIsOpen={setOpenChart}
        selectedDevice={selectedData}
      />
    </>
  );
};

export default RecordTable;
