import { BiNotification } from "react-icons/bi"; 
import { BiCartAlt } from "react-icons/bi"; 
import { UserOutlined, ProductFilled } from "@ant-design/icons";
import { Layout, Button,  Modal, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Sider } = Layout;

// eslint-disable-next-line react/prop-types, no-unused-vars
const Sidebar = ({ collapsed } : {collapsed: boolean}) => {
  const dispatch = useDispatch()

  const {token} = useSelector((state: any) => state.auth)

  const role = JSON.parse(atob(token.split(".")[1]))?.id


  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you really want to log out?');

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('Checkout completed successfully');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      dispatch({type: "SIGN_OUT"})

    }, 1500)
  };


  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemoveUser =  () => {
    showModal()
  }
  return (
    <>
      <Modal
        title="Logout"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    <Sider trigger={null} collapsible collapsed={collapsed} className="px-[5px] py-[10px] min-h-screen flex flex-col ">
      
      <Menu
      className="flex-1 w-full min-h-[90%]"
        theme="dark"
        mode="inline"
        items={role === "manager" && role === "owner" ? 

          [
            {
              key: "1",
              icon: <ProductFilled size={24} />,
              label: <NavLink to={""}>Products</NavLink>,
            },
            {
              key: "2",
              icon: <UserOutlined size={24} />,
              label: <NavLink to={"users"}>Users</NavLink>,
            },
            
            {
              key: "3",
              icon: <FaHeart size={17} />,
              label: <NavLink to={"liked-products"}>LikedProducts</NavLink>,
            },
            {
              key: "4",
              icon: <BiCartAlt size={20} />,
              label: <NavLink to={"productCart"}>Cart</NavLink>,
            },
            {
              key: "5",
              icon: <BiNotification size={20} />,
              label: <NavLink to={"notifications"}>Notifications</NavLink>,
            }
          ]
          :
          [
            
          {
            
            key: "1",
            icon: <FaHeart size={17} />,
            label:  <NavLink to={"liked-products"}>LikedProducts</NavLink>,
          },
          {
            key: "2",
            icon: <BiCartAlt size={20} />,
            label: <NavLink to={"productCart"}>Cart</NavLink>,
          },
          {
            key: "3",
            icon: <BiNotification size={20} />,
            label: <NavLink to={"notifications"}>Notifications</NavLink>,
          }
          ]
        }
      />
      <Button className="bg-red-500 w-full p-5 mb-[20px]" onClick={handleRemoveUser} type="primary"><LiaDoorOpenSolid size={"24px"} />{!collapsed && "Sign Out"}</Button>
    </Sider>
    </>
  )
}

export default Sidebar;
