import axios from "axios";
import { getToken } from "./users-service";
const BASE_URL = 'http://192.168.0.37:8080/api/v1/tasks'

const options = () => {
    return {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
    }
}

const createTask = async task => {
    try{
        const response = await axios.post(`${BASE_URL}/`, task, options);
        //created task
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}


const updateTask= async task => {
    try{
        console.log(`${BASE_URL}/${task._id}`)
        const response = await axios.put(`${BASE_URL}/${task._id}`, task, options);
        //created task
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}

const deleteTask = async task => {
    console.log("deleteProject");
    try{
        console.log(`${BASE_URL}/${task._id}`)
        const response = await axios.delete(`${BASE_URL}/${task._id}`, options);
        //created task
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}


export {
    createTask,
    updateTask,
    deleteTask
}