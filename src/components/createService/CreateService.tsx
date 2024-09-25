import { useCreateServiceMutation } from "@/redux/api/service-api";
import { FieldType } from "@/types";
import type { FormProps } from "antd";
import { Modal, Button, Form, Input, InputNumber, message } from "antd";
import { useEffect } from "react";

const CreateService = ({ isModalOpen, setIsModalOpen }: any) => {

  const [createService, {data, isSuccess}] = useCreateServiceMutation()

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
       if(isSuccess && data){
         setIsModalOpen(false)
         message.success(data.message)
       }
  }, [data, isSuccess])

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    createService(values as any)
  };

  return (
    <>
      <Modal
        title="Create Service"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        {" "}
        <Form
          name="Create Service"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Price"
            name="price"
            className="w-full"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please input your Image!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" className="w-full py-5" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateService;
