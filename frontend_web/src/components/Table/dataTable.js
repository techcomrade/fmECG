import { Table, Modal, Button, Input, Space } from 'antd';
import { exportColumnTable, exportDataTable, exportTableName } from '../../models/manage.table';
import { useEffect, useRef, useState } from 'react';
import { showDeleteConfirm } from '../Modal/ModalDelete';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import './dataTable.scss'
import ModalEdit from '../Modal/ModalEdit';

const DataTable = () => {
    const [column, setColumn] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [index, setIndex] = useState();
    const [showModalEdit, setShowModalEdit] = useState(false);
     const navigate = useNavigate();

    const data = [
        {
            index: 0,
            name: 'ABC',
            gender: 'Male',
            birthday: '10/02/1999',
            email: '',
            key: 1
        },
        {
            index: 1,
            name: 'ABC',
            gender: 'Male',
            birthday: '10/02/1999',
            email: '',
            key: 2
        }
    ]

    useEffect(() => {
        const columnTable = exportColumnTable('users');
        setColumn(columnTable);
    }, []);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            const delBtnClassList = document.getElementsByClassName('delete-btn')[0].classList;
            const editBtnClassList = document.getElementsByClassName('edit-btn')[0].classList;
            if(selectedRows.length === 1 ) {
                editBtnClassList.remove('hide');
                setIndex(selectedRows[0].index);
            }
            else editBtnClassList.add('hide');

            if (selectedRows.length > 0){
                delBtnClassList.remove('hide');
            }
            else delBtnClassList.toggle('hide');
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
    };
    const [selectionType, setSelectionType] = useState('checkbox');

    const handleEditBtn = () => {
        setShowModalEdit(true);
    }

    return (
        <>
            <h2>Bảng {}</h2>
            <div className='list-btn-actions'>
                <Button icon={<PlusOutlined />}>Add</Button>
                <Button icon={<EditOutlined /> } onClick={handleEditBtn} className='edit-btn hide'>Edit</Button>
                <Button icon={<DeleteOutlined />} className='delete-btn hide'>Delete</Button>
            </div>
            <Table rowSelection={{
                type: selectionType,
                ...rowSelection,
                }}
                bordered columns={column} dataSource={data}/>
            <ModalEdit isOpen={showModalEdit} handleCancel={() => setShowModalEdit(false)} columns={column}/>
        </>
    );
} 

export default DataTable;