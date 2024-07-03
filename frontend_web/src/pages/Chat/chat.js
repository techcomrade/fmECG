import React, { useState } from "react";
import { FileImageOutlined } from "@ant-design/icons";
import "./chat.scss";

const AITraining = () => {
  const [message, setMessage] = useState([
    {
      id: 0,
      actor: "user",
      message:
        "Chào bạn, tôi là bác si Dương tôi sẽ hỗ trợ bạn sử dụng thiết bị, nếu có bất kỳ vấn đề gì hãy nhắn tin cho tôi ",
    },
    {
      id: 1,
      actor: "system",
      message: "chào bác sĩ, cảm ơn bác sĩ",
    },
    {
      id: 3,
      actor: "user",
      message:
        "bạn vui lòng cung cấp cho thêm về tiền sử bệnh án về tim mạch và huyết áp của bạn. ",
    },
    {
      id: 4,
      actor: "system",
      message: "tôi bị huyết áp cao còn lại các vấn đề khác bình thường",
    },
    ,
    {
      id: 3,
      actor: "user",
      message:
        "tôi sẽ ghi nhận lại thông tin của bạn, ngoài ra bạn từng đi kiểm tra tổng quát sức khoẻ chưa",
    }
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
            <img src={/*chat[1].userInfo.photoURL*/ "user.png"} alt="" />
            <div className="userChatInfo">
              <span>
                {/* {chat[1].userInfo.displayName} */}
                Dũng
              </span>
              <p>
                {/* {chat[1].lastMessage?.text} */}
                Chào bạn, tôi là bác si Dương ...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="chat">
        <div className="chatInfo">
          <span>Nam</span>
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
                        "user.png"
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
