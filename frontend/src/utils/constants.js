const localhost= 'localhost'

export const loginAPI =         `http://${localhost}:3001/api/v1/users/login`;
export const signupAPI =        `http://${localhost}:3001/api/v1/users/register`;

export  const logoutAPI =       `http://${localhost}:3001/api/v1/users/logout`;

export const addInstructorAPI = `http://${localhost}:3001/api/v1/instructors/setinstructor`;
export const addSectionAPI =    `http://${localhost}:3001/api/v1/sections/setsection`;
export const addRoomAPI =       `http://${localhost}:3001/api/v1/rooms/setroom`;
export const addTimingAPI =     `http://${localhost}:3001/api/v1/timings/setmeeting`;
export const addCourseAPI =     `http://${localhost}:3001/api/v1/courses/setcourse`;
export const addDepartmentAPI=  `http://${localhost}:3001/api/v1/departments/setdepartment`

export const getInstructorAPI = `http://${localhost}:3001/api/v1/instructors/getinstructors`;
export const getSectionAPI =    `http://${localhost}:3001/api/v1/sections/getsections`;
export const getRoomAPI =       `http://${localhost}:3001/api/v1/rooms/getrooms`;
export const getTimingAPI =     `http://${localhost}:3001/api/v1/timings/getmeetings`;
export const getCourseAPI =     `http://${localhost}:3001/api/v1/courses/getcourses`;
export const getDepartmentAPI = `http://${localhost}:3001/api/v1/departments/getDepartments`

export const updateInstructorAPI = `http://${localhost}:3001/api/v1/instructors/updateinstructor`;
export const updateSectionAPI =    `http://${localhost}:3001/api/v1/sections/updatesection`;
export const updateRoomAPI =       `http://${localhost}:3001/api/v1/rooms/updateroom`;
export const updateTimingAPI =     `http://${localhost}:3001/api/v1/timings/updatemeeting`;
export const updateCourseAPI =     `http://${localhost}:3001/api/v1/courses/updatecourse`;

export const deleteInstructorAPI = `http://${localhost}:3001/api/v1/instructors/deleteinstructor`;
export const deleteSectionAPI =    `http://${localhost}:3001/api/v1/sections/deletesection`;
export const deleteRoomAPI =       `http://${localhost}:3001/api/v1/rooms/deleteroom`;
export const deleteTimingAPI =     `http://${localhost}:3001/api/v1/timings/deletemeeting`;
export const deleteCourseAPI =     `http://${localhost}:3001/api/v1/courses/deletecourse`;
export const deleteDepartmentAPI=  `http://${localhost}:3001/api/v1/departments/deleteDepartment`


export const getSchedule = `http://${localhost}:3001/api/v1/schedules/getschedule`
export const getPastSchedule = `http://${localhost}:3001/api/v1/schedules/getpastschedule`