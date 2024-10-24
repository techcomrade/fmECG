import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStatus,
  sendMessage,
  TrainingData,
} from "../../redux/reducer/aiChatSlice";
import "./BubbleChat.scss";
import {
  MessageOutlined,
  FileImageOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Modal, Checkbox } from "antd";
import Message from "../Message/Message";
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../../utils/storageUtils";

const BubbleChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.aiChat);
  const [openModal, setOpenModal] = useState(false);
  const user_id = getLocalStorage("user");
  const [messages, setMessages] = useState([
    {
      id: 1,
      actor: "operator",
      message:
        "Hi, tôi là ECG AI, tôi có thể tư vấn cho bạn về hệ thống và thông tin sức khoẻ của bạn",
    },
  ]);
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const sharePersonalInformation = getLocalStorage(
      "sharePersonalInformation"
    );

    if (!sharePersonalInformation) {
      setOpenModal(true);
    }
  }, []);

  //   useEffect(() => {
  //     sentMessage();
  //   }, [img]);

  //   useEffect(() => {
  //     if (props.message) {
  //       console.log(props.message);
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           id: prev.length + 1,
  //           actor: "visitor",
  //           messages: "dsfdsfdf",
  //         },
  //       ]);
  //     }
  //   }, [props.message]);

  const processMessageActionWeb = (messages) => {
    if (messages?.path) {
      navigate(messages.path);
      return `Tôi đang mở ${messages.text}`;
    }
    return messages;
  };
  useEffect(() => {
    if (dataState.loadDataStatus === loadStatus.Success) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          actor: "visitor",
          message: processMessageActionWeb(dataState.data),
        },
      ]);
    }
  }, [dataState]);

  const toogleChat = () => {
    const chatBox = document.querySelector(".chatbox__support").classList;
    chatBox.toggle("chatbox--active");
  };

  //   const getImgChange = async (e) => {
  //     if (e.target.files.length > 0) {
  //       const src = URL.createObjectURL(e.target.files[0]);
  //       setImg(src);
  //     }
  //   };

  const sentMessage = () => {
    const state = messages;

    if (text) {
      state.push({
        id: state.length + 1,
        actor: "user",
        message: text,
      });
      setMessages(state);
      dispatch(sendMessage(text));
      setText("");
    }
    if (img) {
      state.push({
        id: state.length + 1,
        actor: "user",
        img: img,
      });
      setMessages(state);
      setImg("");
    }
  };

  const handleOnKey = (e) => {
    if (e.key === "Enter") {
      sentMessage();
    }
  };
  const handleOKModal = () => {
    if (user_id) {
      dispatch(TrainingData(user_id));
      localStorage.setItem("sharePersonalInformation", "true");
      toogleChat()
    }
    setOpenModal(false);
  };
  const onChange = (e) => {
    if (e.target.checked) {
      setOpenModal(false);
      localStorage.setItem("sharePersonalInformation", "true");
    }
  };
  return (
    <>
      <div className="container">
        <div className="chatbox">
          <div className="chatbox__support">
            <div className="chatbox__header">
              <div className="chatbox__content--header">
                <h4 className="chatbox__heading--header">ECG AI</h4>
                {/* <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p> */}
              </div>
              <div
                className="chatbox__header--close"
                onClick={() => toogleChat()}
              >
                <CloseOutlined />
              </div>
            </div>
            <div className="chatbox__messages">
              {messages.map((item, index) => (
                <Message data={item} key={item.id} />
              ))}
            </div>
            <div className="chatbox__footer">
              <input
                type="text"
                placeholder="Write a message..."
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={handleOnKey}
              />
              {/* <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => getImgChange(e)}
              /> */}
              <label htmlFor="file">
                <div className="img-btn">
                  <FileImageOutlined />
                </div>
              </label>
              <Button
                type="primary"
                className="chatbox__send--footer send__button"
                onClick={() => sentMessage()}
              >
                Gửi
              </Button>
            </div>
          </div>
          <div className="chatbox__button">
            <button
              onClick={() => toogleChat()}
              className="chat-icon"
              style={{ backgroundColor: "#a4caff" }}
            >
              <span>ECG-AI</span> 
              <MessageOutlined />
            </button>
          </div>
        </div>
      </div>
      <Modal
        title="Quyền dữ liệu riêng tư"
        cancelText="Huỷ"
        open={openModal}
        onOk={handleOKModal}
        onCancel={() => setOpenModal(false)}
      >
        <p>
          Dữ liệu cá nhân của bạn sẽ được sử dụng để huấn luyện trợ lý ảo, điều
          này sẽ giúp trợ lý ảo tư vấn cho bạn chính xác và cụ thể hơn. Nếu bạn
          không đồng ý hãy nhấn "Huỷ"
        </p>
        <Checkbox onChange={onChange}>Không hiện lại thông báo này</Checkbox>
      </Modal>
    </>
  );
};

export default BubbleChat;
