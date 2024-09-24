import { Modal, Button, Form, Input, message } from 'antd';
import type { FormProps } from 'antd';
import { FieldType } from '../../types';
import { useUpdateProfileMutation } from '../../redux/api/user-api';
import { useEffect } from 'react';



const ProfileModals = ({open, data, setUpdate, setOpen}: {open: boolean, setOpen: any, data: any, setUpdate: any}) => {

  const [updateUser, {isLoading, data: dataUpdate, isSuccess}] = useUpdateProfileMutation();

  const handleCancel = () => {
    setOpen(false);
    setUpdate([])
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    updateUser(values)
  };

  useEffect(() => {
    if(isSuccess && dataUpdate){
      message.success(dataUpdate.message)
      setOpen(false)
      setUpdate([])
    }
  }, [isSuccess, dataUpdate])

  return (
    <>
      <Modal
        title="Update Profile User"
        open={open}
        onCancel={handleCancel}
        footer={false}
      >

<Form
    name="basic"
    layout='vertical'
    initialValues={data}
    onFinish={onFinish}
    className='mt-5'
  >
    <Form.Item<FieldType>
      label="Phone"
      name="phone"
      rules={[{ required: true, message: 'Please input your Phone!' }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<FieldType>
      label="First Name"
      name="first_name"
      rules={[{ required: true, message: 'Please input your First Name!' }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<FieldType>
      label="Last Name"
      name="last_name"
      rules={[{ required: true, message: 'Please input your Last Name!' }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<FieldType>
      label="Avatar"
      name="avatar"
      rules={[{ required: true, message: 'Please input your Last Avatar!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ span: 24 }}>
      <Button disabled={isLoading} loading={isLoading} className='w-full py-5' type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

      </Modal>
    </>
  );
};

export default ProfileModals;