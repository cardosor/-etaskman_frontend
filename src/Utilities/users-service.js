import axios from "axios";
const BASE_URL = 'http://192.168.0.37:8080/api/v1/users'

const login = async credentials => {
    try{
        const response = await axios.post(`${BASE_URL}/login`, credentials);
        //Persit the token using window localStorage
        localStorage.setItem('token',response.data);
        return getUser();
    }catch(e){
        console.log("e ", e);
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
    if(payLoad.exp < (Date.now() / 1000)){
        localStorage.removeItem('token');
        return null;
    }else{
        return token;
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
    login,
    getToken,
    logout,
    getUser,
    signUp
}