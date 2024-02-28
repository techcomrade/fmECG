
import {Row, Col,Form,Input} from 'antd';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { httpGetData, httpUpdateData } from '../../../api/common.api';
import { showNotInfo, showNotiError } from '../../Notification';

const ModalEditUser = (props) => {
    const [userData, setUserData] = useState([]);
    const handleSubmit = async()=>{
        let {id,...updateData} = userData;
        updateData['update_at'] = new Date();
        updateData['old_id'] = id;
        let wait = await httpUpdateData(`/user/${id}/update`, updateData);   
        if(wait){
            showNotInfo('Bạn đã cập nhật thông tin');
            window.location.reload(false);
        }
        else showNotiError("Đang có lỗi");
    }
    const handleChange = (e,para)=>{
        let preState = {...userData};
        preState[para] = e.target.value;
        setUserData({...preState});
    }
    useEffect(()=>{
        async function fetchData (){
            const data = await httpGetData(`/user/${props.id}`)
            setUserData(data[0]);
        }
        fetchData()
    },[])
  return (
    <>
      <Modal
                title="Chỉnh sửa thông tin cá nhân"
                open = {props.isOpen}
                okText="Lưu"
                okType='primary'
                onOk={handleSubmit}
                cancelText="Hủy bỏ"
                onCancel={props.handleCancel}
                width={1000}
            >
                <br />
                <Row>
                    <Col span={10} >
                        <Form.Item label="Họ và tên">
                        <Input name="name" value={userData ? userData.name : ""} onChange={(e) => handleChange(e,'name')}/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item label="Mã số cán bộ">
                        <Input name="code" value={userData.code} onChange={(e) => handleChange(e,'code')}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="Gender" >
                        <Input name="gender" value={userData.gender} onChange={(e) => handleChange(e,'gender')}/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item label="Data of birth">
                        <Input name="birthday" value={userData.birthday} onChange={(e) => handleChange(e,'birthday')}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="Email">
                        <   Input name="email" value={userData.email} disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item label="password">
                            <Input type='password' value={userData.password} name="password" disabled/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={10}>
                        <Form.Item label="School">
                        <   Input name="school" value={userData.school} onChange={(e) => handleChange(e,'school')}/>
                        </Form.Item>
                    </Col>
                    <Col span={10} offset={2}>
                        <Form.Item label="Faculty">
                            <Input value={userData.faculty} name="faculty" onChange={(e) => handleChange(e,'faculty')}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Modal>
    </>
  );
};
export default ModalEditUser;