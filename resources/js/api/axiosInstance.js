import axios from "axios"

// create axios instance
const axiosInstance = axios.create({
    baseURL: '/api',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && ! error.response.ok) {
            alert("Please try again later...")
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;
