import {Response } from "../../types";
import { api } from "./index";

const BarbersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getBarbers: build.query<Response, void>({
            query: () => ({
                url: 'https://dummyjson.com/products'
            }),
            providesTags: ["Barbers"]
        })
    })
})

export const { useGetBarbersQuery } = BarbersApi;