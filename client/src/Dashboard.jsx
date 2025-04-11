import { useLocation, useParams } from "react-router";
import DashboardLinks from "./DashboardLinks";
import TextToText from "./Text-To-Text";
import BotLandingPage from "./BotLandingPage";

export default function Dashboard(){

    const location = useLocation().pathname;
    const params = useParams();
    console.log(location)
    console.log(params)
    

    return <section className="flex">
        {/* <DashboardLinks/> */}
        {location === '/dashboard' && <p>Dashbord</p>}
        {location === `/${params.id}/dashboard` && <BotLandingPage/>}
        {location === `/${params.id}/text-to-text` && <TextToText/>}
    </section>
}