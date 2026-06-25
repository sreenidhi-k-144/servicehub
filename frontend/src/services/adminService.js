import api from "./api";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

export const getStats = async () => {
  const res = await api.get("/admin/stats");
  return res.data;
};
