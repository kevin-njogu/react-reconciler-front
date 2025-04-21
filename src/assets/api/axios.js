import axios from 'axios';

export const axiosInstace = axios.create({
    baseURL: 'http://spring-reconciler-env.eba-s4y2jqek.us-east-1.elasticbeanstalk.com/api',
});

// export const axiosInstace = axios.create({
//     baseURL: 'http://localhost:8080/api',
// });
