import ServiceTable from "@/components/serviceTable/ServiceTable";
import { useGetServiceQuery } from "../../../redux/api/service-api"

const Service = () => {
  
  const {data} = useGetServiceQuery()
  
  return (
    <>

      <ServiceTable data={data?.payload}/>
    </>
  )
}

export default Service