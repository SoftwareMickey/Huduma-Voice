import { Outlet, useLocation } from "react-router";
import Links from "./Links";

export default function RootLayout(){

    const location = useLocation();

    return <section className="bg-[#F9F9F9]">
        {location.pathname === '/' && <Links/>}
        <Outlet/>
    </section>
}