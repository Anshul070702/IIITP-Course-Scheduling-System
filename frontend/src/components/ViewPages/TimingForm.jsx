import React, { useState } from 'react';

const TimingForm = ({ Timing, handleDelete ,handleUpdate}) => {
    const [startTime,setStartTime] = useState(Timing.startTime);
    const [endTime,setEndTime] = useState(Timing.endTime);
    const [day,setDay] = useState(Timing.day);
        
    return (
        <form key={Timing._id} className='flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
            <input
                type="text"
                value={Timing.timeId}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
                readOnly
            />
            <input
                type="text"
                value={startTime}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
                onChange={e=> setStartTime(e.target.value)}
            />
            <input
                type="text"
                value={endTime}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
                onChange={e=> setEndTime(e.target.value)}
            />
            <input
                type="text"
                value={day}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
                onChange={e=> setDay(e.target.value)}
            />
            <button
                type="button"
                onClick={() => {
                    handleUpdate({
                        timeId:Timing.timeId,
                        startTime:startTime,
                        endTime:endTime,
                        day:day
                    });
                }}
                className="bg-blue-500 w-1/6 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
            >
                Update
            </button>
            <button
                type="button"
                onClick={() => {
                    handleDelete(Timing.timeId);
                }}
                className="bg-red-500 w-1/6 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
                Delete
            </button>
        </form>
    );
};

export default TimingForm;
