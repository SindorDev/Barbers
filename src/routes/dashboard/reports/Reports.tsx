import CommentTable from "@/components/commentTable/CommentTable"
import { useGetCommentQuery } from "@/redux/api/comment-api"

const Reports = () => {

  const {data} = useGetCommentQuery()


  return (
    <>
      <CommentTable data={data?.payload}/>
    </>
  )
}

export default Reports