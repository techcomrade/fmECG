import React, { useCallback, useState } from "react";
import { FileImageOutlined } from "@ant-design/icons";
import "./chat.scss";

const AITraining = () => {
  const [text,setText] = useState("")
  const [message, setMessage] = useState([
    {
      id: 0,
      actor: "system",
      message:
        "Chào bạn, tôi là bác sĩ Dũng. Hiện tại, huyết áp của của bạn đang khá cao. Bạn cần điều chỉnh lại khẩu phần ăn của mình với rau củ, trái cây, ngũ cốc; hạn chế sử dụng thực phẩm nhiều đường, dầu mỡ hay quá mặn. Cùng với đó là hạn chế sử dụng đồ uống có cồn, cafein và tăng cường thể dục nhé. ",
    },
    {
      id: 1,
      actor: "user",
      message: "Chào bác sĩ, cảm ơn bác sĩ. Tôi sẽ chú ý hơn trong sinh hoạt.",
    },
    {
      id: 2,
      actor: "system",
      message:
        "Bạn hãy chú ý hơn nhé. Khoảng 2,3 tuần nữa bạn quay lại khám nhé",
    },
    {
      id: 3,
      actor: "user",
      message: "Vâng cảm ơn bác sĩ rất nhiều ạ",
    },
  ]);

  const handleSend = useCallback(()=>{
    setMessage((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        actor: "user",
        message: text
      }
    ])
    setText("");
  },[text])
  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="navbar">
          <span className="logo">Chat giữa bác sĩ - bệnh nhân</span>
        </div>
        <div className="search">
          <div className="searchForm">
            <input
              type="text"
              placeholder="Tìm người dùng"
              // onKeyDown={handleKey}
              // onChange={(e) => setUsername(e.target.value)}
              // value={username}
            />
          </div>
        </div>
        <div className="chats">
          <div
            className="userChat"
            // key={chat[0]}
            // onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={/*chat[1].userInfo.photoURL*/ "user.png"} alt="" />
            <div className="userChatInfo">
              <span>
                {/* {chat[1].userInfo.displayName} */}
                Bác sĩ Dũng
              </span>
              <p>
                {/* {chat[1].lastMessage?.text} */}
                Vâng cảm ơn bác sĩ rất nhiều ạ
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="chat">
        <div className="chatInfo">
          <span>Bác sĩ Dũng</span>
        </div>
        <div className="messages">
         
          {message &&
            message.map((item, index) =>
              item.actor === "user" ? (
                <div
                  // ref={ref}
                  className={`message owner`}
                >
                  <div className="messageInfo">
                    <img
                      src={
                        // message.senderId === currentUser.uid
                        // ? currentUser.photoURL
                        // : data.user.photoURL
                        "user.png"
                      }
                      alt=""
                    />
                    {/* <span>just now</span> */}
                  </div>
                  <div className="messageContent">
                    {/* <p>{message.text}</p> */}
                    <p>
                      {item.message}
                    </p>
                    {/* {message.img && <img src={message.img} alt="" />} */}
                  </div>
                </div>
              ) : (
                <div
                  // ref={ref}
                  // className={`message ${message.senderId === currentUser.uid && "owner"}`}
                  className={`message`}
                  // className={`message owner`}
                >
                  <div className="messageInfo">
                    <img
                      src={
                        // message.senderId === currentUser.uid
                        // ? currentUser.photoURL
                        // : data.user.photoURL
                        "avatar.png"
                      }
                      alt=""
                    />
                    {/* <span>just now</span> */}
                  </div>
                  <div className="messageContent">
                    {/* <p>{message.text}</p> */}
                    <p> {item.message}</p>
                    {/* {message.img && <img src={message.img} alt="" />} */}
                  </div>
                </div>
              )
            )}
         
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Type something..."
              onChange={(e) => setText(e.target.value)}
              value={text}
          />
          <div className="send">
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              // onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
              {/* <img src={Img} alt="" /> */}
              <FileImageOutlined />
            </label>
            <button
            onClick={handleSend}
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITraining;
