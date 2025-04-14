import { Outlet, useLocation } from "react-router";
import Links from "./Links";
import Navbar2 from "./Navbar-2.jsx";

export default function RootLayout(){

    const location = useLocation().pathname;


    console.log(location)
    const pagesWithNavbar2 = ['/', '/servicepage', '/industriespage'];


    return <section className="bg-[#F9F9F9]">
       {location.pathname === '/' && <Links/>}
       {pagesWithNavbar2.includes(location) && <Navbar2/>}

        <Outlet/>
    </section>
}