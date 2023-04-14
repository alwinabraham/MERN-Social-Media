import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const createComment = (obj) => API.post('/comment/createComment',obj)

export const getComment = (id) => API.post(`/comment/getComment`, id)