import { useCreateServiceMutation, useUpdateServiceMutation } from "@/redux/api/service-api";
import { FieldType } from "@/types";
import type { FormProps } from "antd";
import { Modal, Button, Form, Input, InputNumber, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

const CreateService = ({ isModalOpen, setIsModalOpen, updateServices, setUpdateService }: any) => {
  const [form] = useForm()
  const [createService, {data, isSuccess}] = useCreateServiceMutation()
  const [updateService , {data: updateData, isSuccess: updateIsSuccess}] = useUpdateServiceMutation()

  const handleCancel = () => {
    setIsModalOpen(false);
    setUpdateService([]);
  };

  useEffect(() => {
       if(isSuccess && data){
         setIsModalOpen(false)
         message.success(data.message)
       }
  }, [data, isSuccess])

  useEffect(() => {
    if(updateIsSuccess && updateData) {
      message.success(updateData.message)
      setIsModalOpen(false)
      setUpdateService([])
    }
  }, [updateIsSuccess, updateData])

  console.log(updateServices)

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (updateServices) {
      console.log("salom")
      createService(values as any);
    } else {
      updateService({ body: values, id: updateServices._id } as any);
    }
  };

  return (
    <>
      <Modal
        title="Create Service"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="Create Service"
          layout="vertical"
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
