import { Row, Col, Form, Input, Button, Modal, Select, Checkbox } from 'antd';
import { httpGetData, httpUpdateData } from '../../../api/common.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showNotInfo, showNotiError } from '../../Notification';

const { TextArea } = Input;
const { Option } = Select;

const ModalEditSection = (props) => {
    let [chapterList, setChapter] = useState([]);
    let [sectionData, setSection] = useState([]);

    console.log(props)
    const [refresh, setRefresh] = useState(false);

    // Get ID from father component
    const id = props.id;
    console.log('id edit', id)
    const navigate = useNavigate();

    // Get data from Id
    useEffect(() => {
        async function fetchData() {
            const data = await httpGetData(`/section/${id}`);
            setSection(data[0]);
            const courseId = props.data.course_id;
            const chapterData = await httpGetData(`/list-chapters/${courseId}`);
            setChapter(chapterData);
        }
        fetchData();
    }, [refresh]);

    // Change data

    const handleOnChangeSelect = (value, para) => {
        let preState = {...sectionData};
        preState[para] = value;
        setSection({...preState});
    }

    const handleOnChangeInput = (event, para) => {
        let preState = {...sectionData};
        preState[para] = event.target.value;
        setSection({...preState});
    }

    // Submit save the data
    const handleSubmit = async () => {
        const newSectionData = {
            chapter_id: sectionData.chapter_id,
            section_name: sectionData.section_name
        }
        let isUpdate = true;
        console.log("New data: ", newSectionData);
        const updateQues = await httpUpdateData(`/section/${id}/update`, newSectionData);
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
                width={600}
            >
                <br />
                <div>
                    <Col span={22} offset={1}>
                    <Row>
                    <Col span={20}>
                        <Form.Item label="Môn học">
                        <Input
                            placeholder="Chọn môn học"
                            allowClear
                            name="course_name"
                            // value={chapterData ? chapterData.course_id: ''}
                            value={props.data.course_name}
                            disabled={true}
                        >
                        </Input>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item label="Chương học" >
                        <Select
                        placeholder="Chọn chương học"
                        allowClear
                        name="chapter_id"
                        value={sectionData ? sectionData.chapter_id : ''}
                        onChange={id => handleOnChangeSelect(id, 'chapter_id')}
                        >
                            {chapterList.map(chapter => <Option value={chapter.id}>{chapter.chapter_name}</Option>)}
                        </Select>
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item label="Tên phần" >
                        <Input name="section_name"
                               value={sectionData ? sectionData.section_name : ''}
                               onChange={e => handleOnChangeInput(e, 'section_name')}
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

export default ModalEditSection;

