import axios from 'axios';

// export const axiosInstace = axios.create({
//     baseURL: 'http://spring-recon-env.eba-y5zh82na.eu-north-1.elasticbeanstalk.com/api',
//     withCredentials: true,
// });

export const axiosInstace = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
});
