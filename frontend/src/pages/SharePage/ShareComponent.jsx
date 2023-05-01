import React, { useState } from "react";
import axios from "axios";
import ShareNameComponent from "./ShareNameComponent";
import { useSelector } from "react-redux";
import { getChatId } from "../../api/ChatRequests";
import { addMessage } from "../../api/MessageRequests";

export default function ShareComponent({urlMessage}) {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [receiver,setReceiver] = useState()
    const user = useSelector((state)=>state.user)

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.post(`http://localhost:4000/search`,{value:query});
        setResults(response.data);
        } catch (error) {
        console.log(error);
        }
    };

    // Send Message
    const handleSend = async()=> {

        const {data} = await getChatId({senderId:user.user,receiverId:receiver})
        console.log(data);
        const message = {
            senderId : user.user,
            text: urlMessage,
            chatId: data._id,
            createdAt:new Date()
        }

        // send message to socket server
        // setSendMessage({...message, receiverId})
        // send message to database
        try {
        const { data } = await addMessage(message);
        }
        catch
        {
        console.log("error")
        }
    }

    return (
        <form className="mb-4 w-full" onSubmit={handleSearch}>
        <div className="relative">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
            </svg>
            <input
            type="text"
            placeholder="Search"
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-emerald-700"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            />
        </div>
        {results.length > 0 && (
            <ul className="mt-2">
            {results.map((member) => (
                <>
                <div className="flex items-center" onClick={()=>{setReceiver(member._id);handleSend()}}>
                    <img className="w-16 h-16 mb-3 rounded-full shadow-lg" src={member.imageName} />
                    <div className="w-full p-3 bg-white rounded flex" key={member._id}>
                        <ShareNameComponent userId={member._id}/>
                    </div>
                </div>
                </>
            ))}
            </ul>
        )}
        </form>
    );
    }