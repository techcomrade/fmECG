import { Table, Modal, Button, Input, Space } from 'antd';
import { exportColumnTable, exportDataTable, exportTableName } from '../../models/manage.table';
import { useEffect, useRef, useState } from 'react';
import { showDeleteConfirm } from '../Modal/ModalDelete';
import ModalEditCourse  from '../Modal/ModalEdit/ModalEditCourse';
import ModalEditQuestion  from '../Modal/ModalEdit/ModalEditQuestion';
import ModalEditUser from '../Modal/ModalEdit/ModalEditUser';
import ModalEditChapter from '../Modal/ModalEdit/ModalEditChapter';
import ModalEditSection from '../Modal/ModalEdit/ModalEditSection';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const DataTable = () => {
    const [column, setColumn] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [idEdit, setId] = useState();
    const [index, setIndex] = useState()
    const navigate = useNavigate();

    const url = window.location.pathname;
    const urlArray = url.split("/");
    const table = urlArray.pop();
    const fatherId = urlArray.pop();
    
    useEffect(() => {
        const columnTable = exportColumnTable(table, callBack, getColumnSearchProps);
        setSearchText('');
        setSearchedColumn('');
        setColumn(columnTable);
        const getTableData = async () => {
            const data = await exportDataTable(table, fatherId);
            if (data) setTableData(data);
        };
        getTableData();
    }, [url]);

    // Call when click button
    const callBack = (type, id, index) => {
        if (type === 'edit') {
            setId(id);
            setIndex(index);
            setShowModalEdit(true);
        }
        if (type === 'delete') showDeleteConfirm(table, id);
    }

    // Show modal create
    const showModalCreate = (table) => {
        table = table.slice(0, -1);
        navigate('/create-' + table)
    }

    // Filter table
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
            style={{
            padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
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
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                width: 90,
                }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({
                    closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
                }}
            >
                Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        ,
        onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
            ''
        ) : (
            text
        ),
    });

    return (
        <>
            <h2>Bảng {exportTableName(table)}</h2>
            <Button onClick={() => showModalCreate(table)} style={{left: '90%', bottom: '10px'}}>Tạo</Button>
            <Table bordered columns={column} dataSource={tableData}/>
            { showModalEdit && table === "courses" ? <ModalEditCourse id={idEdit} isOpen={showModalEdit} handleCancel={() => setShowModalEdit(false)}/> : "" }
            { showModalEdit && table === "questions" ? <ModalEditQuestion id={idEdit} isOpen={showModalEdit} handleCancel={() => setShowModalEdit(false)} data={tableData[index]}/> : "" }
            { showModalEdit && table === "users" ? <ModalEditUser id={idEdit} isOpen={showModalEdit} handleCancel={() => setShowModalEdit(false)}/> : "" }
            { showModalEdit && table === "chapters" ? <ModalEditChapter id={idEdit} isOpen={showModalEdit} handleCancel={() => setShowModalEdit(false)}/> : "" }
            { showModalEdit && table === "sections" ? <ModalEditSection id={idEdit} isOpen={showModalEdit} handleCancel={() => setShowModalEdit(false)} data={tableData[index]}/> : "" }
        </>
    );
} 

export default DataTable;