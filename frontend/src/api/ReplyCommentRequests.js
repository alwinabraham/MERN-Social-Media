import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const createReplyComment = (obj) =>API.post('/replyComment/', obj)

export const getReplyComment = (id) =>API.get(`/replyComment/${id}`)