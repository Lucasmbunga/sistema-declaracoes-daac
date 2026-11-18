import axios from "axios";

const BASE_URL="https://honest-benevolence-production-a94b1ff6.up.railway.app/api/v1";

const api=axios.create({
    baseURL:BASE_URL,
    headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config=>{
    const token=localStorage.getItem("token");
    if(token){
        config.headers.set("Authorization",`Bearer ${token}`);
    }

    return config;
})

export default api;