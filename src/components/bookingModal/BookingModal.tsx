import { FieldType } from "@/types";
import type { FormProps } from "antd";
import { Modal, Button,  Form, Input, InputNumber } from "antd";
const BookingModal = ({ isModalOpen, setIsModalOpen }: any) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create Booking"
        className="!w-[700px]"
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <Form
          style={{ width: "100%", marginTop: "30px" }}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="flex gap-5">
            <Form.Item<FieldType>
              label="Client ID"
              name="client"
              className="w-full"
              rules={[{ required: true, message: "Please input your Client!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Barber ID"
              name="barber"
              className="w-full"
              rules={[{ required: true, message: "Please input your Barber!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Service"
              name="service"
              className="w-full"
              rules={[
                { required: true, message: "Please input your Service!" },
              ]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item<FieldType>
              label="Date"
              name="date"
              className="w-full"
              rules={[{ required: true, message: "Please input your Date!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Start Time"
              name="start"
              className="w-full"
              rules={[{ required: true, message: "Please input your Start!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="End Time"
              name="end"
              className="w-full"
              rules={[{ required: true, message: "Please input your End!" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <div className="flex gap-5">
            <Form.Item<FieldType>
              label="Price"
              name="price"
              className="w-full"
              rules={[{ required: true, message: "Please input your Price!" }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Rating"
              name="rating"
              className="w-full"
              rules={[{ required: true, message: "Please input your Rating!" }]}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" className="w-full py-6" htmlType="submit">
              Create Booking
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BookingModal;
