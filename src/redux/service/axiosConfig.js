import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://635bb330aa7c3f113dc3e18f.mockapi.io//api/v1/'
});


export default instance;