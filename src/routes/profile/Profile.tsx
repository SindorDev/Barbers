import { Card, Typography, Row, Col, Divider, Image, Button  } from 'antd';
import { useProfileQuery } from '../../redux/api/user-api';
import { BiEdit } from "react-icons/bi";
const { Title, Paragraph, Text } = Typography;

const Profile = () => {

  const {data} = useProfileQuery()

  
  return (
    <div className='w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center'>
      
    <div className='w-full p-5'>
      {
        data &&  <Card
        style={{ maxWidth: 1100, margin: '0 auto', borderRadius: '10px' }}
        
      >
        <div className='w-full flex items-end justify-end'>
        <Button type='primary' className='!bg-yellow-500 text-[20px] py-5'><BiEdit size={24} /> </Button>
        </div>
        <div className='flex items-center justify-center'>

         <Image
            width={200}
            height={200}
            src="error"
            fallback={data.payload?.avatar}
            style={{marginBottom: "50px", borderRadius: "50%"}}
/>
        </div>
        <Title level={1} style={{ textAlign: 'center' }}>{data.payload?.first_name}</Title>
        <Divider />
        <Row className='ml-[100px]'>
          <Col span={6}>
            <Text strong>Last Name</Text>
            <Paragraph>{data.payload?.last_name}</Paragraph>
          </Col>
          <Col span={5}>
            <Text strong>Role</Text>
            <Paragraph>{data.payload?.role}</Paragraph>
          </Col>
          
          <Col span={5}>
            <Text strong>Age</Text>
            <Paragraph>{data.payload?.age}</Paragraph>
          </Col>
          
          <Col span={5}>
            <Text strong>Phone</Text>
            <Paragraph>{data.payload?.phone}</Paragraph>
          </Col>
        </Row>
        <Divider />
      </Card>
      }
    </div>
    </div>
  );
};

export default Profile;