import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getTasks = () => API.get("tasks/");
export const createTask = (data) => API.post("tasks/", data);
export const updateTask = (id, data) => API.patch(`tasks/${id}/`, data);
export const deleteTask = (id) => API.delete(`tasks/${id}/`);
export const registerUser = (data) => API.post(`register/`, data);
export const loginUser = (data) => API.post(`login/`, data);