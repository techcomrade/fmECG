import Sidebar from "../Sidebar/sidebar"
import HeaderUser from '../Header/header';
import { Layout, Col, theme } from "antd";
import { useState, useEffect } from 'react';
import './DefaultLayout.css'
import { getLocalStorage } from '../../utils/storageUtils';
import { Routes } from "../route";

const { Header, Content, Sider } = Layout;

const DefaultLayout = ({children}) => {
    const [state,setState] = useState('false');
    const userName = getLocalStorage('username');
    const token = getLocalStorage('token')
    useEffect(()=>{
    },[state])

    return(
        <div>
            <Layout style={{ height: "100vh" }}>
                <Header className="header-bar">
                    <HeaderUser userName = {userName} token = {token}/>
                </Header>
                <Layout>
                    <Sidebar />
                    <Layout>
                        <Content className="main-content">
                            <Col span={22} offset={1} className="children-content">
                                <div className="content"><Routes /></div>
                            </Col>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    )
}

export default DefaultLayout;