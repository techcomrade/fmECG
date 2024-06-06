import Sidebar from "../Sidebar/sidebar";
import HeaderUser from "../Header/header";
import { Layout, Col, theme } from "antd";
import "./DefaultLayout.css";
import { getLocalStorage } from "../../utils/storageUtils";
import { Routes } from "../route";
import { HashRouter } from "react-router-dom";

const { Header, Content } = Layout;

const DefaultLayout = ({ children }) => {
  const userName = getLocalStorage("username");
  return (
    <HashRouter>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Layout>
          <Header style={{backgroundColor: "#f5f5f5"}}>
            <HeaderUser userName={userName} token />
          </Header>
          <Layout>
            <Content className="main-content">
              <Col span={22} offset={1} className="children-content">
                <div className="content">
                  <Routes />
                </div>
              </Col>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

export default DefaultLayout;
