import axios from "axios"
const API = "http://localhost:4000/"

export const register = (data) => {
    return axios.post(`${API}user/register`, data)
}

export const login = (data) => {
    return axios.post(`${API}user/login`, data)
}

export const createContact = (data) => {
    return axios.post(`${API}contact`, data)
}

export const getContact = () => {
    return axios.get(`${API}contact`)
}