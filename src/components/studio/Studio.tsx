import { useGetServiceQuery } from "@/redux/api/service-api"
import { Container } from "../../utils"
import { Link } from "react-router-dom"

const Studio = () => {
       const {data} = useGetServiceQuery()

  return (
       <section className="bg-black pb-[80px]">
              <Container>
                     <div className="py-[60px] flex relative">
                            <div className="w-full max-w-[680px] min-h-[666px] rounded-full overflow-hidden shadow-cm">
                                   <img src={data?.payload[0]?.image} className="w-full object-cover h-full" alt={data?.payload[0]?.title} />
                            </div>

                            <div className="p-5 bg-[#D9D9D9] absolute bottom-[20px] left-[500px] rounded-lg w-full max-w-[700px]">
                                   <h1 className="text-[55px] font-extrabold text-start leading-[82px] text-black">Welcome to the upscale barber studio</h1>
                                   <p className="text-black text-[20px] font-[300] text-start leading-[39px] my-5">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                   <button className="py-3 px-7 rounded-[20px] border border-transparent hover:bg-transparent hover:border-black hover:text-black transition-all duration-300 bg-black text-[30px] text-white font-semibold leading-[45px]"><Link to={'/dashboard/booking'}>Book Online</Link></button>
                            </div>
                     </div>
              </Container>
       </section>
  )
}

export default Studio