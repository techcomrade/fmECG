import React, { useState } from "react";
import { FileImageOutlined } from "@ant-design/icons";
import "./chat.scss";

const AITraining = () => {
  const [message, setMessage] = useState([
    {
      id: 0,
      actor: "user",
      message:
        "Quy trình đăng ký sử dụng: người dùng đăng ký thông tin tài khoản sau đó admin sẽ xét duyệt và gửi thông tin về email của người dùng, sau đó người dùng sẽ được chỉ định bởi một bác sĩ điều trị và sử dụng hệ thống",
    },
    {
      id: 1,
      actor: "system",
      message: "Dữ liệu đã tích hợp thành công",
    },
  ]);
  return (
    <div className="chat-container">
      <div className="sidebar">
        <div className="navbar">
          <span className="logo">Danh sách trợ lý ảo</span>
        </div>
        <div className="chats">
          <div
            className="userChat"
            // key={chat[0]}
            // onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={/*chat[1].userInfo.photoURL*/ "ai.png"} alt="" />
            <div className="userChatInfo">
              <span>
                {/* {chat[1].userInfo.displayName} */}
                ECG AI
              </span>
              <p>
                {/* {chat[1].lastMessage?.text} */}
                Mời bạn nhập dữ liệu ...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="chat">
        <div className="chatInfo">
          <span>ECG AI</span>
        </div>
        <div className="messages">
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
                  "ai.png"
                }
                alt=""
              />
              {/* <span>just now</span> */}
            </div>
            <div className="messageContent">
              {/* <p>{message.text}</p> */}
              <p> Mời bạn nhập dữ liệu huấn luyện cho trợ lý ảo </p>
              {/* {message.img && <img src={message.img} alt="" />} */}
            </div>
          </div>
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
                        "avatar.png"
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
                        "ai.png"
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
            //   onChange={(e) => setText(e.target.value)}
            //   value={text}
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
            // onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITraining;
