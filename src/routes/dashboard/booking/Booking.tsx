import BookingTable from "@/components/bookingTable/BookingTable"
import { useGetBookingQuery } from "@/redux/api/booking-api"
import { useProfileQuery } from "@/redux/api/user-api"
import { useEffect, useState } from "react"

const Booking = () => {
  const {data} = useGetBookingQuery()
  const {data: clientData} = useProfileQuery()

  const [createBooking, setCreateBooking] = useState({
    date: "",
    start: "",
    end: "",
    status: "pending",
    service: [],
    client: 0,
    barber: 0,
    comment:  "",
    price: 0,
    paid: false,
    rating: []
  })
  
  useEffect(() => {
      if(clientData?.payload._id){
        setCreateBooking({...createBooking, client: clientData?.payload._id})
      }
  }, [clientData?.payload._id])


  return (
    <>
      <BookingTable data={data?.payload} createBooking={createBooking} setCreateBooking={setCreateBooking}/>
    </>
  )
}

export default Booking