import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const getAllUsers = () => API.post("/admin/users")