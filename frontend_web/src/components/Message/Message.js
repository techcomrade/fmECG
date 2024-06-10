import { useEffect, useRef } from "react";

const Message = ({data}) => {
    const className = `messages__item messages__item--${data.actor === 'user' ? 'operator': 'visitor'}`;
    const ref = useRef();

    useEffect(() => {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [data]);

    return (
        <div className={className} ref={ref}>
            {data.message}
            {data.img && <img src={data.img} alt=""/>}
        </div>
    )
}

export default Message;
