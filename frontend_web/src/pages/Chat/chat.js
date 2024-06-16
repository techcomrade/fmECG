import React from "react";
import { FileImageOutlined } from "@ant-design/icons";
import './chat.scss';

const Chat = () => {
   const data = [
      {
         actor: 'user',
         message: 'Konichiwa',
         avatar: 'logo192.png'
      },
      {
         actor: 'visitor',
         message: 'Abc',
         avatar: 'logo192.png'
      }
   ]
 return (
   <div className="chat-container">
      <div className="sidebar">
         <div className="navbar">
            <span className="logo">Chat</span>
         </div>
         <div className="chats">
            <div
               className="userChat"
               // key={chat[0]}
               // onClick={() => handleSelect(chat[1].userInfo)}
            >
               <img src={/*chat[1].userInfo.photoURL*/ 'logo192.png'} alt="" />
               <div className="userChatInfo">
                  <span>
                     {/* {chat[1].userInfo.displayName} */}
                     Antony
                  </span>
                  <p>
                     {/* {chat[1].lastMessage?.text} */}
                     Konichiwa
                  </p>
               </div>
            </div>
         </div>
      </div>
      <div className="chat">
         <div className="chatInfo">
         <span>
            {/* {data.user?.displayName} */}
            Antony
         </span>
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
                        'logo192.png'
                     }
                     alt=""
                  />
                  <span>just now</span>
               </div>
               <div className="messageContent">
                  {/* <p>{message.text}</p> */}
                  <p>Konichiwa</p>
                  {/* {message.img && <img src={message.img} alt="" />} */}
               </div>
            </div>
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
                        'logo192.png'
                     }
                     alt=""
                  />
                  <span>just now</span>
               </div>
               <div className="messageContent">
                  {/* <p>{message.text}</p> */}
                  <p>Abc</p>
                  {/* {message.img && <img src={message.img} alt="" />} */}
               </div>
            </div>
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
 )   
}

export default Chat;