import { RiScissorsCutLine } from "react-icons/ri"; 
import { GiBeard } from "react-icons/gi"; 
import { TbBlade } from "react-icons/tb"; 
import { IoIosCut } from "react-icons/io"; 
import { Container } from "../../utils"
import { useGetServiceQuery } from "@/redux/api/service-api";

const Services = () => {
       const {data} = useGetServiceQuery()
  return (
       <section className="bg-[#292D33] py-[80px]">
              <Container>
                     <div>
                            <h1 className="text-[70px] text-center font-extrabold leading-[108px] text-white">Barbershop Services</h1>
                            <div className="mt-[42px] flex items-center justify-center gap-12">
                                   <div className="w-full max-w-[500px] h-full flex items-center overflow-hidden rounded-xl justify-center shadow-cm">
                                          <img src={data?.payload[0]?.image} alt={data?.payload[0]?.name} className="w-full h-full object-cover" />
                                   </div>

                                   <div className="grid grid-cols-2 gap-10">
                                          <div className="w-full max-w-[327px] h-full bg-[#D9D9D9] p-7 rounded-xl flex flex-col justify-center items-center gap-3">
                                                 <IoIosCut size={60} />
                                                 <h4 className="text-[38px] leading-[100px] font-semibold">Hair Cut</h4>
                                          </div>
                                          <div className="w-full max-w-[327px] h-full bg-[#D9D9D9] p-7  justify-center rounded-xl flex flex-col items-center gap-3">

                                                 <TbBlade size={60} />
                                                 <h4 className="text-[38px] leading-[100px] font-semibold">Shaving</h4>
                                          </div>
                                          <div className="w-full max-w-[327px] h-full bg-[#D9D9D9] p-7 justify-center rounded-xl flex flex-col items-center gap-3">
                                                 <GiBeard size={60} />
                                                 <h4 className="text-[38px] leading-[100px] font-semibold">Beard Trim</h4>
                                          </div>
                                          <div className="w-full max-w-[327px] h-full bg-[#D9D9D9] p-7 justify-center rounded-xl flex flex-col items-center gap-3">

                                                 <RiScissorsCutLine size={60} />
                                                <h4 className="text-[38px] leading-[100px] font-semibold">Kids Haircut</h4> 
                                          </div>
                                   </div>

                            </div>

                     </div>
              </Container>
       </section>
  )
}

export default Services