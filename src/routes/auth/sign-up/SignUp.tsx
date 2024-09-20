import type { FormProps } from 'antd';
import { Button,  Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpUserMutation } from '../../../redux/api/user-api';
import { useEffect } from 'react';

type FieldType = {
  first_name?: string;
  password?: string;
  last_name?: string;
  phone?: string;
  age?: number;
  avatar?: string;
};

const SignUp = () => {

  const [signUpUser, {isLoading, data}] = useSignUpUserMutation()
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    signUpUser(values as any)
  };

  useEffect(() => {
    if(data){
      message.success(data.message)
      navigate("/auth")
    }
  }, [data])

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div className='w-full h-screen flex items-center justify-center'>
    <div className='w-full max-w-[700px] bg-[#c4c4c4]  rounded-md p-10'>
    <h1 className='text-center text-2xl font-bold'>Register</h1>
    <Form
    name="basic"
    layout='vertical'
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div>
      
    <Form.Item<FieldType>
      label="First Name"
      name="first_name"
      className='w-full'
      rules={[{ required: true, message: 'Please input your first name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Last Name"
      name="last_name"
      className='w-full'
      rules={[{ required: true, message: 'Please input your last name!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Avatar Image"
      name="avatar"
      className='w-full'
      rules={[{ required: true, message: 'Please input your avatar!' }]}
    >
      <Input />
    </Form.Item>
    </div>
    <div className='flex items-center gap-5'>
      
    <Form.Item<FieldType>
      label="Age"
      name="age"
      className='w-full'
      rules={[{ required: true, message: 'Please input your age!' }]}
    >
      <Input />
    </Form.Item>
    

    <Form.Item<FieldType>
      label="Phone"
      name="phone"
      className='w-full'
      rules={[{ required: true, message: 'Please input your phone!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      className='w-full'
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    </div>
    

    <Form.Item wrapperCol={{ span: 24 }}>
      <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit" className='w-full py-5'>
        Register
      </Button>
    </Form.Item>
  </Form>
  <p className='text-center mt-5'>Already have an account? <Link to="/auth" className='text-blue-500'>Login</Link></p>
    </div>
  </div>
  )
};

export default SignUp;