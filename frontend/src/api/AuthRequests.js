import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const updateProfile = (obj) => API.post('/updateProfile',obj)
