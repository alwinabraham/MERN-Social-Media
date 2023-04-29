import axios from "axios";
const API = axios.create({baseURL: 'http://localhost:4000'})

export const getFriends = () => API.post("/friends",)

export const sendFriendRequest = (obj) => API.post("/friends/sendFriendRequest",obj)