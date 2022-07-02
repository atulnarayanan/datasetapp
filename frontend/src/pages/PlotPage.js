import React from "react";
import { Breadcrumb, Layout, Menu, Row } from "antd";
import { Link } from "react-router-dom";
import Compute from "../components/Compute";
import { getDatasetList } from "../config/api-config";
import Plotter from "../components/Plotter";

const PlotPage = () => {
  const { Header, Content } = Layout;
  const [datasetList, setDatasetList] = React.useState([]);

  const fetchDatasetList = async () => {
    const res = await getDatasetList();
    setDatasetList(res ?? []);
  };

  React.useEffect(() => {
    fetchDatasetList();
  }, []);

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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["3"]}>
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
        <Breadcrumb style={{ margin: "5px 0" }}></Breadcrumb>
        <Row>
          <Compute data={datasetList}></Compute>
          <Plotter data={datasetList}></Plotter>
        </Row>
        {/* <div className="site-layout-content">
        </div> */}
      </Content>
    </Layout>
  );
};

export default PlotPage;
