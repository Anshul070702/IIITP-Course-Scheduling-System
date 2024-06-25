import courseImage from "../../assets/images/data_background.png"
import Section from "./Section"
import Course from "./Course"
import Timings from "./Timings"
import Instructor from "./Instructor"
import Room from "./Room"
import Department from "./Department"
const sendData = ({item})=>{
    return(
        <div className="h-5/6 relative">
            <img src={courseImage} className="h-full w-full" alt="Course" />
            <div className="absolute inset-0 flex justify-center items-center">
                {item === "Section" ? <Section />
                : item === "Course" ? <Course />
                    : item === "Timings" ? <Timings />
                    : item === "Room" ? <Room />
                        : item === "Instructor" ? <Instructor />
                        : item === "Department" ? <Department/>
                        : <div></div>
                }
            </div>
        </div>

    )
}
export default  sendData