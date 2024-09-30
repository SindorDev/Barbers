import React, { useEffect } from "react";
import { useCreateBookingsMutation } from "@/redux/api/booking-api";
import { useGetServiceQuery } from "@/redux/api/service-api";
import { useGetBarberQuery } from "@/redux/api/user-api";
import { FieldType } from "@/types";
import type { DatePickerProps, TimePickerProps } from "antd";
import dayjs from "dayjs";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  DatePicker,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";

interface BookingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  createBooking: any;
  setCreateBooking: (booking: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  createBooking,
  setCreateBooking,
}) => {
  const [form] = useForm();

  const format = "HH:mm";
  const { data } = useGetServiceQuery();
  const { data: barberData } = useGetBarberQuery();
  const [createBookings, { data: bookingData, isSuccess }] =
    useCreateBookingsMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    setCreateBooking({ ...createBooking, ...values });
  };

  const onChange: DatePickerProps["onChange"] = (_, dateString) => {
    setCreateBooking({ ...createBooking, date: dateString });
  };

  const onTimeChange: TimePickerProps["onChange"] = (_, timeString) => {
    setCreateBooking({ ...createBooking, start: timeString });
  };

  const onTimeChangeEnd: TimePickerProps["onChange"] = (_, timeString) => {
    setCreateBooking({ ...createBooking, end: timeString });
  };

  const handleSend = () => {
    createBookings(createBooking);
  };

  useEffect(() => {
    if (isSuccess && bookingData) {
      setIsModalOpen(false);
      message.success(bookingData.message);
    }
  }, [bookingData, isSuccess, setIsModalOpen]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Create Booking"
      className="!w-[700px]"
      footer={false}
      open={isModalOpen}
      onCancel={handleCancel}
      forceRender={true}
    >
      <Form
        form={form}
        style={{ width: "100%", marginTop: "30px" }}
        layout="vertical"
        onValuesChange={onFinish}
      >
        <div className="flex gap-5">
          <Form.Item<FieldType>
            label="Barber ID"
            name="barber"
            className="w-full"
            rules={[{ required: true, message: "Please input your Barber!" }]}
          >
            <Select>
              {barberData?.payload?.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.first_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item<FieldType>
            label="Service"
            name="service"
            className="w-full"
            rules={[{ required: true, message: "Please input your Service!" }]}
          >
            <Select mode="multiple">
              {data?.payload?.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item<FieldType>
            label="Date"
            className="w-full"
            rules={[{ required: true, message: "Please input your Date!" }]}
          >
            <DatePicker maxTagCount="responsive" onChange={onChange} />
          </Form.Item>
          
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">Start Time</label>
          <TimePicker
            defaultValue={dayjs("12:00", format)}
            onChange={onTimeChange}
            format={format}
          />
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="">End Time</label>

            <TimePicker
              defaultValue={dayjs("12:00", format)}
              onChange={onTimeChangeEnd}
              format={format}
            />
          </div>
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

        <Form.Item<FieldType>
          label="Comment"
          name="comment"
          className="w-full"
          rules={[{ required: true, message: "Please input your Comment!" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Comment"
            className="w-full resize-none"
          />
        </Form.Item>

        <Button
          type="primary"
          onClick={handleSend}
          className="w-full py-6"
          htmlType="submit"
        >
          Create Booking
        </Button>
      </Form>
    </Modal>
  );
};

export default BookingModal;