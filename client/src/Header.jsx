import { BiBell, BiEdit, BiUser } from "react-icons/bi";
import { FaBell } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function Header(){

    const messages = useSelector(state => state.project.userMessages);

    return <section className={`flex ${messages.length > 0 ? 'justify-between' : 'justify-end' } mt-4 px-8`}>
        {messages.length > 0 && <div className="flex space-x-2 hover:cursor-pointer">
            <BiEdit className="mt-1 text-slate-600" size={22}/>
            <p className="text-[18px]">New Chat</p>
        </div>}
        <div className="flex space-x-4">
            <BiBell className="text-slate-500 border border-slate-500 p-4 rounded-full hover:cursor-pointer" size={55}/>
            <BiUser className="text-slate-500 border border-slate-500 p-4 rounded-full hover:cursor-pointer" size={55}/>
        </div>
    </section>
}