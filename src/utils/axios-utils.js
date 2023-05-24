import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const client = axios.create({baseUrl})

export const request = ({ ...options }) => {
    client.defaults.headers.common.Authorization = localStorage.getItem('token') ? localStorage.getItem('token') : null
    const onSuccess = response => response
    const onError = error => {
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}