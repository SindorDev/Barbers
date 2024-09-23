import type { FormProps } from 'antd';
import { Button,  Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInUserMutation } from '../../../redux/api/user-api';
import { useEffect } from 'react';
import { loginUser } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

type FieldType = {
  first_name?: string;
  password?: string;
  last_name?: string;
  phone?: string;
  age?: number;
  avatar?: string;
};

const SignIn = () => {

  const [signInUser, {isLoading, data}] = useSignInUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    signInUser(values as any)
  };

  useEffect(() => {
    if(data && data.payload){
      message.success(data.message)
      dispatch(loginUser({token: data.payload.token}))
      navigate("/")
    }
  }, [data])
  
  return (
    <div className='w-full h-screen flex items-center justify-center'>
    <div className='w-full max-w-[500px] bg-[#c4c4c4]  rounded-md p-10'>
    <h1 className='text-center text-2xl font-bold'>Login</h1>
    <Form
    name="basic"
    layout='vertical'
    onFinish={onFinish}
    autoComplete="off"
  >

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
    

    <Form.Item wrapperCol={{ span: 24 }}>
      <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit" className='w-full py-5'>
        Login
      </Button>
    </Form.Item>
  </Form>
  <p className='text-center mt-5'>Don't have an account? <Link to="/auth/register" className='text-blue-500'>Register</Link></p>
    </div>
  </div>
  )
};

export default SignIn;