import { Modal } from 'antd';
import { httpGetData, httpUpdateData } from '../../api/common.api';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { info } = Modal;

export const showQuestionInfo = async (data) => {
    const answerList = await httpGetData(`/question/${data.id}/answers`)
    info({
      title: 'Thông tin câu hỏi',
    //   icon: <ExclamationCircleFilled />,
      content: (
        <>
            <p><b>Câu hỏi:</b> {data.question_name}</p>
            <p><i>Môn học: {data.course_name}</i></p>
            {answerList.map((answer, index) => 
                <p style={answer.correct_answer === 1 ? {color: '#52c41a'}: {}}>{answer.answer_name} </p>
            )}
        </>
      ),
    //   okText: 'Ok',
    //   okType: 'danger',
    //   cancelText: 'Không',
      onOk() {},
      width: 600
    });
}; 