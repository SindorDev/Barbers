import { Response } from "@/types";
import { api } from ".";

const CommentApi = api.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<Response, any>({
      query: ({body, id}) => ({
        url: `comment/${id}`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Barbers"]
    }),
    getComment: build.query<Response, void>({
      query: () => ({
        url: "comment"
      }),
      providesTags: ["Barbers"]
    }),
    deleteComment: build.mutation<Response, any>({
      query: (id) => ({
        url: `comment/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Barbers"]
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentQuery, useDeleteCommentMutation  } = CommentApi