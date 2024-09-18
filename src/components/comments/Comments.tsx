import { useGetBarbersQuery } from "../../redux/api/barber-api"
import { Container } from "../../utils"

const Comments = () => {
       const {data} = useGetBarbersQuery()
  return (
       <section className="bg-[#9D9570]">
              <Container>
                     <div className="py-[60px]">
                            <div>
                                   <h1 className="text-[78px] text-center font-extrabold laeding-[118px] text-white">People Comments</h1>
                                   <div className="flex items-center justify-center gap-5 mt-14">
                                          <div className="bg-white p-5 rounded-[30px] w-full">
                                                 <div className="flex items-center gap-5">
                                                        <h1 className="text-[30px] leading-[57px] font-extrabold">{data?.products[0].title}</h1>
                                                        <div className="bg-black p-5 border-[10px] border-[#70E0BB] rounded-full">
                                                        <img src={data?.products[0].thumbnail} width={100} alt="" />
                                                        </div>
                                                 </div>
                                                 <p className="text-[20px] mt-4 leading-[30px] text-black">{data?.products[0].description}</p>
                                          </div>
                                          
                                          <div className="bg-white p-5 rounded-[30px] w-full">

                                                 <div className="flex items-center gap-5">
                                                        <h1 className="text-[30px] leading-[57px] font-extrabold">{data?.products[1].title}</h1>
                                                        <div className="bg-black p-5 border-[10px] border-[#70E0BB] rounded-full">
                                                        <img src={data?.products[1].thumbnail} width={100} alt="" />
                                                        </div>
                                                 </div>
                                                 <p className="text-[20px] mt-4 leading-[30px] text-black">{data?.products[1].description}</p>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </Container>
       </section>
  )
}

export default Comments