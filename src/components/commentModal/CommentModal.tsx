import { useCheckBookingMutation } from "@/redux/api/booking-api";
import { useCreateCommentMutation } from "@/redux/api/comment-api";
import { FieldType } from "@/types";
import { Modal, Button, Form, Rate, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";

const CommentModal = ({
  modalOpen,
  setModalOpen,
  commentsData,
  setCommentsData,
}: any) => {
  const [form] = useForm();
  const [commentData, setCommentData] = useState({
    message: "",
    rating: 0,
    client: "",
    barber: "",
  });

  const [createComment, {data: commentCreateData, isSuccess: commentIsSuccess}] = useCreateCommentMutation()
  const [checkBooking, {data: checkBookingData, isSuccess: checkIsSuccess}] = useCheckBookingMutation()
  useEffect(() => {
    if (commentsData) {
      setCommentData({
        ...commentData,
        client: commentsData?.client?._id,
        barber: commentsData?.barber?._id,
      });
    }
  }, [commentsData]);

  useEffect(() => {
       if(commentCreateData) {
              message.success(commentCreateData.message)
              setCommentsData([])
              form.resetFields()
              setModalOpen(false)
       }
  }, [commentIsSuccess, commentCreateData])

  useEffect(() => {
       if(checkBookingData && checkIsSuccess) {
         message.success(checkBookingData?.message)
       }
     }, [checkBookingData, checkIsSuccess])
   


  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
    setCommentsData([]);
  };

  const handleSendComment = () => {
       createComment({body: commentData, id: commentsData?.barber?._id })
    checkBooking(commentsData._id as any)
};

  const onchange = () => {
    const values = form.getFieldsValue()
    setCommentData({ ...commentData, ...values });
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={modalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="Create Comment"
          layout="vertical"
          style={{ maxWidth: "100%" }}
          onValuesChange={onchange}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Rate allowHalf defaultValue={0} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Comment"
            name="message"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <TextArea className="!resize-none" />
          </Form.Item>

            <Button
              type="primary"
              onClick={handleSendComment}
              className="w-full"
              htmlType="submit"
            >
              Create Comment
            </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CommentModal;
