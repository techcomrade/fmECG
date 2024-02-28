import { Row, Col, Form, Input, Button, Modal, Select, Checkbox } from 'antd';
import { httpGetData, httpUpdateData } from '../../../api/common.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showNotInfo, showNotiError } from '../../Notification';

const { TextArea } = Input;
const { Option } = Select;

const ModalEditQuestion = (props) => {
    const [form] = Form.useForm();
    let [courseData, setCourse] = useState([]);
    let [chapterData, setChapter] = useState([]);
    let [sectionList, setSection] = useState([]);
    let [levelList, setLevel] = useState([]);
    let [questionData, setQuestion] = useState([]);
    let [answerData, setAnswer] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // Get ID from father component
    const id = props.id;
    console.log('id edit', id)
    const navigate = useNavigate();

    // Get data from Id
    useEffect(() => {
        async function fetchData() {
            const data = await httpGetData(`/question/${id}`);
            setQuestion(data[0]);
            const answer = await httpGetData(`/question/${id}/answers`)
            setAnswer(answer);
            const levelData = await httpGetData(`/levels`);
            setLevel(levelData);
            const chapterId = props.data.chapter_id;
            const sectionData = await httpGetData(`/list-sections/${chapterId}`);
            setSection(sectionData);
        }
        fetchData();
    }, [refresh]);

    // Change data

    const handleOnChangeSelect = (value, para) => {
        let preState = {...questionData};
        preState[para] = value;
        setQuestion({...preState});
        console.log(preState);
    }

    const handleOnChangeQuestion = (event, para) => {
        let preState = {...questionData};
        preState[para] = event.target.value;
        setQuestion({...preState});
    }

    const handleOnChangeAnswerInput = (event, id) => {
        let preState = {...answerData};
        preState[id].answer_name = event.target.value;
        setAnswer({...preState});
    }

    const handleOnChangeAnswerCheck = (event, id) => {
        let preState = {...answerData};
        preState[id].correct_answer = event.target.checked === true ? 1 : 0 ;
        setAnswer({...preState});
    }

    // Submit save the data
    const handleSubmit = async () => {
        const newQuestionData = {
            section_id: questionData.section_id,
            level_id: questionData.level_id,
            question_name: questionData.question_name
        };
        let isUpdate = true;
        console.log("New data: ", newQuestionData);
        const updateQues = await httpUpdateData(`/question/${id}/update`, newQuestionData);
        if(!updateQues) isUpdate = false;
        for(let i = 0; i < 4 ;i++) {
            const {id, ...newAnswerData} = answerData[i];
            const updateAns = await httpUpdateData(`/answer/${id}/update`, newAnswerData);
            if(!updateAns) {
                isUpdate = false;
                break;
            }
        }
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
                title="Chỉnh sửa câu hỏi"
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
                            <Col span={10}>
                                <Form.Item label="Môn học">
                                    <Input name="course_name" disabled={true} value={props.data.course_name}/>
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={2}>
                                <Form.Item label="Chương">
                                    <Input name="chapter_name" disabled={true} value={props.data.chapter_name}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={10}>
                                <Form.Item label="Phần">
                                <Select
                                placeholder="Chọn phần"
                                allowClear
                                name='section_id'
                                value={questionData ? questionData.section_id: ''}
                                onChange={id => handleOnChangeSelect(id, 'section_id')}
                                >
                                    {sectionList.map(section => <Option value={section.id}>{section.section_name}</Option>)}
                                </Select>
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={2}>
                                <Form.Item label="Độ khó">
                                <Select
                                placeholder="Chọn độ khó"
                                allowClear
                                name='level_id'
                                value={questionData ? questionData.level_id : ''}
                                onChange={id => handleOnChangeSelect(id, 'level_id')}
                                >
                                    {levelList.map(level => <Option value={level.id}>{level.level}</Option>)}
                                </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <Form.Item label="Câu hỏi" >
                                    <TextArea rows={3} 
                                              name="question_name" 
                                              value={questionData ? questionData.question_name : ''}
                                              onChange={e => handleOnChangeQuestion(e, 'question_name')}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <p>Đáp án</p>
                        <Row>
                            <Col span={10}>
                                <Form.Item label="1" >
                                    <Input name="answer1" 
                                           value={answerData[0] ? answerData[0].answer_name : ''}
                                           onChange={e => handleOnChangeAnswerInput(e, 0)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox name="answer1Right" 
                                              checked={answerData[0] ? answerData[0].correct_answer === 1 ? true : '' : ''}
                                              onChange={e => handleOnChangeAnswerCheck(e, 0)}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={2}>
                                <Form.Item label="2" >
                                    <Input name="answer2" 
                                           value={answerData[1] ? answerData[1].answer_name : ''}
                                           onChange={e => handleOnChangeAnswerInput(e, 1)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox name="answer2Right" 
                                              checked={answerData[1] ? answerData[1].correct_answer === 1 ? true : '' : ''}
                                              onChange={e => handleOnChangeAnswerCheck(e, 1)}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={10}>
                                <Form.Item label="3" >
                                    <Input name="answer3" 
                                           value={answerData[2] ? answerData[2].answer_name : ''}
                                           onChange={e => handleOnChangeAnswerInput(e, 2)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox name="answer3Right" 
                                              checked={answerData[2] ? answerData[2].correct_answer === 1 ? true : '' : ''}
                                              onChange={e => handleOnChangeAnswerCheck(e, 2)}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={2}>
                                <Form.Item label="4">
                                    <Input name="answer4" 
                                           value={answerData[3] ? answerData[3].answer_name : ''}
                                           onChange={e => handleOnChangeAnswerInput(e, 3)}
                                    />
                                </Form.Item>
                                <Form.Item >
                                    <Checkbox name="answer4Right" 
                                              checked={answerData[3] ? answerData[3].correct_answer === 1 ? true : '' : ''}
                                              onChange={e => handleOnChangeAnswerCheck(e, 3)}
                                    ></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </Modal>
        </>
    )
}

export default ModalEditQuestion;
