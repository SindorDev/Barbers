import { Response } from "@/types";
import { api } from "./index";

const ServiceApi = api.injectEndpoints({
       endpoints: (build) => ({
           getService: build.query<Response, void>({
               query: () => ({
                   url: 'service/'
               }),
               providesTags: ["Barbers"]
           }),
           createService: build.mutation<Response, void>({
               query: (body) => ({
                   url: 'service/',
                   method: "POST",
                   body
               }),
               invalidatesTags: ["Barbers"]
           }),
           deleteService: build.mutation<Response, void>({
               query: (id) => ({
                   url: `service/${id}`,
                   method: "DELETE"
               }),
               invalidatesTags: ["Barbers"]
           }),
           updateService: build.mutation<Response, void>({
               query: ({body, id}: any) => ({
                   url: `service/${id}`,
                   
                   method: "PATCH",
                   body
               }),
               invalidatesTags: ["Barbers"]
           })
       })
})

export const { useGetServiceQuery, useDeleteServiceMutation, useCreateServiceMutation, useUpdateServiceMutation } = ServiceApi