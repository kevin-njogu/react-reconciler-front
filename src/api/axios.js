import axios from 'axios';

//const url = 'http://spring-recon-env.eba-y5zh82na.eu-north-1.elasticbeanstalk.com/api';
const url = 'http://localhost:8080/api';

export const axiosInstace = axios.create({
    baseURL: url,
    //withCredentials: true,
});

axiosInstace.interceptors.request.use(
    async (config) => {
        let jwtToken = localStorage.getItem('token');

        if (!jwtToken) {
            console.error('Missing auth token');
        } else {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
