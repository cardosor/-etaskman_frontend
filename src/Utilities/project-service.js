import axios from "axios";
import { getHeaders } from '../HelperFuncs/HelperFuncs'
const BASE_URL = process.env.REACT_APP_URI_PROJECTS;

const getAllProjects = async userID => {
    try{
        const response = await axios.get(`${BASE_URL}/user/${userID}`, getHeaders());
        //get projects
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}

const getProject = async project => {
    try{
        const response = await axios.get(`${BASE_URL}/${project._id}`, getHeaders());
        //get project
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}

const createProject = async project => {
    try{
        const response = await axios.post(`${BASE_URL}/`, project, getHeaders());
        //created project
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}


const updateProject = async project => {
    try{
        const response = await axios.put(`${BASE_URL}/${project._id}`, project, getHeaders());
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}

const deleteProject = async project => {
    try{
        const response = await axios.delete(`${BASE_URL}/${project._id}`, getHeaders());
        //deleted project
        return response;
    }catch(e){
        return e.response.request.statusText.toLowerCase();
    }
}


export {
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getAllProjects
}