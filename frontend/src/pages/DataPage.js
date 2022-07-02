import React from "react";
import { Breadcrumb, Col, Layout, Menu, Row, Card } from "antd";

import { Link } from "react-router-dom";
import { useState } from "react";
import { getDatasetList } from "../config/api-config";
import "./DataPage.css";
import { ImportDataset } from "./Import";

const DataPage = () => {
  const { Header, Content } = Layout;

  const [datasetList, setDatasetList] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchDatasetList = async () => {
    setloading(true);
    const res = await getDatasetList();
    setDatasetList(res ?? []);
    setloading(false);
  };
  const handleImport = async (dataset) => {
    fetchDatasetList();
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
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
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
      <Content style={{ padding: "0 50px", minHeight: "92vh" }}>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        {datasetList.length ? (
          <div style={{ marginleft: "5%" }}>
            <Row>
              <Col>
                <h1 className="text-color">Datasets</h1>
              </Col>
              <Col style={{ width: "90%" }}>
                <ImportDataset submitForm={handleImport} />
              </Col>
            </Row>
            <div>
              <Row gutter={20} className="dataset-row">
                {datasetList.map((dataset) => (
                  <Col key={dataset.id}>
                    <Card
                      hoverable
                      className="home-dataset-card"
                      bordered={true}
                      loading={loading}
                      headStyle={{
                        paddingRight: "0.5em",
                        paddingLeft: "1em",
                      }}
                      style={{ padding: "0 0 5px 0" }}
                    >
                      {dataset.name}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <Row>
              <Col style={{ width: "95%" }}>
                <ImportDataset submitForm={handleImport} />
              </Col>
            </Row>
            <div className="site-layout-content">
              <h1>No Datasets</h1>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default DataPage;
