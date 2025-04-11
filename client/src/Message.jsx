import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import { MdOutlineContentCopy } from "react-icons/md";
import { SiChatbot } from "react-icons/si";
import { FaRegUser } from "react-icons/fa6";
import ChatBotResponse from "./ChatBotResponse";

export default function Messages() {
    const messages = useSelector((state) => state.project.userMessages);
    const isLoading = useSelector((state) => state.project.isLoading);
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const messageItems = messages.map((msg, index) => (
        <div key={index} className={`flex w-full my-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div>
                <div className="flex space-x-2">
                    {msg.sender !== "user" && <SiChatbot className="mt-[6px] text-blue-600"/>}
                    {msg.sender === "user" && <FaRegUser className="mt-[5px] text-slate-600"/>}
                    {msg.sender !== "user" && <p className="font-medium mb-3">HudumaVoice</p>}
                    {msg.sender === "user" && <p className="font-medium mb-3">You</p>}
                </div>
                <div className={`border px-4 py-4 w-max space-x-4 flex ${msg.sender === "user" ? "bg-white border-slate-200 rounded-br-lg rounded-tl-lg" : "bg-[#0258F8] text-white rounded-bl-lg rounded-tr-lg"}`}>
                    <div className="flex flex-col">
                        <div className="flex space-x-4">
                            {msg.sender === "user"? <p>{msg.msg}</p> : <ChatBotResponse text={msg.msg} />}
                            <p className="text-[13px] mt-2 opacity-70 text-right">{msg.time}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <section className="h-[80vh] flex flex-col overflow-y-auto pb-10 px-8 w-[70%] mx-auto pt-20 scrollbar-hide">
            <div className="flex flex-col">{messageItems}</div>

            {/* Invisible div to auto-scroll to the latest message */}
            <div ref={messagesEndRef} />

            {/* Loader for processing */}
            {isLoading && <div className="flex items-center space-x-2 bg-[#0258F8] w-max px-6 text-white italic rounded-r-lg rounded-bl-lg py-2 mb-2">
                <Loader />
                {/* <p>Processing...</p> */}
            </div>}
        </section>
    );
}
