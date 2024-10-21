import {Row, Col,Form,Input} from 'antd';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { httpGetData, httpUpdateData } from '../../api/common.api';
import { showNotInfo, showNotiError } from '../Notification';

const ModalEdit = (props) => {
    const [userData, setUserData] = useState([]);
    const columns = props.columns;
    
    // const handleSubmit = async()=>{
    //     let {id,...updateData} = userData;
    //     updateData['update_at'] = new Date();
    //     updateData['old_id'] = id;
    //     let wait = await httpUpdateData(`/user/${id}/update`, updateData);   
    //     if(wait){
    //         showNotInfo('Bạn đã cập nhật thông tin');
    //         window.location.reload(false);
    //     }
    //     else showNotiError("Đang có lỗi");
    // }

    const handleChange = (e, para)=>{
        let preState = {...userData};
        preState[para] = e.target.value;
        setUserData({...preState});
    }
    
    // useEffect(()=>{
    //     async function fetchData (){
    //         const data = await httpGetData(`/user/${props.id}`)
    //         setUserData(data[0]);
    //     }
    //     fetchData()
    // },[])
  return (
    <>
      <Modal
                title="Chỉnh sửa thông tin"
                open = {props.isOpen}
                okText="Lưu"
                okType='primary'
                // onOk={handleSubmit}
                cancelText="Hủy bỏ"
                onCancel={props.handleCancel}
            >
                <br />
                    {columns.map(column => 
                        <Col span={22} >
                            <Form.Item label= {column.title}>
                            <Input name={column.dataIndex} onChange={(e) => handleChange(e, column.dataIndex)}/>
                            </Form.Item>
                        </Col>
                    )}
            </Modal>
    </>
  );
};
export default ModalEdit;