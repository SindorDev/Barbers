import { AiTwotonePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

import { Container } from "../../utils";
import { useGetServiceQuery } from "@/redux/api/service-api";
const Hero = () => {
  const { data: serviceData } = useGetServiceQuery();


  return (
    <section className="my-[53px]">
      <Container>
        <div className="flex items-center gap-5">
          <div>
            <h3 className="uppercase text-[42px] leading-[64px] font-medium title text-black">
              Welcome To
            </h3>
            <h1 className="max-w-[490px] capitalize text-[65px] leading-[96px] font-bold">
              Barbershop in Manhattan NEW YORK
            </h1>
            <div className="flex flex-col gap-5 items-start">
              <span className="flex items-center gap-4 text-[23px] leading-[34px] font-normal">
                <GoLocation size={26} />
                ​254 W 27ST ST, NEW YORK, NY 10011
              </span>
              <span className="flex items-center gap-4 text-[23px] leading-[34px] font-normal">
                <AiTwotonePhone size={26} />
                ​(212) 123-4567
              </span>
              <span className="flex items-center gap-4 text-[23px] leading-[34px] font-normal">
                <GoLocation size={26} />
                ​254 W 27ST ST, NEW YORK, NY 10011
              </span>
              <span className="flex items-center gap-4 text-[23px] leading-[34px] font-normal">
                <AiTwotonePhone size={26} />
                ​(212) 123-4567
              </span>
            </div>
            <button className="py-5 px-9 mt-[45px] border rounded-[20px] border-black text-[30px] font-semibold leading-[45px]">
              Book Online
            </button>
          </div>
          <div className="w-full max-w-[680px] rounded-2xl border overflow-hidden flex items-center justify-center">
            <img
              src={serviceData?.payload[2]?.image}
              className="w-full rounded-lgw object-contain"
              alt={serviceData?.payload[2]?.name}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-[100px] items-center justify-between">
        { serviceData?.payload && serviceData.payload.map((service: any) => (
            <div className="flex items-center flex-col gap-5">
              <div className="w-[200px] overflow-hidden rounded-full h-[200px]">
              <img src={service.image} className="object-cover w-full h-full"  alt="category" />
              </div>
              <h3 className="text-[27px] leading-[41px] font-normal title">
                {service.name}
              </h3>
              <button className="py-4 px-14 bg-black rounded-[21px] text-white title uppercase underline text-[34px] leading-[51px] font-normal">
                more
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hero;