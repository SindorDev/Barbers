import { useGetAllUserMutation, useGetBarberQuery } from "@/redux/api/user-api"
import UserTable from "../../../components/usersTable/UserTable"
const Barber = () => {

  const {data} = useGetBarberQuery()
  const [getAllUser] = useGetAllUserMutation();

  return (
    <>
      <UserTable data={data?.payload} getAllUser={getAllUser}/>
    </>
  )
}

export default Barber