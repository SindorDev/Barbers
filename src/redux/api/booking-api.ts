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
    createBooking: build.mutation<Response, void>({
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
    })
  }),
});

export const { useGetBookingQuery, useCreateBookingMutation, useDeleteBookingMutation } = BookingApi