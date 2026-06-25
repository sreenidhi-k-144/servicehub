import api from "./api";

export const getProviders = async (params = {}) => {
  const res = await api.get("/providers", { params });
  return res.data;
};

export const getProviderById = async (id) => {
  const res = await api.get(`/providers/${id}`);
  return res.data;
};

export const getMyProviderProfile = async () => {
  const res = await api.get("/providers/me/profile");
  return res.data;
};

export const saveProviderProfile = async (data) => {
  const res = await api.post("/providers", data);
  return res.data;
};

export const deleteProvider = async (id) => {
  const res = await api.delete(`/providers/${id}`);
  return res.data;
};
