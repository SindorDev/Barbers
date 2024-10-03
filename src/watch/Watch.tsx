import { Link } from "react-router-dom"
import { Container } from "../utils"

const Watch = () => {
       
  return (
       <section className={`bg-gray-600 pt-40 pb-10`}>
              <Container>
                     <div className="flex items-center w-full justify-between">
                            <div className="w-full max-w-[550px]">

                                   <h1 className="text-[62px] leading-[94px] text-white font-extrabold">Why choose us?</h1>
                                   <p className="text-white text-[23px] my-2 max-w-[553px] font-bold leading-[35px]">In addition, there 5 more reasons why men prefer Manhattan Barbershop N.Y.C:</p>
                                   <ul className="list-disc flex flex-col  gap-2 items-start">
                                          <li className="text-white text-[20px] leading-[30px]">
                                          Always welcoming environment
                                          </li>
                                          <li className="text-white"></li>
                                          <li className="text-white text-[20px] leading-[30px]">
                                          Our masters focus on the quality
                                          </li>
                                          <li className="text-white"></li>
                                          <li className="text-white text-[20px] leading-[30px]">
                                          We value both the time and the money of our clients
                                          </li>
                                          <li className="text-white"></li>
                                          <li className="text-white text-[20px] leading-[30px]">
                                          We work only with high-quality, hypoallergenic premium products
                                          </li>
                                          <li className="text-white"></li>
                                          <li className="text-white text-[20px] leading-[30px]">
                                          All surfaces and tools are cleaned, disinfected before and after using
                                          </li>
                                   </ul>
                            </div>
                            
                            <div className="w-full max-w-[550px] bg-white rounded-[32px] min-h-[550px] p-5">
                                   <h2 className="text-[50px] leading-[76px] text-center font-bold text-[#B5AF93]">WORKING HOURSE</h2>
                                   <div className="flex my-[33px] items-center justify-center">

                                          <div className="flex items-center flex-col text-center gap-5 justify-center">
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal">SUNDAY</p>
                                                        <p className="text-[20px] font-normal">10 AM – 5 PM</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal ">MONDAY</p>
                                                        <p className="text-[20px] font-normal">9 AM – 7PM</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal">TUESDAY</p>
                                                        <p className="text-[20px] font-normal">8AM – 8PM</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal">WEDNESDAY</p>
                                                        <p className="text-[20px] font-normal">8AM – 8PM</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal">THURSDAY</p>
                                                        <p className="text-[20px] font-normal">8AM – 8PM</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal">FRIDAY</p>
                                                        <p className="text-[20px] font-normal">8AM – 7PM</p>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                        <p className="text-[20px] font-normal">SATURDAY</p>
                                                        <p className="text-[20px] font-normal">9AM – 6PM</p>
                                                 </div>
                                          </div>
                                   </div>
                            <button className="py-4 px-10 mx-auto block border rounded-[20px] border-black text-[20px] font-semibold leading-[25px]"><Link to={'/dashboard/booking'}>Book Online</Link></button>
                            </div>
                     </div>
              </Container>
       </section>
  )
}

export default Watch