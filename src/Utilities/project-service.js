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


const getUser = () => {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

const logout = () => {
    const token = localStorage.getItem('token');
    if(!token) return null;
    localStorage.removeItem('token');
    return null;
}

const signUp = async user => {
    try{
        const token = await axios.post(`${BASE_URL}/`, user);
        //Persit the token using window localStorage
        localStorage.setItem('token',token.data);
        return getUser();
    }catch(e){
        console.log(e);
    }
}


export {
    createProject,
    logout,
    getUser,
    signUp
}