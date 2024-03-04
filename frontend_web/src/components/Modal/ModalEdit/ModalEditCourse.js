import { Row, Col, Form, Input, Button, Modal } from 'antd';
import { httpGetData, httpUpdateData } from '../../../api/common.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showNotInfo, showNotiError } from '../../Notification';

const ModalEditCourse = (props) => {
    const [courseData, setCourse] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // Get ID from father component
    const id = props.id;
    console.log('id edit', id)
    const navigate = useNavigate();

    // Get data from Id
    useEffect(() => {
        async function fetchData() {
            const data = await httpGetData(`/course/${id}`);
            setCourse(data[0]);
            console.log(data[0]);
        }
        fetchData();
    }, [refresh]);

    // Change input
    const handleOnChangeInput = (event, para) => {
        let preState = {...courseData};
        preState[para] = event.target.value;
        setCourse({...preState});
    }

    // Submit save the data
    const handleSubmit = async () => {
        let {id, ...newData} = courseData;
        newData['old_id'] = id;
        newData['update_at'] = new Date();
        newData['update_id'] = 1;
        console.log("New data: ", newData);
        const isUpdate = await httpUpdateData(`/course/${id}/update`, newData);
        if(isUpdate) {
            showNotInfo('Bạn đã cập nhật thông tin')
            // Refresh page
            window.location.reload(false);
        }
        else {
            showNotiError('Đang có lỗi')
        }
    }

    return(
        <>
            <Modal
                title="Chỉnh sửa môn học"
                open={props.isOpen}
                okText="Lưu"
                okType='primary'
                onOk={handleSubmit}
                cancelText="Hủy bỏ"
                onCancel={props.handleCancel}
            >
                <br />
                <Row>
                    <Col span={20}>
                        <Form.Item label="Tên môn học">
                        <Input value={courseData ? courseData.name : ""} name="name" onChange={event => handleOnChangeInput(event, 'name')}/>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item label="Mã học phần">
                        <Input value={courseData ? courseData.code : ""} name="code" onChange={event => handleOnChangeInput(event, 'code')}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ModalEditCourse;

