import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/canvas",
});

export const getAllCanvas = () => API.get("/");
export const getCanvas = (id) => API.get(`/${id}`);
export const createCanvas = (data) => API.post("/init", data);

export const addRectangle = (id, data) =>
  API.post(`/${id}/add/rectangle`, data);

export const addCircle = (id, data) =>
  API.post(`/${id}/add/circle`, data);

export const addText = (id, data) =>
  API.post(`/${id}/add/text`, data);

export const addImage = (id, formData) =>
  API.post(`/${id}/add/image`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const exportPDF = (id) =>
  window.open(`${API.defaults.baseURL}/${id}/pdf`);
