import { addRoomAPI } from "../../utils/constants";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"
import { useEffect } from "react";
const Room = () => {
    const form = useForm({
        defaultValues:{
            roomId:"",
            capacity:"",
        }
    })
    const {register,handleSubmit ,formState ,reset} = form
    const {errors,isSubmitting,isSubmitSuccessful} = formState
    useEffect(()=>{
        if(isSubmitSuccessful) reset()
    },[isSubmitSuccessful])
    const handler=async (data)=>{
        console.log("Room Data", data)
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(addRoomAPI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const responseData = await response.json();
                console.log(responseData)
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }
    return (
            <div className="bg-white text-center p-4 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Enter Room Data</h1>
                <form onSubmit={handleSubmit(handler)}>
                    <div className="mb-4">
                        <label htmlFor="roomId" className="block text-sm font-medium text-gray-700 mb-1">Room ID</label>
                        <input type="text" id="roomId"
                         {...register("roomId",{
                                required:{
                                    value:true,
                                    message:'Room Id is required',
                                },
                          })}
                         className="w-full py-2 px-4 border rounded-lg" />
                         <p>{errors.roomId?.message}</p>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                        <input type="number" id="capacity"
                        {...register("capacity",{
                            required:{
                                value:true,
                                message:'Capacity is required',
                            },
                         })}
                         className="w-full py-2 px-4 border rounded-lg" />
                         <p>{errors.capacity?.message}</p>
                    </div>
                    <button disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700 transition duration-300">
                        SUBMIT
                    </button>
                </form>
            </div>
    )
}
export default Room
