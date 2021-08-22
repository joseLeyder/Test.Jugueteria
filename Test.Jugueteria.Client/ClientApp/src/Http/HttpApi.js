import axios from "axios";

export default axios.create({
    baseURL: 'https://localhost:44327/api',
    headers: {
        'Content-Type': 'application/json'
    }
});