import { IoHomeOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { NavLink, useParams } from "react-router";

export default function DashboardLinks(){

    const params = useParams();
    return <section className="w-[15%] border-r h-[100vh] border-slate-300 p-4">
        <p className="text-[20px] font-medium">HudumaVoice</p>
        {/* <NavLink className={({isActive}) => isActive? 'flex space-x-4  bg-[#173DB3] py-3 text-white rounded-lg px-4 mt-6' : 'flex space-x-4 py-3 px-4 mt-10 hover:bg-blue-100 rounded-lg'} to='../dashboard'>
            <IoHomeOutline className="mt-1"/>
            <p>Dashboard</p>
        </NavLink> */}
        <NavLink className={({isActive}) => isActive? 'flex space-x-4  bg-[#173DB3] py-3 text-white rounded-lg px-4 mt-10' : 'flex space-x-4 py-3 px-4 mt-10 hover:bg-blue-100 rounded-lg' } to={`../${params.id}/text-to-text`}>
            <TbMessage className="mt-1"/>
            <p>Text-to-Text</p>
        </NavLink>
    </section>
}