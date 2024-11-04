import { useState } from "react";
import { getSchedule, getPastSchedule } from "../../utils/constants";
import Cookies from "js-cookie";
import Days from "./Days"; // Assuming Days is a separate component that displays the day's classes
import Typewriter from "typewriter-effect";
import { jsPDF } from "jspdf"; // Importing jsPDF
import autoTable from "jspdf-autotable"; // Importing autoTable

const Schedule = () => {
  const [timetable, setTimetable] = useState(null); // Initialize state to null

  const fetchSchedule = async (url) => {
    const accessToken = Cookies.get("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };

  const handler = async () => {
    try {
      const data = await fetchSchedule(getSchedule);
      setTimetable(data);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  const viewHandler = async () => {
    try {
      const data = await fetchSchedule(getPastSchedule);
      setTimetable(data);
    } catch (error) {
      console.error("Error fetching past schedule:", error);
    }
  };

  const downloadPDF = () => {
    if (!timetable) {
      console.error("No timetable available to download.");
      return; // Exit if there is no timetable
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Timetable", 14, 20);

    Object.keys(timetable).forEach((section) => {
      // Add a new page for each class
      doc.addPage();
      let y = 30; // Initial Y position for each class schedule

      doc.setFontSize(14);
      doc.text(section, 14, y);
      y += 10;

      Object.keys(timetable[section]).forEach((day) => {
        doc.setFontSize(12);
        doc.text(day, 14, y);
        y += 5;

        const data = timetable[section][day] || []; // Fallback to empty array if undefined

        // Prepare data for autoTable
        const tableData = data.map((classInfo) => [
          classInfo.Course,
          `${classInfo.StartTime || "N/A"} - ${classInfo.EndTime || "N/A"}`,
          classInfo.Instructor || "N/A",
          classInfo.Room || "N/A",
        ]);

        // Define column headers
        const headers = [["Course", "Timing", "Instructor", "Room"]];

        // Use autoTable to create a table
        autoTable(doc, {
          head: headers,
          body: tableData,
          startY: y,
          theme: "grid",
          styles: {
            fontSize: 10,
          },
          margin: { top: 10, bottom: 10 },
        });

        y += 5 + data.length * 10; // Update y for next day
      });
    });

    doc.save("timetable.pdf");
  };

  const words = ["Course", "Scheduling", "Algorithm"];

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="h-1/6 bg-gradient-to-b from-blue-500 to-blue-300 py-4 flex justify-evenly items-center shadow-lg">
        <button
          onClick={handler}
          className="bg-yellow-400 px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          Get Schedule
        </button>
        <button
          onClick={viewHandler}
          className="bg-yellow-400 px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          View Schedule
        </button>
        <button
          onClick={downloadPDF}
          className="bg-yellow-400 px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          Download PDF
        </button>
      </div>
      <div className="container mx-auto py-6 flex-grow">
        {timetable ? (
          Object.keys(timetable).map((section, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
                {section}
              </h2>
              {Object.keys(timetable[section]).map((day, index) => (
                <Days key={index} day={day} data={timetable[section][day]} />
              ))}
            </div>
          ))
        ) : (
          <div className="text-blue-800 text-6xl flex justify-center items-center h-full">
            <Typewriter
              options={{
                strings: words,
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
                delay: 100,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
