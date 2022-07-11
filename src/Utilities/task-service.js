import axios from "axios";
import { getHeaders } from '../HelperFuncs/HelperFuncs'
const BASE_URL = process.env.REACT_APP_URI_TASKS;

const createTask = async task => {
    try{
        const response = await axios.post(`${BASE_URL}/`, task, getHeaders());
        //created task
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}


const updateTask= async task => {
    try{
        const response = await axios.put(`${BASE_URL}/${task._id}`, task, getHeaders());
        return response.data;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}

const deleteTask = async task => {
    try{
        const response = await axios.delete(`${BASE_URL}/${task._id}`, getHeaders());
        //deleted task
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}


export {
    createTask,
    updateTask,
    deleteTask
}