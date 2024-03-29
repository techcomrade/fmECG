import { Avatar, Card } from 'antd';
import { UnorderedListOutlined, FileTextOutlined, UserOutlined, HomeOutlined, QuestionCircleOutlined, UsergroupAddOutlined} from '@ant-design/icons';
import './home.scss';
import { useEffect, useState } from 'react';
import { httpGetData } from '../../api/common.api';

const { Meta } = Card;
const Home = () => {
    let [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const dataCount = await httpGetData(`/get-count`);
            setData(dataCount);
        }
        fetchData();
    }, [refresh]);

    return (
        <>
            <h2 style={{textAlign: 'center', marginTop: '0'}}>Chào mừng bạn đến với web</h2>
            
        </>
    )
}
export default Home;