import axios from "axios";

const API_URL = "http://localhost:8080";

export const getDashboard = async () => {
    const response = await axios.get(
        `${API_URL}/dashboard`, 
        {
            withCredentials: true
        }
    );

    return response.data;
};