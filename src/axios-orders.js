import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-f0ba1.firebaseio.com/'
});

export default instance;