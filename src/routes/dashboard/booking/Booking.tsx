import BookingTable from "@/components/bookingTable/BookingTable"
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