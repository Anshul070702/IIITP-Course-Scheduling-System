import { useState } from "react"
import { getSchedule , getPastSchedule} from "../../utils/constants"
import Cookies from "js-cookie"
import Days from "./Days"
import Typewriter from "typewriter-effect"

const Schedule = () => {
  const [timetable,setTimetable] = useState()
  const handler = async ()=>{
   const accessToken = Cookies.get('accessToken');
   const response = await fetch(getSchedule, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`
       },
   });
     if(!response.ok){
        throw new Error('Network response was not ok');
     }else{
        const data = await response.json();
        console.log(data)
        setTimetable(data)
     }
  }
  const viewHandler = async () => {
   const accessToken = Cookies.get('accessToken');
   const response = await fetch(getPastSchedule, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${accessToken}`
       },
   });
     if(!response.ok){
        throw new Error('Network response was not ok');
     }else{
        const data = await response.json();
        console.log(data)
        setTimetable(data)
     }
  }
  const words = [
    "Course",
    "Scheduling",
    "Algorithm"
  ]
  return (
    <div className="h-5/6">
      <div className=" h-1/6 bg-gradient-to-b from-blue-400 to-blue-200 py-4">
        <div className="flex justify-evenly">
          <button
            onClick={handler}
            className="inline-block bg-yellow-400 px-4 py-2 mx-2 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            Get Schedule
          </button>
          <button
            onClick={viewHandler}
            className="inline-block bg-yellow-400 px-4 py-2 mx-2 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            View Schedule
          </button>
        </div>
      </div>
      {
      timetable ?
      <div className="container mx-auto">
           {
            Object.keys(timetable).map((section, index) => (
              <div key={index}>
                <div className="flex justify-center text-2xl font-bold mb-4">{section}</div>
                {Object.keys(timetable[section]).map((day, index) => (
                  <Days key={index} data={timetable[section][day]} />
                ))}
              </div>
            ))
           }
      </div>
      : <div className="text-blue-800 text-8xl h-5/6 flex justify-center items-center"><Typewriter
        options={
          {
            strings:words,
            autoStart:true,
            loop:true,
            deleteSpeed:50,
            delay:100,
          }
        }
        />
        </div>
      }
    </div>
  )
}

export default Schedule