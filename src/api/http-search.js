import axios from "axios";
import {httpSearchBaseURL} from "../config/config";

let instance = axios.create({timeout: 1000 * 12})

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.baseURL = "/searchApi"
instance.defaults.timeout = 10000

instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.status) {
            console.log('error');
            return Promise.reject(error.response)
        }
    }
)
export default instance
