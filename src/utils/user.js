import axios from 'axios';

const apiURL = process.env.REACT_APP_API_URL;



export async function connectUser(e){
    e.preventDefault()
    var user = {
        username: e.target.username.value,
        password: e.target.password.value,
    }
    try {
        const response = await axios.post(`${apiURL}/api/auth/login`, user)
        localStorage.setItem("token", response.data)
        loadUser(e)
    } catch (error){
        console.error("erreur lors de la connection", error);
        throw error;
    }
}

export async function loadUser(queryClient) {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

        const response = await axios.get(`${apiURL}/user`);

        queryClient.setQueryData('user', response.data)
        localStorage.setItem('user', JSON.stringify(response.data));

    } catch (error) {
        console.error("Erreur du chargement des donnnées de l'utilisateur", error);
        throw error;
    }
}