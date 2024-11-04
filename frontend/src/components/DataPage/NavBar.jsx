import { Link } from "react-router-dom"
import Button from "./Button"
export const Navbar = ({setAddItem})=>{
    return(
        <div className="h-1/6 flex justify-between items-center bg-slate-200">
            <div className="px-4 py-2 border hover:animate-swiggle">
                <Link to="../home">
                        ⬅️Back to Home
                </Link>
            </div>
            <div className="flex items-center">
                <Button item="Add Department" setAddItem={setAddItem}/>
                <Button item="Add Section" setAddItem={setAddItem}/>
                <Button item="Add Room" setAddItem={setAddItem}/>
                <Button item="Add Instructor" setAddItem={setAddItem}/>
                <Button item="Add Course" setAddItem={setAddItem}/>
                <Button item="Add Timings" setAddItem={setAddItem}/>
            </div>
        </div>
    )
}