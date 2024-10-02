import { Response } from "@/types";
import { api } from ".";

const BookingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooking: build.query<Response, void>({
      query: () => ({
        url: "booking",
      }),
      providesTags: ["Barbers"],
    }),
    createBookings: build.mutation<Response, void>({
      query: (body) => ({
        url: "booking",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Barbers"],
    }),
    deleteBooking: build.mutation<Response, void>({
      query: (id) => ({
        url: `booking/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Barbers"],
    }),

    updateBookings: build.mutation<Response, any>({
      query: ({body, id}) => ({
        url: `booking/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Barbers"]
    }),
    checkBooking: build.mutation<Response, void>({
      query: (id) => ({
        url: `booking/complete/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: ["Barbers"]
    }),
    
  calculatePrice: build.mutation<Response, void>({
    query: (body) => ({
      url: "booking/calculate",
      method: "POST",
      body
    }),
    invalidatesTags: ["Barbers"]
  }),

  getAvailable: build.query<Response, void>({
    query: (params) => ({
      url: "/booking/available",
      method: "GET",
      params
     
    }),
    providesTags: ["Barbers"]
  })
  })
});

export const { useGetBookingQuery, useCreateBookingsMutation, useDeleteBookingMutation, useUpdateBookingsMutation,
   useCheckBookingMutation, useCalculatePriceMutation, useGetAvailableQuery } = BookingApi