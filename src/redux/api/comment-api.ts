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
  }),
});

export const { useCreateCommentMutation  } = CommentApi

