import {Response } from "../../types";
import { api } from "./index";

const UserApi = api.injectEndpoints({
    endpoints: (build) => ({
        signUpUser: build.mutation<Response, void>({
            query: (body) => ({
                url: "/auth/sign-up",
                method: "POST",
                body
            }),
            invalidatesTags: ["Barbers"]
        }),
        signInUser: build.mutation<Response, void>({
            query: (body) => ({
                url: "/auth/sign-in",
                method: "POST",
                body
            }),
            invalidatesTags: ["Barbers"]
        }),
        profile: build.query<Response, void>({
            query: () => ({
                url: "/auth/profile"
            }),
            providesTags: ["Barbers"]
        })
    })
})

export const { useSignUpUserMutation, useSignInUserMutation, useProfileQuery } = UserApi;