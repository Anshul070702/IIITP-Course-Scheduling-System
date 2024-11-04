import React, { useState } from 'react';

const RoomForm = ({ Room, handleUpdate, handleDelete }) => {
    const [capacity, setCapacity] = useState(Room.capacity);

    return (
        <form key={Room._id} className='flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4'>
            <input
                type="text"
                value={Room.roomId}
                className="w-1/4 py-2 px-4 border rounded-lg mr-2"
                readOnly
            />
            <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-1/2 py-2 px-4 border rounded-lg mr-2"
            />
            <button
                type="button"
                onClick={() => {
                    handleUpdate({
                        roomId: Room.roomId,
                        capacity: capacity
                    });
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600 transition duration-300"
            >
                Update
            </button>
            <button
                type="button"
                onClick={() => {
                    handleDelete(Room.roomId);
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
                Delete
            </button>
        </form>
    );
};

export default RoomForm;
