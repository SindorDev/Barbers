import { useGetServiceQuery } from "@/redux/api/service-api"
import { Container } from "../../utils"

const Comments = () => {
       const {data} = useGetServiceQuery()
  return (
       <section className="bg-[#9D9570]">
              <Container>
                     <div className="py-[60px]">
                            <div>
                                   <h1 className="text-[78px] text-center font-extrabold laeding-[118px] text-white">People Comments</h1>
                                   <div className="flex items-center justify-center gap-5 mt-14">
                                          <div className="bg-white p-5 rounded-[30px] w-full">
                                                 <div className="flex items-center justify-between gap-5">
                                                        <h1 className="text-[30px] leading-[57px] font-extrabold">{data?.payload[2]?.name}</h1>
                                                        <div className="bg-black w-full max-w-[200px] overflow-hidden border-[10px] border-[#70E0BB] rounded-full">
                                                        <img src={data?.payload[2]?.image} className="w-full h-full rounded-e-full" alt="" />
                                                        </div>
                                                 </div>
                                                 <p className="text-[20px] mt-4 leading-[30px] text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto veniam impedit et possimus nostrum aperiam.</p>
                                          </div>
                                          
                                          <div className="bg-white p-5 rounded-[30px] w-full">

                                                 <div className="flex items-center justify-between gap-5">
                                                        <h1 className="text-[30px] leading-[57px] font-extrabold">{data?.payload[3].name}</h1>
                                                        <div className="bg-black w-full max-w-[200px] overflow-hidden border-[10px] border-[#70E0BB] rounded-full">
                                                        <img src={data?.payload[3].image} className="w-full h-full" alt="" />
                                                        </div>
                                                 </div>
                                                 <p className="text-[20px] mt-4 leading-[30px] text-black">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus inventore consequatur neque ipsam accusantium iure.</p>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </Container>
       </section>
  )
}

export default Comments