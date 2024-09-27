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
import { Button, message } from "antd";
import { useDeleteServiceMutation } from "@/redux/api/service-api";
import CreateService from "../createService/CreateService";
const ServiceTable = ({data}: {data: any}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateService, setUpdateService] = useState([])
  const [deleteOrder, {data: deleteOrderData, isSuccess}] = useDeleteServiceMutation()
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data?.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
       deleteOrder(id as any)
}

const handleUpdate = (data: any) => {
  setUpdateService(data)
  setIsModalOpen(true)
}

useEffect(() => {
       if(isSuccess && deleteOrderData){
              message.success(deleteOrderData?.message)
       }
}, [deleteOrderData, isSuccess])


  return (
    <>
    
    <Table className="w-full text-emerald-900">
      


<TableCaption>A list of Users</TableCaption>
<TableHeader className="w-full">
       <div>
              <Button onClick={() => setIsModalOpen(true)} className="!bg-emerald-700 active:scale-95" type="primary">
                     Create Service       
              </Button>
       </div>
</TableHeader>
<TableHeader>
  <TableRow className="!text-emerald-900">
    <TableHead>ID</TableHead>
    <TableHead className="w-[30%]">Name</TableHead>
    <TableHead>Price</TableHead>
    <TableHead>Image</TableHead>
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
      <TableCell>{data.name}</TableCell>
      <TableCell>${data.price}</TableCell>
      <TableCell>
       <img src={data.image} width={60} className="object-contain rounded-full shadow-slate-500 shadow-md" alt={data.name} />
      </TableCell>
      <TableCell>
              <div className="flex items-center gap-5">
                     <Button className="!bg-yellow-500 active:scale-95" type="primary" onClick={() => handleUpdate(data)}>
                            <BiMessageSquareEdit size={20} />
                     </Button>
                     <Button className="!bg-red-500 active:scale-95" type="primary" onClick={() => handleDelete(data._id)}>
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

<CreateService isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} updateServices={updateService} setUpdateService={setUpdateService}/>
    </>
  )
}

export default ServiceTable