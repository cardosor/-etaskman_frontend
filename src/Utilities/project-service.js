import axios from "axios";
import { getToken } from "./users-service";
const BASE_URL = 'http://192.168.0.37:8080/api/v1/projects'

const options = () => {
    return {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json'
        }
    }
}

const getProject = async project => {
    try{
        const response = await axios.get(`${BASE_URL}/${project._id}`, options);
        //created project
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}

const createProject = async project => {
    try{
        const response = await axios.post(`${BASE_URL}/`, project, options);
        //created project
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}


const updateProject = async project => {
    console.log("updateProject");
    try{
        console.log(`${BASE_URL}/${project._id}`)
        const response = await axios.put(`${BASE_URL}/${project._id}`, project, options);
        //created project
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}

const deleteProject = async project => {
    console.log("deleteProject");
    try{
        console.log(`${BASE_URL}/${project._id}`)
        const response = await axios.delete(`${BASE_URL}/${project._id}`, options);
        //created project
        console.log(response);
        return response;
    }catch(e){
        
        console.log("e ", e);
        return e.response.request.statusText.toLowerCase();
    }
}


export {
    getProject,
    createProject,
    updateProject,
    deleteProject
}