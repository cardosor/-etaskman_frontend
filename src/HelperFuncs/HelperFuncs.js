import { getToken } from "../Utilities/users-service";

const showMaxWords = (string, num) => {

    if (string.length < num) return string;

    if (string.substring(0, string.lastIndexOf("")).length > num) {
        return string.substring(0, num - 3);
    }

    return string.substring(0, string.lastIndexOf(" ", num));
};

const getHeaders = () => {
    return {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        }
    }
}

export {
    showMaxWords,
    getHeaders
}