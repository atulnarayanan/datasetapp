import React from "react";
import { Col, Form, Button, Select, Typography } from "antd";
import Plot from "react-plotly.js";

import { plotDataset } from "../config/api-config";

const Plotter = (props) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [dataset, setDataset] = React.useState("");
  const [output, setOutput] = React.useState();
  const [columna, setColumnA] = React.useState("");
  const [columnb, setColumnB] = React.useState("");
  const [z, setZ] = React.useState([]);
  const Option = { Select };

  const handleDatasetChange = (selectedOption) => {
    setDataset(selectedOption);
  };

  const handleColumnAChange = (selectedOption) => {
    setColumnA(selectedOption);
  };

  const handleColumnBChange = (selectedOption) => {
    setColumnB(selectedOption);
  };

  const handleOk = async (e) => {
    fetchPlot(e);
  };

  const [error, seterror] = React.useState(false);
  const [errorResponse, seterrorResponse] = React.useState([]);

  const fetchPlot = async (data) => {
    var fields = [];
    fields.push(columna, columnb);
    const res = await plotDataset(data.dataset, fields);
    if (res.status === 400) {
      seterror(true);
      seterrorResponse(res?.data);
    } else {
      seterror(false);
      seterrorResponse([]);
      setOutput(res ?? null);
      var z = fetchPlotVal(res);
      setZ(z);
      // form.resetFields();
    }
  };

  const fetchPlotVal = (data) => {
    var keysData = Object.keys(data[0]);
    var x = data.map((data) => data[keysData[0]]);
    var y = data.map((data) => data[keysData[1]]);
    return [x, y];
  };

  return (
    <Col span={16}>
      <Title level={2} style={{ textAlign: "center" }}>
        Plot
      </Title>
      <Form
        name="dataset_compute"
        layout="horizontal"
        form={form}
        size="small"
        onFinish={handleOk}
        style={{
          paddingLeft: "30%",
          paddingRight: "30%",
        }}
      >
        <Form.Item
          label="Dataset"
          name="dataset"
          rules={[{ required: true, message: "Please select a Dataset!" }]}
        >
          <Select placeholder="Select a dataset" onChange={handleDatasetChange}>
            {props.data.map((dataset) => (
              <Option value={dataset.id}>{dataset.name}</Option>
            ))}
          </Select>
        </Form.Item>
        {dataset ? (
          <Form.Item
            label="Column A"
            name="column_a"
            rules={[{ required: true, message: "Please select a Column" }]}
            shouldUpdate={(prevValues, curValues) =>
              prevValues.dataset !== curValues.dataset
            }
          >
            <Select
              placeholder="Select a column"
              onChange={handleColumnAChange}
            >
              {Object.keys(props.data[dataset - 1].columns_data).map((data) => (
                <Option value={data}>{data}</Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
        {dataset ? (
          <Form.Item
            label="Column B"
            name="column_b"
            rules={[{ required: true, message: "Please select a Column" }]}
            shouldUpdate={(prevValues, curValues) =>
              prevValues.dataset !== curValues.dataset
            }
          >
            <Select
              placeholder="Select a column"
              onChange={handleColumnBChange}
            >
              {Object.keys(props.data[dataset - 1].columns_data).map((data) => (
                <Option value={data}>{data}</Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
        {columna && columnb ? (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        ) : null}
      </Form>
      {output ? (
        // <Card
        //   title="Result"
        //   style={{
        //     width: "auto",
        //     textAlign: "center",
        //     flex: "auto",
        //     justifyContent: "center",
        //     alignItems: "center",
        //   }}
        // >
        //   {output.output}
        // </Card>
        <Plot
          data={[
            {
              // x: [1, 2, 3, 4, 5],
              // y: [1, 6, 3, 6, 1],
              x: z[0],
              y: z[1],
              mode: "markers",
              type: "scatter",
              name: "Dataset Scatter",
              marker: { size: 12 },
            },
          ]}
          layout={{ width: 800, height: 400, title: "Scatter Plot" }}
        ></Plot>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>{errorResponse}</p>
      )}
    </Col>
  );
};

export default Plotter;
