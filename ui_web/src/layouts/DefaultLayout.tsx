import { Layout, Col, theme } from "antd";
import { HashRouter } from "react-router-dom";
import { Nav } from "./nav";
import { Routes } from "./routes";
import { HeaderBar } from "./header";
import "./layout.scss"
const { Header, Content } = Layout;

export const DefaultLayout = () => {
  return (
    <HashRouter>
      <Layout style={{ height: "100vh" }}>
        <Nav />
        <Layout>
          <Header style={{ backgroundColor: "#f5f5f5" }}>
            <HeaderBar />
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
