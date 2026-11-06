import axios from "axios";

const BASE_URL="http://localhost:8080/api/v1";

const api=axios.create({
    baseURL:BASE_URL
});

api.interceptors.request.use(config=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.set("Authorization",`Bearer ${token}`);
    }

    return config;
})