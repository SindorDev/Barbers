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
    form.resetFields();
  };

  
  useEffect(() => {
    if (updateServices) {
      form.setFieldsValue({...updateServices});
    } else {
      form.resetFields();
    }
  }, [updateServices, form])


  useEffect(() => {
       if(isSuccess && data){
         setIsModalOpen(false)
         message.success(data.message)
         form.resetFields()
       }
  }, [data, isSuccess])

  useEffect(() => {
    if(updateIsSuccess && updateData) {
      message.success(updateData.message)
      setIsModalOpen(false)
      setUpdateService([])
      form.resetFields()
    }
  }, [updateIsSuccess, updateData])


  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (updateServices._id) {
      updateService({ body: values, id: updateServices._id } as any);
    } else {
      createService(values as any);
    }
  };

  return (
    <>
      <Modal
        title={updateServices._id ? "Update Service" : "Create Service"}
        open={isModalOpen}
        footer={false}
        forceRender
        onCancel={handleCancel}
      >
        <Form
          form={form}  
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
              {updateServices._id ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateService;
