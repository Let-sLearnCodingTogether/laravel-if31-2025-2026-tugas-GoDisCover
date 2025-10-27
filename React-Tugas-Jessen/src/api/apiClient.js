import axios from "axios";
const apiClient =axios.create({
    baseURL : "http://127.0.0.1:8000/api",
    headers: {
        "Accept": "application/json",
    }    
})
const token = sessionStorage.getItem("token");
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default apiClient;
