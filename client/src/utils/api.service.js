import axios from "axios";

class APIService{
    baseUrl = 'http://localhost:5000'

    redirect() {
        return `${this.baseUrl}/auth/google`;
    }

    getAnalytics(id) {
        return  axios.get(`${this.baseUrl}/analytics/${id}`)
    }

    revoke(id) {
        return axios.post(`${this.baseUrl}/revoke`,{userId: id})
    }
}

const apiService = new APIService();

export default apiService;