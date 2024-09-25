import UserTable from "../../../components/usersTable/UserTable";
import { useGetAllUserMutation } from "../../../redux/api/user-api"

const Users = () => {
  const [ getAllUser ,{data}] = useGetAllUserMutation()

  return (
    <>
      <UserTable data={data?.payload as any} getAllUser={getAllUser}/>
    </>
  )
}

export default Users