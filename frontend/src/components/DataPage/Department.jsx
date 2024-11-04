import { getCourseAPI, addDepartmentAPI } from "../../utils/constants";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Course = () => {
    const [courseArray, setCourseArray] = useState([]);
    const form = useForm({
        defaultValues: {
            departmentName: "",
            courses: []
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
                const response = await fetch(getCourseAPI, {
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
                    setCourseArray(responseData.data);
                }
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        console.log("Department data", data);
        try {
            const accessToken = Cookies.get('accessToken');
            const response = await fetch(addDepartmentAPI, {
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
            <h1 className="text-2xl font-bold mb-4">Enter Department Data</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                    <input type="text" id="departmentName"
                        {...register("departmentName", {
                            required: {
                                value: true,
                                message: 'Department Name is required',
                            },
                        })}
                        className="w-full py-2 px-4 border rounded-lg" />
                    <p>{errors.departmentName?.message}</p>
                </div>
                <div className="mb-8">
                    <label htmlFor="courses"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >Select Courses</label>
                    {courseArray.length > 0 && (
                        <select
                        id="courses"
                        {...register("courses", {
                            required: {
                                value: true,
                                message: 'Course is required',
                            },
                        })}
                        className="w-full py-2 px-4 border rounded-lg"
                        multiple
                        >
                        {courseArray.map((course, index) => (
                            <option key={index} value={course.courseId}>{course.courseId}</option>
                        ))}
                        </select>
                    )}
                    <p>{errors.courses?.message}</p>
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
