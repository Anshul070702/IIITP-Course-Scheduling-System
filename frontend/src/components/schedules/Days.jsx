import React from 'react';

const Days = ({ data }) => {
  return (
    <div className='flex items-center mb-2'>
        <div className='w-1/6 h-36 flex justify-center items-center
         bg-blue-400'>{data[0].Day}</div>
        {
             data.map((classInfo, index) => (
                <div key={index} className='m-4 p-4 border rounded-lg' style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
                  <p className='text-blue-400'>Course: {classInfo.Course}</p>
                  <p>{classInfo.StartTime}-{classInfo.EndTime}</p>
                  <p>Instructor: {classInfo.Instructor}</p>
                  <p>Room: {classInfo.Room}</p>
                </div>
            ))
        }
    </div>
  );
};

export default Days;

