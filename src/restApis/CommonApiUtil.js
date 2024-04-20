import axios from "axios";

export const todoApiClient = axios.create(
    {
        baseURL: "http://localhost:2004"
    }
)