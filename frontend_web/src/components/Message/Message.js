import { useEffect, useRef } from "react";

const Message = ({data}) => {
    const className = `message ${data.actor === 'user' ? 'owner': ''}`;
    const ref = useRef();

    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    return (
        <div className={className} ref={ref}>
            {data?.avatar && <div className="messageInfo">
                <img
                    src={ data.avatar }
                    alt=""
                />
                <span>just now</span>
            </div>
            }
            <div className="messageContent">
                <p dangerouslySetInnerHTML={{ __html: ` ${data.message.replace(/\n/g, '<br>')}` }}/>
                {data.img && <img src={data.img} alt=""/>}
            </div>
        </div>
    )
}

export default Message;
