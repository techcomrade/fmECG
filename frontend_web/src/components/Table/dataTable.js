import { Table, Button, Col, Form, Input } from "antd";
import { exportColumnTable, exportTableName } from "../../models/manage.table";
import { useEffect, useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./dataTable.scss";
import { addKeyElement, findElementById } from "../../utils/arrayUtils";
import {
    createData,
    deleteData,
    getData,
    loadStatus,
    updateData,
} from "../../redux/reducer/userSlice";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { showNotiSuccess } from "../Notification";
const { confirm } = Modal;

const DataTable = () => {
    const [column, setColumn] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [dataEdit, setDataEdit] = useState([]);
    const [dataCreate, setDataCreate] = useState({});


    const dispatch = useDispatch();
    const dataState = useSelector((state) => state.user);

    const url = window.location.pathname;
    const urlArray = url.split("/");
    const table = urlArray.pop();

    // Get data
    useEffect(() => {
        setColumn(exportColumnTable(table));
        dispatch(getData());
    }, []);

    useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
        const rawData = dataState.data.metadata;
        if (rawData) {
            setTableData(addKeyElement(rawData));
        }
    }
    }, [dataState.loadDataStatus]);

    // Reload data when update success
    useEffect(() => {
        if (dataState.loadCreateDataStatus === loadStatus.Success) {
            dispatch(getData());
        }
    }, [dataState.loadCreateDataStatus]);

    // Reload data when update success
    useEffect(() => {
        if (dataState.loadUpdateUserStatus === loadStatus.Success) {
            dispatch(getData());
        }
    }, [dataState.loadUpdateUserStatus]);

    // Reload data when delete success
    useEffect(() => {
        if (dataState.loadDeleteUserStatus === loadStatus.Success) {
            dispatch(getData());
        }
    }, [dataState.loadDeleteUserStatus]);

    // Select row
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const delBtn = document.getElementsByClassName("delete-btn")[0];
            const editBtn = document.getElementsByClassName("edit-btn")[0];
            const delBtnClassList = delBtn.classList;
            const editBtnClassList = editBtn.classList;

            // Check hide or show edit and delete button
            if (selectedRows.length === 1) {
                editBtnClassList.remove("hide");
            } else editBtnClassList.add("hide");

            if (selectedRows.length > 0) {
                delBtnClassList.remove("hide");
            } else delBtnClassList.toggle("hide");

            // Handle on click edit button
            editBtn.onclick = () => {
                setShowModalEdit(true);
                setDataEdit(findElementById(tableData, selectedRowKeys[0]));
            };

            // Handle on click delete button
            delBtn.onclick = () => {
                showDeleteConfirm(table, selectedRowKeys);
            };
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    const [selectionType, setSelectionType] = useState("checkbox");

    // Delete modal
    const showDeleteConfirm = (table, id) => {
        confirm({
        title: "Xóa thành phần",
        icon: <ExclamationCircleFilled />,
        content: "Bạn có chắc muốn xóa thành phần này không",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Không",
        async onOk() {
            dispatch(deleteData({id}));
            showNotiSuccess("Bạn đã xóa thành công");
        },
        onCancel() {},
        });
    };

    const handleChangeInput = (para, value) => {
        let preState = { ...dataEdit};
        preState[para] = value;
        setDataEdit({ ...preState });
    };

    const handleSubmitChange = async () => {
        dispatch(updateData(dataEdit));
        setShowModalEdit(false);
        showNotiSuccess("Bạn đã cập nhật thành công");
    };

    const handleChangeInputCreate = (para, value) => {
        let preState = { ...dataCreate};
        preState[para] = value;
        setDataCreate({ ...preState });
    };

    const handleSubmitCreate = async () => {
        console.log(dataCreate);
        // dispatch(createData(dataCreate));
        setShowModalCreate(false);
        setDataCreate({});
    };

    return (
        <>
            <h2>Bảng {exportTableName(table)}</h2>
            <div className="list-btn-actions">
                <Button icon={<PlusOutlined />} onClick = {() => setShowModalCreate(true)}>Tạo</Button>
                <Button icon={<EditOutlined />} className="edit-btn hide">Chỉnh sửa</Button>
                <Button icon={<DeleteOutlined />} className="delete-btn hide">Xóa</Button>
            </div>
            <Table
                rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                bordered
                columns={column}
                dataSource={tableData}
            />
            <Modal
                title="Chỉnh sửa thông tin"
                open={showModalEdit}
                okText="Lưu"
                okType="primary"
                onOk={handleSubmitChange}
                cancelText="Hủy bỏ"
                onCancel={() => setShowModalEdit(false)}
            >
                <br />
                {column.map((column) => (
                    <Col span={22} key={column.title}>
                        <Form.Item label={column.title}>
                        <Input
                            name={column.dataIndex}
                            value={dataEdit[column.dataIndex]} 
                            onChange={(e) => handleChangeInput(column.dataIndex, e.target.value)}
                        />
                        </Form.Item>
                    </Col>
                ))}
            </Modal>
            <Modal
                title="Tạo thành phần"
                open={showModalCreate}
                okText="Lưu"
                okType="primary"
                onOk={handleSubmitCreate}
                cancelText="Hủy bỏ"
                onCancel={() => {
                    setShowModalCreate(false)
                    setDataCreate({})
                }}
            >
                <br />
                {column.map((column) => (
                    <Col span={22} key={column.title}>
                        <Form.Item label={column.title}>
                        <Input
                            name={column.dataIndex}
                            value={dataCreate[column.dataIndex]} 
                            onChange={(e) => handleChangeInputCreate(column.dataIndex, e.target.value)}
                        />
                        </Form.Item>
                    </Col>
                ))}
            </Modal>
        </>
    );
};

export default DataTable;