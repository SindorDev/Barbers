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
        })
    })
})

export const { useSignUpUserMutation, useSignInUserMutation } = UserApi;