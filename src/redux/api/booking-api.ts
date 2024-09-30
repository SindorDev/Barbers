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
        url: `booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Barbers"],
    }),

    updateBooking: build.mutation<Response, any>({
      query: ({body, id}) => ({
        url: `booking/${id}`,
        method: "PATCH",
        body
      }) 
    })
  })
});

export const { useGetBookingQuery, useCreateBookingsMutation, useDeleteBookingMutation, useUpdateBookingMutation } = BookingApi