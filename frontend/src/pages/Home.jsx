import { Navbar } from "../components/Homepage/Navbar"
import { Outlet } from "react-router-dom"
const Home = () =>{
    return(
        <div className="h-screen">
            <Navbar/>
            <Outlet/>
        </div>
    ) 
}
export default Home