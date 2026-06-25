import api from "./api";

export const createBooking = async (data) => {
  const res = await api.post("/bookings", data);
  return res.data;
};

export const getMyBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};

export const getProviderBookings = async () => {
  const res = await api.get("/bookings/provider");
  return res.data;
};

export const updateBookingStatus = async (id, status) => {
  const res = await api.put(`/bookings/${id}/status`, { status });
  return res.data;
};

export const getAllBookings = async () => {
  const res = await api.get("/bookings");
  return res.data;
};
