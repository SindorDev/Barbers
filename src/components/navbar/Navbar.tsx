import { AiOutlineUser } from "react-icons/ai"; 
import { NavLink } from "react-router-dom"
import { Container } from "../../utils"
import { useSelector } from "react-redux";

const Navbar = () => {

  const {token} = useSelector((state: any) => state.auth)


  return (
    <nav className="py-5">
        <Container>
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[40px] font-normal leading-[60px] text-[#B5AF93] ">LOGO</h1>
            </div>
            <div>
              <ul className="flex items-center gap-[52px]">
                <li>
                  <NavLink to={"/"} className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]">
                    Home
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to={"/our"} className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]">
                    Our Teams
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to={"/gallery"} className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]">
                    Gallery
                  </NavLink>
                </li>
                
                <li>
                  <NavLink to={token ? "/profile" : "/auth"} className=" text-[23px] font-normal leading-[34px] text-black hover:text-[#B5AF93]">
                    <AiOutlineUser size={30} />
                  </NavLink>
                </li>
              </ul>
            </div>
        </div>
        </Container>
    </nav>
  )
}

export default Navbar