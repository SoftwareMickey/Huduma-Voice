import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "./store";
import Messages from "./Message";
import { FaStop } from "react-icons/fa6";
import Header from "./Header";
import { useParams } from "react-router"

export default function TextToText() {

    const CHAT_URL = import.meta.env.VITE_BOT_URL;
    const params = useParams();

    const messages = useSelector(state => state.project.userMessages);
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [textIsFocused, setTextIsFocused] = useState(false);

    const isLoading = useSelector(state => state.project.isLoading)

    // Function to format time as "12:30 PM"
    function getFormattedTime() {
        const date = new Date();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${ampm}`;
    }


    async function getResponseURL(){
        const response = await fetch(`${CHAT_URL}/chat`, {
            method : 'POST',
            body: JSON.stringify({
                userId : params.id,
                message: text
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        if(response.ok){
            const data = await response.json();
            console.log(data.messages[1].sender)

            if(data.messages[1].sender === "assistant"){
                dispatch(projectActions.addMessagesHandler({
                    text: data.messages[1].message,
                    time: getFormattedTime(),
                    sender: data.messages[1].sender,
                    isLoading : false
                }));

                console.log(`Data : ${data.messages}`)
            }
        }else{
            const data = await response.json();
            console.log(`Data : ${data}`)
        }
    }

    function sendMessageHandler() {
        if (text.trim() === "") return; // Prevent empty messages

        const userMessage = {
            text: text,
            time: getFormattedTime(),
            sender: "user",
            isLoading : true
        };

        dispatch(projectActions.addMessagesHandler(userMessage));
        setText('');
        getResponseURL()
    }

    function closeSendingSession(){
        dispatch(projectActions.closeSectionHandler())
    }

    return (
        <section className="flex flex-col w-full">
            <Header/>
            {/* Display welcome message if no conversation exists */}
            {messages.length === 0 && (
                <div className="h-[70vh] flex flex-col items-center justify-center">
                    <p className="text-[24px] font-medium text-center">
                        Seamlessly Communicate Across Languages with AI.
                    </p>
                    <p className="text-center mt-4 w-[60%] leading-7">
                        Break language barriers effortlessly. Our advanced AI understands, translates, and
                        generates text in multiple languages with high accuracy, making global communication smoother than ever.
                    </p>
                </div>
            )}

            {/* Display Messages if available */}
            {messages.length > 0 && <Messages />}

            {/* <ChatBotResponse text={reply} /> */}

            {/* Message Input Section */}
            <div className="flex items-center space-x-4 p-4 w-[50%] mx-auto">
                <textarea
                    placeholder="Type or paste text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessageHandler()}
                    onFocus={() => setTextIsFocused(true)}
                    onBlur={() => setTextIsFocused(false)}
                    className={`border w-full rounded-r-lg rounded-tl-lg border-slate-300 py-3 px-4 resize-none ${textIsFocused ? 'outline-none' : ''}`}
                    rows="2"
                />
                <button
                    className="bg-[#0258F8] text-white hover:cursor-pointer rounded-full p-3 flex items-center justify-center"
                    onClick={sendMessageHandler}
                >
                    {isLoading ? <FaStop size={20}/> : <IoMdSend size={28} onClick={closeSendingSession}/>}
                </button>
            </div>
        </section>
    );
}
