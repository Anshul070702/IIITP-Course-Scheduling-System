import React, { useState } from 'react';

const InstructorForm = ({ Instructor, handleUpdate, handleDelete }) => {
    const [name, setName] = useState(Instructor.name);
    return (
        <form className='flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
            <input
                type="text"
                value={Instructor.instructorId}
                className="w-1/4 py-2 px-4 border rounded-lg mr-2"
                readOnly
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-1/2 py-2 px-4 border rounded-lg mr-2"
            />
            <button
                type="button"
                onClick={() => {
                    handleUpdate({
                        instructorId: Instructor.instructorId,
                        name: name
                    });
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
            >
                Update
            </button>
            <button
                type="button"
                onClick={() => {
                    handleDelete(Instructor._id,Instructor.instructorId);
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
                Delete
            </button>
        </form>
    );
};

export default InstructorForm;
