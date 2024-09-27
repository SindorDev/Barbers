import { Response } from "../../types";
import { api } from "./index";

const UserApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query<Response, void>({
      query: () => ({
        url: "/auth/profile",
      }),
      providesTags: ["Barbers"],
    }),
    getBarber: build.query<Response, void>({
      query: () => ({
        url: "/users/barbers",
      }),
      providesTags: ["Barbers"],
    }),
    getAllUser: build.mutation<Response, void>({
      query: (body) => ({
        url: `/users?user-status=${body}`,
        method: "GET",
      }),
      invalidatesTags: ["Barbers"],
    }),

     signUpUser: build.mutation<Response, void>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Barbers"],
    }),
    signInUser: build.mutation<Response, void>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Barbers"],
    }),
    updateProfile: build.mutation<Response, any>({
      query: (body) => ({
        url: "/auth/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Barbers"],
    }),
    userArchived: build.mutation<Response, any>({
      query: (body) => ({
        url: `users/archive/${body}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Barbers"],
    }),
    userUnArchived: build.mutation<Response, any>({
      query: (body) => ({
        url: `users/unarchive/${body}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Barbers"],
    }),
    userRoleUpdate: build.mutation<Response, any>({
      query: ({body, newRole}) => ({
        url: `users/update-role/${body}`,
        method: "PATCH",
        body: {newRole},
      }),
      invalidatesTags: ["Barbers"],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useProfileQuery,
  useUpdateProfileMutation,
  useGetAllUserMutation,
  useUserArchivedMutation,
  useUserUnArchivedMutation,
  useUserRoleUpdateMutation,
  useGetBarberQuery
} = UserApi;
