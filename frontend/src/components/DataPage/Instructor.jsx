import { addInstructorAPI } from "../../utils/constants";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie"
import { useEffect } from "react";
const Instructor = () => {
    const form = useForm({
        defaultValues:{
            instructorId:"",
            name:"",
        }
    })
    const {register,handleSubmit ,formState ,reset} = form
    const {errors,isSubmitting,isSubmitSuccessful} = formState
    useEffect(()=>{
        if(isSubmitSuccessful) reset()
    },[isSubmitSuccessful])
    const handler=async (data)=>{
        console.log("Instructor data",data)
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(addInstructorAPI, {
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
              <h1 className="text-2xl font-bold mb-4">Enter Instructor Data</h1>
              <form onSubmit={handleSubmit(handler)}>
                  <div className="mb-4">
                      <label htmlFor="instructorId" className="block text-sm font-medium text-gray-700 mb-1">Instructor ID</label>
                      <input type="text" id="instructorId" 
                      {...register("instructorId",{
                        required:{
                            value:true,
                            message:'Instructor Id is required',
                        },
                       })}
                      className="w-full py-2 px-4 border rounded-lg" />
                      <p>{errors.instructorId?.message}</p>
                  </div>
                  <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                      <input type="text" id="name" 
                      {...register("name",{
                        required:{
                            value:true,
                            message:'Instructor Name is required',
                        },
                      })}
                      className="w-full py-2 px-4 border rounded-lg" />
                      <p>{errors.name?.message}</p>
                  </div>
                  <button disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700 transition duration-300">
                      SUBMIT
                  </button>
              </form>
          </div>
    )
}
export default Instructor
