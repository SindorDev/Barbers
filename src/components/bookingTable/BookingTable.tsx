import { AiOutlineCheck } from "react-icons/ai"; 
import { FiEdit } from "react-icons/fi"; 
import { MdCancel } from "react-icons/md"; 
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Button, message, Modal  } from "antd";
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
import {useDeleteBookingMutation } from "@/redux/api/booking-api";
import BookingModal from "../bookingModal/BookingModal";
import CommentModal from "../commentModal/CommentModal";
const BookingTable = ({ data, createBooking, setCreateBooking }: { data: any, createBooking: any, setCreateBooking: any }) => {
  
  const [deleteBooking, {data: deleteBookingData, isSuccess}] = useDeleteBookingMutation()
  
  const [modalOpen, setModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateBooking, setUpdateBooking] = useState([])
  const [commentsData, setCommentsData] = useState([])
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    deleteBooking(id as any);
  }    

  const handleCheck = (data: any) => {
    setCommentsData(data)
  }

  const handleUpdate = (data: any) => {
    setUpdateBooking(data)
    setIsModalOpen(true) 
    setCreateBooking({...data, edit: true})
  }


  useEffect(() => {
       if(isSuccess && deleteBookingData){
              message.success(deleteBookingData?.message)
       }
  }, [deleteBookingData, isSuccess])

  const handleOk = () => {
      setOpen(false);
      setModalOpen(true)
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };


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
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData?.map((data: any) => (
            <TableRow className={data.status === "canceled" ? "opacity-30" : data.status === "completed" ? "bg-green-200 text-green-700" : ""} key={data._id}>
              <TableCell className="font-medium">
                {data.barber.first_name}
              </TableCell>
              <TableCell>{data.client.first_name}</TableCell>
              <TableCell className="flex items-center gap-5">
                {data.service.map((service: any) => <span>{service.name}</span>)}
              </TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell className="text-start">
                {data.start} - {data.end}
              </TableCell>
              <TableCell>${data.price}</TableCell>
              <TableCell>{data.status}</TableCell>
              <TableCell className="flex items-center gap-5">

              <Button
                  disabled={data.status === "canceled" || data.status === "completed"}
                  className="!bg-yellow-500 active:scale-95"
                  type="primary"
                  onClick={() => handleUpdate(data)}
                >
                  <FiEdit size={20} />
                </Button>
                <Button
                  disabled={data.status === "canceled" || data.status === "completed"}
                  className="!bg-green-500 active:scale-95"
                  type="primary"
                  onClick={() => handleCheck(data)}
                >
                  <AiOutlineCheck size={20} />
                </Button>
                
                <Button
                  disabled={data.status === "canceled" || data.status === "completed"}
                  className="!bg-gray-500 active:scale-95"
                  type="primary"
                  onClick={() => handleDelete(data._id)}
                >
                  <MdCancel size={20} />
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

      <Modal
        title="Confirm Comment"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Can you tell me about your barber?</p>
      </Modal>

      
      <BookingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} updateBooking={updateBooking} setUpdateBooking={setUpdateBooking} createBooking={createBooking} setCreateBooking={setCreateBooking}/>
      <CommentModal modalOpen={modalOpen} commentsData={commentsData} setCommentsData={setCommentsData} setModalOpen={setModalOpen}/>
    </>
  );
};

export default BookingTable;
