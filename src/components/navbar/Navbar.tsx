import { AiOutlineUser } from "react-icons/ai"; 
import { MdSpaceDashboard } from "react-icons/md";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import { Container } from "../../utils";
import {  Dropdown, Typography } from "antd";
import { useProfileQuery } from "../../redux/api/user-api";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/slices/authSlice";
const { Text } = Typography;

const Navbar = () => {
  const dispatch = useDispatch()
  const {data} = useProfileQuery()

  return (
    <nav className="py-5">
      <Container>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[40px] font-normal leading-[60px] text-[#B5AF93] ">
              LOGO
            </h1>
          </div>
          <div>
            <ul className="flex items-center gap-[52px]">
              <li>
                <NavLink
                  to={"/"}
                  className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/our"}
                  className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]"
                >
                  Our Teams
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/gallery"}
                  className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]"
                >
                  Gallery
                </NavLink>
              </li>

              <li>
                <div className="flex items-center gap-5 mr-5">
                 {
                  data ? <Dropdown
                  menu={{
                    items: data?.payload?.role === "owner" || data?.payload?.role === "manager" ? [
                      {
                        key: "1",
                        label: (
                          <NavLink
                            to={"/dashboard"}
                            className={"flex items-center gap-2"}
                          >
                            <MdSpaceDashboard size={14} />
                            <Text>Dashboard</Text>
                          </NavLink>
                        ),
                      },
                      {
                        key: "2",
                        label: (
                          
                      <span className="flex items-center gap-2 w-full p-2 text-white rounded bg-red-500" onClick={() => dispatch(signOut())}><LiaDoorOpenSolid size={16} />Log Out</span>
                        ),
                      },
                    ]
                    : [
                      {
                        key: "2",
                        label: (
                          
                      <span className="flex items-center gap-2 w-full p-2 text-white rounded bg-red-500" onClick={() => dispatch(signOut())}><LiaDoorOpenSolid size={16} />Log Out</span>
                        ),
                      },
                    ]
                  }}
                  placement="bottomRight"
                >
                  <NavLink to={"/profile"}>

                  {
                    data ? <img src={data?.payload?.avatar} width={50} alt="profile page" /> : <AiOutlineUser size={30} />
                  }
                  </NavLink>
                  </Dropdown>
                : <NavLink to={"/auth"}><AiOutlineUser size={30} /></NavLink>
                 }
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
