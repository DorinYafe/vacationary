import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001'
});

export const setAxiosHeaders = () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token?.substring(1, token.length - 1);
    instance.defaults.headers['Type'] = userType;
};

export default instance;