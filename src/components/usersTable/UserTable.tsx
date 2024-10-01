import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {

  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser } from "@/types";
import { Button, message, Select } from "antd";
import {
  useProfileQuery,
  useUserArchivedMutation,
  useUserRoleUpdateMutation,
  useUserUnArchivedMutation,
} from "../../redux/api/user-api";
import { useEffect, useState } from "react";

const { Option } = Select;
const UserTable = ({
  data,
  getAllUser,
}: {
  data: any;
  getAllUser: any;
}) => {
  
  const [userArchived, { data: archivedData, isSuccess }] =
    useUserArchivedMutation();
  const [
    userUnArchived,
    { data: unArchivedData, isSuccess: isSuccessUnArchived },
  ] = useUserUnArchivedMutation();
  const [userRoleUpdate, { data: roleUpdateData, isSuccess: isSuccessRole }] =
    useUserRoleUpdateMutation();

  const {data: profile} = useProfileQuery()

  const filterData = data?.filter((item: IUser) => item._id !== profile?.payload?._id)


  const [userGet, setUserGet] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [useRole, setUseRole] = useState("user");
  const [userId, setUserId] = useState<any>("");
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filterData?.slice(startIndex, endIndex);

  
  const handleArchived = (data: IUser) => {
    if (data?.archived) {
      userUnArchived(data?._id);
    } else {
      userArchived(data?._id);
    }
  };
  const handlePromote = (promote: IUser, value: string) => {
    setUserId(promote?._id);
    setUseRole(value);
  };

  useEffect(() => {
    if (useRole && userId) {
      userRoleUpdate({
        body: userId,
        newRole: useRole,
      });
    }
  }, [useRole, userId]);

  useEffect(() => {
    if (userGet) {
      getAllUser(userGet);
    }
  }, [userGet]);

  useEffect(() => {
    if (isSuccess && archivedData) {
      message.success(archivedData.message);
    }
  }, [isSuccess, archivedData]);

  useEffect(() => {
    if (isSuccessUnArchived && unArchivedData) {
      message.success(unArchivedData.message);
    }
  }, [isSuccessUnArchived, unArchivedData]);

  useEffect(() => {
    if (isSuccessRole && roleUpdateData) {
      message.success(roleUpdateData.message);
    }
  }, [isSuccessRole, roleUpdateData]);

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        
        <TabsList>
          <TabsTrigger value="all" onClick={() => setUserGet("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => setUserGet("active")}>
            Active
          </TabsTrigger>
          <TabsTrigger value="archived" onClick={() => setUserGet("archived")}>
            Archived
          </TabsTrigger>
        </TabsList>
        <TabsContent value={userGet}>
          <Table className="w-full text-emerald-900">

            <TableCaption>A list of Users</TableCaption>
            <TableHeader></TableHeader>
            <TableHeader>
              <TableRow className="!text-emerald-900">
                <TableHead className="w-[30%] ">First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData?.map((data: IUser) => (
                <TableRow
                  className={
                    data?.archived
                      ? " opacity-70 line-through bg-slate-200"
                      : ""
                  }
                  key={data._id}
                >
                  <TableCell className="font-medium">
                    {data.first_name}
                  </TableCell>
                  <TableCell>{data.last_name}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center w-full gap-5">
                      <Button
                        onClick={() => handleArchived(data)}
                        type="primary"
                        className="!bg-red-500"
                      >
                        {data?.archived ? "Unarchive" : "Archive"}
                      </Button>
                      <Select
                        disabled={data?.archived}
                        className="w-[50%]"
                        value={data?.role}
                        onChange={(e) => handlePromote(data, e)}
                      >
                        <Option value="user">User</Option>
                        <Option value="barber">Barber</Option>
                        <Option value="manager">Manager</Option>
                      </Select>
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
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UserTable;
