import React from "react";
import { InfoCard } from "./InfoCard";
import facilities from "../../assets/images/facilities.jpeg";
import professors from "../../assets/images/professors.jpeg";
import students from "../../assets/images/students.jpeg";
import courses from "../../assets/images/courses.jpeg";
import time from "../../assets/images/time.jpeg";
import department from "../../assets/images/department.jpeg";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    // <div className="flex flex-wrap justify-center items-center min-h-5/6 bg-gray-200">
    //   <div className="flex my-4">
    //     <Link to="./Instructor">
    //       <InfoCard name="Professors" image={professors} />
    //     </Link>
    //     <Link to="./Section">
    //       <InfoCard name="Classes" image={students} />
    //     </Link>
    //     <Link to="./Room">
    //       <InfoCard name="Rooms" image={facilities} />
    //     </Link>
    //   </div>
    //   <div className="flex my-4">
    //     <Link to="./Course">
    //       <InfoCard name="Courses" image={courses} />
    //     </Link>
    //     <Link to="./Timing">
    //       <InfoCard name="Time" image={time} />
    //     </Link>
    //     <Link to="./Department">
    //       <InfoCard name="Department" image={department} />
    //     </Link>
    //   </div>
    // </div>
    <div className="flex flex-wrap justify-center items-center min-h-5/6 bg-gray-200">
      <div className="flex my-4">
        <Link to="./Instructor" >
          <InfoCard name="Professors" image={professors} />
        </Link>
        <Link to="./Section" >
          <InfoCard name="Classes" image={students} />
        </Link>
        <Link to="./Room" >
          <InfoCard name="Rooms" image={facilities} />
        </Link>
      </div>
      <div className="flex my-4">
        <Link to="./Course" >
          <InfoCard name="Courses" image={courses} />
        </Link>
        <Link to="./Timing" >
          <InfoCard name="Time" image={time} />
        </Link>
        <Link to="./Department" >
          <InfoCard name="Department" image={department} />
        </Link>
      </div>
    </div>
  );
};

export default Cards;
