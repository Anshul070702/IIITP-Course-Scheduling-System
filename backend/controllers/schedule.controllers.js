import {asyncHandler} from '../utils/asyncHandler.js'
import axios from "axios"
import fs from 'fs';

const getSchedule = asyncHandler (async (req,res)=>{
    try {
        const pythonServerUrl = 'http://127.0.0.1:5001/get_data';  // URL of the Python server
        const response = await axios.get(pythonServerUrl);
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        function sortDays(data) {
            let sortedData = {};
            for (let section in data) {
                sortedData[section] = {};
                weekDays.forEach(day => {
                    if (data[section][day]) {
                        sortedData[section][day] = data[section][day];
                    }
                });
            }
            return sortedData;
        }

        const sortedData = sortDays(response.data);
        fs.writeFileSync('./past.json', JSON.stringify(sortedData));
        res.json(sortedData);
        
    } catch (error) {
        console.error('Error fetching data from Python server:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

const getPastSchedule = asyncHandler (async (req,res)=>{
    try {
        if (fs.existsSync('./past.json')) {
            const data = fs.readFileSync('./past.json', 'utf8');
            const pastSchedule = JSON.parse(data);
            res.json(pastSchedule);
        } else {
            res.json({});
        }
    } catch (error) {
        console.error('Error reading past schedule data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
export
{
    getSchedule,
    getPastSchedule
}