import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'}) 

export const getNameUser = (id) => API.post("/getName", id)

export const getImage = (id) => API.post('/getImage',id)