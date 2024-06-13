import Sidebar from "../Sidebar/sidebar";
import HeaderUser from "../Header/header";
import { Layout, Col, theme } from "antd";
import "./DefaultLayout.css";
import { Routes } from "../route";
import { HashRouter } from "react-router-dom";
import BubbleChat from "../../components/BubbleChat/BubbleChat";

const { Header, Content } = Layout;

const DefaultLayout = ({ children }) => {
  return (
    <HashRouter>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header style={{backgroundColor: "#f5f5f5"}}>
            <HeaderUser />
          </Header>
          <Layout>
            <Content className="main-content">
              <Col span={22} offset={1} className="children-content">
                <div className="content">
                  <Routes />
                </div>
              </Col>
            </Content>
            <BubbleChat />
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default DefaultLayout;
