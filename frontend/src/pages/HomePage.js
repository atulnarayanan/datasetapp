import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import "./HomePage.css";
const { Title } = Typography;

const HomePage = () => {
  const { Header, Content } = Layout;

  return (
    <Layout className="layout">
      <Header
      //   style={{
      //     position: 'fixed',
      //     zIndex: 1,
      //     width: '100%',
      //   }}
      >
        <Link to="/">
          <img
            className="logo"
            src="https://w7.pngwing.com/pngs/310/475/png-transparent-database-computer-icons-computer-software-information-database-miscellaneous-angle-information-technology.png"
            alt="https://w7.pngwing.com/pngs/310/475/png-transparent-database-computer-icons-computer-software-information-database-miscellaneous-angle-information-technology.png"
          />
        </Link>
        {/* <div className="logo"> <Link to="/"> <img alt='https://1000logos.net/chrome-logo/' src='https://1000logos.net/chrome-logo/'/></Link> </div> */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item className="header-menu-items" key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item className="header-menu-items" key="2">
            <Link to="/data">Data</Link>
          </Menu.Item>
          <Menu.Item className="header-menu-items" key="3">
            <Link to="/plot">Plot</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">
          <Title> Home Page </Title>
        </div>
      </Content>
    </Layout>
  );
};
export default HomePage;
