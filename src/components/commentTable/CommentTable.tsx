import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai"; 
import { BiMessageSquareEdit } from "react-icons/bi"; 

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
import { Button, message} from "antd";
import { useDeleteCommentMutation } from "@/redux/api/comment-api";
const CommentTable = ({data}: {data: any}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex);
  const [deleteComment, {data: deleteCommentData, isSuccess}] = useDeleteCommentMutation()
  const handleDelete = (id: string) => {
    deleteComment(id as any)
  }

  useEffect(() => {
    if(isSuccess && deleteCommentData){
      message.success(deleteCommentData?.message)
    }
  }, [isSuccess, deleteCommentData])

  return (
    <>
    
    <Table className="w-full text-emerald-900">
      


<TableCaption>A list of Comment</TableCaption>

<TableHeader>
  <TableRow className="!text-emerald-900">
    <TableHead>ID</TableHead>
    <TableHead>Barber Name</TableHead>
    <TableHead>Client Name</TableHead>
    <TableHead>Message</TableHead>
    <TableHead>Status</TableHead>
    <TableHead>Date</TableHead>
    <TableHead>Action</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
  {currentData?.map((data: any) => (
    <TableRow  key={data._id}
    >
      <TableCell className="font-medium">
        {data._id}
      </TableCell>
      <TableCell>{data.barber.first_name}</TableCell>
      <TableCell>{data.client.first_name}</TableCell>
      <TableCell className="!w-[20%]">
       {data.message}
      </TableCell>
      <TableCell>
       {data.status}
      </TableCell>
      
      <TableCell>
       {data.date}
      </TableCell>
      <TableCell>
              <div className="flex items-center gap-5">
                     <Button className="!bg-red-500 active:scale-95" type="primary"
                     onClick={() => handleDelete(data._id)}
                     >
                            <AiOutlineDelete size={20} />
                     </Button>
              </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

<div className="w-full flex items-center justify-start">
  <div className="flex items-center gap-5 justify-between mt-4">
    <button
      className="disabled:opacity-50"
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
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

    </>
  )
}

export default CommentTable