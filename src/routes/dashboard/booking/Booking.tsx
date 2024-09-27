import BookingTable from "@/components/bookingTable/bookingTable"
import { useGetBookingQuery } from "@/redux/api/booking-api"

const Booking = () => {
  const {data} = useGetBookingQuery()
  return (
    <>
      <BookingTable data={data?.payload}/>
    </>
  )
}

export default Booking