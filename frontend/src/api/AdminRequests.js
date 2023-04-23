import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const getAllUsers = () => API.post("/admin/users")
export const blockAUser = (obj) => API.post("admin/blockAUser",obj)
export const getReportedPosts = () =>API.post("/admin/getReportedPosts")
export const blockAPost = (obj) =>API.post("/admin/blockAPost",obj)