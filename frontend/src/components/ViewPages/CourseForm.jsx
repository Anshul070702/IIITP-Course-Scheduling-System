import React, { useState } from 'react';

const CourseForm = ({ course, handleUpdate, handleDelete }) => {
    const [capacity, setCapacity] = useState(course.coursecapacity);
    const [credit, setCredit] = useState(course.credit);

    return (   
        <form className='flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
            <input
                type="text"
                value={course.courseId}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
                readOnly
            />
            <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
            />
            <input
                type="number"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
            />
            <input
                type="text"
                value={course.instructor.name}
                className="w-1/6 py-2 px-4 border rounded-lg mr-2"
                readOnly
            />
            <button
                type="button"
                onClick={() => {
                    handleUpdate({
                        courseId: course.courseId,
                        coursecapacity: capacity,
                        credit:credit,
                        instructor: course.instructor.name
                    });
                }}
                className="w-1/6 bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
            >
                Update
            </button>
            <button
                type="button"
                onClick={() => {
                    handleDelete(course.courseId);
                }}
                className="w-1/6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
                Delete
            </button>
        </form>
    );
};

export default CourseForm;
