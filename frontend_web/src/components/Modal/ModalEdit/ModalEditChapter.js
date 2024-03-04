import { Row, Col, Form, Input, Button, Modal, Select, Checkbox } from 'antd';
import { httpGetData, httpUpdateData } from '../../../api/common.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showNotInfo, showNotiError } from "../../Notification";

const { TextArea } = Input;
const { Option } = Select;

const ModalEditChapter = (props) => {
    const [form] = Form.useForm();
    let [courseData, setCourse] = useState([]);
    let [chapterData, setChapter] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // Get ID from father component
    const id = props.id;
    console.log('id edit', id)
    const navigate = useNavigate();

    // Get data from Id
    useEffect(() => {
        async function fetchData() {
            const data = await httpGetData(`/chapter/${id}`);
            setChapter(data[0]);
            const courseData = await httpGetData(`/courses`);
            setCourse(courseData);
        }
        fetchData();
    }, [refresh]);

    // Change data

    const handleOnChangeSelect = (value, para) => {
        let preState = {...chapterData};
        preState[para] = value;
        setChapter({...preState});
        console.log(preState);
    }

    const handleOnChangeInput = (event, para) => {
        let preState = {...chapterData};
        preState[para] = event.target.value;
        setChapter({...preState});
    }


    // Submit save the data
    const handleSubmit = async () => {
        const newChapterData = {
            course_id: chapterData.course_id,
            chapter_name: chapterData.chapter_name,
            chapter_number: chapterData.chapter_number
        }
        let isUpdate = true;
        console.log("New data: ", newChapterData);
        const updateQues = await httpUpdateData(`/chapter/${id}/update`, newChapterData);
        if(!updateQues) isUpdate = false;
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
                title="Chỉnh sửa chương học"
                open={props.isOpen}
                okText="Lưu"
                okType='primary'
                onOk={handleSubmit}
                cancelText="Hủy bỏ"
                onCancel={props.handleCancel}
                width={1000}
            >
                <br />
                <div>
                    <Col span={22} offset={1}>
                    <Row>
                    <Col span={20}>
                        <Form.Item label="Môn học">
                        <Select
                            placeholder="Chọn môn học"
                            allowClear
                            name="course_id"
                            value={chapterData ? chapterData.course_id: ''}
                            onChange={id => handleOnChangeSelect(id, 'course_id')}
                        >
                            {courseData.map(course => <Option value={course.id}>{course.name}</Option>)}
                        </Select>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item label="Tên chương" >
                        <Input name="chapter_name"
                               value={chapterData ? chapterData.chapter_name : ''}
                               onChange={e => handleOnChangeInput(e, 'chapter_name')}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item label="Số thứ tự chương" >
                        <Input name="chapter_number"
                               value={chapterData ? chapterData.chapter_number : ''}
                               onChange={e => handleOnChangeInput(e, 'chapter_number')}
                        />
                        </Form.Item>
                    </Col>
                </Row>
                </Col>
                </div>
            </Modal>
        </>
    )
}

export default ModalEditChapter;