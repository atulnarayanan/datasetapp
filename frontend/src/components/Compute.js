import React from "react";
import { Col, Form, Button, Select, Card, Typography } from "antd";

import { computeDataset } from "../config/api-config";

const Compute = (props) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [dataset, setDataset] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [output, setOutput] = React.useState();
  const [column, setColumn] = React.useState("");
  const Option = { Select };

  const handleDatasetChange = (selectedOption) => {
    setDataset(selectedOption);
  };

  const handleColumnChange = (selectedOption) => {
    setColumn(selectedOption);
  };

  const handleOperationChange = (selectedOption) => {
    setOperation(selectedOption);
  };

  const handleOk = async (e) => {
    fetchCompute(e);
  };

  const [error, seterror] = React.useState(false);
  const [errorResponse, seterrorResponse] = React.useState([]);

  const fetchCompute = async (data) => {
    const res = await computeDataset(data.dataset, data);
    if (res.status === 400) {
      seterror(true);
      seterrorResponse(res?.data);
    } else {
      setOutput(res ?? null);
      seterror(false);
      seterrorResponse([]);
      // form.resetFields();
    }
  };

  return (
    <Col span={8}>
      <Title level={2} style={{ textAlign: "center" }}>
        Compute
      </Title>
      <Form
        name="dataset_compute"
        layout="horizontal"
        form={form}
        size="small"
        onFinish={handleOk}
        style={{
          paddingLeft: "20%",
          paddingRight: "20%",
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
            label="Column"
            name="column_name"
            rules={[{ required: true, message: "Please select a Column" }]}
            shouldUpdate={(prevValues, curValues) =>
              prevValues.dataset !== curValues.dataset
            }
          >
            <Select placeholder="Select a column" onChange={handleColumnChange}>
              {Object.keys(props.data[dataset - 1].columns_data).map((data) => (
                <Option value={data}>{data}</Option>
              ))}
            </Select>
          </Form.Item>
        ) : null}
        {column ? (
          <Form.Item
            label="Operation"
            name="operation"
            rules={[{ required: true, message: "Please select an operation" }]}
          >
            <Select
              placeholder="Select an operation(min,max,sum)"
              onChange={handleOperationChange}
            >
              <Option value="min">{"Min"}</Option>
              <Option value="max">{"Max"}</Option>
              <Option value="sum">{"Sum"}</Option>
            </Select>
          </Form.Item>
        ) : null}
        {operation ? (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        ) : null}
      </Form>
      {output ? (
        <Card
          title="Result"
          style={{
            width: "auto",
            textAlign: "center",
            flex: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {output.output}
        </Card>
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>{errorResponse}</p>
      )}
    </Col>
  );
};

export default Compute;
