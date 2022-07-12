import axios from "axios";
import { getHeaders } from '../HelperFuncs/HelperFuncs'


const BASE_URL = process.env.REACT_APP_URI_USERS;


const login = async credentials => {
    try{
        //Send request to login with provided credentials
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        //Persit the token using window localStorage
        localStorage.setItem('token',response.data);
        //return the user
        return getUser();
    }catch(e){
        //If the user provides a bad user name or password
        //return bad credentials
        if(e.response.data.reason.toLowerCase() === "bad credentials"){
            return("bad credentials")
        }
    }
}

const fetchUser = async (id) => {
    try{
        //Send request to login with provided credentials
        const response = await axios.get(`${BASE_URL}/${id}`, getHeaders());
        //Persit the token using window localStorage
        //localStorage.setItem('token',response.data);
        //return the user
        console.log(response.data);
        return response.data;
    }catch(e){
        //If the user provides a bad user name or password
        //return bad credentials
        if(e.response.data.reason.toLowerCase() === "bad credentials"){
            return("bad credentials")
        }
    }
}

const getToken = () => {
    const token = localStorage.getItem('token');
    if(!token) return null;
    //parse the payload, need to isolate the paylaod first
    const payLoad = JSON.parse(atob(token.split('.')[1]));
    //if the token is exp remove from storage
    if(payLoad.exp < (Date.now() / 1000)){
        localStorage.removeItem('token');
        return null;
    }else{
        return token;
    }
}

const getUser = () => {
    const token = getToken();
    //get the user part of the token
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
        return e.response.request.statusText.toLowerCase();
    }
}


export {
    login,
    getToken,
    logout,
    getUser,
    signUp,
    fetchUser
}