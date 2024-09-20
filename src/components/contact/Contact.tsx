import { useGetBarbersQuery } from "../../redux/api/barber-api"
import { Container } from "../../utils"

const Contact = () => {
  const {data} = useGetBarbersQuery()
  return (
    <section className="bg-black">
      <Container>
        <div className="flex w-full">
          <div className="w-full min-h-full bg-black">
            <img src={data?.products[0].thumbnail} className="w-full h-full object-contain" alt={data?.products[0].title} />
          </div>
          <div className="w-full p-10 min-h-full bg-[#cec392]">
            <h2 className="text-[80px] text-white font-extrabold">Contact Us!</h2>
            <form className="flex flex-col gap-5 items-start">
              <input type="text" placeholder="Name" className="w-full p-5 outline-none rounded-[30px] bg-white" />
              <input type="text" placeholder="Email" className="w-full p-5 outline-none rounded-[30px] bg-white" />
              <textarea name="" id="" cols={30} rows={10} placeholder="Message" className="w-full p-5 resize-none outline-none rounded-[30px] bg-white"></textarea>
              <button className="bg-[#9D9570] w-full p-5 text-white rounded-[30px] text-black font-extrabold">Submit</button>
            </form>  
          </div>  
        </div>
      </Container>
    </section>
  )
}

export default Contact