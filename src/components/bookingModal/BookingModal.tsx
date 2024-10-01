import React, { useEffect } from "react";
import { useCalculatePriceMutation, useCreateBookingsMutation, useUpdateBookingsMutation } from "@/redux/api/booking-api";
import { useGetServiceQuery } from "@/redux/api/service-api";
import { useGetBarberQuery } from "@/redux/api/user-api";
import { FieldType } from "@/types";
import type { DatePickerProps, TimePickerProps } from "antd";
import dayjs from "dayjs";
import {
  Modal,
  Button,
  Form,
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
  updateBooking: any;
  setUpdateBooking: any;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  createBooking,
  setCreateBooking,
  updateBooking,
  setUpdateBooking,
}) => {
  const [form] = useForm();

  const format = "HH:mm";
  const { data } = useGetServiceQuery();
  const { data: barberData } = useGetBarberQuery();
  const [createBookings, { data: bookingData, isSuccess }] =
    useCreateBookingsMutation();

  const [updateBookings, {data: updateBookingsData, isSuccess: updateIsSuccess}] = useUpdateBookingsMutation()
  const [calculatePrice, {data: calculatePriceData}] = useCalculatePriceMutation()
  const formatFormValues = (values: any) => {
    const formattedValues = { ...values };
    if (values.date) {
      formattedValues.date = values.date.format("YYYY-MM-DD");
    }
    if (values.start) {
      formattedValues.start = values.start.format(format);
    }
    if (values.end) {
      formattedValues.end = values.end.format(format);
    }
    return formattedValues;
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    const formattedValues = formatFormValues(values);
    setCreateBooking({ ...createBooking, ...formattedValues });
  };

  const onChange: DatePickerProps["onChange"] = (date) => {
    if (date) {
      setCreateBooking({ ...createBooking, date: date.format("YYYY-MM-DD") });
    }
  };

  const onTimeChange: TimePickerProps["onChange"] = (time) => {
    if (time) {
      setCreateBooking({ ...createBooking, start: time.format(format) });
    }
  };

  const onTimeChangeEnd: TimePickerProps["onChange"] = (time) => {
    if (time) {
      setCreateBooking({ ...createBooking, end: time.format(format) });
    }
  };


  const handleSend = () => {
    const values = form.getFieldsValue();
    const formattedValues = formatFormValues(values);
    if (createBooking.edit) {
      updateBookings({body: formattedValues, id: updateBooking?._id})
    }
    else {
      createBookings(formattedValues);
    }
  };
  const handleSendService = (e: any) => {
    calculatePrice(e)
  } 


  useEffect(() => {
    if (isSuccess && bookingData) {
      setIsModalOpen(false);
      message.success(bookingData.message);
      setCreateBooking({});
      form.resetFields();
    }
  }, [bookingData, isSuccess, setIsModalOpen]);

  useEffect(() => {
    if(updateIsSuccess && updateBookingsData) {
      message.success(updateBookingsData.message)
      setCreateBooking({})
      setUpdateBooking({})
      form.resetFields()
      setIsModalOpen(false)
    }
  }, [updateBookingsData, updateIsSuccess])

  useEffect(() => {
    
    if (updateBooking && Object.keys(updateBooking).length > 0) {
      form.setFieldsValue({
        barber: updateBooking.barber?._id,
        service: updateBooking.service?.map((s: any) => s._id),
        date: updateBooking.date ? dayjs(updateBooking.date) : null,
        start: updateBooking.start ? dayjs(updateBooking.start, format) : null,
        end: updateBooking.end ? dayjs(updateBooking.end, format) : null,
      });
    } else {
      form.resetFields();
    }
  }, [updateBooking, form]);

  useEffect(() => {
    form.setFieldsValue({
      price: calculatePriceData?.payload.total,
    })
  }, [calculatePriceData])

  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateBooking({});
    setUpdateBooking({});
    form.resetFields();
  };

  return (
    <Modal
      title={createBooking.edit ? "Update Booking" : "Create Booking"}
      className="!w-[700px]"
      footer={false}
      open={isModalOpen}
      onCancel={handleCancel}
      forceRender
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
            <Select >
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
            <Select onChange={(e) => handleSendService(e)} mode="multiple">
              {data?.payload?.map((item: any) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="flex gap-5">
          <Form.Item name="date" label="Date" className="w-full">
            <DatePicker className="w-full" onChange={onChange} />
          </Form.Item>

          <Form.Item name="start" label="Start Time" className="w-full">
            <TimePicker
              className="w-full"
              onChange={onTimeChange}
              format={format}
            />
          </Form.Item>

          <Form.Item name="end" label="End Time" className="w-full">
            <TimePicker
              className="w-full"
              onChange={onTimeChangeEnd}
              format={format}
            />
          </Form.Item>
        </div>

        <Form.Item<FieldType>
          label="Price"
          name="price"
          className="w-full"
          rules={[{ required: true, message: "Please input your Price!" }]}
        >
          <InputNumber disabled  className="w-full" />
        </Form.Item>

        <Button
          type="primary"
          onClick={handleSend}
          className="w-full py-6"
          htmlType="submit"
        >
          {createBooking.edit ? "Update Booking" : "Create Booking"}
        </Button>
      </Form>
    </Modal>
  );
};

export default BookingModal;
