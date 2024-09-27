import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDelete,
} from "react-icons/ai";
import { Button, message } from "antd";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useDeleteBookingMutation } from "@/redux/api/booking-api";
import BookingModal from "../bookingModal/BookingModal";
const BookingTable = ({ data }: { data: any }) => {
  
  const [deleteBooking, {data: deleteBookingData, isSuccess}] = useDeleteBookingMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    deleteBooking(id as any);
  }    

  useEffect(() => {
       if(isSuccess && deleteBookingData){
              message.success(deleteBookingData?.message)
       }
  }, [deleteBookingData, isSuccess])


  return (

    <>
      <Table className="w-full text-emerald-900">
        <TableCaption>A list of Users</TableCaption>
        <TableHeader className="w-full">
          <div>
            <Button onClick={() => setIsModalOpen(true)} className="!bg-emerald-700 active:scale-95" type="primary">
              Create Booking
            </Button>
          </div>
        </TableHeader>
        <TableHeader>
          <TableRow className="!text-emerald-900">
            <TableHead>Barber Name</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Start and End</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData?.map((data: any) => (
            <TableRow key={data._id}>
              <TableCell className="font-medium">
                {data.barber.first_name}
              </TableCell>
              <TableCell>{data.client.first_name}</TableCell>
              <TableCell>
                {data.service.map((service: any) => service.name)}
              </TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell className="text-start">
                {data.start} - {data.end}
              </TableCell>
              <TableCell>${data.price}</TableCell>
              <TableCell>{data.comment}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell>
                <Button
                  className="!bg-red-500 active:scale-95"
                  type="primary"
                  onClick={() => handleDelete(data._id)}
                >
                  <AiOutlineDelete size={20} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <div className="w-full flex items-center justify-start">
          <div className="flex items-center gap-5 justify-between mt-4">
            <button
              className="disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <AiOutlineArrowLeft size={18} />
            </button>
            <span className="text-lg border w-[40px] flex items-center justify-center rounded-md border-[#A4A0A0]">
              {currentPage}
            </span>
            <button
              className="disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <AiOutlineArrowRight size={18} />
            </button>
          </div>
        </div>
      </Table>
      
      <BookingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
};

export default BookingTable;
