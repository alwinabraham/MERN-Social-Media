import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const getNotification = (id) => API.get(`/notification/${id}`)

export const getNotifiCounter = (obj) =>API.post("/notification/getNotifiCounter",obj)