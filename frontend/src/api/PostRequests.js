import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'}) 

export const deletePost = (id) => API.post("/post/deletePost", id)
export const updatePost = (data) => API.post("/post/updatePost", data)
export const reportPost = (data) => API.post("/post/reportPost", data)
export const likePost = (obj) => API.post("/likePost", obj)
export const commentCount = (id) =>API.post("/comment/commentCount", id)