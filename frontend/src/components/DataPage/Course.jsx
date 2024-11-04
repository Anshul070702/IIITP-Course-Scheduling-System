import { getInstructorAPI, addCourseAPI } from "../../utils/constants";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Course = () => {
    const [instructorArray, setInstructorArray] = useState([]);
    const form = useForm({
        defaultValues: {
            courseId: "",
            credit:"",
            coursecapacity:"",
            instructorname: ""
        }
    });
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitting, isSubmitSuccessful } = formState;
    useEffect(()=>{
        if(isSubmitSuccessful) reset()
    },[isSubmitSuccessful])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const accessToken = Cookies.get('accessToken');
                const response = await fetch(getInstructorAPI, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    const responseData = await response.json();
                    console.log(responseData);
                    setInstructorArray(responseData.data);
                }
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(addCourseAPI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const responseData = await response.json();
                console.log(responseData);
            }
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <div className="bg-white text-center p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Enter Course Data</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">Course ID</label>
                    <input type="text" id="courseId"
                        {...register("courseId", {
                            required: {
                                value: true,
                                message: 'Course Id is required',
                            },
                        })}
                        className="w-full py-2 px-4 border rounded-lg" />
                    <p>{errors.courseId?.message}</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="credit" className="block text-sm font-medium text-gray-700 mb-1">Course Credit</label>
                    <input type="number" id="credit"
                        {...register("credit", {
                            required: {
                                value: true,
                                message: 'Course Credit is required',
                            },
                            valueAsNumber: true,
                        })}
                        className="w-full py-2 px-4 border rounded-lg" />
                    <p>{errors.credit?.message}</p>
                </div>
                <div className="mb-4">
                    <label htmlFor="coursecapacity" className="block text-sm font-medium text-gray-700 mb-1">Course Capacity</label>
                    <input type="number" id="coursecapacity"
                        {...register("coursecapacity", {
                            required: {
                                value: true,
                                message: 'Course Capacity is required',
                            },
                            valueAsNumber: true,
                        })}
                        className="w-full py-2 px-4 border rounded-lg" />
                    <p>{errors.coursecapacity?.message}</p>
                </div>
                <div className="mb-8">
                    <label htmlFor="instructorname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >Select an Instructor</label>
                    {instructorArray.length > 0 && (
                        <select
                            id="instructorname"
                            {...register("instructorname", {
                                required: {
                                    value: true,
                                    message: 'Instructor Name is required',
                                },
                            })}
                            className="w-full py-2 px-4 border rounded-lg"
                        >
                            {instructorArray.map((instructor, index) => (
                                <option key={index} value={instructor.name}>{instructor.name}</option>
                            ))}
                        </select>
                    )}
                    <p>{errors.instructorname?.message}</p>
                </div>
                <button disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700 transition duration-300">
                    SUBMIT
                </button>
            </form>
        </div>
    );
};

export default Course;
