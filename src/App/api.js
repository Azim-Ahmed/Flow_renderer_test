
import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: `https://restcountries.com/v3.1/capital`,
    headers: {
        "Content-type": "application/json",
    },
});
export default axiosInstance;
