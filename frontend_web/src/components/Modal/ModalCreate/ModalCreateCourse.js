import { Row, Col, Form, Input, Button, Modal } from 'antd';
import { httpGetData, httpUpdateData } from '../../../api/common.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ModalCreateCourse = () => {
    const [courseData, setCourse] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const navigate = useNavigate();

    // Change input
    const handleOnChangeInput = (event, para) => {
        let preState = {...courseData};
        preState[para] = event.target.value;
        setCourse({...preState});
    }

    // // Submit save the data
    // const handleSubmit = async () => {
    //     let {id, ...newData} = courseData;
    //     newData['old_id'] = id;
    //     newData['update_at'] = new Date();
    //     newData['update_id'] = 1;
    //     console.log("New data: ", newData);
    //     const isUpdate = await httpUpdateData(`/course/${id}/update`, newData);
    //     if(isUpdate) {
    //         // Refresh page
    //         window.location.reload(false);
    //     }
    //     else {
    //         alert('Đang có lỗi')
    //     }
    // }

    return(
        <>
            <Modal
                title="Chỉnh sửa môn học"
                // open={props.isOpen}
                okText="Lưu"
                okType='primary'
                // onOk={handleSubmit}
                cancelText="Hủy bỏ"
                // onCancel={handleCancel}
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

