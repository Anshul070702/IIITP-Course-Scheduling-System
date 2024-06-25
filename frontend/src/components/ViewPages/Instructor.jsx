import React ,{useEffect,useState} from 'react'
import {getInstructorAPI,updateInstructorAPI,deleteInstructorAPI}  from "../../utils/constants.js"
import Cookies from 'js-cookie'
import InstructorForm from './InstructorForm.jsx'
const Instructor = () => {
  const [isChanged,setisChanged] = useState(false)
  const [InstructorData,setInstructorData] = useState([])
  const handleDelete = async (id,instructorId)=>{
    const data = {
        id:id,
        instructorId:instructorId
    }
    try{
      const accessToken = Cookies.get('accessToken');
      const response = await fetch(deleteInstructorAPI,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':`Bearer ${accessToken}`
          },
          body: JSON.stringify(data)
      });
      if(!response.ok){
          throw new Error('Network response was not ok');
      }else{
          const responseData = await response.json();
          console.log(responseData)
          setisChanged(prev => !prev)
      }
    }
    catch (error) {
        console.error('There was a problem with your fetch operation:', error);
    }
  }
  const handleUpdate = async (data)=>{
      try{
        const accessToken = Cookies.get('accessToken');
        const response = await fetch(updateInstructorAPI,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${accessToken}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Network response was not ok');
        }else{
            const responseData = await response.json();
            console.log(responseData)
            setisChanged(prev => !prev)
        }
      }
      catch (error) {
          console.error('There was a problem with your fetch operation:', error);
      }
  }
  useEffect(()=>{
    const getData =async ()=>{
      try{
          const accessToken = Cookies.get('accessToken');
          const response = await fetch(getInstructorAPI,{
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${accessToken}`
              },
          });
          if(!response.ok){
              throw new Error('Network response was not ok');
          }else{
              const responseData = await response.json();
              console.log(responseData)
              setInstructorData(responseData.data)
          }
      }
      catch (error) {
          console.error('There was a problem with your fetch operation:', error);
      }
    }
    getData()
  },[isChanged])
  return (
    <div className='flex h-5/6 justify-center items-center'>
        <div className='h-5/6 w-4/6'>
           <div className='flex justify-between items-center bg-gray-100 p-4 w-full rounded-lg mb-4'>
                            <span className="w-1/6 py-2 px-4 font-bold mr-2">ID</span>
                            <span className="w-1/6 py-2 px-4 font-bold mr-2"></span>
                            <span className="w-1/6 py-2 px-4 font-bold mr-2"></span>
                            <span className="w-1/6 py-2 px-4 font-bold mr-2">NAME</span>
                            <span className="w-1/6 py-2 px-4 mr-2"></span>
                            <span className="w-1/6 py-2 px-4 mr-2"></span>
            </div>
            {
                InstructorData?.map((Instructor)=>{
                    return(
                       <InstructorForm key={Instructor._id} Instructor={Instructor} handleDelete={handleDelete} handleUpdate={handleUpdate}/> 
                    )
                })
            }
        </div>
    </div>
  )
}
export default Instructor;