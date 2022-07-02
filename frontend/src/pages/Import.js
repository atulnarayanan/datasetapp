import React from "react";
import "antd/dist/antd.css";
import { Modal, Button, Form, Input } from "antd";
import { useDropzone } from "react-dropzone";
import "./Import.css";
import { ImportOutlined } from "@ant-design/icons";
import { addNewDataset } from "../config/api-config";

const maxLength = 100;

function nameLengthValidator(file) {
  if (file.name.length > maxLength) {
    return {
      code: "name-too-large",
      message: `Name is larger than ${maxLength} characters`,
    };
  }

  return null;
}

export const ImportDataset = ({ submitForm, companyList }) => {
  const [visible, setVisible] = React.useState(false);
  const [fileName, setfileName] = React.useState("");
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  let { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 10000,
    validator: nameLengthValidator,
  });

  let acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file?.name}>{file?.name}</li>
  ));

  function handlefileNameChange(event) {
    setfileName(event.target.value);
  }

  const [error, seterror] = React.useState(false);
  const [errorResponse, seterrorResponse] = React.useState([]);

  const handleOk = async (e) => {
    // e.preventDefault();
    let initial_body = {};
    const uploadData = new FormData();

    acceptedFiles.map(
      (file) => (
        (initial_body.filename = file?.name), (initial_body.name = fileName)
      )
    );

    acceptedFiles.map((file) => uploadData.append("file", file));
    uploadData.append("name", e?.name);
    const upload_res = await addNewDataset(uploadData);
    if (upload_res.status === 400) {
      seterror(true);
      seterrorResponse(upload_res?.data);
    } else {
      seterror(false);
      seterrorResponse([]);
      setVisible(false);
      form.resetFields();
      acceptedFileItems = [];
      acceptedFiles = [];

      submitForm({ ...uploadData });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        icon={<ImportOutlined />}
        style={{ float: "right", marginBottom: "2%" }}
      >
        Import
      </Button>
      <Modal
        title="Import Documents"
        visible={visible}
        onOk={handleOk}
        centered
        onCancel={handleCancel}
        okText="Submit"
        footer={[
          <Button
            form="dataset_create"
            key="submit"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
        className="ant-modal"
      >
        <Form
          name="dataset_create"
          layout="horizontal"
          form={form}
          onFinish={handleOk}
        >
          <Form.Item
            className="stepper-form"
            name="name"
            label="Dataset Name"
            rules={[
              {
                required: true,
                message: "Please Input a Dataset Name",
              },
            ]}
          >
            <Input onChange={handlefileNameChange} />
          </Form.Item>
        </Form>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>
            (Only files with name less than 100 characters will be accepted)
          </em>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>
            {acceptedFileItems ? (
              <div className={"afiles"}>{acceptedFileItems}</div>
            ) : null}
          </ul>
        </aside>
        {error ? (
          <p style={{ color: "red", textAlign: "center" }}>{errorResponse}</p>
        ) : null}
      </Modal>
    </>
  );
};
