import React, { useState, useEffect } from "react";
import "./chat.scss";
import {
  loadMessages,
  resetGetMessageStatus,
  resetSendMessageStatus,
  sendMessage as sendMessageRedux,
} from "../../redux/reducer/chatSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { Chat, MessageRequest } from "../../api";
import { ApiLoadingStatus } from "../../utils/loadingStatus";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export const ChatMes: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataState = useAppSelector((state) => state.chat);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receivedMessage");
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        senderId: "1",
        message: newMessage,
        timestamp: new Date().toLocaleString(),
      };

      setNewMessage("");
      
      const messageRequest = new MessageRequest();
      dispatch(sendMessageRedux(messageRequest));
    }
  };

  useEffect(() => {
    dispatch(loadMessages({
      senderId: "1",
      receiverId: "23",
      groupChatId: "mina mina"
    }));
  }, [dispatch]);

  useEffect(() => {
    if (dataState.loadGetMessageStatus === ApiLoadingStatus.Success) {
      setMessages(dataState.messages);
      dispatch(resetGetMessageStatus());
    }
  }, [dataState.loadGetMessageStatus, dispatch]);

  useEffect(() => {
    if (dataState.loadSendMessageStatus === ApiLoadingStatus.Success) {
      dispatch(resetSendMessageStatus());
    }
  }, [dataState.loadSendMessageStatus, dispatch]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Tin nhắn cộng đồng</h2>
      </div>

      <div className="chat-messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.senderId === "1" ? "self" : "other"}`}
            >
              <strong>{msg.user}:</strong> <span>{msg.message}</span> 
              <em>{msg.timestamp}</em>
            </div>
          ))
        ) : (
          <div>No messages yet!</div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
