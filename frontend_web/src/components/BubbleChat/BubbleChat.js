import { useEffect, useState } from 'react';
import './BubbleChat.scss'
import { MessageOutlined, FileImageOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Message from '../Message/Message';

const BubbleChat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            actor: 'user',
            message: "Hi, konichiwa"
        },
        {
            id: 2,
            actor: 'visitor',
            message: "Chào bạn"
        },
        {
            id: 3,
            actor: 'user',
            img: 'logo192.png'
        }
    ]);
    const [text, setText] = useState("");
    const [img, setImg] = useState("");

    useEffect(() => {
        sentMessage();
    }, [img])

    const toogleChat = () => {
        const chatBox = document.querySelector('.chatbox__support').classList;
        chatBox.toggle('chatbox--active');
    }

    const getImgChange = async(e) => {
        if (e.target.files.length > 0) {
            const src = URL.createObjectURL(e.target.files[0]);
            setImg(src);
        }
    }

    const sentMessage = () => {
        const state = messages;
        if (text) {
            state.push({
                id: state.length + 1,
                actor: 'user',
                message: text
            });
            setMessages(state);
            setText("");
        }
        if (img) {
            state.push({
                id: state.length + 1,
                actor: 'user',
                img: img
            });
            setMessages(state);
            setImg("");
        }
    }

    const handleOnKey = (e) => {
        if(e.key === "Enter"){
            sentMessage();
        }
    }

    return (
        <>
            <div className="container">
                <div className="chatbox">
                    <div className="chatbox__support">
                        <div className="chatbox__header">
                            <div className="chatbox__content--header">
                                <h4 className="chatbox__heading--header">Chat support</h4>
                                <p className="chatbox__description--header">Hi. My name is Sam. How can I help you?</p>
                            </div>
                            <div className='chatbox__header--close' onClick={() => toogleChat()}>
                                <CloseOutlined />
                            </div>
                        </div>
                        <div className="chatbox__messages">
                            {messages.map(item => <Message data={item} key={item.id}/>)}
                        </div>
                        <div className="chatbox__footer">
                            <input 
                                type="text" 
                                placeholder="Write a message..." 
                                onChange={(e) => setText(e.target.value)} 
                                value={text}
                                onKeyDown={handleOnKey}
                            />
                            <input type='file' id='file' accept="image/*" onChange={e => getImgChange(e)}/>
                            <label htmlFor='file'>
                                <div className='img-btn'>
                                    <FileImageOutlined />
                                </div>
                            </label>
                            <Button type="primary"  className="chatbox__send--footer send__button" onClick={() => sentMessage()}>Gửi</Button>
                        </div>
                    </div>
                    <div className="chatbox__button">
                        <button onClick={() => toogleChat()}><MessageOutlined /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BubbleChat;